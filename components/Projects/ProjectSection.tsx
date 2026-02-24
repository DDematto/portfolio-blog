import { motion } from 'framer-motion';

interface ProjectSectionProps {
    title: string;
    children: React.ReactNode;
    delay?: number;
}

export function ProjectSection({ title, children, delay = 0.2 }: ProjectSectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay }}
            className="mb-16 relative z-10"
        >
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight border-b border-white/10 pb-4 inline-block pr-8">
                {title}
            </h2>
            <div className="text-gray-400 text-lg font-light leading-relaxed space-y-6">
                {children}
            </div>
        </motion.section>
    );
}
