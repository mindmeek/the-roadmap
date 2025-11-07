import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { User, CommunityPost, Notification, Comment } from "@/entities/all";
import { sendMention } from "@/functions/sendMention";
import { UploadFile } from "@/integrations/Core";
import { Plus, Heart, MessageCircle, Users, Edit3, Image as ImageIcon, Video, X, Loader2, Quote, BarChartHorizontal, Crown } from "lucide-react";
import { format } from "date-fns";
import PollDisplay from "../components/community/PollDisplay";
import PostCard from "../components/community/PostCard";
import SubscriptionGate from '../components/subscription/SubscriptionGate';
import { handleGamification } from '@/functions/handleGamification';

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

// Move defaultPostState outside the component to avoid recreating it
const defaultPostState = {
    title: "",
    content: "",
    post_type: "milestone",
    tags: [],
    image_url: "",
    video_url: "",
    quote_author: "",
    poll_options: ["", ""],
    tagged_members: []
};

// Updated PostForm to act as a modal and handle edits
function PostForm({ isOpen, onClose, onSave, currentUser, editingPost }) {
  const [newPost, setNewPost] = useState(defaultPostState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [allMembers, setAllMembers] = useState([]);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);
  const [memberSearch, setMemberSearch] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (isOpen) {
        // Initialize newPost state based on editingPost or default values
        const initialState = editingPost ? { ...defaultPostState, ...editingPost } : defaultPostState;
        setNewPost(initialState);
        setImagePreview(initialState.image_url || ''); // Set image preview

        const fetchMembers = async () => {
            try {
                const members = await User.list('', 1000);
                setAllMembers(members);
            } catch (error) {
                console.error("Failed to fetch members for tagging:", error);
            }
        };
        fetchMembers();
    } else {
        // Reset form when modal closes
        setNewPost(defaultPostState);
        setImagePreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }
  }, [isOpen, editingPost]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsSubmitting(true);
    setImagePreview(URL.createObjectURL(file));
    try {
        const { file_url } = await UploadFile({ file });
        setNewPost(prev => ({...prev, image_url: file_url}));
    } catch (err) {
        console.error("Error uploading image:", err);
        setImagePreview(editingPost?.image_url || '');
    } finally {
        setIsSubmitting(false);
    }
  };

  const handlePollOptionChange = (index, value) => {
    const updatedOptions = [...(newPost.poll_options || ["", ""])];
    updatedOptions[index] = value;
    setNewPost(prev => ({ ...prev, poll_options: updatedOptions }));
  };

  const addPollOption = () => {
    setNewPost(prev => ({ ...prev, poll_options: [...(newPost.poll_options || ["", ""]), ""] }));
  };

  const removePollOption = (index) => {
    const updatedOptions = (newPost.poll_options || ["", ""]).filter((_, i) => i !== index);
    setNewPost(prev => ({ ...prev, poll_options: updatedOptions }));
  };

  const handleTagMember = (member) => {
    if (!(newPost.tagged_members || []).find(m => m.id === member.id)) {
        setNewPost(prev => ({...prev, tagged_members: [...(newPost.tagged_members || []), member]}));
    }
    setMemberSearch('');
    setShowMemberDropdown(false);
  };

  const handleRemoveTag = (memberId) => {
    setNewPost(prev => ({...prev, tagged_members: (newPost.tagged_members || []).filter(m => m.id !== memberId)}));
  };

  const filteredMembers = useMemo(() => {
    const untaggedMembers = allMembers.filter(m => !(newPost.tagged_members || []).some(tm => tm.id === m.id));
    if (!memberSearch) return untaggedMembers.slice(0, 10);
    return untaggedMembers.filter(m =>
        m.full_name.toLowerCase().includes(memberSearch.toLowerCase()) ||
        m.email.toLowerCase().includes(memberSearch.toLowerCase())
    ).slice(0, 10);
  }, [memberSearch, allMembers, newPost.tagged_members]);

  const handleSubmit = async () => {
    if (!newPost.title?.trim() || !newPost.content?.trim()) {
        alert("Title and content cannot be empty.");
        return;
    }

    if (!currentUser) {
        alert("Could not identify the user. Please try refreshing the page.");
        return;
    }

    let postDataToSend = {
        ...newPost,
        tags: (newPost.tags || []).filter(tag => tag.trim() !== ""),
    };

    if (postDataToSend.post_type === 'poll') {
        const validOptions = (newPost.poll_options || []).filter(opt => opt.trim() !== "");
        if (validOptions.length < 2) {
            alert("Polls must have at least two options.");
            return;
        }
        postDataToSend.poll_options = validOptions;
        if (!editingPost) {
            postDataToSend.poll_votes = validOptions.map(option => ({ option, votes: 0 }));
        }
    }

    postDataToSend.tagged_members = (newPost.tagged_members || []).map(m => ({
        id: m.id,
        full_name: m.full_name,
        email: m.email
    }));

    setIsSubmitting(true);
    try {
      await onSave(postDataToSend, editingPost);
      onClose();
    } catch (error) {
      console.error("Error saving post from form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 md:p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white z-10">
          <X className="w-6 h-6" />
        </button>
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">{editingPost ? 'Edit Post' : 'Share Something New'}</h2>
            <select
              value={newPost.post_type || 'milestone'}
              onChange={(e) => setNewPost({...newPost, post_type: e.target.value})}
              className="form-input py-2"
            >
              {POST_TYPES.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>

            <input
              type="text"
              value={newPost.title || ''}
              onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              placeholder="Post Title"
              className="form-input text-lg font-medium"
            />

            {newPost.post_type === 'quote' ? (
              <>
              <textarea
                  value={newPost.content || ''}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="The quote itself..."
                  rows={3}
                  className="form-input resize-none"
              />
              <input
                  type="text"
                  value={newPost.quote_author || ''}
                  onChange={(e) => setNewPost({...newPost, quote_author: e.target.value})}
                  placeholder="Quote Author"
                  className="form-input"
              />
              </>
            ) : newPost.post_type === 'poll' ? (
              <>
              <textarea
                  value={newPost.content || ''}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Describe your poll..."
                  rows={2}
                  className="form-input resize-none"
              />
              <div className="space-y-2">
                  <label className="font-medium text-[var(--text-main)]">Poll Options</label>
                  {(newPost.poll_options || []).map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                          <input
                              type="text"
                              value={option}
                              onChange={(e) => handlePollOptionChange(index, e.target.value)}
                              placeholder={`Option ${index + 1}`}
                              className="form-input"
                          />
                          {(newPost.poll_options || []).length > 2 && (
                              <button onClick={() => removePollOption(index)} className="btn btn-ghost p-2 text-red-500">
                                  <X className="w-4 h-4" />
                              </button>
                          )}
                      </div>
                  ))}
                  <button onClick={addPollOption} className="btn btn-secondary text-sm">
                      <Plus className="w-4 h-4" /> Add Option
                  </button>
              </div>
              </>
            ) : (
              <textarea
                  value={newPost.content || ''}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Tell your story, ask a question, or share insights..."
                  rows={4}
                  className="form-input resize-none"
              />
            )}

            {/* Tag Members Section */}
            <div className="border-t pt-4">
                 <label className="font-medium text-[var(--text-main)]">Tag Members (Optional)</label>
                 <div className="relative">
                    <input
                        type="text"
                        value={memberSearch}
                        onChange={(e) => {
                            setMemberSearch(e.target.value);
                            setShowMemberDropdown(true);
                        }}
                        onFocus={() => setShowMemberDropdown(true)}
                        onBlur={() => setTimeout(() => setShowMemberDropdown(false), 200)}
                        placeholder="Search to tag a member..."
                        className="form-input mt-1"
                    />
                    {showMemberDropdown && filteredMembers.length > 0 && (
                        <div className="absolute z-10 w-full bg-white dark:bg-gray-800 border rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                            {filteredMembers.map(member => (
                                <div key={member.id} onClick={() => handleTagMember(member)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    {member.full_name} ({member.email})
                                </div>
                            ))}
                        </div>
                    )}
                 </div>
                 <div className="flex flex-wrap gap-2 mt-2">
                    {(newPost.tagged_members || []).map(member => (
                        <div key={member.id} className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm text-[var(--text-main)]">
                            <span>{member.full_name}</span>
                            <button onClick={() => handleRemoveTag(member.id)} className="ml-2 text-gray-500 hover:text-gray-800 dark:hover:text-200">
                                <X className="w-3 h-3"/>
                            </button>
                        </div>
                    ))}
                 </div>
            </div>

            <div className="border-t pt-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-[var(--text-soft)]" />
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="form-input text-sm" accept="image/*" />
                </div>
                 {imagePreview && <img src={imagePreview} alt="Preview" className="max-h-40 rounded-md" />}

                <div className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-[var(--text-soft)]" />
                  <input
                    type="text"
                    value={newPost.video_url || ''}
                    onChange={(e) => setNewPost({...newPost, video_url: e.target.value})}
                    placeholder="YouTube Video Link"
                    className="form-input"
                  />
                </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !newPost.title?.trim() || !newPost.content?.trim()}
                  className="btn btn-primary disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : "Save Post"}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const [user, setUser] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postsWithUserData, setPostsWithUserData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const userData = await User.me();
            setUser(userData);
        } catch (e) {
            console.error("User not found or error fetching user:", e);
        } finally {
            setIsPageLoading(false);
        }
    };
    fetchUser();
  }, []);

  const createPageUrl = useCallback((path) => {
    return `/${path}`;
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const allPosts = await CommunityPost.filter({ status: 'published' }, "-created_date", 50);
      setPosts(allPosts);

      const enrichedPosts = allPosts.map(post => ({
        ...post,
        user_data: {
          full_name: post.author_full_name || post.created_by.split('@')[0],
          profile_picture_url: post.author_profile_picture_url || null,
          email: post.created_by
        }
      }));

      setPostsWithUserData(enrichedPosts);
    } catch (error) {
      console.error("Error loading community data:", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user && !isPageLoading) {
      loadData();
    }
  }, [user, isPageLoading, loadData]);

  const handleSavePost = async (postData, postToEdit) => {
    try {
        if (postToEdit) {
            return await CommunityPost.update(postToEdit.id, postData);
        } else {
            const fullPostData = {
                ...postData,
                author_full_name: user.full_name,
                author_profile_picture_url: user.profile_picture_url,
                author_business_name: user.business_name || (user.role === 'admin' ? 'The Business Minds' : 'Member'),
                author_entrepreneurship_stage: user.entrepreneurship_stage,
                status: 'published'
            };

            const createdPost = await CommunityPost.create(fullPostData);

            if (fullPostData.tagged_members && fullPostData.tagged_members.length > 0) {
                for (const member of fullPostData.tagged_members) {
                    try {
                        await Notification.create({
                            recipient_email: member.email,
                            type: 'general',
                            title: 'You were mentioned in a post',
                            message: `${user.full_name} mentioned you in their post: "${fullPostData.title}"`,
                            link: createPageUrl('Community')
                        });

                        await sendMention({
                            to: member.email,
                            memberName: member.full_name,
                            posterName: user.full_name,
                            postTitle: fullPostData.title,
                            postUrl: `${window.location.origin}${createPageUrl('Community')}`
                        });

                    } catch (error) {
                        console.error(`Failed to notify ${member.email}:`, error);
                    }
                }
            }

            await handleGamification('create_community_post', user.id);

            return createdPost;
        }
    } catch (error) {
        console.error("Error in handleSavePost:", error);
        throw error;
    }
  };

  const handleOpenEdit = (post) => {
    setEditingPost(post);
    setIsPostFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingPost(null);
    setIsPostFormOpen(false);
    loadData();
  };

  const handleLikePost = useCallback(async (postId) => {
    if (!user) return;

    const post = postsWithUserData.find(p => p.id === postId);
    if (!post) return;

    const currentlyLiked = post.liked_by?.includes(user.email);
    const newLikedBy = currentlyLiked
      ? post.liked_by.filter(email => email !== user.email)
      : [...(post.liked_by || []), user.email];

    const newLikesCount = newLikedBy.length;

    setPostsWithUserData(currentPosts =>
      currentPosts.map(p =>
        p.id === postId
          ? { ...p, liked_by: newLikedBy, likes_count: newLikesCount }
          : p
      )
    );

    try {
      await CommunityPost.update(postId, { liked_by: newLikedBy, likes_count: newLikesCount });
    } catch (error) {
      console.error("Error liking post:", error);
      setPostsWithUserData(currentPosts =>
        currentPosts.map(p =>
          p.id === postId
            ? { ...p, liked_by: post.liked_by, likes_count: post.likes_count }
            : p
        )
      );
    }
  }, [user, postsWithUserData]);

  const filteredPosts = useMemo(() => {
    return selectedFilter === "all"
      ? postsWithUserData
      : postsWithUserData.filter(post => post.post_type === selectedFilter);
  }, [postsWithUserData, selectedFilter]);

  const getPostTypeDetails = (type) => {
    return POST_TYPES.find(pt => pt.id === type) || { label: "Post", color: "text-gray-500" };
  };

  if (isPageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-gold)]"></div>
      </div>
    );
  }

  return (
    <SubscriptionGate 
        user={user} 
        requiredLevel="business_hq" 
        feature="our thriving Community Hub"
        customTitle="Join The Business Minds HQ Community"
        customDescription="Connect with 1,000+ entrepreneurs in our exclusive private community. Network, find accountability partners, and accelerate your growth with peer support. Available exclusively to Business Minds HQ members."
        benefits={[
            "Network with 1,000+ verified HQ members",
            "Find accountability partners for consistent progress", 
            "Share wins and challenges with peers who understand",
            "Get real-time feedback on your business ideas",
            "Access live group coaching sessions with Christopher Shaw",
            "Join exclusive member-only events and workshops",
            "Build lasting business relationships and partnerships",
            "Get support and encouragement when challenges arise"
        ]}
        showUpgradeButton={true}
    >
      <div className="px-4 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
                <div className="card p-6 md:p-8 text-center">
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Ready to Join Our Community?</h2>
                    <p className="text-[var(--text-soft)] text-lg mb-6 max-w-2xl mx-auto">
                        The community is where the real magic happens. Connect with fellow entrepreneurs, get accountability partners, and accelerate your growth with peer support.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="https://thebusinessminds.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-primary text-lg px-8 py-4"
                        >
                            🚀 Upgrade to Join the Community
                        </a>
                        <a 
                            href="https://thebusinessminds.com/pricing" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-secondary text-lg px-8 py-4"
                        >
                            View Pricing & Features
                        </a>
                    </div>
                    <p className="text-sm text-[var(--text-soft)] mt-4">
                        ⚡ Use code <strong className="text-[var(--primary-gold)]">LAUNCH30</strong> for 30% off your first month
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card p-6">
                        <h3 className="font-bold text-[var(--text-main)] mb-3">🤝 Find Your Success Partner</h3>
                        <p className="text-[var(--text-soft)] text-sm">Connect with entrepreneurs who share your vision. Get the accountability and support you need to stay on track with your 90-day journey.</p>
                    </div>
                    <div className="card p-6">
                        <h3 className="font-bold text-[var(--text-main)] mb-3">🎯 Live Group Coaching</h3>
                        <p className="text-[var(--text-soft)] text-sm">Join Christopher Shaw for live Q&A sessions every Tuesday & Thursday. Get your questions answered and learn from other entrepreneurs' challenges.</p>
                    </div>
                    <div className="card p-6">
                        <h3 className="font-bold text-[var(--text-main)] mb-3">💡 Real-Time Feedback</h3>
                        <p className="text-[var(--text-soft)] text-sm">Share your ideas, get instant feedback, and refine your strategies with input from experienced entrepreneurs who've been where you are.</p>
                    </div>
                    <div className="card p-6">
                        <h3 className="font-bold text-[var(--text-main)] mb-3">🌟 Celebrate Together</h3>
                        <p className="text-[var(--text-soft)] text-sm">Share your wins, milestones, and breakthroughs. Our community celebrates every success, no matter how small.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </SubscriptionGate>
  );
}