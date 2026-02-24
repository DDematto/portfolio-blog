import { Project } from '@/types/project';
import { ProjectHeader } from '@/components/Projects/ProjectHeader';
import { ProjectSection } from '@/components/Projects/ProjectSection';
import { ProjectMedia } from '@/components/Projects/ProjectMedia';

export const projectData: Project = {
    id: "tommy",
    title: "Tommy's Adventure",
    description: "A fun and interactive web game showcasing complex state management and physics.",
    tags: ["Unity", "C#", "Game Dev"],
    date: "2022-05-10",
};

export default function TommysAdventure() {
    return (
        <article className="pb-20">
            <ProjectHeader project={projectData} className="mb-16" />

            <div className="max-w-3xl mx-auto space-y-24">
                <ProjectSection title="Overview">
                    <p>
                        <strong>Tommy's Adventure</strong> is a fast-paced, 2D platformer developed in Unity using C#. It serves as an exploration into tight physics controllers, satisfying game loops, and responsive state management within the context of a game engine.
                    </p>
                    <p>
                        The premise is simple but challenging: navigate the protagonist, Tommy, through a series of increasingly difficult levels filled with hazards, relying on precise timing and momentum.
                    </p>
                </ProjectSection>

                <ProjectSection title="Development Highlights">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Custom Physics Controller</h3>
                            <p>
                                Instead of relying entirely on Unity's built-in Rigidbody physics, I developed a custom kinematic character controller. This allowed for exact tuning of acceleration, deceleration, jump arcs, and wall-sliding mechanics, ensuring the controls felt crisp and predictable—a necessity for platformers.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">State Machine Architecture</h3>
                            <p>
                                Tommy's behavior (Idle, Running, Jumping, Falling, Wall Clinging) is governed by a robust Finite State Machine (FSM). This structure made it easy to manage transitions between animations and physics states without creating tangled "spaghetti code."
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Level Design & Tools</h3>
                            <p>
                                I utilized Unity's Tilemap system to rapidly prototype and iterate on level designs. Custom editor scripts were written to automate the placement of recurring hazards and collectibles, streamlining the creative process.
                            </p>
                        </div>
                    </div>
                </ProjectSection>

                <ProjectSection title="Lessons Learned">
                    <p>
                        This project reinforced the importance of "game feel." Small tweaks to coyote time (allowing a jump just after leaving a ledge) and jump buffering drastically improved the player experience, highlighting how subtle technical adjustments impact user perception.
                    </p>
                </ProjectSection>
            </div>
        </article>
    );
}
