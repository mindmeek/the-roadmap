import React, { useState, useEffect } from 'react';
import { Magazine as MagazineEntity } from '@/entities/all';
import { Loader2, Download, Newspaper } from 'lucide-react';
import moment from 'moment';

export default function MagazinePage() {
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMagazines();
    }, []);

    const loadMagazines = async () => {
        try {
            const published = await MagazineEntity.filter({ is_published: true }, '-publication_date');
            setMagazines(published);
        } catch (error) {
            console.error('Error loading magazines:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="card p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 p-4 rounded-lg">
                            <Newspaper className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-main)]">The Business Minds Magazine</h1>
                            <p className="text-[var(--text-soft)]">Monthly insights and strategies for entrepreneurs</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Users className="w-6 h-6 text-blue-600" />
                            Access All Issues in The Community
                        </h2>
                        <p className="text-[var(--text-soft)] mb-4">
                            Get exclusive access to all past and current magazine issues, bonus content, and member discussions in our community platform.
                        </p>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                            <p className="text-sm text-[var(--text-main)] mb-2">
                                <strong>How to Access:</strong>
                            </p>
                            <ol className="text-sm text-[var(--text-soft)] space-y-2 ml-4">
                                <li>1. Login to The Business Minds Community</li>
                                <li>2. Click on the <strong>"Magazine Channel"</strong> in the left-hand menu</li>
                                <li>3. Browse all issues, download PDFs, and engage with other members</li>
                            </ol>
                        </div>
                        <a 
                            href="https://thebminds.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-primary mt-4 inline-flex items-center"
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Access Magazine in Community
                        </a>
                    </div>
                </div>

                {magazines.length === 0 ? (
                    <div className="card p-12 text-center">
                        <Newspaper className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">No Magazines Yet</h3>
                        <p className="text-[var(--text-soft)]">Check back soon for our latest issues!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {magazines.map((mag) => (
                            <div key={mag.id} className="card overflow-hidden hover:shadow-xl transition-shadow">
                                {mag.cover_image_url && (
                                    <img
                                        src={mag.cover_image_url}
                                        alt={mag.title}
                                        className="w-full h-64 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs px-3 py-1 bg-[var(--primary-gold)] text-white rounded-full">
                                            Issue #{mag.issue_number}
                                        </span>
                                        <span className="text-xs text-[var(--text-soft)]">
                                            {moment(mag.publication_date).format('MMM YYYY')}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                                        {mag.title}
                                    </h3>
                                    <p className="text-sm text-[var(--text-soft)] mb-4">
                                        {mag.description}
                                    </p>
                                    <a
                                        href={mag.pdf_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary w-full"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Read Magazine
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}