import React, { useState, useEffect } from 'react';
import { Quote as QuoteIcon } from 'lucide-react';

const quotes = [
    { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { quote: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
];

const QuoteOfTheDayCard = () => {
    const [quote, setQuote] = useState({ quote: '', author: '' });

    useEffect(() => {
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        setQuote(quotes[dayOfYear % quotes.length]);
    }, []);

    return (
        <div className="card p-6 flex flex-col justify-between h-full" style={{ borderRadius: '2px' }}>
            <div>
                <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                       <QuoteIcon className="w-6 h-6 text-[var(--primary-gold)]" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-[var(--text-main)]">Quote of the Day</h3>
                        <p className="text-sm text-[var(--text-soft)]">A dose of inspiration</p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 p-4 rounded-md">
                    <blockquote className="text-left italic text-white">
                        "{quote.quote}"
                        <footer className="mt-2 not-italic text-sm text-white/90 text-left">— {quote.author}</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default React.memo(QuoteOfTheDayCard);