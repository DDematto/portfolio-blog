export interface Neuron {
    id: number;
    x: number;
    y: number;
    z: number;
    baseX: number;
    baseY: number;
    radius: number;
    activity: number;
    pulseRadius: number;
    breathPhase: number;
    connections: number[];
    signalCount: number;
    refractoryUntil: number;
}

export interface ActionPotential {
    fromId: number;
    toId: number;
    progress: number;
    speed: number;
    trail: { x: number; y: number }[];
}

export type GhostMark =
    | { kind: 'edge'; ax: number; ay: number; bx: number; by: number; cx?: number; cy?: number; curved: boolean; birth: number }
    | { kind: 'ring'; x: number; y: number; r: number; birth: number }
    | { kind: 'halo'; x: number; y: number; r: number; birth: number }
    | { kind: 'growth'; ax: number; ay: number; bx: number; by: number; birth: number }
    | { kind: 'spark'; x: number; y: number; r: number; angle: number; branches: { angle: number, length: number }[]; birth: number }
    | { kind: 'trail'; points: { x: number; y: number }[]; birth: number };

export interface NeuralState {
    nodes: Neuron[];
    actionPotentials: ActionPotential[];
    ghostMarks: GhostMark[];
    lastRewire: number;
    lastSpontaneous: number;
    mouse: { x: number; y: number };
    targetScrollY: number;
    currentScrollY: number;
    w: number;
    h: number;
    currentGenH: number;
}
