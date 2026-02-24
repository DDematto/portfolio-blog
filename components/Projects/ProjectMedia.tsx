import { motion } from 'framer-motion';

interface ProjectMediaProps {
    type: 'video' | 'image' | 'youtube';
    src: string;
    alt?: string;
    caption?: string;
}

export function ProjectMedia({ type, src, alt, caption }: ProjectMediaProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-12 relative z-10 w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/50"
        >
            {type === 'youtube' && (
                <div className="relative pt-[56.25%] w-full">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={src}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            {type === 'image' && (
                <div className="relative w-full">
                    <img src={src} alt={alt || 'Project media'} className="w-full h-auto object-cover" />
                </div>
            )}

            {type === 'video' && (
                <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto"
                />
            )}

            {caption && (
                <div className="p-4 bg-[#111111] border-t border-white/5 text-center text-sm text-gray-500 italic">
                    {caption}
                </div>
            )}
        </motion.div>
    );
}
