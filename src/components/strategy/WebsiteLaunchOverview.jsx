import React from 'react';
import { Globe, Layout, FileText } from 'lucide-react';

function Section({ title, value }) {
    if (!value || !value.trim()) return null;
    return (
        <div className="card p-4">
            <h4 className="font-bold text-xs uppercase tracking-wide text-[var(--primary-gold)] mb-2">{title}</h4>
            <p className="text-sm text-[var(--text-soft)] leading-relaxed">{value}</p>
        </div>
    );
}

export default function WebsiteLaunchOverview({ formData }) {
    const hasData = formData.domain_name || formData.website_goals || formData.homepage_headline;

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <Globe className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Website Plan Defined Yet</p>
                <p className="text-sm">Fill out the form and save to see your website plan here.</p>
            </div>
        );
    }

    const pages = formData.target_pages?.filter(p => p?.trim()) || [];
    const brandColors = formData.brand_colors?.filter(c => c?.trim()) || [];

    return (
        <div className="space-y-6">
            {/* Hero */}
            <div className="card overflow-hidden">
                <div className="h-16 bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500" />
                <div className="px-6 pb-5">
                    <div className="flex items-end gap-4 -mt-7 mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                            <Globe className="w-7 h-7 text-white" />
                        </div>
                    </div>
                    {formData.domain_name && <h2 className="text-xl font-bold text-[var(--text-main)]">{formData.domain_name}</h2>}
                    {formData.hosting_platform && <p className="text-sm text-[var(--primary-gold)] font-medium">Platform: {formData.hosting_platform}</p>}
                    {formData.website_goals && <p className="text-sm text-[var(--text-soft)] mt-1">{formData.website_goals}</p>}
                </div>
            </div>

            {/* Homepage Copy */}
            {(formData.homepage_headline || formData.homepage_subheadline || formData.call_to_action) && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Homepage Copy
                    </h4>
                    {formData.homepage_headline && (
                        <div className="mb-3">
                            <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Headline</p>
                            <p className="text-lg font-bold text-[var(--text-main)]">"{formData.homepage_headline}"</p>
                        </div>
                    )}
                    {formData.homepage_subheadline && (
                        <div className="mb-3">
                            <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Subheadline</p>
                            <p className="text-sm text-[var(--text-main)]">{formData.homepage_subheadline}</p>
                        </div>
                    )}
                    {formData.call_to_action && (
                        <div className="mt-3">
                            <span className="inline-block px-4 py-2 bg-[var(--primary-gold)] text-white rounded font-semibold text-sm">
                                {formData.call_to_action}
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Site Pages */}
            {pages.length > 0 && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-3 flex items-center gap-2">
                        <Layout className="w-4 h-4" /> Site Pages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {pages.map((p, i) => (
                            <span key={i} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm border border-blue-200 dark:border-blue-700">{p}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Key Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Section title="About Page" value={formData.about_page_content} />
                <Section title="Services/Products" value={formData.services_description} />
                <Section title="Contact Information" value={formData.contact_information} />
                <Section title="SEO Keywords" value={formData.seo_keywords} />
            </div>

            {/* Visual & Launch */}
            {(brandColors.length > 0 || formData.launch_timeline || formData.success_metrics) && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-3">Design & Launch</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {brandColors.length > 0 && (
                            <div>
                                <p className="text-xs font-semibold text-[var(--text-soft)] mb-2">Brand Colors</p>
                                <div className="flex flex-wrap gap-2">
                                    {brandColors.map((c, i) => (
                                        <div key={i} className="flex items-center gap-1">
                                            {c.startsWith('#') && <div className="w-4 h-4 rounded border border-gray-200" style={{ backgroundColor: c }} />}
                                            <span className="text-xs text-[var(--text-soft)]">{c}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {formData.launch_timeline && (
                            <div>
                                <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Launch Timeline</p>
                                <p className="text-sm text-[var(--text-main)]">{formData.launch_timeline}</p>
                            </div>
                        )}
                        {formData.success_metrics && (
                            <div>
                                <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Success Metrics</p>
                                <p className="text-sm text-[var(--text-main)]">{formData.success_metrics}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}