import React, { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
    </div>
);

export const lazyLoadPage = (importFunc) => {
    const LazyPage = lazy(importFunc);
    
    return (props) => (
        <Suspense fallback={<PageLoader />}>
            <LazyPage {...props} />
        </Suspense>
    );
};

export default PageLoader;