import React, { useState, useEffect } from 'react';
import { StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { FileText, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

const StrategyIntegration = ({ 
    requiredDocType, 
    title, 
    description, 
    fields = [],
    className = "",
    showTitle = true
}) => {
    const [strategyDoc, setStrategyDoc] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStrategyDoc = async () => {
            try {
                const docs = await StrategyDocument.filter({ document_type: requiredDocType }, '-created_date', 1);
                if (docs.length > 0) {
                    setStrategyDoc(docs[0]);
                }
            } catch (error) {
                console.error('Error loading strategy document:', error);
            } finally {
                setLoading(false);
            }
        };
        loadStrategyDoc();
    }, [requiredDocType]);

    if (loading) {
        return (
            <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
        );
    }

    const hasDocument = strategyDoc && strategyDoc.is_completed;

    if (!hasDocument) {
        // Show prompt to create/complete the strategy document
        return (
            <div className={`bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-lg p-6 ${className}`}>
                <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 dark:bg-yellow-800 p-2 rounded-md flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-300" />
                    </div>
                    <div className="flex-1">
                        {showTitle && (
                            <h4 className="font-semibold text-[var(--text-main)] mb-2">{title}</h4>
                        )}
                        <p className="text-[var(--text-soft)] mb-4">{description}</p>
                        <Link 
                            to={createPageUrl(`StrategyForm${requiredDocType.split('_').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                            ).join('')}`)}
                            className="btn btn-primary btn-sm"
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Complete {title}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Show the strategy data
    return (
        <div className={`bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6 ${className}`}>
            <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-800 p-2 rounded-md flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-300" />
                </div>
                <div className="flex-1">
                    {showTitle && (
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-[var(--text-main)]">{title}</h4>
                            <Link 
                                to={createPageUrl(`StrategyForm${requiredDocType.split('_').map(word => 
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                ).join('')}`)}
                                className="text-sm text-[var(--primary-gold)] hover:underline"
                            >
                                Edit
                            </Link>
                        </div>
                    )}
                    
                    {/* Display specific fields from the strategy document */}
                    {fields.length > 0 ? (
                        <div className="space-y-2">
                            {fields.map((field, index) => {
                                const value = getNestedValue(strategyDoc.content, field.path);
                                if (!value) return null;
                                
                                return (
                                    <div key={index}>
                                        <span className="font-medium text-[var(--text-main)]">{field.label}: </span>
                                        <span className="text-[var(--text-soft)]">
                                            {Array.isArray(value) ? value.join(', ') : value}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-[var(--text-soft)]">
                            ✅ Your {title.toLowerCase()} is complete and ready to reference.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Helper function to get nested object values
const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current && current[key], obj);
};

export default StrategyIntegration;