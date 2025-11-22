import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

export default function EditSOPPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSOP();
  }, []);

  const loadSOP = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const sopId = urlParams.get('id');
      if (!sopId) {
        navigate(createPageUrl('SOPs'));
        return;
      }

      const sops = await base44.entities.SOP.filter({ id: sopId });
      if (sops.length === 0) {
        navigate(createPageUrl('SOPs'));
        return;
      }

      const sop = sops[0];
      setFormData({
        title: sop.title,
        description: sop.description || '',
        category: sop.category,
        content: sop.content,
        tags: sop.tags?.join(', ') || '',
        status: sop.status,
        version: sop.version,
        business_level: sop.business_level,
        id: sop.id
      });
    } catch (error) {
      console.error('Error loading SOP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const sopData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        content: formData.content,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        status: formData.status,
        version: formData.version,
        business_level: formData.business_level
      };
      await base44.entities.SOP.update(formData.id, sopData);
      navigate(createPageUrl('SOPs'));
    } catch (error) {
      console.error('Error updating SOP:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
      </div>
    );
  }

  if (!formData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24 lg:pb-8">
      <div className="card p-6 mb-6">
        <button
          onClick={() => navigate(createPageUrl('SOPs'))}
          className="btn btn-ghost mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to SOPs
        </button>

        <h1 className="text-3xl font-bold text-[var(--text-main)] mb-2">Edit SOP</h1>
        <p className="text-[var(--text-soft)]">Update your standard operating procedure</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">
              SOP Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)] bg-white dark:bg-gray-800 text-[var(--text-main)]"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)] bg-white dark:bg-gray-800 text-[var(--text-main)]"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)] bg-white dark:bg-gray-800 text-[var(--text-main)]"
              required
            >
              <option value="Operations">Operations</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="Product">Product</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">
              Business Level
            </label>
            <select
              value={formData.business_level}
              onChange={(e) => setFormData({...formData, business_level: e.target.value})}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)] bg-white dark:bg-gray-800 text-[var(--text-main)]"
            >
              <option value="All Levels">All Levels</option>
              <option value="Startup">Startup</option>
              <option value="Growing">Growing</option>
              <option value="Established">Established</option>
              <option value="Scaling">Scaling</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)] bg-white dark:bg-gray-800 text-[var(--text-main)]"
            >
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">
              Version
            </label>
            <input
              type="text"
              value={formData.version}
              onChange={(e) => setFormData({...formData, version: e.target.value})}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)] bg-white dark:bg-gray-800 text-[var(--text-main)]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)] bg-white dark:bg-gray-800 text-[var(--text-main)]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">
              SOP Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)] bg-white dark:bg-gray-800 text-[var(--text-main)] font-mono text-sm"
              rows="20"
              required
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate(createPageUrl('SOPs'))}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary inline-flex items-center"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}