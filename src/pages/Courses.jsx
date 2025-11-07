import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { BookOpen, Clock, Target, Loader2, Award, Users, TrendingUp } from 'lucide-react';

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        setLoading(true);
        try {
            const allCourses = await base44.entities.Course.filter({ is_published: true });
            console.log('Loaded courses:', allCourses); // Debug log
            setCourses(allCourses);
        } catch (error) {
            console.error('Error loading courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['all', ...new Set(courses.map(c => c.category))];

    const filteredCourses = selectedCategory === 'all' 
        ? courses 
        : courses.filter(c => c.category === selectedCategory);

    const getDifficultyColor = (difficulty) => {
        switch(difficulty) {
            case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
            case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
            case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-12 h-12 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Interactive Courses</h1>
                <p className="text-base sm:text-lg text-[var(--text-soft)]">
                    Comprehensive learning paths with hands-on exercises and progress tracking
                </p>
            </div>

            {/* Category Filter */}
            {categories.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedCategory === category
                                    ? 'bg-[var(--primary-gold)] text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-[var(--text-main)] hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            {category === 'all' ? 'All Courses' : category}
                        </button>
                    ))}
                </div>
            )}

            {/* Courses Grid */}
            {filteredCourses.length === 0 ? (
                <div className="card p-8 sm:p-12 text-center">
                    <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">No courses available yet</h3>
                    <p className="text-sm sm:text-base text-[var(--text-soft)]">
                        Check back soon for new learning opportunities!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredCourses.map((course) => (
                        <Link
                            key={course.id}
                            to={`${createPageUrl('CourseDetails')}?courseId=${course.id}`}
                            className="card overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                        >
                            {/* Course Image */}
                            <div className="relative h-40 sm:h-48 overflow-hidden">
                                <img
                                    src={course.cover_image_url}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                
                                {/* Interactive Badge */}
                                {course.is_interactive && (
                                    <div className="absolute top-3 right-3 bg-[var(--primary-gold)] text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                        <Target className="w-3 h-3" />
                                        Interactive
                                    </div>
                                )}
                            </div>

                            {/* Course Content */}
                            <div className="p-4 sm:p-6">
                                {/* Category & Difficulty */}
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <span className="text-xs font-semibold text-[var(--primary-gold)] bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
                                        {course.category}
                                    </span>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
                                        {course.difficulty}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg sm:text-xl font-bold mb-2 text-[var(--text-main)] group-hover:text-[var(--primary-gold)] transition-colors line-clamp-2">
                                    {course.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-[var(--text-soft)] mb-4 line-clamp-3">
                                    {course.description}
                                </p>

                                {/* Instructor */}
                                <div className="flex items-center justify-between text-xs sm:text-sm text-[var(--text-soft)] pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <span className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        {course.instructor_name}
                                    </span>
                                    <span className="text-[var(--primary-gold)] font-medium group-hover:underline">
                                        Start Course →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Info Banner */}
            {filteredCourses.length > 0 && (
                <div className="mt-8 sm:mt-12 card p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-lg flex-shrink-0">
                            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-base sm:text-lg text-[var(--text-main)] mb-1">Track Your Progress</h4>
                            <p className="text-sm text-[var(--text-soft)]">
                                All interactive courses include progress tracking, note-taking, and actionable tasks to help you apply what you learn.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}