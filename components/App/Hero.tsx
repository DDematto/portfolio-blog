'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiChevronDown } from 'react-icons/fi';

export default function Hero() {
    return (
        <section id="home" className="relative h-screen flex flex-col justify-center items-center text-center px-4 w-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center space-y-6 pb-24"
            >
                {/* Profile Picture */}
                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-tr from-orange-500/50 to-red-500/50 backdrop-blur-sm shadow-[0_0_30px_rgba(255,120,50,0.2)]">
                    <Image
                        src="/DevinDeMatto.jpg"
                        alt="Devin DeMatto"
                        fill
                        className="rounded-full object-cover object-center ring-1 ring-inset ring-black/10 dark:ring-white/15"
                        priority
                    />
                </div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-sm"
                >
                    Devin DeMatto
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-lg md:text-2xl text-gray-400 font-light tracking-wide max-w-2xl mx-auto leading-relaxed p-4 md:p-6"
                >
                    Software Engineer conjuring complex, living systems from logic and keystrokes. <br className="hidden md:block" />
                    Bringing virtual magic to the real world.
                </motion.p>

                {/* Links / Socials */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex gap-6 justify-center pt-4"
                >
                    <a href="https://github.com/ddematto" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-gray-300 hover:text-white">
                        <FaGithub className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/devin-dematto/" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-gray-300 hover:text-white">
                        <FaLinkedin className="w-6 h-6" />
                    </a>
                    <a href="#contact" className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-gray-300 hover:text-white">
                        <FiMail className="w-6 h-6" />
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1, ease: "easeOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <a
                    href="#about"
                    className="flex flex-col items-center gap-2 text-gray-500 hover:text-theme-400 transition-colors group p-4"
                >
                    <span className="text-xs font-light tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">Discover</span>
                    <FiChevronDown className="w-8 h-8 animate-bounce" />
                </a>
            </motion.div>
        </section>
    );
}
