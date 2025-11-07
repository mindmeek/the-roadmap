
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useLocation, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Loader2, ArrowLeft, CheckCircle, ChevronDown, ChevronUp, Calendar, Award } from 'lucide-react';

// Import all course content
import { communityBuilderRoadmap } from '../components/course_content/communityBuilder';
import { onlineStoreRoadmap } from '../components/course_content/onlineStore';
import { onePageBusinessPlanRoadmap } from '../components/course_content/onePageBusinessPlan';
import { completeCustomerJourneyRoadmap } from '../components/course_content/completeCustomerJourney';
import { quickBusinessWinsRoadmap } from '../components/course_content/quickBusinessWins';
import { buildFoundationRoadmap } from '../components/course_content/buildFoundation';
import { brandIdentityRoadmap } from '../components/course_content/brandIdentity';
import { educateAudienceRoadmap } from '../components/course_content/educateAudience';
import { nurtureRelationshipsRoadmap } from '../components/course_content/nurtureRelationships';
import { increaseLeadsRoadmap } from '../components/course_content/increaseLeads';
import { formPartnershipsRoadmap } from '../components/course_content/formPartnerships';
import { growCommunityRoadmap } from '../components/course_content/growCommunity';
import { systematizeScaleRoadmap } from '../components/course_content/systematizeScale';
import { buildAuthorityRoadmap } from '../components/course_content/buildAuthority';
import { multiplyImpactRoadmap } from '../components/course_content/multiplyImpact';
import { stepIntoLeadershipRoadmap } from '../components/course_content/stepIntoLeadership';

// Map course content keys to their respective data structures
const courseContentMap = {
    'online_store_launch': onlineStoreRoadmap,
    'community_builder_launch': communityBuilderRoadmap,
    'one_page_business_plan': onePageBusinessPlanRoadmap,
    'complete_customer_journey': completeCustomerJourneyRoadmap,
    'quick_business_wins': quickBusinessWinsRoadmap,
    'build_foundation': buildFoundationRoadmap,
    'brand_identity': brandIdentityRoadmap,
    'educate_audience': educateAudienceRoadmap,
    'nurture_relationships': nurtureRelationshipsRoadmap,
    'increase_leads': increaseLeadsRoadmap,
    'form_partnerships': formPartnershipsRoadmap,
    'grow_community': growCommunityRoadmap,
    'systematize_scale': systematizeScaleRoadmap,
    'build_authority': buildAuthorityRoadmap,
    'multiply_impact': multiplyImpactRoadmap,
    'step_into_leadership': stepIntoLeadershipRoadmap,
};

// Debounce utility function
const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
};

const InteractiveCourse = ({ course, user }) => {
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openWeek, setOpenWeek] = useState(0);

    // Get the course content data using the course's content_key
    const courseData = courseContentMap[course.content_key];

    const loadProgress = useCallback(async () => {
        setLoading(true);
        try {
            // Try to find existing progress for this user and course
            const existingProgress = await base44.entities.UserCourseProgress.filter({ user_id: user.id, course_id: course.id });
            if (existingProgress.length > 0) {
                setProgress(existingProgress[0]);
            } else {
                // If no progress exists, create a new entry
                const newProgress = await base44.entities.UserCourseProgress.create({
                    user_id: user.id,
                    course_id: course.id,
                    status: 'in_progress',
                });
                setProgress(newProgress);
            }
        } catch (error) {
            console.error("Error loading or creating course progress:", error);
        }
        setLoading(false);
    }, [course.id, user.id]);

    // Effect to load or create user progress when the component mounts or course/user changes
    useEffect(() => {
        loadProgress();
    }, [loadProgress]);

    // Memoize the debounced save function to avoid recreating it on every render
    const debouncedSaveNotes = useMemo(() =>
        debounce(async (lessonId, notes, currentProgress) => {
            if (!currentProgress) return;
            const updatedNotes = { ...currentProgress.lesson_notes, [lessonId]: notes };
            try {
                await base44.entities.UserCourseProgress.update(currentProgress.id, { lesson_notes: updatedNotes });
            } catch (error) {
                console.error("Error saving notes:", error);
            }
        }, 1000),
        []
    );

    const handleNoteChange = (lessonId, notes) => {
        debouncedSaveNotes(lessonId, notes, progress);
    };

    // Function to toggle the completion status of a task
    const handleToggleTask = async (taskId) => {
        const isCompleted = progress.completed_lessons.includes(taskId);
        const updatedLessons = isCompleted
            ? progress.completed_lessons.filter(id => id !== taskId)
            : [...progress.completed_lessons, taskId];

        try {
            const updatedProgress = await base44.entities.UserCourseProgress.update(progress.id, { completed_lessons: updatedLessons });
            setProgress(updatedProgress);
        } catch (error) {
            console.error("Error updating task completion:", error);
        }
    };

    // Display a loader while progress is being fetched
    if (loading || !progress) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin" /></div>;
    }

    if (!courseData) {
        return <div className="text-center py-8 text-[var(--text-soft)]">Course content not available.</div>;
    }

    // Calculate progress statistics based on the new structure
    const totalTasks = courseData.weeks.reduce((total, week) => {
        if (week.days) {
            return total + week.days.reduce((dayTotal, day) => dayTotal + (day.tasks?.length || 0), 0);
        } else if (week.tasks) {
            return total + week.tasks.length;
        }
        return total;
    }, 0);

    const completedTasks = progress.completed_lessons.length;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Render the interactive course content
    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Course Progress Header */}
            <div className="card p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">Your Progress</h2>
                    <div className="text-left sm:text-right">
                        <div className="text-2xl sm:text-3xl font-bold text-[var(--primary-gold)]">{progressPercentage}%</div>
                        <div className="text-xs sm:text-sm text-[var(--text-soft)]">{completedTasks} of {totalTasks} tasks</div>
                    </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3">
                    <div
                        className="bg-[var(--primary-gold)] h-2 sm:h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Course Content */}
            {courseData.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="card overflow-hidden">
                    <button
                        onClick={() => setOpenWeek(openWeek === weekIndex ? -1 : weekIndex)}
                        className="w-full text-left p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                                {week.icon && <week.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary-gold)] flex-shrink-0" />}
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base sm:text-xl font-bold text-[var(--text-main)] truncate">Week {week.weekNumber}: {week.weekTitle}</h3>
                                    <p className="text-xs sm:text-sm text-[var(--text-soft)] mt-1 line-clamp-2">{week.weekDescription}</p>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                {openWeek === weekIndex ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </div>
                        </div>
                    </button>

                    {openWeek === weekIndex && (
                        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                            {/* Week with Days (e.g., for a 30-day course) */}
                            {week.days && week.days.map((day, dayIndex) => (
                                <div key={dayIndex} className="border-l-4 border-[var(--primary-gold)] pl-3 sm:pl-6">
                                    <h4 className="text-base sm:text-lg font-bold text-[var(--text-main)] mb-2">
                                        Day {day.day}: {day.title}
                                    </h4>
                                    <p className="text-sm text-[var(--text-soft)] mb-4">{day.description}</p>

                                    {day.tasks && (
                                        <div className="space-y-2 mb-4">
                                            <h5 className="font-semibold text-sm text-[var(--text-main)]">Tasks:</h5>
                                            {day.tasks.map((task, taskIndex) => {
                                                const taskId = `week${week.weekNumber}_day${day.day}_task${taskIndex}`;
                                                const isCompleted = progress.completed_lessons.includes(taskId);

                                                return (
                                                    <label key={taskIndex} className="flex items-start space-x-2 sm:space-x-3 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={isCompleted}
                                                            onChange={() => handleToggleTask(taskId)}
                                                            className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-[var(--primary-gold)] rounded flex-shrink-0"
                                                        />
                                                        <span className={`text-xs sm:text-sm ${isCompleted ? 'line-through text-gray-500' : 'text-[var(--text-main)]'}`}>
                                                            {task}
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {day.deliverable && (
                                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-4">
                                            <h5 className="font-semibold text-sm text-green-800 dark:text-green-200 mb-1">📦 Deliverable:</h5>
                                            <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">{day.deliverable}</p>
                                        </div>
                                    )}

                                    {day.resources && day.resources.length > 0 && (
                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                            <h5 className="font-semibold text-sm text-blue-800 dark:text-blue-200 mb-1">🔧 Resources:</h5>
                                            <ul className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 list-disc pl-4">
                                                {day.resources.map((resource, index) => (
                                                    <li key={index}>{resource}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Week with Task Objects (e.g., for a 12-week course) */}
                            {week.tasks && week.tasks.map((task, taskIndex) => {
                                const taskId = `week${week.weekNumber}_task${taskIndex}`;
                                const isCompleted = progress.completed_lessons.includes(taskId);

                                return (
                                    <div key={taskIndex} className="border-l-4 border-[var(--primary-gold)] pl-3 sm:pl-6">
                                        <div className="flex items-start space-x-2 sm:space-x-3 mb-2">
                                            <input
                                                type="checkbox"
                                                checked={isCompleted}
                                                onChange={() => handleToggleTask(taskId)}
                                                className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-[var(--primary-gold)] rounded cursor-pointer flex-shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className={`text-base sm:text-lg font-bold ${isCompleted ? 'line-through text-gray-500' : 'text-[var(--text-main)]'}`}>
                                                    {task.title}
                                                </h4>
                                                <p className="text-sm text-[var(--text-soft)] mt-1">{task.description}</p>

                                                {task.action && (
                                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mt-3">
                                                        <h5 className="font-semibold text-sm text-yellow-800 dark:text-yellow-200 mb-1">🎯 Action Steps:</h5>
                                                        <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300">{task.action}</p>
                                                    </div>
                                                )}

                                                {task.deliverable && (
                                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mt-3">
                                                        <h5 className="font-semibold text-sm text-green-800 dark:text-green-200 mb-1">📦 Deliverable:</h5>
                                                        <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">{task.deliverable}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Week Notes */}
                            <div className="mt-6">
                                <h5 className="font-semibold text-sm text-[var(--text-main)] mb-2">📝 Your Notes for Week {week.weekNumber}:</h5>
                                <textarea
                                    defaultValue={progress.lesson_notes[`week${week.weekNumber}_notes`] || ''}
                                    onChange={(e) => handleNoteChange(`week${week.weekNumber}_notes`, e.target.value)}
                                    placeholder="Add your thoughts, progress updates, and key takeaways..."
                                    className="form-input h-20 sm:h-24 resize-none text-sm"
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default function CourseDetailsPage() {
    const location = useLocation();
    const [course, setCourse] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const courseId = useMemo(() => new URLSearchParams(location.search).get('courseId'), [location.search]);
    const courseTitle = useMemo(() => new URLSearchParams(location.search).get('courseTitle'), [location.search]);

    const loadCourse = useCallback(async () => {
        if (!courseId && !courseTitle) {
            setError("No course ID or title provided");
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const [allCourses, userData] = await Promise.all([
                base44.entities.Course.filter({ is_published: true }),
                base44.auth.me()
            ]);
            
            let foundCourse;
            if (courseId) {
                foundCourse = allCourses.find(c => c.id === courseId);
            } else if (courseTitle) {
                // Normalize title for comparison (e.g., lowercase, replace spaces with hyphens)
                const normalizedSearchTitle = courseTitle.toLowerCase().replace(/ /g, '-');
                foundCourse = allCourses.find(c => c.title.toLowerCase().replace(/ /g, '-') === normalizedSearchTitle);
            }

            if (!foundCourse) {
                setError("Course not found");
            } else {
                setCourse(foundCourse);
                setUser(userData);
            }
        } catch (error) {
            console.error("Error loading course details:", error);
            setError("Error loading course");
        } finally {
            setLoading(false);
        }
    }, [courseId, courseTitle]);

    useEffect(() => {
        loadCourse();
    }, [loadCourse]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-12 h-12 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="px-4 py-8 max-w-6xl mx-auto">
                <div className="mb-8">
                    <Link to={createPageUrl('FocusedPrograms')} className="btn btn-ghost text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Focused Programs
                    </Link>
                </div>
                <div className="card p-8 sm:p-12 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Course Not Found</h2>
                    <p className="text-[var(--text-soft)] mb-4">
                        {error || "The course you're looking for doesn't exist or isn't available."}
                    </p>
                    <Link to={createPageUrl('FocusedPrograms')} className="btn btn-primary">
                        View All Programs
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-6 sm:py-8 max-w-6xl mx-auto">
            <div className="mb-6 sm:mb-8">
                <Link to={createPageUrl('FocusedPrograms')} className="btn btn-ghost text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Focused Programs
                </Link>
            </div>

            <div className="card p-4 sm:p-8 mb-6 sm:mb-8">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
                    <img
                        src={course.cover_image_url}
                        alt={course.title}
                        className="w-full lg:w-1/3 h-40 sm:h-48 lg:h-auto object-cover rounded-lg shadow-lg"
                    />
                    <div className="flex-1">
                        <span className="text-xs sm:text-sm font-semibold text-[var(--primary-gold)] bg-yellow-50 px-2 sm:px-3 py-1 rounded-full">
                            {course.category}
                        </span>
                        <h1 className="text-2xl sm:text-4xl font-bold my-2 sm:my-3">{course.title}</h1>
                        <p className="text-sm sm:text-lg text-[var(--text-soft)] mb-3 sm:mb-4">{course.description}</p>
                        <p className="text-xs sm:text-base text-[var(--text-main)]">
                            by {course.instructor_name} | Difficulty: {course.difficulty}
                        </p>

                        {course.is_interactive && (
                            <div className="mt-3 sm:mt-4 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 sm:p-4">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                    <span className="font-medium text-sm sm:text-base text-green-800 dark:text-green-200">Interactive Course</span>
                                </div>
                                <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 mt-1">
                                    Track your progress with actionable tasks and personalized notes.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {course.is_interactive && user ? (
                <InteractiveCourse course={course} user={user} />
            ) : (
                <div className="card p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">Course Content</h2>
                    <p className="text-[var(--text-soft)]">Standard course content would be displayed here. This course is not interactive.</p>
                </div>
            )}
        </div>
    );
}
