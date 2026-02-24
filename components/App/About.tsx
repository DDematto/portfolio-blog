'use client';

import { motion } from 'framer-motion';

export default function About() {
    return (
        <section id="about" className="w-full py-24 px-4 flex justify-center text-center relative z-10">
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
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl w-full p-8 md:p-12"
            >
                <h2 className="text-4xl font-bold text-white mb-12 tracking-tight text-center">About Me</h2>

                <div className="flex flex-col gap-14 text-gray-300 text-lg font-light leading-relaxed mx-auto text-left w-full max-w-4xl mt-8">

                    {/* Introduction */}
                    <div className="space-y-6">
                        <blockquote className="border-l-2 border-theme-500/50 pl-6 py-2 italic text-gray-400 text-xl font-serif">
                            "Software engineering is the closest thing we have to magic in the real world. We conjure complex, living systems from nothing but logic and keystrokes."
                        </blockquote>
                        <p>
                            I'm based in <strong>Hastings, Michigan</strong>, and I am actively seeking new opportunities.
                            My introduction to computer science began in high school, where I built websites for local businesses.
                            That was my first glimpse into the virtual magic of creating things with code, and it set me on the path
                            I'm walking today.
                        </p>
                        <p>
                            Over the last year, I founded <code className="bg-theme-500/10 text-theme-400 px-1.5 py-0.5 rounded text-sm font-mono whitespace-nowrap">Schicksal Technology LLC</code>.
                            I started the company to focus on <a href="#projects" className="text-theme-400 hover:text-theme-300 font-medium underline underline-offset-4 decoration-theme-500/30 hover:decoration-theme-400 transition-all">Frame Genius</a>, a platform I've had in
                            mind for years. I am using it as a vehicle to continuously expand my skill set, learn new architectural patterns, and build out my resume.
                        </p>
                    </div>

                    {/* Experience & Education */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                            <span className="text-theme-500 font-mono text-2xl">##</span> Experience & Education
                        </h3>
                        <p>
                            I hold a <strong>Bachelor's degree in Computer Science</strong> from <span className="text-green-400 font-medium whitespace-nowrap">Michigan State University</span>.
                            During my four years at MSU, I immersed myself in the engineering community through hackathons and side projects,
                            constantly inspired by the amazing things people were building. I also had the rewarding opportunity to serve as a
                            <strong> Teaching Assistant</strong> for an Object-Oriented Programming class, where I taught students and graded coursework.
                        </p>
                        <ul className="space-y-3 list-none mt-4 text-base bg-white/5 p-6 border border-white/10 rounded-xl">
                            <li className="flex gap-4 items-start">
                                <span className="text-theme-500 font-mono mt-1">{`->`}</span>
                                <span><strong>Front-End Engineering:</strong> My primary focus is building premium web applications. My main technology is <strong>React</strong>, though I have also developed interfaces in other systems such as Kivy.</span>
                            </li>
                            <li className="flex gap-4 items-start">
                                <span className="text-theme-500 font-mono mt-1">{`->`}</span>
                                <span><strong>Full-Stack Architecture:</strong> Beyond the UI layer, I bring extensive experience in designing robust databases and scalable back-end infrastructure.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Interests */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                            <span className="text-theme-500 font-mono text-2xl">###</span> Interests
                        </h3>
                        <p>
                            When I'm at my desk, I love getting lost in immersive video games—especially open-world titles that feature breathtaking natural environments like the <em>Fallout</em> and <em>Elder Scrolls</em> series.
                            My absolute favorite games right now are <strong>Red Dead Redemption</strong>, <strong>Skyrim</strong>, and <strong className="whitespace-nowrap">Europa Universalis IV</strong>.
                        </p>
                        <p>
                            However, I find it just as important to step away from the screen. I love getting outdoors and spending time doing hands-on activities like <strong>hunting</strong> and competitive <strong>airsoft</strong>.
                        </p>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}
