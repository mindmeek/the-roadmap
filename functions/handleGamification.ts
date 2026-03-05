import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

// --- Configuration ---
const XP_VALUES = {
    COMPLETE_DAILY_TRACK: 10,
    CREATE_POST: 15,
    CREATE_COMMENT: 5,
    FORM_PARTNERSHIP: 25,
    COMPLETE_STRATEGY_DOC: 50,
    COMPLETE_JOURNEY_WEEK: 30,
    COMPLETE_NICHE_TASK: 10,
};

const LEVEL_FORMULA = (level) => Math.floor(level * 100 * 1.2);

const checkAchievements = async (user, action, context) => {
    const { unlocked_achievements = [], level } = user;
    let newAchievements = [];
    let bonusXp = 0;
    const allAchievements = await base44.entities.Achievement.list();

    const unlock = (achievementId) => {
        const achievement = allAchievements.find(a => a.achievement_id === achievementId);
        if (achievement && !unlocked_achievements.includes(achievementId)) {
            newAchievements.push(achievement);
            bonusXp += achievement.xp_reward || 0;
        }
    };

    // Action-based achievements
    if (action === 'COMPLETE_DAILY_TRACK') unlock('first_track');
    if (action === 'CREATE_POST') unlock('first_post');
    if (action === 'FORM_PARTNERSHIP') unlock('first_partner');
    if (action === 'COMPLETE_STRATEGY_DOC') unlock('first_strategy_doc');
    
    // Level-based achievements
    if (level >= 5) unlock('level_5');
    if (level >= 10) unlock('level_10');

    return { newAchievements, bonusXp };
};

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

        const { action, context } = await req.json();
        const xpToAdd = XP_VALUES[action] || 0;
        if (xpToAdd === 0) {
            return new Response(JSON.stringify({ message: "No XP for this action" }), { status: 200 });
        }

        let { xp_points = 0, level = 1, unlocked_achievements = [] } = user;
        const originalLevel = level;

        xp_points += xpToAdd;

        let requiredXpForNextLevel = LEVEL_FORMULA(level);
        while (xp_points >= requiredXpForNextLevel) {
            level++;
            xp_points -= requiredXpForNextLevel;
            requiredXpForNextLevel = LEVEL_FORMULA(level);
        }

        if (level > originalLevel) {
            await base44.entities.Notification.create({
                recipient_email: user.email,
                type: 'general',
                title: `🎉 Level Up! You've reached Level ${level}!`,
                message: `Congratulations, you're making amazing progress. Keep up the great work!`,
                link: '/Profile' // Fixed: Use relative path instead of createPageUrl
            });
        }
        
        const { newAchievements, bonusXp } = await checkAchievements({ ...user, level }, action, context);
        if (newAchievements.length > 0) {
            xp_points += bonusXp;
            unlocked_achievements = [...unlocked_achievements, ...newAchievements.map(a => a.achievement_id)];
            
            for (const achievement of newAchievements) {
                await base44.entities.Notification.create({
                    recipient_email: user.email,
                    type: 'general',
                    title: `🏆 Achievement Unlocked: ${achievement.title}`,
                    message: achievement.description,
                    link: '/Profile' // Fixed: Use relative path instead of createPageUrl
                });
            }
        }

        await base44.entities.User.update(user.id, {
            xp_points,
            level,
            unlocked_achievements
        });

        return new Response(JSON.stringify({ 
            success: true, 
            xp_awarded: xpToAdd + bonusXp,
            new_level: level,
            new_achievements: newAchievements.map(a => a.title)
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error in handleGamification function:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
});