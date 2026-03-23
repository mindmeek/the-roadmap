import React, { useRef } from 'react';
import { Save, Loader2 } from 'lucide-react';

/**
 * FloatingSaveButton - A floating save button that sticks to bottom-right.
 * Preserves scroll position after save on mobile.
 * 
 * Props:
 *   onSave    - function to call on click
 *   isSaving  - boolean, shows spinner when true
 *   isDirty   - boolean, hides button when false (no unsaved changes)
 *   label     - optional string (default "Save Changes")
 */
export default function FloatingSaveButton({ onSave, isSaving, isDirty = true, label = 'Save Changes' }) {
    if (!isDirty) return null;

    const handleClick = async () => {
        // Capture scroll position before saving
        const scrollY = window.scrollY;
        const mainEl = document.querySelector('main');
        const mainScrollY = mainEl ? mainEl.scrollTop : 0;

        await onSave();

        // Restore scroll position after save
        requestAnimationFrame(() => {
            window.scrollTo({ top: scrollY, behavior: 'instant' });
            if (mainEl) mainEl.scrollTop = mainScrollY;
        });
    };

    return (
        <div className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 z-50 animate-in fade-in-0 slide-in-from-bottom-4">
            <button
                onClick={handleClick}
                disabled={isSaving}
                className="flex items-center gap-2 px-5 py-3 bg-[var(--primary-gold)] text-white font-semibold shadow-2xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 rounded-full border-2 border-white/20"
                style={{ minWidth: '160px', justifyContent: 'center' }}
            >
                {isSaving ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                        <span>Saving...</span>
                    </>
                ) : (
                    <>
                        <Save className="w-4 h-4 flex-shrink-0" />
                        <span>{label}</span>
                    </>
                )}
            </button>
        </div>
    );
}