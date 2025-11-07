import React, { useState, useEffect, useCallback, useMemo } from "react";
import { CommunityPost, User } from "@/entities/all";
import { Plus, Edit, Trash2, Clock, Send, Eye, Loader2, Filter, X, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import PostForm from "../components/community/PostForm";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function AdminPostScheduler() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [filters, setFilters] = useState({ status: 'all', search: '' });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const user = await User.me();
                setCurrentUser(user);
                loadPosts();
            } catch (error) {
                console.error("Error fetching initial data:", error);
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const loadPosts = useCallback(async () => {
        setLoading(true);
        try {
            const allPosts = await CommunityPost.list("-created_date", 200); // Fetch all posts for admin
            setPosts(allPosts);
        } catch (error) {
            console.error("Error loading posts:", error);
        }
        setLoading(false);
    }, []);

    const handleSavePost = async (postData, postToEdit) => {
        try {
            const data = { ...postData };
            // Admin form can set status and publish_at
            if (data.status === 'scheduled' && !data.publish_at) {
                alert('Please select a publish date for scheduled posts.');
                throw new Error('Scheduled posts require a publish date.');
            }

            if (postToEdit) {
                return await CommunityPost.update(postToEdit.id, data);
            } else {
                return await CommunityPost.create({
                    ...data,
                    author_full_name: currentUser.full_name,
                    author_profile_picture_url: currentUser.profile_picture_url,
                    author_business_name: "The Business Minds",
                    author_entrepreneurship_stage: "staff"
                });
            }
        } catch (error) {
            console.error("Error saving post:", error);
            throw error; // Re-throw to be caught by PostForm
        }
    };

    const handleDeletePost = async (postId) => {
        if (window.confirm("Are you sure you want to delete this post permanently?")) {
            try {
                await CommunityPost.delete(postId);
                loadPosts();
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("Failed to delete post.");
            }
        }
    };

    const handleOpenForm = (post = null) => {
        setEditingPost(post);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingPost(null);
        loadPosts(); // Refresh list after closing the form
    };

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const statusMatch = filters.status === 'all' || post.status === filters.status;
            const searchMatch = !filters.search || post.title.toLowerCase().includes(filters.search.toLowerCase());
            return statusMatch && searchMatch;
        });
    }, [posts, filters]);

    const getStatusChip = (status) => {
        const styles = {
            published: "bg-green-100 text-green-800",
            scheduled: "bg-blue-100 text-blue-800",
            draft: "bg-gray-100 text-gray-800",
        };
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>{status}</span>;
    };

    return (
        <div className="px-4 pb-8">
            <div className="max-w-7xl mx-auto">
                <div className="card p-6 md:p-8 mb-6">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <Link to={createPageUrl('Admin')} className="btn btn-ghost p-2 -ml-2 hidden md:inline-flex">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl md:text-3xl">Community Post Scheduler</h1>
                                <p className="text-[var(--text-soft)] mt-2">Manage all community posts from one place.</p>
                            </div>
                        </div>
                        <button onClick={() => handleOpenForm()} className="btn btn-primary">
                            <Plus className="w-4 h-4" />
                            Create New Post
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="card p-4 mb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-[var(--text-soft)]" />
                            <select
                                value={filters.status}
                                onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
                                className="form-input py-1 text-sm"
                            >
                                <option value="all">All Statuses</option>
                                <option value="published">Published</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                        <div className="flex-grow">
                             <input
                                type="text"
                                placeholder="Search by title..."
                                value={filters.search}
                                onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                                className="form-input text-sm w-full"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="card overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="p-4 font-semibold">Title</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">Publish Date</th>
                                <th className="p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" className="text-center p-8"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></td></tr>
                            ) : (
                                filteredPosts.map(post => (
                                    <tr key={post.id} className="border-b dark:border-gray-700">
                                        <td className="p-4 font-medium">{post.title}</td>
                                        <td className="p-4">{getStatusChip(post.status)}</td>
                                        <td className="p-4">{post.publish_at ? format(new Date(post.publish_at), "MMM d, yyyy 'at' h:mm a") : '-'}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleOpenForm(post)} className="btn btn-ghost p-2" title="Edit"><Edit className="w-4 h-4" /></button>
                                                <button onClick={() => handleDeletePost(post.id)} className="btn btn-ghost p-2 text-red-500" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {isFormOpen && (
                    <PostFormWithSchedule 
                        isOpen={isFormOpen}
                        onClose={handleCloseForm}
                        onSave={handleSavePost}
                        currentUser={currentUser}
                        editingPost={editingPost}
                    />
                )}
            </div>
        </div>
    );
}

// Wrapper for PostForm to add scheduling fields
const PostFormWithSchedule = ({ isOpen, onClose, onSave, currentUser, editingPost }) => {
    const [status, setStatus] = useState(editingPost?.status || 'published');
    const [publishAt, setPublishAt] = useState(editingPost?.publish_at ? editingPost.publish_at.slice(0, 16) : '');

    const handleSaveWrapper = async (postData, postToEdit) => {
        const dataWithSchedule = {
            ...postData,
            status,
            publish_at: status === 'scheduled' ? publishAt : null,
        };
        // The onSave prop is handleSavePost from the parent, which is async and returns the saved post
        return await onSave(dataWithSchedule, postToEdit);
    };
    
    // This effect ensures the local state is updated when the editingPost prop changes
    useEffect(() => {
        setStatus(editingPost?.status || 'published');
        setPublishAt(editingPost?.publish_at ? editingPost.publish_at.slice(0, 16) : '');
    }, [editingPost]);

    if (!isOpen) return null;
    
    return (
        <PostForm 
            isOpen={isOpen}
            onClose={onClose}
            onSave={handleSaveWrapper} // Pass the async wrapper
            currentUser={currentUser}
            editingPost={editingPost}
            // We pass down a custom footer to include scheduling fields
            customFooter={
                <div className="border-t pt-4 space-y-4">
                    <h3 className="font-medium text-[var(--text-main)]">Scheduling Options</h3>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select value={status} onChange={e => setStatus(e.target.value)} className="form-input">
                            <option value="published">Published (Now)</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                    {status === 'scheduled' && (
                        <div>
                             <label className="block text-sm font-medium mb-1">Publish Date & Time</label>
                             <input 
                                type="datetime-local"
                                value={publishAt}
                                onChange={e => setPublishAt(e.target.value)}
                                className="form-input"
                             />
                        </div>
                    )}
                </div>
            }
        />
    );
};