import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2, Plus, Edit, Trash2, Eye, EyeOff, BookOpen, X } from 'lucide-react';

const CourseFormModal = ({ isOpen, onClose, course, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor_name: '',
        cover_image_url: '',
        category: '',
        difficulty: 'Beginner',
        is_published: false,
        is_interactive: false,
        content_key: ''
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (course) {
            setFormData(course);
        } else {
            setFormData({
                title: '',
                description: '',
                instructor_name: '',
                cover_image_url: '',
                category: '',
                difficulty: 'Beginner',
                is_published: false,
                is_interactive: false,
                content_key: ''
            });
        }
    }, [course, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (course) {
                await base44.entities.Course.update(course.id, formData);
            } else {
                await base44.entities.Course.create(formData);
            }
            onSave();
            onClose();
        } catch (error) {
            console.error('Error saving course:', error);
            alert('Error saving course. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-[var(--text-main)]">
                            {course ? 'Edit Course' : 'Create New Course'}
                        </h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">
                            Course Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="form-input"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">
                            Description *
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="form-input h-24"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-1">
                                Instructor Name *
                            </label>
                            <input
                                type="text"
                                value={formData.instructor_name}
                                onChange={(e) => setFormData({...formData, instructor_name: e.target.value})}
                                className="form-input"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-1">
                                Category *
                            </label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                className="form-input"
                                placeholder="e.g., E-commerce, Marketing"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">
                            Cover Image URL *
                        </label>
                        <input
                            type="url"
                            value={formData.cover_image_url}
                            onChange={(e) => setFormData({...formData, cover_image_url: e.target.value})}
                            className="form-input"
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                        {formData.cover_image_url && (
                            <img 
                                src={formData.cover_image_url} 
                                alt="Preview" 
                                className="mt-2 w-full h-32 object-cover rounded-md"
                            />
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">
                            Difficulty *
                        </label>
                        <select
                            value={formData.difficulty}
                            onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                            className="form-input"
                            required
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">
                            Content Key (for interactive courses)
                        </label>
                        <input
                            type="text"
                            value={formData.content_key}
                            onChange={(e) => setFormData({...formData, content_key: e.target.value})}
                            className="form-input"
                            placeholder="e.g., online_store_launch, community_builder_launch"
                        />
                        <p className="text-xs text-[var(--text-soft)] mt-1">
                            Available keys: online_store_launch, community_builder_launch, one_page_business_plan, complete_customer_journey
                        </p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.is_interactive}
                                onChange={(e) => setFormData({...formData, is_interactive: e.target.checked})}
                                className="w-4 h-4 text-[var(--primary-gold)] rounded"
                            />
                            <span className="text-sm text-[var(--text-main)]">Interactive Course</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.is_published}
                                onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                                className="w-4 h-4 text-[var(--primary-gold)] rounded"
                            />
                            <span className="text-sm text-[var(--text-main)]">Published</span>
                        </label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-secondary"
                            disabled={saving}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                course ? 'Update Course' : 'Create Course'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function AdminCourseManagement() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [filter, setFilter] = useState('all'); // all, published, draft

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        setLoading(true);
        try {
            const allCourses = await base44.entities.Course.list('-created_date');
            setCourses(allCourses);
        } catch (error) {
            console.error('Error loading courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (courseId) => {
        if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            return;
        }

        try {
            await base44.entities.Course.delete(courseId);
            loadCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Error deleting course. Please try again.');
        }
    };

    const handleTogglePublish = async (course) => {
        try {
            await base44.entities.Course.update(course.id, {
                is_published: !course.is_published
            });
            loadCourses();
        } catch (error) {
            console.error('Error updating course:', error);
            alert('Error updating course. Please try again.');
        }
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setEditingCourse(null);
        setIsFormOpen(true);
    };

    const filteredCourses = courses.filter(course => {
        if (filter === 'published') return course.is_published;
        if (filter === 'draft') return !course.is_published;
        return true;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="px-4 pb-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Course Management</h1>
                        <p className="text-[var(--text-soft)]">Create, edit, and manage all courses</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="btn btn-primary"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Course
                    </button>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filter === 'all'
                                ? 'bg-[var(--primary-gold)] text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-[var(--text-main)] hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        All Courses ({courses.length})
                    </button>
                    <button
                        onClick={() => setFilter('published')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filter === 'published'
                                ? 'bg-[var(--primary-gold)] text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-[var(--text-main)] hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        Published ({courses.filter(c => c.is_published).length})
                    </button>
                    <button
                        onClick={() => setFilter('draft')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filter === 'draft'
                                ? 'bg-[var(--primary-gold)] text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-[var(--text-main)] hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        Drafts ({courses.filter(c => !c.is_published).length})
                    </button>
                </div>
            </div>

            {/* Courses List */}
            {filteredCourses.length === 0 ? (
                <div className="card p-12 text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                    <p className="text-[var(--text-soft)] mb-4">
                        {filter === 'all' ? 'Get started by creating your first course!' : `No ${filter} courses yet.`}
                    </p>
                    <button onClick={handleCreate} className="btn btn-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Course
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <div key={course.id} className="card overflow-hidden">
                            <div className="relative h-48">
                                <img
                                    src={course.cover_image_url}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 right-3 flex gap-2">
                                    {course.is_interactive && (
                                        <span className="bg-[var(--primary-gold)] text-white px-2 py-1 rounded-full text-xs font-semibold">
                                            Interactive
                                        </span>
                                    )}
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        course.is_published
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-500 text-white'
                                    }`}>
                                        {course.is_published ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-1 truncate">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-[var(--text-soft)] line-clamp-2 mb-2">
                                            {course.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 text-xs">
                                            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                {course.category}
                                            </span>
                                            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                {course.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={() => handleTogglePublish(course)}
                                        className="btn btn-ghost text-sm flex items-center"
                                        title={course.is_published ? 'Unpublish' : 'Publish'}
                                    >
                                        {course.is_published ? (
                                            <><EyeOff className="w-4 h-4 mr-1" /> Hide</>
                                        ) : (
                                            <><Eye className="w-4 h-4 mr-1" /> Publish</>
                                        )}
                                    </button>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(course)}
                                            className="btn btn-ghost text-sm p-2"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course.id)}
                                            className="btn btn-ghost text-sm p-2 text-red-500 hover:text-red-700"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <CourseFormModal
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingCourse(null);
                }}
                course={editingCourse}
                onSave={loadCourses}
            />
        </div>
    );
}