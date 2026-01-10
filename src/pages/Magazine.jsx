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