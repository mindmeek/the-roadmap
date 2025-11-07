
import React, { useState, useEffect, useRef, useCallback } from "react";
import { User, CommunityPost, Notification, Comment } from "@/entities/all";
import { sendMention } from "@/functions/sendMention";
import { UploadFile } from "@/integrations/Core";
import { handleGamification } from '@/functions/handleGamification';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Heart, MessageCircle, Users, Edit3, Image as ImageIcon, Video, X, Loader2, Quote, BarChartHorizontal, Crown } from "lucide-react";

// Helper function to get embeddable video URL
const getEmbedUrl = (url) => {
  if (!url) return null;

  // YouTube
  const youtubeMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/);
  if (youtubeMatch && youtubeMatch[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  // Vimeo
  const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/(?:video\/|)(\d+)(?:\S+)?/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null;
};

const POST_TYPES = [
  { id: "milestone", label: "Milestone", color: "text-[var(--primary-gold)]" },
  { id: "question", label: "Question", color: "text-blue-600" },
  { id: "resource", label: "Resource", color: "text-green-600" },
  { id: "celebration", label: "Celebration", color: "text-purple-600" },
  { id: "accountability", label: "Accountability", color: "text-orange-600" },
  { id: "poll", label: "Poll", color: "text-cyan-600" },
  { id: "quote", label: "Quote", color: "text-indigo-600" },
];

const MemberTagging = ({ content, onContentChange, onMemberTag }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [tagPosition, setTagPosition] = useState({ start: 0, end: 0 });
  const textareaRef = useRef(null);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    const cursorPosition = e.target.selectionStart;
    
    onContentChange(value);

    const textBeforeCursor = value.substring(0, cursorPosition);
    const atMatch = textBeforeCursor.match(/@(\w*)$/);
    
    if (atMatch) {
      const query = atMatch[1];
      setTagPosition({
        start: cursorPosition - atMatch[0].length,
        end: cursorPosition
      });
      
      if (query.length >= 0) {
        try {
          const users = await User.list('-created_date', 20);
          const filteredUsers = users.filter(user => 
            user.full_name && 
            user.full_name.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 5);
          
          setSuggestions(filteredUsers);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching users:', error);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (user) => {
    const beforeTag = content.substring(0, tagPosition.start);
    const afterTag = content.substring(tagPosition.end);
    const newContent = `${beforeTag}@${user.full_name} ${afterTag}`;
    
    onContentChange(newContent);
    onMemberTag(user);
    setShowSuggestions(false);
    
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newPosition = beforeTag.length + user.full_name.length + 2; 
        textareaRef.current.setSelectionRange(newPosition, newPosition);
      }
    }, 0);
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleInputChange}
        placeholder="Tell your story, ask a question, or share insights... (Use @ to tag members)"
        rows={4}
        className="form-input resize-none w-full"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg mt-1 max-h-48 w-full overflow-y-auto">
          {suggestions.map((user) => (
            <button
              key={user.id}
              onClick={() => handleSuggestionClick(user)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
            >
              <img
                src={user.profile_picture_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || 'N A')}&background=E5E7EB&color=6B7280`}
                alt={user.full_name || 'N/A'}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-[var(--text-main)]">{user.full_name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

function PostForm({ isOpen, onClose, onSave, currentUser, editingPost, customFooter }) {
  const [newPost, setNewPost] = useState(() => ({
    title: "",
    content: "",
    post_type: "milestone",
    tags: [],
    image_url: "",
    video_url: "",
    quote_author: "",
    poll_options: ["", ""],
    tagged_members: []
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingPost) {
      setNewPost({
        id: editingPost.id,
        title: editingPost.title || "",
        content: editingPost.content || "",
        post_type: editingPost.post_type || "milestone",
        tags: editingPost.tags || [],
        image_url: editingPost.image_url || "",
        video_url: editingPost.video_url || "",
        quote_author: editingPost.quote_author || "",
        poll_options: editingPost.poll_options ? editingPost.poll_options.map(opt => typeof opt === 'string' ? opt : opt.option) : ["", ""],
        tagged_members: editingPost.tagged_members || []
      });
    } else {
      setNewPost({
        title: "",
        content: "",
        post_type: "milestone",
        tags: [],
        image_url: "",
        video_url: "",
        quote_author: "",
        poll_options: ["", ""],
        tagged_members: []
      });
    }
  }, [editingPost, isOpen]); // Reset state when opening or when editingPost changes

  const handleInputChange = useCallback((field, value) => {
    setNewPost(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsSubmitting(true);
    try {
      const { file_url } = await UploadFile({ file });
      handleInputChange('image_url', file_url);
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handlePollOptionChange = useCallback((index, value) => {
    setNewPost(prev => {
      const updatedOptions = [...prev.poll_options];
      updatedOptions[index] = value;
      return { ...prev, poll_options: updatedOptions };
    });
  }, []);

  const addPollOption = useCallback(() => {
    setNewPost(prev => ({ ...prev, poll_options: [...prev.poll_options, ""] }));
  }, []);

  const removePollOption = useCallback((index) => {
    setNewPost(prev => {
      const updatedOptions = prev.poll_options.filter((_, i) => i !== index);
      return { ...prev, poll_options: updatedOptions.length > 1 ? updatedOptions : ["", ""] };
    });
  }, []);

  const handleTagMember = useCallback((memberUser) => {
    setNewPost(prev => {
      if (!prev.tagged_members.some(m => m.id === memberUser.id)) {
        return { ...prev, tagged_members: [...prev.tagged_members, memberUser] };
      }
      return prev;
    });
  }, []);

  const handleRemoveTag = useCallback((memberId) => {
    setNewPost(prev => ({
      ...prev,
      tagged_members: prev.tagged_members.filter(m => m.id !== memberId)
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.content.trim() || !currentUser || !onSave) return;

    setIsSubmitting(true);
    try {
      const postData = {
        title: newPost.title.trim() || `${newPost.post_type.charAt(0).toUpperCase() + newPost.post_type.slice(1)} by ${currentUser.full_name}`,
        content: newPost.content.trim(),
        post_type: newPost.post_type,
        tags: newPost.tags,
        image_url: newPost.image_url,
        video_url: newPost.video_url,
        tagged_members: newPost.tagged_members
      };

      if (newPost.post_type === 'quote' && newPost.quote_author.trim()) {
        postData.quote_author = newPost.quote_author.trim();
      }

      if (newPost.post_type === 'poll') {
        const validPollOptions = newPost.poll_options.filter(opt => opt.trim());
        if (validPollOptions.length < 2) {
          alert("Polls must have at least two options.");
          setIsSubmitting(false);
          return;
        }
        postData.poll_options = validPollOptions;
        // When creating a new poll, initialize poll_votes and voters
        if (!editingPost) {
          postData.poll_votes = validPollOptions.map(option => ({
            option: option.trim(),
            votes: 0
          }));
          postData.voters = [];
        }
      }

      // Delegate saving to the parent component and get the saved post back
      const savedPost = await onSave(postData, editingPost);

      // Send notifications for mentions, now that we have a confirmed saved post ID
      if (newPost.tagged_members.length > 0 && savedPost?.id) {
        try {
          for (const member of newPost.tagged_members) {
            await sendMention({
              member_id: member.id,
              post_id: savedPost.id,
              user_id: currentUser.id
            });
          }
        } catch (error) {
          console.error('Error sending mention notifications:', error);
        }
      }
      
      if (!editingPost && savedPost?.id) { // Only award XP for new posts
        await handleGamification({ action: 'CREATE_POST' });
      }

      onClose(); // Parent handles closing and refreshing
    } catch (error) {
      console.error('Error creating/updating post:', error);
      alert('Failed to save post. Please check your input and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 md:p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">{editingPost ? "Edit Post" : "Share Something New"}</h2>
        <div className="space-y-4">
          <select
            value={newPost.post_type}
            onChange={(e) => handleInputChange('post_type', e.target.value)}
            className="form-input py-2"
          >
            {POST_TYPES.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>

          <input
            type="text"
            value={newPost.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Post Title (optional)"
            className="form-input text-lg font-medium"
          />
          
          {newPost.post_type === 'quote' ? (
            <>
              <Textarea
                value={newPost.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="The quote itself..."
                rows={3}
                className="form-input resize-none"
              />
              <input
                type="text"
                value={newPost.quote_author}
                onChange={(e) => handleInputChange('quote_author', e.target.value)}
                placeholder="Quote Author"
                className="form-input"
              />
            </>
          ) : newPost.post_type === 'poll' ? (
            <>
              <MemberTagging
                content={newPost.content}
                onContentChange={(content) => handleInputChange('content', content)}
                onMemberTag={handleTagMember}
              />
              <div className="space-y-2">
                <label className="font-medium text-[var(--text-main)]">Poll Options</label>
                {newPost.poll_options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handlePollOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="form-input"
                    />
                    {newPost.poll_options.length > 2 && (
                      <button type="button" onClick={() => removePollOption(index)} className="btn btn-ghost p-2 text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <Button type="button" onClick={addPollOption} className="btn btn-secondary text-sm">
                  <Plus className="w-4 h-4" /> Add Option
                </Button>
              </div>
            </>
          ) : (
            <MemberTagging
              content={newPost.content}
              onContentChange={(content) => handleInputChange('content', content)}
              onMemberTag={handleTagMember}
            />
          )}
          
          {newPost.tagged_members.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-[var(--text-soft)]">Tagged:</span>
              {newPost.tagged_members.map(member => (
                <span key={member.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <img
                    src={member.profile_picture_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name || 'N A')}&background=E5E7EB&color=6B7280`}
                    alt={member.full_name || 'N/A'}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  @{member.full_name}
                  <button type="button" onClick={() => handleRemoveTag(member.id)} className="ml-1 text-blue-800 hover:text-blue-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          
          <div className="border-t pt-4 space-y-4">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-[var(--text-soft)]" />
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="form-input text-sm" accept="image/*" />
              {newPost.image_url && (
                <button type="button" onClick={() => { handleInputChange('image_url', ''); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="btn btn-ghost p-1 text-red-500">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {newPost.image_url && <img src={newPost.image_url} alt="Preview" className="max-h-40 rounded-md object-cover" />}
            
            <div className="flex items-center space-x-2">
              <Video className="w-5 h-5 text-[var(--text-soft)]" />
              <input
                type="text"
                value={newPost.video_url}
                onChange={(e) => handleInputChange('video_url', e.target.value)}
                placeholder="YouTube or Vimeo Video Link (optional)"
                className="form-input"
              />
              {newPost.video_url && (
                <button type="button" onClick={() => handleInputChange('video_url', '')} className="btn btn-ghost p-1 text-red-500">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {customFooter}

          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button type="button" onClick={onClose} variant="ghost" className="text-gray-500 hover:text-gray-700">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting || !newPost.content.trim()}
              className="btn btn-primary disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : "Save Post"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
