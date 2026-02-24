import { NeuralState, Neuron } from './types';
import { NEURAL_CONFIG } from './config';
import { addGhost, getCtrl, bezPt } from './utils';

export const fireActionPotential = (state: NeuralState, fromNode: Neuron, now: number, excludeId?: number) => {
    if (state.actionPotentials.length >= NEURAL_CONFIG.MAX_SIGNALS) return;
    if (now < fromNode.refractoryUntil) return;

    fromNode.activity = 1;
    fromNode.refractoryUntil = now + NEURAL_CONFIG.REFRACTORY_PERIOD;

    const valid = fromNode.connections.filter((id) => {
        const target = state.nodes[id];
        return target !== undefined && id !== excludeId && now >= target.refractoryUntil;
    });

    for (let i = 0; i < valid.length; i++) {
        if (Math.random() > NEURAL_CONFIG.SYNAPSE_FIRE_CHANCE) continue;
        if (state.actionPotentials.length >= NEURAL_CONFIG.MAX_SIGNALS) break;

        state.actionPotentials.push({
            fromId: fromNode.id, toId: valid[i],
            progress: 0,
            speed: 0.005 + Math.random() * 0.005,
            trail: [],
        });
    }

    if (valid.length > 0 && Math.random() > NEURAL_CONFIG.SYNAPSE_FALLBACK_CHANCE) {
        const fallbackId = valid[Math.floor(Math.random() * valid.length)];
        if (state.actionPotentials.length < NEURAL_CONFIG.MAX_SIGNALS) {
            state.actionPotentials.push({
                fromId: fromNode.id, toId: fallbackId,
                progress: 0,
                speed: 0.005 + Math.random() * 0.005,
                trail: [],
            });
        }
    }
};

export const firePulse = (state: NeuralState, cx: number, cy: number, now: number) => {
    let fired = 0;
    for (const node of state.nodes) {
        const d = Math.hypot(node.x - cx, node.y - cy);
        if (d < NEURAL_CONFIG.PULSE_RADIUS && fired < 3 && now >= node.refractoryUntil) {
            fireActionPotential(state, node, now);
            fired++;
        }
    }
};

export const performRewire = (state: NeuralState, now: number) => {
    if (state.nodes.length < 3) return;
    const node = state.nodes[Math.floor(Math.random() * state.nodes.length)];

    if (node.signalCount > 2 && node.connections.length < 6) {
        const candidates = state.nodes
            .filter((n) => n.id !== node.id && !node.connections.includes(n.id))
            .map((n) => ({ id: n.id, dist: Math.hypot(node.x - n.x, node.y - n.y) }))
            .filter((c) => c.dist < 300)
            .sort((a, b) => a.dist - b.dist);

        if (candidates.length > 0) {
            const newConn = candidates[0].id;
            node.connections.push(newConn);
            state.nodes[newConn].connections.push(node.id);
            addGhost(state, {
                kind: 'growth',
                ax: node.x, ay: node.y,
                bx: state.nodes[newConn].x, by: state.nodes[newConn].y,
                birth: now,
            });
        }
    }

    if (node.connections.length > 2 && Math.random() < 0.3) {
        let minIdx = 0, minCount = Infinity;
        node.connections.forEach((cid, idx) => {
            const combined = node.signalCount + (state.nodes[cid]?.signalCount || 0);
            if (combined < minCount) { minCount = combined; minIdx = idx; }
        });
        const removedId = node.connections[minIdx];
        node.connections.splice(minIdx, 1);
        const partner = state.nodes[removedId];
        if (partner) {
            const ri = partner.connections.indexOf(node.id);
            if (ri !== -1) partner.connections.splice(ri, 1);
            addGhost(state, {
                kind: 'edge', curved: false,
                ax: node.x, ay: node.y,
                bx: partner.x, by: partner.y,
                birth: now,
            });
        }
    }

    for (const n of state.nodes) {
        n.baseX += (Math.random() - 0.5) * 3;
        n.baseY += (Math.random() - 0.5) * 3;
        n.baseX = Math.max(20, Math.min(state.w - 20, n.baseX));
        n.baseY = Math.max(20, Math.min(state.currentGenH - 20, n.baseY));
        n.signalCount = Math.max(0, n.signalCount - 1);
    }
};

export const updateSimulation = (state: NeuralState, now: number, burstActive: boolean) => {
    state.currentScrollY += (state.targetScrollY - state.currentScrollY) * NEURAL_CONFIG.SCROLL_SMOOTHING;

    if (now - state.lastRewire > NEURAL_CONFIG.REWIRE_INTERVAL) {
        performRewire(state, now);
        state.lastRewire = now;
    }

    state.ghostMarks = state.ghostMarks.filter((m) => now - m.birth < (m.kind === 'spark' ? NEURAL_CONFIG.SPARK_TTL : NEURAL_CONFIG.GHOST_TTL));

    if (Math.abs(state.currentScrollY - state.targetScrollY) > 2) {
        if (state.currentScrollY < 150 || state.currentScrollY > document.body.scrollHeight - state.h - 150) {
            if (Math.random() < 0.2) fireActionPotential(state, state.nodes[Math.floor(Math.random() * state.nodes.length)], now);
        }
    }

    if (Math.random() < NEURAL_CONFIG.BACKGROUND_FIRE_CHANCE) {
        fireActionPotential(state, state.nodes[Math.floor(Math.random() * state.nodes.length)], now);
    }

    if (now - state.lastSpontaneous > NEURAL_CONFIG.SPONTANEOUS_INTERVAL_MIN + Math.random() * (NEURAL_CONFIG.SPONTANEOUS_INTERVAL_MAX - NEURAL_CONFIG.SPONTANEOUS_INTERVAL_MIN)) {
        state.lastSpontaneous = now;
        const hub = state.nodes.reduce((best, n) => n.connections.length > best.connections.length ? n : best, state.nodes[0]);
        const burstCount = NEURAL_CONFIG.SPONTANEOUS_BURST_MIN + Math.floor(Math.random() * (NEURAL_CONFIG.SPONTANEOUS_BURST_MAX - NEURAL_CONFIG.SPONTANEOUS_BURST_MIN));
        for (let i = 0; i < burstCount; i++) fireActionPotential(state, hub, now);

        if (Math.random() < NEURAL_CONFIG.SPONTANEOUS_PULSE_CHANCE) {
            const center = state.nodes[Math.floor(Math.random() * state.nodes.length)];
            firePulse(state, center.x, center.y, now);
        }
    }

    if (burstActive) {
        for (let i = 0; i < 3; i++) {
            if (Math.random() > 1 - NEURAL_CONFIG.BURST_FIRE_CHANCE)
                fireActionPotential(state, state.nodes[Math.floor(Math.random() * state.nodes.length)], now);
        }
    }

    for (const node of state.nodes) {
        const driftX = Math.sin(now * 0.0004 + node.id * 1.7) * 15 + Math.sin(now * 0.00015 + node.id * 3.1) * 8;
        const driftY = Math.cos(now * 0.0004 + node.id * 2.3) * 15 + Math.cos(now * 0.00015 + node.id * 2.7) * 8;

        const targetX = node.baseX + driftX;
        const targetY = node.baseY + driftY;

        node.x += (targetX - node.x) * 0.02;
        node.y += (targetY - node.y) * 0.02;

        node.breathPhase += 0.02 + node.id * 0.0001;

        const baseline = Math.max(0, Math.sin(node.breathPhase * 0.5) * 0.15 - 0.05);
        if (node.activity > baseline) {
            node.activity = Math.max(baseline, node.activity - 0.015);
        } else {
            node.activity = Math.min(baseline, node.activity + 0.005);
        }

        if (node.pulseRadius > 0) node.pulseRadius *= 0.93;
    }

    for (let i = state.actionPotentials.length - 1; i >= 0; i--) {
        const sig = state.actionPotentials[i];
        sig.progress += sig.speed;

        const fromNode = state.nodes[sig.fromId];
        const toNode = state.nodes[sig.toId];
        if (!fromNode || !toNode) { state.actionPotentials.splice(i, 1); continue; }

        const dist = Math.hypot(fromNode.x - toNode.x, fromNode.y - toNode.y);
        const useCurve = dist > 120;

        let sx: number, sy: number;
        if (useCurve) {
            const cp = getCtrl(fromNode.x, fromNode.y, toNode.x, toNode.y);
            const pt = bezPt(fromNode.x, fromNode.y, cp.cx, cp.cy, toNode.x, toNode.y, sig.progress);
            sx = pt.x; sy = pt.y;
        } else {
            sx = fromNode.x + (toNode.x - fromNode.x) * sig.progress;
            sy = fromNode.y + (toNode.y - fromNode.y) * sig.progress;
        }

        sig.trail.push({ x: sx, y: sy });
        if (sig.trail.length > NEURAL_CONFIG.TRAIL_LENGTH) sig.trail.shift();

        if (sig.progress >= 1) {
            toNode.activity = 1;
            toNode.pulseRadius = 10;
            toNode.signalCount++;

            if (useCurve) {
                const cp = getCtrl(fromNode.x, fromNode.y, toNode.x, toNode.y);
                addGhost(state, {
                    kind: 'edge', curved: true,
                    ax: fromNode.x, ay: fromNode.y,
                    bx: toNode.x, by: toNode.y,
                    cx: cp.cx, cy: cp.cy,
                    birth: now,
                });
            } else {
                const mx = (fromNode.x + toNode.x) / 2 + Math.sin(fromNode.id + now * 0.001) * 10;
                const my = (fromNode.y + toNode.y) / 2 + Math.cos(toNode.id + now * 0.001) * 10;
                addGhost(state, {
                    kind: 'edge', curved: true,
                    ax: fromNode.x, ay: fromNode.y,
                    bx: toNode.x, by: toNode.y,
                    cx: mx, cy: my,
                    birth: now,
                });
            }

            const branches = Array.from({ length: 3 + Math.floor(Math.random() * 3) }, () => ({
                angle: Math.random() * Math.PI * 2,
                length: 4 + Math.random() * 8
            }));
            addGhost(state, { kind: 'spark', x: toNode.x, y: toNode.y, r: 2, angle: Math.random() * Math.PI * 2, branches, birth: now });

            if (now >= toNode.refractoryUntil) {
                fireActionPotential(state, toNode, now, fromNode.id);
            }
            state.actionPotentials.splice(i, 1);
            continue;
        }

        if (sig.trail.length >= 2 && Math.random() < 0.3) {
            addGhost(state, { kind: 'trail', points: [...sig.trail], birth: now });
        }
    }
};
