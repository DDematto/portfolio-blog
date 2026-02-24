import { Neuron, ActionPotential } from './types';
import { generatePoissonNodes, UnionFind } from './utils';
import { NEURAL_CONFIG } from './config';

/**
 * Generates the neural network structure using a modified Poisson-disc sampling approach
 * combined with Kruskal's algorithm (via Union-Find) to ensure a single, fully-connected 
 * graph, preventing isolated sub-networks.
 * 
 * The algorithm forces edges between disjoint sets and spawns "stepping stone" neurons 
 * if clusters are too far apart, ensuring signals can always traverse the entire network.
 * 
 * @param w Canvas width
 * @param currentGenH Canvas height (often multiplied for trailing vertical space)
 * @returns Initialized NeuralState nodes and empty action potentials array
 */
export function generateNetwork(w: number, currentGenH: number) {
    const nodes: Neuron[] = [];
    const actionPotentials: ActionPotential[] = [];

    const spacing = Math.sqrt((w * currentGenH) / NEURAL_CONFIG.DENSITY_FACTOR);
    const rawPoints = generatePoissonNodes(w, currentGenH, spacing);

    rawPoints.forEach((p, i) => {
        nodes.push({
            id: i, x: p.x, y: p.y, baseX: p.x, baseY: p.y, z: Math.random(),
            radius: NEURAL_CONFIG.NODE_RADIUS_MIN + Math.random() * NEURAL_CONFIG.NODE_RADIUS_MAX,
            activity: 0, pulseRadius: 0,
            breathPhase: Math.random() * Math.PI * 2,
            connections: [], signalCount: 0,
            refractoryUntil: 0,
        });
    });

    const maxEdgeDist = spacing * NEURAL_CONFIG.MAX_EDGE_DIST_MULT;
    nodes.forEach((node) => {
        const sorted = nodes
            .filter((n) => n.id !== node.id)
            .map((n) => ({ id: n.id, dist: Math.hypot(node.x - n.x, node.y - n.y) }))
            .sort((a, b) => a.dist - b.dist);

        sorted.slice(0, 3).forEach(({ id, dist }) => {
            if (dist < maxEdgeDist) {
                if (!node.connections.includes(id)) node.connections.push(id);
                if (!nodes[id].connections.includes(node.id))
                    nodes[id].connections.push(node.id);
            }
        });
    });

    const uf = new UnionFind(nodes.length);
    nodes.forEach((n) => n.connections.forEach((c) => uf.union(n.id, c)));

    const clusterEdges: { a: number; b: number; dist: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (uf.find(nodes[i].id) !== uf.find(nodes[j].id)) {
                clusterEdges.push({
                    a: i,
                    b: j,
                    dist: Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
                });
            }
        }
    }

    clusterEdges.sort((a, b) => a.dist - b.dist);
    const maxAllowedDist = spacing * NEURAL_CONFIG.CLUSTER_ALLOWED_DIST_MULT;

    for (const e of clusterEdges) {
        if (uf.union(e.a, e.b)) {
            if (e.dist <= maxAllowedDist) {
                nodes[e.a].connections.push(e.b);
                nodes[e.b].connections.push(e.a);
            } else {
                const numSteps = Math.ceil(e.dist / maxAllowedDist);
                let prevId = e.a;
                for (let k = 1; k < numSteps; k++) {
                    const t = k / numSteps;
                    const nx = nodes[e.a].x + (nodes[e.b].x - nodes[e.a].x) * t;
                    const ny = nodes[e.a].y + (nodes[e.b].y - nodes[e.a].y) * t;

                    const jx = (Math.random() - 0.5) * (maxAllowedDist * 0.4);
                    const jy = (Math.random() - 0.5) * (maxAllowedDist * 0.4);

                    const newId = nodes.length;
                    nodes.push({
                        id: newId, x: nx + jx, y: ny + jy, baseX: nx + jx, baseY: ny + jy, z: Math.random(),
                        radius: NEURAL_CONFIG.NODE_RADIUS_MIN + Math.random() * NEURAL_CONFIG.NODE_RADIUS_MAX,
                        activity: 0, pulseRadius: 0,
                        breathPhase: Math.random() * Math.PI * 2,
                        connections: [prevId], signalCount: 0,
                        refractoryUntil: 0,
                    });
                    nodes[prevId].connections.push(newId);
                    uf.parent.push(uf.find(prevId));
                    uf.rank.push(0);

                    prevId = newId;
                }
                nodes[prevId].connections.push(e.b);
                nodes[e.b].connections.push(prevId);
            }
        }
    }

    for (let i = 0; i < Math.floor(nodes.length * NEURAL_CONFIG.WORMHOLE_CHANCE); i++) {
        const a = Math.floor(Math.random() * nodes.length);
        const candidates = nodes
            .map((n, idx) => ({ id: n.id, dist: Math.hypot(nodes[a].x - n.x, nodes[a].y - n.y) }))
            .filter(c => c.id !== a && !nodes[a].connections.includes(c.id) && c.dist > 150 && c.dist < maxAllowedDist * 1.5);

        if (candidates.length > 0) {
            const b = candidates[Math.floor(Math.random() * candidates.length)].id;
            nodes[a].connections.push(b);
            nodes[b].connections.push(a);
        }
    }

    return { nodes, actionPotentials };
}
