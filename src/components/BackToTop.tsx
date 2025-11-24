'use client';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!show) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-kmff-blue text-white p-3 rounded-full shadow-lg hover:bg-kmff-dark transition-all z-50 lg:hidden animate-in fade-in zoom-in duration-300"
            aria-label="Наверх"
        >
            <ArrowUp size={24} />
        </button>
    );
}
