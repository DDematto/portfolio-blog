'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.error || 'Failed to send message');

            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            console.error(error);
            setStatus('error');
            setErrorMessage(error.message || 'An unexpected error occurred.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full mx-auto space-y-12 relative group"
        >
            <div className="relative z-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group/input">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2 tracking-wide uppercase">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-theme-400 focus:ring-0 transition-colors bg-white/0"
                            placeholder="John Doe"
                        />
                        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-theme-400 transition-all duration-300 group-focus-within/input:w-full"></div>
                    </div>

                    <div className="relative group/input">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 tracking-wide uppercase">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-theme-400 focus:ring-0 transition-colors bg-white/0"
                            placeholder="john@example.com"
                        />
                        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-theme-400 transition-all duration-300 group-focus-within/input:w-full"></div>
                    </div>
                </div>

                <div className="relative group/input">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 tracking-wide uppercase">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-theme-400 focus:ring-0 transition-colors resize-none bg-white/0"
                        placeholder="How can we build the future together?"
                    />
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-theme-400 transition-all duration-300 group-focus-within/input:w-full"></div>
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className={`
                        w-full py-4 px-6 rounded-none
                        flex items-center justify-center gap-2
                        font-medium tracking-wide uppercase text-sm
                        transition-all duration-300 border border-white/20
                        hover:border-theme-400 hover:text-theme-400
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${status === 'success'
                            ? 'bg-green-500/10 text-green-400 border-green-500/50'
                            : status === 'error'
                                ? 'bg-red-500/10 text-red-400 border-red-500/50'
                                : 'bg-transparent text-white'
                        }
                    `}
                >
                    {status === 'loading' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : status === 'success' ? (
                        <>
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span>Sent Successfully</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            <span>Send Message</span>
                        </>
                    )}
                </button>

                {status === 'error' && (
                    <div className="flex items-center space-x-2 text-red-400 text-sm mt-4 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                )}
            </div>
        </form>
    );
}
