import React from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Check } from 'lucide-react';

export default function MobileBottomSheet({ isOpen, onClose, options, value, onChange, label }) {
    const handleSelect = (optionValue) => {
        onChange(optionValue);
        onClose();
    };

    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{label}</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 pb-8 max-h-[60vh] overflow-y-auto">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`w-full text-left p-4 rounded-lg mb-2 transition-all flex items-center justify-between ${
                                value === option.value
                                    ? 'bg-[var(--primary-gold)] text-white'
                                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-[var(--text-main)]'
                            }`}
                        >
                            <span>{option.label}</span>
                            {value === option.value && <Check className="w-5 h-5" />}
                        </button>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
}