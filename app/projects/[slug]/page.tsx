'use client';

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { allProjects, projectComponentsMap } from './content';
import { use } from 'react';
import Link from 'next/link';

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const unwrappedParams = use(params);
    const project = allProjects.find(p => p.id === unwrappedParams.slug);

    if (!project) {
        notFound();
    }

    const ContentComponent = projectComponentsMap[project.id];

    return (
        <main className="min-h-[calc(100vh-80px)] w-full relative px-4 py-24 select-text">
            {/* Boxless Soft Background Blur for Text Readability */}
            <div
                className="pointer-events-none fixed inset-0 z-[-1] bg-[#0a0a0a]/20 backdrop-blur-sm"
                style={{
                    maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
                }}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto relative z-10"
            >
                {ContentComponent ? (
                    <ContentComponent />
                ) : (
                    <div className="text-center py-20 text-gray-500 border border-white/10 rounded-2xl bg-[#111111]/80 backdrop-blur-md flex flex-col items-center">
                        <p className="text-xl mb-4">Content for <strong className="text-white">{project.title}</strong> is currently being migrated.</p>
                        <p className="font-light mb-8">Please check back later.</p>
                        <Link href="/" className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                            Back to Home
                        </Link>
                    </div>
                )}
            </motion.div>
        </main>
    );
}
