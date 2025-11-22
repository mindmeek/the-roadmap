import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Save, Sparkles, Loader2, Wand2 } from 'lucide-react';

export default function CreateSOPPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Operations',
    content: '',
    tags: '',
    status: 'Draft',
    version: '1.0',
    business_level: 'All Levels'
  });
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const sopData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
      };
      await base44.entities.SOP.create(sopData);
      navigate(createPageUrl('SOPs'));
    } catch (error) {
      console.error('Error creating SOP:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    
    setGenerating(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a detailed Standard Operating Procedure (SOP) based on the following description: "${aiPrompt}"

Please format the SOP with:
1. Clear step-by-step instructions
2. Numbered steps for the main process
3. Sub-steps where needed (use letters: a, b, c)
4. Clear roles and responsibilities
5. Expected outcomes
6. Quality checkpoints
7. Common troubleshooting tips

Make it professional, actionable, and easy to follow.`,
        add_context_from_internet: false
      });

      setFormData(prev => ({
        ...prev,
        content: response
      }));
      setAiPrompt('');
    } catch (error) {
      console.error('Error generating SOP:', error);
    } finally {
      setGenerating(false);
    }
  };

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

        <h1 className="text-3xl font-bold text-[var(--text-main)] mb-2">Create New SOP</h1>
        <p className="text-[var(--text-soft)]">Document your business processes with AI assistance</p>
      </div>

      {/* AI Generation Section */}
      <div className="card p-6 mb-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-[var(--primary-gold)] p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-[var(--text-main)] mb-1">AI SOP Generator</h3>
            <p className="text-sm text-[var(--text-soft)] mb-3">
              Describe the process you want to document, and AI will generate a complete SOP for you
            </p>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Example: Create an SOP for onboarding new customers, including account setup, initial consultation, and first delivery..."
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)] bg-white dark:bg-gray-800 text-[var(--text-main)] mb-3"
              rows="4"
            />
            <button
              onClick={handleAIGenerate}
              disabled={!aiPrompt.trim() || generating}
              className="btn btn-primary inline-flex items-center"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate SOP with AI
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SOP Form */}
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
              placeholder="e.g., Customer Onboarding Process"
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
              placeholder="Brief overview of what this SOP covers..."
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
              placeholder="1.0"
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
              placeholder="e.g., onboarding, customer-facing, priority"
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
              placeholder="Write or paste your SOP content here, or use AI generation above..."
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
                Create SOP
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}