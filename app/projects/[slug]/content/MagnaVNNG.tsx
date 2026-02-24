import { Project } from '@/types/project';
import { ProjectHeader } from '@/components/Projects/ProjectHeader';
import { ProjectSection } from '@/components/Projects/ProjectSection';
import { ProjectMedia } from '@/components/Projects/ProjectMedia';

export const projectData: Project = {
    id: "magna-vnng",
    title: "Capstone Project: VNNG",
    description: "Architected a sophisticated industrial data visualization system utilizing Electron, React, Three.js, and Python to process 500,000+ data points simultaneously.",
    tags: ["Electron", "React", "Three.js", "Python"],
    date: "2024-12-01",
    linkText: "Capstone Page",
    link: "https://capstone.cse.msu.edu/2024-08/projects/magna-vnng/",
};

export default function MagnaVNNG() {
    return (
        <article className="pb-20">
            <ProjectHeader project={projectData} className="mb-16" />

            <div className="max-w-3xl mx-auto space-y-24">
                <ProjectSection title="Overview">
                    <p>
                        As part of the Michigan State University Capstone program, I served as the Head of the Front-End Engine for a sponsored project with <strong>Magna</strong>, North America's largest automotive supplier. This rigorous 5-month course required building a comprehensive, enterprise-level application alongside delivering weekly progress updates directly to our corporate sponsors.
                    </p>
                    <p>
                        We built the <strong>Visualizing Neural Network Gradients (VNNG)</strong> software to resolve the goal of analyzing and rendering massive neural network and industrial datasets. It features an innovative two-part pipeline: a Python-based logger and an interactive Electron/React/Three.js visualizer.
                    </p>
                </ProjectSection>

                <ProjectSection title="Visuals">
                    <ProjectMedia
                        type="image"
                        src="/projects/heatmap-vnng.png"
                        alt="Magna VNNG Heatmap"
                        caption="A comprehensive 3D heatmap tracking large scale data variances."
                    />
                    <ProjectMedia
                        type="image"
                        src="/projects/3d-vnng.png"
                        alt="Magna VNNG 3D Visualization"
                        caption="The fully interactive 3D visualization environment powered by Three.js."
                    />
                </ProjectSection>

                <ProjectSection title="Architecture & Optimization">
                    <p>
                        One of the most intense engineering challenges of this project was scaling the rendering engine to smoothly handle over <strong>500,000+</strong> individual data points simultaneously.
                    </p>
                    <ul className="space-y-4 mt-6">
                        <li className="flex gap-3">
                            <span className="text-theme-500 mt-1">▹</span>
                            <div>
                                <strong>Batch Rendering vs Singular Plotting:</strong> Taking direct lessons from my previous custom voxel map generation engines, I completely shifted the Three.js rendering pipeline away from drawing single points. By utilizing strict <strong>batch processing</strong> and instanced rendering, the system successfully bypasses catastrophic CPU bottlenecking.
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-theme-500 mt-1">▹</span>
                            <div>
                                <strong>Multithreaded Web Workers:</strong> Offloading the intense data parsing logic from the main UI thread onto background <strong>Web Workers</strong> proved vital. This architecture successfully decreased application load times by a massive <strong>65%</strong>, ensuring the user interface remained highly fluid and responsive.
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-theme-500 mt-1">▹</span>
                            <div>
                                <strong>Cross-Stack Communication (HDF5):</strong> Beyond the immediate frontend React logic, leading this pipeline required strict protocol communication with the backend engineers. We collaborated heavily to design robust, standardized data structures utilizing <strong>HDF5</strong> files, ensuring the Python logger synced perfectly with the Electron consumer.
                            </div>
                        </li>
                    </ul>
                </ProjectSection>



                <ProjectSection title="Outcomes">
                    <p>
                        This project was a massive, fast-paced undertaking that demanded rigorous communication across completely separate tech stacks. Delivering a successful, optimized application handling extreme data densities reinforced core architectural concepts like parallel threading, memory allocation limits, and strict data contracts on an enterprise level.
                    </p>
                </ProjectSection>
            </div>
        </article>
    );
}
