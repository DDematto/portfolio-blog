import { Project } from '@/types/project';
import { ProjectHeader } from '@/components/Projects/ProjectHeader';
import { ProjectSection } from '@/components/Projects/ProjectSection';
import { ProjectMedia } from '@/components/Projects/ProjectMedia';

export const projectData: Project = {
    id: "frame-genius",
    title: "Frame Genius",
    description: "An agentic, cloud-based video editor and composition platform powered by a scalable microservice architecture.",
    tags: ["Encore.ts", "React", "Pulumi", "PostgreSQL", "Redis", "PubSub", "AST Compiler"],
    date: "2025-01-01",
    link: "https://FrameGenius.studio"
};

export default function FrameGenius() {
    return (
        <article className="pb-20">
            <ProjectHeader project={projectData} className="mb-16" />

            <div className="max-w-3xl mx-auto space-y-24">
                <ProjectMedia
                    type="image"
                    src="/projects/framegenius.png"
                    alt="FrameGenius SaaS Interface"
                    caption="The FrameGenius cloud video rendering and composition interface."
                />

                <ProjectSection title="The Platform">
                    <p>
                        <strong>Frame Genius</strong> is a comprehensive, cloud-based software-as-a-service (SaaS) application that entirely reimagines video editing through code. Unlike traditional drag-and-drop editors, Frame Genius treats video compositions as programmable React components.
                    </p>
                    <p>
                        Users, or specialized AI agents, can generate custom React code to create stunning visual effects, complex animations, and dynamic timelines. This code is then compiled and rendered into high-quality video formats entirely in the cloud.
                    </p>
                </ProjectSection>

                <ProjectSection title="Massive-Scale Architecture">
                    <p>
                        Building a platform capable of securely executing user-generated code and rendering video sequences at scale required a highly resilient backend infrastructure.
                    </p>
                    <ul className="space-y-4 list-none bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <li className="flex gap-4 items-start">
                            <span className="text-theme-500 font-mono mt-1">{`->`}</span>
                            <div>
                                <strong className="text-white">Microservice Backend:</strong> The core infrastructure is built on <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-theme-300">Encore.ts</code>, orchestrating multiple independent services that communicate seamlessly via PubSub topics.
                            </div>
                        </li>
                        <li className="flex gap-4 items-start">
                            <span className="text-theme-500 font-mono mt-1">{`->`}</span>
                            <div>
                                <strong className="text-white">Data & Caching Layer:</strong> Persistent data is managed through a scalable <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-blue-300">PostgreSQL</code> database, while <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-red-300">Redis</code> handles high-speed caching and strict API rate limiting.
                            </div>
                        </li>
                        <li className="flex gap-4 items-start">
                            <span className="text-theme-500 font-mono mt-1">{`->`}</span>
                            <div>
                                <strong className="text-white">Infrastructure as Code:</strong> Entire deployments, staging environments, and cloud resources are heavily automated and provisioned using <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-purple-300">Pulumi</code>.
                            </div>
                        </li>
                        <li className="flex gap-4 items-start">
                            <span className="text-theme-500 font-mono mt-1">{`->`}</span>
                            <div>
                                <strong className="text-white">Production SaaS Features:</strong> The platform features robust, enterprise-grade user authentication and secure payment processing for subscription tiers and rendering credits.
                            </div>
                        </li>
                    </ul>
                </ProjectSection>

                <ProjectSection title="AST Sandboxing & Cloud Rendering">
                    <p>
                        Allowing users (and AI) to write and execute code on our servers introduces immense security challenges. To safely process the custom timeline and keyframing systems, Frame Genius utilizes a highly restrictive sandbox.
                    </p>
                    <p>
                        Before any code is executed, it passes through a custom <strong>Abstract Syntax Tree (AST) compiler</strong>. This compilation step rigorously type-checks the input, verifies that the code structure matches acceptable patterns, and strips out any potentially malicious operations. Once validated, the React composition is dispatched to <strong>Remotion Lambda</strong> to be rendered into a video file across distributed serverless functions.
                    </p>
                </ProjectSection>

                <ProjectSection title="Agentic Harness">
                    <p>
                        A major pillar of the Frame Genius workflow is its bespoke Agent Harness, built on top of the Vercel AI SDK. This allows users who may not know React or complex animation mathematics to simply <em>describe</em> the visual effect they want.
                    </p>
                    <p>
                        The platform features deep asset integration via <strong>Cloudflare R2 Object Storage</strong>. Users can upload raw video, images, or audio for the agentic system to process. Utilizing powerful multimodal LLMs with vision capabilities, the agents can analyze the uploaded footage, recommend enhancements (like custom shaders, color grading, or pacing tweaks), and intelligently inject those assets into the final timeline composition.
                    </p>
                    <p>
                        Furthermore, the system can autonomously generate new AI-driven image or audio assets mid-workflow to fulfill a user's prompt. Once the collaborative composition is finalized and rendered through Remotion Lambda, the polished video is deposited back into Cloudflare R2, ready for the user to instantly preview or download.
                    </p>
                </ProjectSection>
            </div>
        </article>
    );
}
