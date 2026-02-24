import { Project } from '@/types/project';
import { ProjectHeader } from '@/components/Projects/ProjectHeader';
import { ProjectSection } from '@/components/Projects/ProjectSection';
import { ProjectMedia } from '@/components/Projects/ProjectMedia';

export const projectData: Project = {
    id: "portfolio",
    title: "Legacy Portfolio",
    description: "The previous iteration of my software engineering portfolio built with Next.js Pages router.",
    tags: ["Next.js", "Styled Components"],
    date: "2024-11-01",
};

export default function LegacyPortfolio() {
    return (
        <article className="pb-20">
            <ProjectHeader project={projectData} className="mb-16" />

            <div className="max-w-3xl mx-auto space-y-24">
                <ProjectSection title="Overview">
                    <p>
                        This is a retrospective look at the previous version of my software engineering portfolio. Built on the Next.js Pages router, it served as a foundational project for learning React and component-driven web design.
                    </p>
                    <p>
                        While it has been entirely rewritten and replaced by the current, more dynamic application, the legacy portfolio laid the groundwork for managing state, routing, and responsive layouts.
                    </p>
                    <ProjectMedia
                        type="image"
                        src="/projects/portfolio_2024.png"
                        alt="Legacy Portfolio Interface"
                        caption="A glimpse into the design language of the previous iteration."
                    />
                </ProjectSection>

                <ProjectSection title="Architecture">
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <span className="text-theme-500 mt-1">▹</span>
                            <div>
                                <strong>Framework:</strong> Next.js (Pages Router) for server-side rendering and static site generation where appropriate.
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-theme-500 mt-1">▹</span>
                            <div>
                                <strong>Styling:</strong> Styled Components for CSS-in-JS, allowing for heavily scoped and dynamic component styles based on props.
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-theme-500 mt-1">▹</span>
                            <div>
                                <strong>Content Management:</strong> A mix of hardcoded React components and early iterations of Markdown-based project data extraction.
                            </div>
                        </li>
                    </ul>
                </ProjectSection>

                <ProjectSection title="Evolution to the Modern Era">
                    <p>
                        The primary reason for deprecating this version was my growing interest in advanced visual effects and modern frontend architecture. The legacy codebase heavily relied on client-heavy Styled Components, which made adopting newer paradigms and performance optimizations difficult.
                    </p>
                    <p className="mt-4">
                        Rebuilding the site allowed me to explore a vastly more capable technology stack. The foundation was moved to the <strong>Next.js App Router</strong> utilizing Tailwind CSS. To manage the complex interactive state required for a living background, I implemented <strong>Zustand</strong> for lightweight global state.
                    </p>
                    <p className="mt-4">
                        Most importantly, the redesign paved the way for sophisticated visual effects. Instead of static backgrounds, I integrated <strong>Framer Motion</strong> for buttery smooth DOM layer animations, and engineered an interactive, physics-based neural network canvas driven by complex generative algorithms, mimicking the firing of synapses and signals traversing a graph structure in real-time.
                    </p>
                </ProjectSection>
            </div>
        </article>
    );
}
