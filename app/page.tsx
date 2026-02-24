'use client';

import { motion } from 'framer-motion';
import Projects from '@/components/App/Projects';
import ContactForm from '@/components/App/ContactForm';
import Hero from '@/components/App/Hero';
import About from '@/components/App/About';

export default function Home() {
    return (
        <main className="w-full flex flex-col items-center select-none overflow-x-hidden">
            <Hero />
            <About />
            <Projects />

            {/* Contact Section */}
            <section id="contact" className="w-full py-24 px-4 flex flex-col items-center relative z-10">
                {/* Boxless Soft Background Blur for Text Readability */}
                <div
                    className="pointer-events-none absolute inset-0 z-[-1] bg-[#0a0a0a]/30 backdrop-blur-sm"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                        maskComposite: 'intersect',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskComposite: 'source-in'
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 w-full max-w-4xl"
                >
                    <h2 className="text-4xl font-bold text-white mb-6 tracking-tight flex items-center justify-center gap-3">
                        <span className="text-theme-500 font-mono text-3xl">#</span> Initialize Connection
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Whether it&apos;s a job opportunity, a project idea, or just to say hi, my inbox is always open.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-2xl"
                >
                    <ContactForm />
                </motion.div>
            </section>
        </main>
    );
}
