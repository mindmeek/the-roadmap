import React, { useState, useEffect } from 'react';
import { CommunityPost } from '@/entities/all';
import { Loader2 } from 'lucide-react';

export default function PollDisplay({ post, user, onVote }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isVoting, setIsVoting] = useState(false);

    const hasVoted = post.voters?.includes(user?.email);
    const totalVotes = post.poll_votes?.reduce((sum, option) => sum + option.votes, 0) || 0;

    const handleVote = async () => {
        if (!selectedOption || hasVoted) return;

        setIsVoting(true);
        try {
            const updatedVotes = post.poll_votes.map(opt => 
                opt.option === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
            );
            const updatedVoters = [...(post.voters || []), user.email];

            await CommunityPost.update(post.id, {
                poll_votes: updatedVotes,
                voters: updatedVoters
            });
            onVote(); // Trigger a reload of posts on the parent page
        } catch (error) {
            console.error("Error submitting vote:", error);
        } finally {
            setIsVoting(false);
        }
    };

    if (!post.poll_options || post.poll_options.length === 0) {
        return null;
    }
    
    return (
        <div className="my-4">
            {hasVoted ? (
                <div className="space-y-2">
                    {post.poll_votes.map((option, index) => {
                        const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                        return (
                            <div key={index}>
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <span className="font-medium text-[var(--text-main)]">{option.option}</span>
                                    <span className="text-[var(--text-soft)]">{option.votes} votes ({percentage.toFixed(0)}%)</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className="bg-[var(--primary-gold)] h-2.5 rounded-full" 
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-3">
                    {post.poll_options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedOption(option)}
                            className={`w-full text-left p-3 border rounded-md transition-all ${
                                selectedOption === option 
                                ? 'border-[var(--primary-gold)] bg-yellow-50 shadow-md' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                    <button
                        onClick={handleVote}
                        disabled={!selectedOption || isVoting}
                        className="btn btn-primary w-full disabled:opacity-50"
                    >
                        {isVoting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Vote'}
                    </button>
                </div>
            )}
        </div>
    );
}