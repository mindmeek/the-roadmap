import { createClient } from 'npm:@base44/sdk@0.1.0';

const base44 = createClient({
    appId: Deno.env.get('BASE44_APP_ID'),
});

Deno.serve(async (req) => {
    // Set CORS headers
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers });
    }

    try {
        // Parse URL parameters
        const url = new URL(req.url);
        const limit = parseInt(url.searchParams.get('limit')) || 12;
        const category = url.searchParams.get('category') || '';
        const city = url.searchParams.get('city') || '';
        
        console.log('Fetching businesses...');
        
        // Fetch data - using proper authentication
        const adminToken = Deno.env.get('ADMIN_TOKEN');
        base44.auth.setToken(adminToken);
        
        const [allBusinesses, allMembers] = await Promise.all([
            base44.entities.Business.filter({ is_publicly_listed: true }, '-created_date'),
            base44.entities.BusinessMember.list('-created_date', 1000)
        ]);

        console.log(`Found ${allBusinesses.length} public businesses`);

        // Filter businesses
        let filteredBusinesses = allBusinesses.slice(0, limit);
        if (category) {
            filteredBusinesses = filteredBusinesses.filter(b => 
                b.industry?.toLowerCase().includes(category.toLowerCase())
            );
        }
        if (city) {
            filteredBusinesses = filteredBusinesses.filter(b => 
                b.city?.toLowerCase().includes(city.toLowerCase())
            );
        }

        // Add member counts
        const businessesWithData = filteredBusinesses.map(business => {
            const memberCount = allMembers.filter(member => member.business_id === business.id).length;
            return { ...business, memberCount };
        });

        // Generate HTML response
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Business Minds Directory</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f9fafb;
            color: #1f2937;
        }
        .directory-container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .directory-header {
            text-align: center;
            margin-bottom: 40px;
        }
        .directory-title {
            font-size: 2.5rem;
            font-weight: 900;
            margin-bottom: 16px;
            background: linear-gradient(135deg, #8B6F4E, #D4A574);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .directory-subtitle {
            font-size: 1.125rem;
            color: #6b7280;
            margin-bottom: 24px;
        }
        .powered-by {
            font-size: 0.875rem;
            color: #8B6F4E;
        }
        .powered-by a {
            color: #8B6F4E;
            text-decoration: none;
            font-weight: 600;
        }
        .business-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 24px;
            margin-bottom: 40px;
        }
        .business-card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 1px solid #e5e7eb;
        }
        .business-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            border-color: #8B6F4E;
        }
        .business-header {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 16px;
        }
        .business-logo {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            object-fit: cover;
            flex-shrink: 0;
        }
        .business-info h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 4px;
        }
        .business-tagline {
            font-size: 0.875rem;
            color: #6b7280;
            line-height: 1.4;
        }
        .business-description {
            font-size: 0.875rem;
            color: #6b7280;
            line-height: 1.6;
            margin-bottom: 16px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .business-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 20px;
        }
        .business-badge {
            background: #dbeafe;
            color: #1e40af;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 4px 8px;
            border-radius: 999px;
        }
        .business-location {
            font-size: 0.75rem;
            color: #6b7280;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .business-actions {
            display: flex;
            gap: 12px;
        }
        .btn-primary {
            background: #8B6F4E;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 600;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        .btn-primary:hover {
            background: #7A5F42;
            transform: translateY(-1px);
        }
        .btn-secondary {
            background: white;
            color: #8B6F4E;
            border: 1px solid #8B6F4E;
            padding: 8px 16px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 600;
            transition: all 0.2s ease;
        }
        .btn-secondary:hover {
            background: #8B6F4E;
            color: white;
        }
        .empty-state {
            text-align: center;
            padding: 60px 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .empty-state h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 12px;
        }
        .empty-state p {
            color: #6b7280;
            margin-bottom: 24px;
        }
        @media (max-width: 768px) {
            .directory-title {
                font-size: 2rem;
            }
            .business-grid {
                grid-template-columns: 1fr;
            }
            .business-actions {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="directory-container">
        <div class="directory-header">
            <h1 class="directory-title">Business Minds Directory</h1>
            <p class="directory-subtitle">Discover amazing businesses from our entrepreneurial community</p>
            <div class="powered-by">
                Powered by <a href="https://thebminds.com" target="_blank">The Business Minds</a>
            </div>
        </div>
        
        ${businessesWithData.length > 0 ? `
            <div class="business-grid">
                ${businessesWithData.map(business => `
                    <div class="business-card">
                        <div class="business-header">
                            <img src="${business.logo_url || 'https://via.placeholder.com/60x60/8B6F4E/FFFFFF?text=' + encodeURIComponent(business.name.charAt(0))}" 
                                 alt="${business.name}" class="business-logo">
                            <div class="business-info">
                                <h3>${business.name}</h3>
                                ${business.tagline ? `<p class="business-tagline">${business.tagline}</p>` : ''}
                            </div>
                        </div>
                        
                        ${business.description ? `<p class="business-description">${business.description}</p>` : ''}
                        
                        <div class="business-meta">
                            ${business.industry ? `<span class="business-badge">${business.industry}</span>` : ''}
                            ${business.city ? `<span class="business-location">📍 ${business.city}</span>` : ''}
                            ${business.memberCount > 1 ? `<span class="business-location">👥 ${business.memberCount} members</span>` : ''}
                        </div>
                        
                        <div class="business-actions">
                            <a href="https://app.thebminds.com/BusinessProfile?id=${business.id}" 
                               target="_blank" class="btn-primary">
                                View Profile
                            </a>
                            ${business.website_url ? `<a href="${business.website_url}" target="_blank" class="btn-secondary">Visit Website</a>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : `
            <div class="empty-state">
                <h3>No Businesses Found</h3>
                <p>There are currently no businesses listed in our directory${category || city ? ' that match your criteria' : ''}.</p>
                <a href="https://app.thebminds.com/Upgrade" target="_blank" class="btn-primary">
                    🚀 Join Our Community
                </a>
            </div>
        `}
    </div>
</body>
</html>`;

        headers.set('Content-Type', 'text/html; charset=utf-8');
        return new Response(html, { status: 200, headers });

    } catch (error) {
        console.error('Directory embed error:', error);
        headers.set('Content-Type', 'text/html; charset=utf-8');
        return new Response(`
            <!DOCTYPE html>
            <html>
            <head><title>Directory Error</title></head>
            <body>
                <div style="padding: 40px; text-align: center; font-family: Arial, sans-serif;">
                    <h2 style="color: #dc2626;">Directory Temporarily Unavailable</h2>
                    <p style="color: #6b7280;">We're experiencing technical difficulties. Please try again later.</p>
                    <p style="font-size: 0.875rem; color: #9ca3af;">Error: ${error.message}</p>
                </div>
            </body>
            </html>
        `, { status: 500, headers });
    }
});