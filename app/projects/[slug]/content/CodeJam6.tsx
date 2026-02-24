import { ProjectHeader } from '@/components/Projects/ProjectHeader';
import { ProjectSection } from '@/components/Projects/ProjectSection';
import { ProjectMedia } from '@/components/Projects/ProjectMedia';
import { Project } from '@/types/project';

export const projectData: Project = {
    id: "codejam6",
    title: "Code Jam VI",
    description: "Submission for Code Jam VI, highly optimized and built under a strict 48-hour time limit.",
    tags: ["Hackathon", "Optimization", "Python"],
    date: "2024-09-01",
};

export default function CodeJam6() {
    return (
        <article className="pb-24">
            <ProjectHeader project={projectData} />

            <ProjectSection title="Rex-Explorer: A Journey Back in Time" delay={0.2}>
                <p>
                    Developed in a week for CodeJam VI by Team Inquisitive Investigators (f1re & Monika),
                    Rex-Explorer embraces the competition&apos;s theme of &quot;ancient technology&quot; by reviving the essence
                    of retro computing. Our project celebrates the bygone era with a retro-styled Text User Interface (TUI),
                    designed to transport users back in time and rekindle the simplicity and charm of early computing experiences.
                </p>

                <ProjectMedia
                    type="image"
                    src="/projects/codejam6.png"
                    alt="Rex-Explorer TUI Interface"
                    caption="The retro file browsing and text editing interface of Rex-Explorer."
                />

                <h3 className="text-xl font-bold text-white mt-8 mb-4">Core Features</h3>
                <ul className="space-y-4 list-none pl-0">
                    <li className="flex gap-4">
                        <span className="text-theme-500 mt-1">▹</span>
                        <div>
                            <strong className="text-gray-200 block mb-1">Retro File Browsing</strong>
                            <span className="text-gray-400">Dive into the past with a TUI that lets you explore your files and directories in a way that modern GUIs can&apos;t replicate.</span>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="text-theme-500 mt-1">▹</span>
                        <div>
                            <strong className="text-gray-200 block mb-1">Integrated Terminal</strong>
                            <span className="text-gray-400">More than just file browsing—execute commands, change directories, and even push commits to GitHub directly from Rex-Explorer.</span>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="text-theme-500 mt-1">▹</span>
                        <div>
                            <strong className="text-gray-200 block mb-1">Text Editor</strong>
                            <span className="text-gray-400">Why stop at browsing? Edit your files right within Rex-Explorer, experiencing text manipulation as it was in the early days of computing.</span>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="text-theme-500 mt-1">▹</span>
                        <div>
                            <strong className="text-gray-200 block mb-1">Photo Viewer</strong>
                            <span className="text-gray-400">A last-minute addition that turned out to be invaluable, allowing users to view images directly within the TUI environment.</span>
                        </div>
                    </li>
                </ul>

                <p className="mt-8 italic text-gray-500 border-l-2 border-white/10 pl-4 py-2">
                    Achieving third place in the competition, Rex-Explorer was recognized for its comprehensive feature set,
                    combining a file explorer, terminal, text editor, and photo viewer into a single, easy-to-use application.
                </p>
            </ProjectSection>

            <ProjectSection title="Watch Rex-Explorer in Action" delay={0.3}>
                <p className="mb-6">
                    Experience Rex-Explorer live through our showcase on the following livestream.
                    Jump straight to the segment about our project:
                </p>

                <ProjectMedia
                    type="youtube"
                    src="https://www.youtube.com/embed/I97L_Y3rhvc?start=6545"
                    caption="Code Jam VI Livestream Showcase"
                />
            </ProjectSection>
        </article>
    );
}
