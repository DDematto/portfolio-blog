'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { allProjects } from '@/app/projects/[slug]/content';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useNeuralNetworkStore } from '@/store/neuralNetworkStore';

const PROJECTS_PER_PAGE = 6;

export default function Projects() {
    const router = useRouter();
    const triggerBurst = useNeuralNetworkStore((state) => state.triggerBurst);
    const [currentPage, setCurrentPage] = useState(1);

    // Sort projects by date descending (newest first)
    const sortedProjects = [...allProjects].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const totalPages = Math.ceil(sortedProjects.length / PROJECTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const currentProjects = sortedProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

    const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
    const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

    return (
        <section id="projects" className="w-full py-24 relative z-10 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
                        Featured Projects
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                        A selection of my recent work, highlighting performance, precision, and modern architectures.
                    </p>
                </motion.div>

                {/* Using a fixed min-height ensures the layout doesn't jump drastically on page turns */}
                <div className="min-h-[450px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {currentProjects.map((project) => (
                                <div
                                    key={project.id}
                                    onClick={() => {
                                        triggerBurst();
                                        router.push(`/projects/${project.id}`);
                                    }}
                                    className="cursor-pointer group relative bg-black/40 backdrop-blur-md rounded-2xl hover:bg-white/[0.03] hover:border-white/20 transition-all duration-300 shadow-2xl flex flex-col h-full border border-white/5"
                                >
                                    {/* Inner container */}
                                    <div className="relative z-10 flex flex-col h-full p-8">
                                        <div className="flex justify-between items-start mb-6">
                                            <h3 className="text-2xl font-bold text-white group-hover:text-theme-400 transition-colors">
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-3">
                                                {project.github && (
                                                    <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-500 hover:text-white transition-colors relative z-20">
                                                        <Github className="w-5 h-5" />
                                                    </a>
                                                )}
                                                {project.link && (
                                                    <a href={project.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-500 hover:text-white transition-colors relative z-20">
                                                        <ExternalLink className="w-5 h-5" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-gray-400 flex-grow mb-8 font-light leading-relaxed">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tags.map((tag: string) => (
                                                <span key={tag} className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-md">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex justify-center items-center mt-12 space-x-6"
                    >
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="p-2 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            aria-label="Previous Page"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <span className="text-gray-400 font-medium">
                            {currentPage} / {totalPages}
                        </span>

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            aria-label="Next Page"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
