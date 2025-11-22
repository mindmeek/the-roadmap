import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Plus, 
  Search, 
  FileText, 
  Filter, 
  Archive, 
  CheckCircle, 
  Edit, 
  Trash2, 
  Loader2,
  BookOpen,
  Tag,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function SOPsPage() {
  const navigate = useNavigate();
  const [sops, setSops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    loadSOPs();
  }, []);

  const loadSOPs = async () => {
    try {
      const data = await base44.entities.SOP.list('-updated_date', 100);
      setSops(data);
    } catch (error) {
      console.error('Error loading SOPs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await base44.entities.SOP.delete(id);
      setSops(sops.filter(sop => sop.id !== id));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting SOP:', error);
    }
  };

  const filteredSOPs = sops.filter(sop => {
    const matchesSearch = sop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sop.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sop.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || sop.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || sop.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['All', 'Operations', 'Marketing', 'Sales', 'Customer Service', 'Finance', 'HR', 'Product', 'Other'];
  const statuses = ['All', 'Draft', 'Active', 'Archived'];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-main)] mb-2">Standard Operating Procedures</h1>
            <p className="text-[var(--text-soft)]">Create, manage, and organize your business SOPs with AI assistance</p>
          </div>
          <button
            onClick={() => navigate(createPageUrl('CreateSOP'))}
            className="btn btn-primary inline-flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create SOP
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search SOPs by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)] bg-white dark:bg-gray-800 text-[var(--text-main)]"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)] bg-white dark:bg-gray-800 text-[var(--text-main)]"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)] bg-white dark:bg-gray-800 text-[var(--text-main)]"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status === 'All' ? 'All Status' : status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* AI Suggestion Banner */}
      <div className="card p-4 mb-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--primary-gold)] p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--text-main)] text-sm">AI-Powered SOP Creation</h3>
            <p className="text-xs text-[var(--text-soft)]">Describe your process and let AI generate a complete SOP for you in seconds</p>
          </div>
        </div>
      </div>

      {/* SOPs Grid */}
      {filteredSOPs.length === 0 ? (
        <div className="card p-12 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
            {searchTerm || categoryFilter !== 'All' || statusFilter !== 'All' 
              ? 'No SOPs Found' 
              : 'No SOPs Yet'}
          </h3>
          <p className="text-[var(--text-soft)] mb-6">
            {searchTerm || categoryFilter !== 'All' || statusFilter !== 'All'
              ? 'Try adjusting your filters or search terms'
              : 'Create your first SOP to standardize your business processes'}
          </p>
          {!searchTerm && categoryFilter === 'All' && statusFilter === 'All' && (
            <button
              onClick={() => navigate(createPageUrl('CreateSOP'))}
              className="btn btn-primary inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First SOP
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSOPs.map(sop => (
            <div key={sop.id} className="card hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[var(--text-main)] mb-1">{sop.title}</h3>
                    <p className="text-sm text-[var(--text-soft)] line-clamp-2">{sop.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(sop.status)}`}>
                    {sop.status}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {sop.category}
                  </span>
                  {sop.business_level && sop.business_level !== 'All Levels' && (
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      {sop.business_level}
                    </span>
                  )}
                </div>

                {sop.tags && sop.tags.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <div className="flex flex-wrap gap-1">
                      {sop.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-xs text-[var(--text-soft)]">
                          #{tag}
                        </span>
                      ))}
                      {sop.tags.length > 3 && (
                        <span className="text-xs text-[var(--text-soft)]">+{sop.tags.length - 3}</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center text-xs text-[var(--text-soft)] mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  Updated {new Date(sop.updated_date).toLocaleDateString()}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(createPageUrl(`ViewSOP?id=${sop.id}`))}
                    className="flex-1 btn btn-secondary text-sm"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    View
                  </button>
                  <button
                    onClick={() => navigate(createPageUrl(`EditSOP?id=${sop.id}`))}
                    className="btn btn-ghost text-sm p-2"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(sop.id)}
                    className="btn btn-ghost text-sm p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">Delete SOP?</h3>
            <p className="text-[var(--text-soft)] mb-6">
              Are you sure you want to delete this SOP? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 btn bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}