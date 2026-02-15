import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import { Heart, MessageCircle, MoreHorizontal, Edit, Loader2 } from 'lucide-react';
import PollDisplay from './PollDisplay';
import { Comment, CommunityPost } from '@/entities/all';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const POST_TYPES = [
  { id: "milestone", label: "Milestone", color: "text-[var(--primary-gold)]" },
  { id: "question", label: "Question", color: "text-blue-600" },
  { id: "resource", label: "Resource", color: "text-green-600" },
  { id: "celebration", label: "Celebration", color: "text-purple-600" },
  { id: "accountability", label: "Accountability", color: "text-orange-600" },
  { id: "poll", label: "Poll", color: "text-cyan-600" },
  { id: "quote", label: "Quote", color: "text-indigo-600" },
];

const getEmbedUrl = (url) => {
    if (!url) return null;
    let videoId;
    if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
    } else {
        return null;
    }
    return `https://www.youtube.com/embed/${videoId}`;
};

const PostCard = ({ post, user, onVote, onLike, onEdit }) => {
    const postType = POST_TYPES.find(pt => pt.id === post.post_type) || { label: "Post", color: "text-gray-500" };
    const embedUrl = getEmbedUrl(post.video_url);
    const userData = post.user_data || {};
    
    // Use display_name if available, otherwise fall back to full_name
    const displayName = userData.display_name || userData.full_name || 'Community Member';
    
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isCommenting, setIsCommenting] = useState(false);
    const [optimisticLiked, setOptimisticLiked] = useState(post.liked_by?.includes(user?.email));
    const [optimisticLikesCount, setOptimisticLikesCount] = useState(post.likes_count || 0);
    
    const isAuthor = user?.email === post.created_by;
    const isAdmin = user?.role === 'admin';
    
    const toggleComments = async () => {
        const newShowState = !showComments;
        setShowComments(newShowState);
        if (newShowState && comments.length === 0) {
            try {
                const fetchedComments = await Comment.filter({ post_id: post.id }, '-created_date');
                setComments(fetchedComments);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        }
    };
    
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        
        setIsCommenting(true);
        try {
            await Comment.create({
                post_id: post.id,
                content: newComment,
                author_full_name: user.full_name,
                author_profile_picture_url: user.profile_picture_url
            });
            await CommunityPost.update(post.id, { comments_count: (post.comments_count || 0) + 1 });
            setNewComment('');
            // Reload all posts and comments to get the latest state
            if (typeof onVote === 'function') {
                onVote(); 
            }
            const fetchedComments = await Comment.filter({ post_id: post.id }, '-created_date');
            setComments(fetchedComments);
        } catch (error) {
            console.error("Error submitting comment:", error);
        } finally {
            setIsCommenting(false);
        }
    };
    
    return (
        <div className="card p-4 sm:p-6">
            <div className="flex items-start space-x-4">
                <img 
                    src={userData.profile_picture_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=E5E7EB&color=6B7280`}
                    alt={displayName} 
                    className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                    loading="lazy"
                />
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                                <h3 className="font-semibold text-[var(--text-main)]">
                                    {displayName}
                                </h3>
                                <span className="text-xs text-[var(--text-soft)]">
                                    {format(new Date(post.created_date), 'MMM d, yyyy')}
                                </span>
                            </div>
                        </div>
                        {(isAuthor || isAdmin) && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => onEdit(post)}>
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Post
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                    
                    <h2 className="text-xl font-bold text-[var(--text-main)] mb-2 hover:text-[var(--primary-gold)] transition-colors cursor-pointer">
                        {post.title}
                    </h2>
                    
                    <div className="flex mb-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${postType.color} bg-gray-100`}>
                            {postType.label}
                        </span>
                    </div>

                    {post.post_type === 'quote' ? (
                        <blockquote className="my-4 p-4 border-l-4 border-[var(--primary-gold)] bg-gray-50 text-left">
                            <p className="text-xl italic font-medium leading-relaxed text-gray-900">"{post.content}"</p>
                            <footer className="mt-2 text-right text-[var(--text-soft)]">- {post.quote_author}</footer>
                        </blockquote>
                    ) : (
                        <p className="text-[var(--text-soft)] mb-4 leading-relaxed text-left whitespace-pre-wrap">{post.content}</p>
                    )}
                    
                    {post.image_url && (
                        <div className="my-4">
                            <img src={post.image_url} alt="Community post attachment" className="rounded-lg max-h-96 w-auto" loading="lazy" />
                        </div>
                    )}
                    
                    {embedUrl && (
                        <div className="my-4 aspect-video">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src={embedUrl}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}

                    {post.post_type === 'poll' && (
                        <PollDisplay post={post} user={user} onVote={onVote} />
                    )}

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                                <span key={index} className="text-xs px-3 py-1 bg-gray-100 border rounded-full text-[var(--text-soft)]">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    <div className="flex items-center space-x-4 text-[var(--text-soft)] border-t border-gray-200 pt-3">
                        <button 
                            onClick={async () => {
                                setOptimisticLiked(!optimisticLiked);
                                setOptimisticLikesCount(prev => optimisticLiked ? prev - 1 : prev + 1);
                                await onLike(post.id);
                            }} 
                            className="btn btn-ghost text-sm"
                        >
                            <Heart className={`w-4 h-4 ${optimisticLiked ? 'text-red-500 fill-current' : ''}`} />
                            <span>{optimisticLikesCount}</span>
                        </button>
                        <button onClick={toggleComments} className="btn btn-ghost text-sm">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments_count || 0}</span>
                        </button>
                    </div>

                    {/* Comments Section */}
                    {showComments && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            {/* New Comment Form */}
                            <form onSubmit={handleCommentSubmit} className="flex items-start space-x-3 mb-4">
                                <img 
                                    src={user?.profile_picture_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name || 'Anonymous')}&background=E5E7EB&color=6B7280`}
                                    alt="Your profile"
                                    className="w-8 h-8 rounded-md object-cover"
                                />
                                <div className="flex-1">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Add a comment..."
                                        className="form-input text-sm resize-none"
                                        rows={2}
                                    />
                                    <button type="submit" disabled={isCommenting || !newComment.trim()} className="btn btn-primary text-xs mt-2">
                                        {isCommenting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Post Comment'}
                                    </button>
                                </div>
                            </form>
                            
                            {/* Existing Comments */}
                            <div className="space-y-4">
                                {comments.length > 0 ? comments.map(comment => (
                                    <div key={comment.id} className="flex items-start space-x-3">
                                        <img
                                            src={comment.author_profile_picture_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author_full_name || 'Anonymous')}&background=E5E7EB&color=6B7280`}
                                            alt={comment.author_full_name}
                                            className="w-8 h-8 rounded-md object-cover"
                                        />
                                        <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-sm text-[var(--text-main)]">{comment.author_full_name}</p>
                                                <p className="text-xs text-[var(--text-soft)]">{format(new Date(comment.created_date), 'MMM d')}</p>
                                            </div>
                                            <p className="text-sm text-[var(--text-soft)] mt-1 whitespace-pre-wrap">{comment.content}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-sm text-center text-[var(--text-soft)] py-4">No comments yet. Be the first!</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(PostCard);