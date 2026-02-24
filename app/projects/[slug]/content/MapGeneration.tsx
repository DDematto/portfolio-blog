import { Project } from '@/types/project';
import { ProjectHeader } from '@/components/Projects/ProjectHeader';
import { ProjectSection } from '@/components/Projects/ProjectSection';
import { ProjectMedia } from '@/components/Projects/ProjectMedia';

export const projectData: Project = {
    id: "map-generation",
    title: "Voxel Map Generation",
    description: "Procedural voxel-based map generation algorithm focusing on terrain rendering.",
    tags: ["Unreal Engine", "C++", "3D"],
    date: "2024-10-01",
};

export default function MapGeneration() {
    return (
        <article className="pb-20">
            <ProjectHeader project={projectData} className="mb-16" />

            <div className="max-w-3xl mx-auto space-y-24">
                <ProjectSection title="Overview">
                    <p>
                        This project explores the fascinating world of procedural generation, specifically focusing on building expansive, voxel-based terrains from scratch using <strong>C++</strong> within <strong>Unreal Engine</strong>.
                    </p>
                    <p>
                        Drawing inspiration from games like <strong>RimWorld</strong> and <a href="https://azgaar.github.io/Fantasy-Map-Generator/" target="_blank" rel="noreferrer" className="text-theme-400 hover:text-theme-300 font-medium underline underline-offset-4 decoration-theme-500/30 hover:decoration-theme-400 transition-all">Azgaar's Fantasy Map Generator</a>, the goal was to understand the mathematics behind infinite world generation, chunk management, and the rendering pipelines necessary to draw thousands of independent blocks efficiently.
                    </p>
                </ProjectSection>

                <ProjectSection title="Technical Deep Dive">
                    <p>
                        The core of the generation relies on multiple layers of <strong>Perlin Noise</strong> and <strong>Simplex Noise</strong> to create natural-looking topographies, distinguishing between biomes, elevations, and cavern networks.
                    </p>
                    <p className="mt-4">
                        A major mathematical component of the system heavily utilizes <strong>Voronoi diagrams</strong> and <strong>Delaunay triangulation</strong> to calculate complex procedural tiling and structure formations across the infinite map.
                    </p>
                    <ul className="space-y-4 mt-6">
                        <li className="flex gap-3">
                            <span className="text-theme-500 mt-1">▹</span>
                            <div>
                                <strong>Chunking System:</strong> The world is divided into manageable chunks (e.g., 16x16x256 blocks) that are loaded and unloaded dynamically based on the player's position, preventing memory overflow.
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-theme-500 mt-1">▹</span>
                            <div>
                                <strong>Greedy Meshing:</strong> To maintain high frame rates, I implemented a greedy meshing algorithm that combines adjacent faces of identical blocks into single larger polygons, drastically reducing the total number of vertices sent to the GPU.
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-theme-500 mt-1">▹</span>
                            <div>
                                <strong>Multithreading:</strong> Terrain generation and mesh compilation are offloaded to background threads to ensure the main rendering loop remains smooth and unaffected by new chunks coming into view.
                            </div>
                        </li>
                    </ul>
                </ProjectSection>

                <ProjectSection title="Visuals">
                    <ProjectMedia
                        type="image"
                        src="/projects/mapGeneration.png"
                        alt="Voxel Map Generation Overview"
                        caption="A wide overview of the procedurally generated voxel terrain."
                    />
                    <ProjectMedia
                        type="image"
                        src="/projects/mapgeneration_closeup.png"
                        alt="Voxel Map Generation Close-up"
                        caption="Close-up detail showcasing the chunking and natural biome transitions."
                    />
                </ProjectSection>

                <ProjectSection title="Outcomes & Future Plans">
                    <p>
                        Building this engine provided invaluable experience writing performance-critical code and understanding 3D mathematics. It proved to be a phenomenal foundational project for deeply understanding core algorithm design, complex graph data structures, and the inner workings of graphical game engine architecture and implementation.
                    </p>
                    <p className="mt-4">
                        Because of the massive amount of potential this foundation has, I fully intend to return to this project and expand its capabilities when I have more free time in the future.
                    </p>
                </ProjectSection>
            </div>
        </article>
    );
}
