import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Edit, Printer, Download, Loader2, Tag, Calendar, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ViewSOPPage() {
  const navigate = useNavigate();
  const [sop, setSop] = useState(null);
  const [loading, setLoading] = useState(true);

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

      setSop(sops[0]);
    } catch (error) {
      console.error('Error loading SOP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

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

  if (!sop) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24 lg:pb-8">
      {/* Header - Hidden when printing */}
      <div className="card p-6 mb-6 print:hidden">
        <button
          onClick={() => navigate(createPageUrl('SOPs'))}
          className="btn btn-ghost mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to SOPs
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-main)] mb-2">{sop.title}</h1>
            <p className="text-[var(--text-soft)]">{sop.description}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="btn btn-secondary inline-flex items-center"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </button>
            <button
              onClick={() => navigate(createPageUrl(`EditSOP?id=${sop.id}`))}
              className="btn btn-primary inline-flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="card p-6 mb-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-[var(--text-soft)] mb-1">Status</p>
            <span className={`text-xs px-2 py-1 rounded-full inline-block ${getStatusColor(sop.status)}`}>
              {sop.status}
            </span>
          </div>
          <div>
            <p className="text-xs text-[var(--text-soft)] mb-1">Category</p>
            <p className="text-sm font-semibold text-[var(--text-main)]">{sop.category}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-soft)] mb-1">Version</p>
            <p className="text-sm font-semibold text-[var(--text-main)]">{sop.version}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-soft)] mb-1">Business Level</p>
            <p className="text-sm font-semibold text-[var(--text-main)]">{sop.business_level}</p>
          </div>
        </div>

        {sop.tags && sop.tags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {sop.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-[var(--text-soft)] rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center text-xs text-[var(--text-soft)]">
          <Calendar className="w-4 h-4 mr-2" />
          Last updated: {new Date(sop.updated_date).toLocaleDateString()}
        </div>
      </div>

      {/* Content */}
      <div className="card p-8">
        <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-[var(--text-main)] mb-4 mt-6" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-bold text-[var(--text-main)] mb-3 mt-5" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-bold text-[var(--text-main)] mb-2 mt-4" {...props} />,
              p: ({node, ...props}) => <p className="text-[var(--text-main)] mb-4 leading-relaxed" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2 text-[var(--text-main)]" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2 text-[var(--text-main)]" {...props} />,
              li: ({node, ...props}) => <li className="text-[var(--text-main)] ml-4" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-[var(--text-main)]" {...props} />,
              code: ({node, inline, ...props}) => 
                inline 
                  ? <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm" {...props} />
                  : <code className="block p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-x-auto" {...props} />
            }}
          >
            {sop.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Print-only header */}
      <div className="hidden print:block mb-8">
        <h1 className="text-3xl font-bold mb-2">{sop.title}</h1>
        <p className="text-gray-600 mb-4">{sop.description}</p>
        <div className="flex gap-4 text-sm text-gray-500 mb-4">
          <span>Category: {sop.category}</span>
          <span>Version: {sop.version}</span>
          <span>Status: {sop.status}</span>
        </div>
      </div>
    </div>
  );
}