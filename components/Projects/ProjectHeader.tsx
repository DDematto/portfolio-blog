import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/types/project';

interface ProjectHeaderProps {
    project: Project;
    className?: string;
}

export function ProjectHeader({ project, className = "" }: ProjectHeaderProps) {
    return (
        <div className={`mb-16 ${className}`}>
            <Link
                href="/"
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8 group relative z-20"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 relative z-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold text-white tracking-tight"
                >
                    {project.title}
                </motion.h1>
                <div className="flex gap-4">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-gray-300 hover:text-white flex items-center gap-2">
                            <Github className="w-5 h-5" />
                            <span className="text-sm font-medium hidden md:block">Source</span>
                        </a>
                    )}
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-theme-600/20 hover:bg-theme-600/40 border border-theme-500/30 transition-colors text-theme-400 hover:text-white flex items-center gap-2">
                            <ExternalLink className="w-5 h-5" />
                            <span className="text-sm font-medium hidden md:block">{project.linkText || "Live Demo"}</span>
                        </a>
                    )}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap gap-2 mb-8 relative z-20"
            >
                {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-md">
                        {tag}
                    </span>
                ))}
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-xl font-light leading-relaxed max-w-3xl relative z-20"
            >
                {project.description}
            </motion.p>
        </div>
    );
}
