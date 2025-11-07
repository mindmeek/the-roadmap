
import React, { useState, useEffect } from 'react';
import { User, Magazine } from '@/entities/all';
import { UploadFile } from '@/integrations/Core';
import { Newspaper, Download, Eye, Plus, Loader2, X, UploadCloud, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const PdfViewerModal = ({ isOpen, onClose, pdfUrl }) => {
    if (!isOpen) return null;

    // Use Google Docs viewer for more reliable cross-browser PDF embedding
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full h-full max-w-6xl max-h-[95vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-[var(--text-main)]">Magazine Reader</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 p-4">
                    <iframe
                        src={viewerUrl}
                        title="Magazine PDF Viewer"
                        className="w-full h-full border-0 rounded-md"
                        style={{ minHeight: '70vh' }}
                        frameBorder="0"
                    />
                </div>
                <div className="p-4 border-t dark:border-gray-700 text-right">
                    <a 
                        href={pdfUrl} 
                        download 
                        className="btn btn-primary mr-4"
                    >
                        <Download className="w-4 h-4 mr-2"/> Download PDF
                    </a>
                    <button onClick={onClose} className="btn btn-secondary">
                        Close Reader
                    </button>
                </div>
            </div>
        </div>
    );
};

// Moved AdminForm outside of the MagazinePage component to prevent re-renders on every keystroke.
const AdminForm = ({ onClose, onSubmit, issue, setIssue, onFileChange, isSubmitting, uploadingStatus }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full relative">
             <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6">Add New Magazine Issue</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <input type="text" placeholder="Title" value={issue.title} onChange={e => setIssue({...issue, title: e.target.value})} className="form-input" required />
                <div className="grid grid-cols-2 gap-4">
                    <input type="number" placeholder="Issue Number" value={issue.issue_number} onChange={e => setIssue({...issue, issue_number: e.target.value})} className="form-input" required />
                    <input type="date" placeholder="Publication Date" value={issue.publication_date} onChange={e => setIssue({...issue, publication_date: e.target.value})} className="form-input" required />
                </div>
                <textarea placeholder="Description" value={issue.description} onChange={e => setIssue({...issue, description: e.target.value})} className="form-input h-24" required />
                
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                        <label className={`flex justify-center items-center w-full px-4 py-6 rounded-md border-2 border-dashed ${issue.cover_image_url ? 'border-green-500' : 'border-gray-300'} cursor-pointer`}>
                            {uploadingStatus.cover ? <Loader2 className="w-6 h-6 animate-spin text-gray-400"/> : issue.cover_image_url ? <CheckCircle className="w-6 h-6 text-green-500"/> : <UploadCloud className="w-6 h-6 text-gray-400"/>}
                            <span className="ml-2 text-sm">{uploadingStatus.cover ? 'Uploading...' : issue.cover_image_url ? 'Image Uploaded' : 'Upload Cover'}</span>
                            <input type="file" className="hidden" onChange={e => onFileChange(e, 'cover_image_url')} accept="image/*" disabled={uploadingStatus.cover || uploadingStatus.pdf} />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
                        <label className={`flex justify-center items-center w-full px-4 py-6 rounded-md border-2 border-dashed ${issue.pdf_url ? 'border-green-500' : 'border-gray-300'} cursor-pointer`}>
                            {uploadingStatus.pdf ? <Loader2 className="w-6 h-6 animate-spin text-gray-400"/> : issue.pdf_url ? <CheckCircle className="w-6 h-6 text-green-500"/> : <UploadCloud className="w-6 h-6 text-gray-400"/>}
                            <span className="ml-2 text-sm">{uploadingStatus.pdf ? 'Uploading...' : issue.pdf_url ? 'PDF Uploaded' : 'Upload PDF'}</span>
                            <input type="file" className="hidden" onChange={e => onFileChange(e, 'pdf_url')} accept=".pdf" disabled={uploadingStatus.cover || uploadingStatus.pdf}/>
                        </label>
                    </div>
                </div>

                <button type="submit" disabled={isSubmitting || uploadingStatus.cover || uploadingStatus.pdf || !issue.cover_image_url || !issue.pdf_url} className="btn btn-primary w-full disabled:opacity-50">
                    {isSubmitting ? 'Submitting...' : 'Add Issue'}
                </button>
            </form>
        </div>
    </div>
);

export default function MagazinePage() {
    const [user, setUser] = useState(null);
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newIssue, setNewIssue] = useState({
        title: "",
        issue_number: "",
        publication_date: "",
        description: "",
        cover_image_url: "",
        pdf_url: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadingStatus, setUploadingStatus] = useState({ cover: false, pdf: false });
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [pdfToView, setPdfToView] = useState('');
    const [selectedYear, setSelectedYear] = useState('all');


    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [userData, magazineData] = await Promise.all([
                User.me(),
                Magazine.filter({ is_published: true }, '-publication_date')
            ]);
            setUser(userData);
            setMagazines(magazineData);
        } catch (error) {
            console.error("Error loading magazine data:", error);
        }
        setLoading(false);
    };

    const handleFileChange = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const statusKey = field === 'cover_image_url' ? 'cover' : 'pdf';
        setUploadingStatus(prev => ({ ...prev, [statusKey]: true }));

        try {
            const { file_url } = await UploadFile({ file });
            setNewIssue(prev => ({ ...prev, [field]: file_url }));
        } catch (error) {
            console.error('Error uploading file:', error);
            // Optionally, show an error message to the user
        } finally {
            setUploadingStatus(prev => ({ ...prev, [statusKey]: false }));
        }
    };

    const handleAddIssue = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await Magazine.create({ ...newIssue, is_published: true, issue_number: parseInt(newIssue.issue_number) });
            setShowAddForm(false);
            setNewIssue({ title: "", issue_number: "", publication_date: "", description: "", cover_image_url: "", pdf_url: "" });
            await loadData();
        } catch (error) {
            console.error("Error creating new issue:", error);
            // Optionally, set an error message state here
        }
        setIsSubmitting(false);
    };

    const handleReadOnline = (pdfUrl) => {
        setPdfToView(pdfUrl);
        setShowPdfModal(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }
    
    const allYears = [...new Set(magazines.map(m => new Date(m.publication_date).getFullYear()))].sort((a, b) => b - a);

    const filteredMagazines = selectedYear === 'all' 
        ? magazines 
        : magazines.filter(m => new Date(m.publication_date).getFullYear() == selectedYear);
    
    const latestMagazine = filteredMagazines.length > 0 ? filteredMagazines[0] : null;
    const pastIssues = filteredMagazines.slice(1);

    return (
        <div className="px-4 pb-20 md:pb-8">
            <PdfViewerModal 
                isOpen={showPdfModal}
                onClose={() => setShowPdfModal(false)}
                pdfUrl={pdfToView}
            />
            {showAddForm && 
                <AdminForm 
                    onClose={() => setShowAddForm(false)}
                    onSubmit={handleAddIssue}
                    issue={newIssue}
                    setIssue={setNewIssue}
                    onFileChange={handleFileChange}
                    isSubmitting={isSubmitting}
                    uploadingStatus={uploadingStatus}
                />
            }
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="card p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                         <div className="text-center md:text-left md:flex md:items-center md:space-x-4 mb-4 md:mb-0 mx-auto md:mx-0 w-full md:w-auto">
                            <div className="bg-gray-100 p-3 md:p-4 rounded-md mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
                                <Newspaper className="w-6 h-6 md:w-8 md:h-8 text-[var(--primary-gold)]" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl">Business Minds Magazine</h1>
                                <p className="text-[var(--text-soft)] text-base md:text-lg">Exclusive insights, interviews, and strategies.</p>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-2 items-center w-full md:w-auto'>
                             {user && user.role === 'admin' && (
                                <button onClick={() => setShowAddForm(true)} className="btn btn-primary w-full md:w-auto whitespace-nowrap px-6">
                                    <Plus className="w-4 h-4 mr-2" /> Add New Issue
                                </button>
                            )}
                            {allYears.length > 0 && (
                                <select 
                                    value={selectedYear} 
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="form-input text-sm p-2 rounded-md border border-gray-300 w-full md:w-auto"
                                >
                                    <option value="all">All Years</option>
                                    {allYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                     <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-[var(--primary-gold)] p-4">
                        <h3 className="font-bold text-[var(--text-main)]">Why Read Our Magazine?</h3>
                        <ul className="list-disc list-inside mt-2 text-[var(--text-main)] space-y-1">
                            <li><strong>Expert Interviews:</strong> Learn from industry leaders who have built successful businesses.</li>
                            <li><strong>Actionable Strategies:</strong> Get practical, step-by-step guides you can implement immediately.</li>
                            <li><strong>Success Stories:</strong> Be inspired by fellow members and their journeys to success.</li>
                            <li><strong>Market Trends:</strong> Stay ahead of the curve with insights into the latest business trends.</li>
                        </ul>
                    </div>
                </div>

                {/* Latest Issue */}
                {latestMagazine ? (
                    <div className="card lg:grid lg:grid-cols-2 lg:gap-8 p-8">
                        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md p-4">
                             <img src={latestMagazine.cover_image_url} alt={latestMagazine.title} className="max-h-96 object-contain rounded-md shadow-lg" />
                        </div>
                        <div className="mt-8 lg:mt-0">
                            <span className="text-sm font-semibold text-yellow-800 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full">LATEST ISSUE</span>
                            <h2 className="text-4xl font-bold text-[var(--text-main)] mt-4 mb-2">{latestMagazine.title}</h2>
                            <p className="text-lg text-[var(--text-soft)] mb-6">{format(new Date(latestMagazine.publication_date), 'MMMM yyyy')} • Issue #{latestMagazine.issue_number}</p>
                            <p className="text-[var(--text-main)] leading-relaxed mb-8">{latestMagazine.description}</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button 
                                    onClick={() => handleReadOnline(latestMagazine.pdf_url)}
                                    className="btn btn-primary justify-center text-base py-3 px-6"
                                >
                                    <Eye className="w-5 h-5" /> Read Online
                                </button>
                                <a 
                                    href={latestMagazine.pdf_url} 
                                    download 
                                    className="btn btn-secondary justify-center text-base py-3 px-6"
                                >
                                    <Download className="w-5 h-5" /> Download PDF
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                     <div className="card p-12 text-center">
                        <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-[var(--text-main)]">No magazines published for {selectedYear === 'all' ? 'this period' : selectedYear}.</h3>
                        <p className="text-gray-500 dark:text-gray-400">Check back soon or select a different year!</p>
                    </div>
                )}
                
                {/* Past Issues */}
                {pastIssues.length > 0 && (
                    <div className="card p-8">
                        <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Past Issues</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {pastIssues.map(issue => (
                                <div key={issue.id} className="group cursor-pointer" onClick={() => handleReadOnline(issue.pdf_url)}>
                                    <div className="aspect-[3/4] bg-gray-100 rounded-md overflow-hidden mb-3">
                                        <img src={issue.cover_image_url} alt={issue.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                                    </div>
                                    <h3 className="font-semibold text-center">{issue.title}</h3>
                                    <p className="text-sm text-center text-[var(--text-soft)]">{format(new Date(issue.publication_date), 'MMMM yyyy')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
