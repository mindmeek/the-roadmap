import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Building, Plus, Edit, Loader2, ArrowRight, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MyBusinesses() {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadBusinesses();
    }, []);

    const loadBusinesses = async () => {
        try {
            const currentUser = await base44.auth.me();
            setUser(currentUser);
            const data = await base44.entities.Business.filter({ owner_user_id: currentUser.id }, '-updated_date', 20);
            setBusinesses(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            const newBusiness = await base44.entities.Business.create({
                name: 'My New Business',
                owner_user_id: user.id,
            });
            navigate(createPageUrl('BusinessOverview'));
        } catch (e) {
            console.error(e);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-main)]">My Businesses</h1>
                    <p className="text-[var(--text-soft)] mt-1">Manage your business profiles</p>
                </div>
                <Button onClick={handleCreate} className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    New Business
                </Button>
            </div>

            {businesses.length === 0 ? (
                <div className="card p-12 text-center">
                    <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-[var(--text-main)] mb-2">No businesses yet</h2>
                    <p className="text-[var(--text-soft)] mb-6">Create your first business profile to get started.</p>
                    <Button onClick={handleCreate} className="btn-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Business
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {businesses.map(business => (
                        <div key={business.id} className="card p-6 flex items-center gap-6">
                            {business.logo_url ? (
                                <img src={business.logo_url} alt={business.name} className="w-16 h-16 object-contain rounded-md border border-gray-200 dark:border-gray-700 flex-shrink-0" />
                            ) : (
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center flex-shrink-0">
                                    <Building className="w-8 h-8 text-gray-400" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-[var(--text-main)]">{business.name}</h3>
                                {business.tagline && <p className="text-sm text-[var(--primary-gold)]">{business.tagline}</p>}
                                {business.industry && <p className="text-sm text-[var(--text-soft)]">{business.industry}</p>}
                                <div className="flex flex-wrap gap-3 mt-2 text-xs text-[var(--text-soft)]">
                                    {business.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{business.city}</span>}
                                    {business.public_email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{business.public_email}</span>}
                                    {business.website_url && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{business.website_url}</span>}
                                </div>
                            </div>
                            <Link to={createPageUrl('BusinessOverview')}>
                                <Button variant="outline" size="sm">
                                    <ArrowRight className="w-4 h-4 mr-2" />
                                    Manage
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}