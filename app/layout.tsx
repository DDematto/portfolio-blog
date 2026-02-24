import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NeuralBackground from '@/components/Neural/NeuralBackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Devin DeMatto | Portfolio',
    description: 'Software Engineer Portfolio - Modern, Interactive, neural network inspired.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark scroll-smooth">
            <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen selection:bg-theme-500/30 overflow-x-hidden`}>
                {/* Global Persistent Background */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <NeuralBackground />
                </div>

                {/* Page Content */}
                <div className="relative z-10 pt-8 pb-20">
                    {children}
                </div>
            </body>
        </html>
    );
}
