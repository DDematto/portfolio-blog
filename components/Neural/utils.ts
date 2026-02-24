import { GhostMark, NeuralState } from './types';
import { NEURAL_CONFIG } from './config';

export function generatePoissonNodes(w: number, h: number, minDist: number): { x: number; y: number }[] {
    const cellSize = minDist / Math.SQRT2;
    const cols = Math.ceil(w / cellSize);
    const rows = Math.ceil(h / cellSize);
    const points: { x: number; y: number }[] = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (Math.random() > 0.55) continue;
            const jx = (Math.random() - 0.5) * cellSize * 0.85;
            const jy = (Math.random() - 0.5) * cellSize * 0.85;
            const x = col * cellSize + cellSize / 2 + jx;
            const y = row * cellSize + cellSize / 2 + jy;
            if (x > 0 && x < w && y > 0 && y < h) points.push({ x, y });
        }
    }
    return points;
}

export class UnionFind {
    parent: number[];
    rank: number[];
    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }
    find(x: number): number {
        if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
        return this.parent[x];
    }
    union(a: number, b: number): boolean {
        const ra = this.find(a), rb = this.find(b);
        if (ra === rb) return false;
        if (this.rank[ra] < this.rank[rb]) this.parent[ra] = rb;
        else if (this.rank[ra] > this.rank[rb]) this.parent[rb] = ra;
        else { this.parent[rb] = ra; this.rank[ra]++; }
        return true;
    }
}

export const getCtrl = (ax: number, ay: number, bx: number, by: number) => {
    const mx = (ax + bx) / 2, my = (ay + by) / 2;
    const d = Math.hypot(bx - ax, by - ay);
    const nx = -(by - ay) / d, ny = (bx - ax) / d;
    return { cx: mx + nx * d * 0.12, cy: my + ny * d * 0.12 };
};

export const bezPt = (ax: number, ay: number, cx: number, cy: number, bx: number, by: number, t: number) => {
    const u = 1 - t;
    return {
        x: u * u * ax + 2 * u * t * cx + t * t * bx,
        y: u * u * ay + 2 * u * t * cy + t * t * by,
    };
};

export const addGhost = (state: NeuralState, mark: GhostMark) => {
    state.ghostMarks.push(mark);
    if (state.ghostMarks.length > NEURAL_CONFIG.MAX_GHOST_MARKS) {
        state.ghostMarks.splice(0, state.ghostMarks.length - NEURAL_CONFIG.MAX_GHOST_MARKS);
    }
};
