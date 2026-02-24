import { NeuralState } from './types';
import { NEURAL_CONFIG } from './config';
import { getCtrl } from './utils';

export function renderFrame(ctx: CanvasRenderingContext2D, state: NeuralState, now: number) {
    ctx.clearRect(0, 0, state.w, state.h);
    ctx.fillStyle = NEURAL_CONFIG.BACKGROUND_COLOR;
    ctx.fillRect(0, 0, state.w, state.h);

    ctx.save();

    const parallaxY = state.currentScrollY * NEURAL_CONFIG.SCROLL_PARALLAX_MULT;
    const scrollZoom = 1 + (state.currentScrollY * NEURAL_CONFIG.SCROLL_ZOOM_MULT);

    ctx.translate(state.w / 2, state.h / 2);
    ctx.scale(scrollZoom, scrollZoom);
    ctx.translate(-state.w / 2, -state.h / 2);
    ctx.translate(0, -parallaxY);

    for (const mark of state.ghostMarks) {
        const age = now - mark.birth;
        const ttl = mark.kind === 'spark' ? NEURAL_CONFIG.SPARK_TTL : NEURAL_CONFIG.GHOST_TTL;
        const life = 1 - age / ttl;
        const alpha = Math.max(0, life * life);

        if (mark.kind === 'edge') {
            ctx.globalAlpha = alpha * 0.3;
            ctx.lineWidth = 0.8;
            ctx.strokeStyle = `rgba(180, 100, 255, 1)`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = 'rgba(150, 70, 255, 0.3)';
            ctx.beginPath();
            if (mark.curved && mark.cx !== undefined && mark.cy !== undefined) {
                ctx.moveTo(mark.ax, mark.ay);
                ctx.quadraticCurveTo(mark.cx, mark.cy, mark.bx, mark.by);
            } else {
                ctx.moveTo(mark.ax, mark.ay);
                ctx.lineTo(mark.bx, mark.by);
            }
            ctx.stroke();
            ctx.shadowBlur = 0;
        } else if (mark.kind === 'trail') {
            if (mark.points.length >= 2) {
                ctx.globalAlpha = alpha * 0.25;
                ctx.lineWidth = 0.6;
                ctx.strokeStyle = 'rgba(255, 120, 50, 1)';
                ctx.beginPath();
                ctx.moveTo(mark.points[0].x, mark.points[0].y);
                for (let i = 1; i < mark.points.length; i++) {
                    ctx.lineTo(mark.points[i].x, mark.points[i].y);
                }
                ctx.stroke();
            }
        } else if (mark.kind === 'ring') {
            ctx.globalAlpha = alpha * 0.2;
            ctx.lineWidth = 0.8;
            ctx.strokeStyle = 'rgba(255, 150, 80, 1)';
            ctx.beginPath();
            ctx.arc(mark.x, mark.y, mark.r, 0, Math.PI * 2);
            ctx.stroke();
        } else if (mark.kind === 'spark') {
            ctx.globalAlpha = alpha * 0.3;
            ctx.lineWidth = 0.8;
            ctx.strokeStyle = 'rgba(255, 160, 60, 1)';
            ctx.beginPath();
            for (const b of mark.branches) {
                ctx.moveTo(mark.x, mark.y);
                const bx = mark.x + Math.cos(b.angle) * b.length;
                const by = mark.y + Math.sin(b.angle) * b.length;
                ctx.lineTo(bx, by);
            }
            ctx.stroke();

            const progress = Math.min(1, age / 400);
            if (progress < 1) {
                ctx.globalAlpha = 1 - progress;
                ctx.fillStyle = 'rgba(255, 200, 100, 1)';
                for (const b of mark.branches) {
                    const px = mark.x + Math.cos(b.angle) * b.length * progress;
                    const py = mark.y + Math.sin(b.angle) * b.length * progress;
                    ctx.beginPath();
                    ctx.arc(px, py, 1.5, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.globalAlpha = (1 - progress) * 0.3;
                    ctx.beginPath();
                    ctx.arc(px, py, 4, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1 - progress;
                }
            }
        } else if (mark.kind === 'halo') {
            ctx.globalAlpha = alpha * 0.12;
            ctx.beginPath();
            ctx.arc(mark.x, mark.y, mark.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(140, 80, 255, 1)';
            ctx.fill();
        } else if (mark.kind === 'growth') {
            ctx.globalAlpha = alpha * 0.25;
            ctx.lineWidth = 1.0;
            ctx.strokeStyle = 'rgba(100, 255, 180, 1)';
            ctx.shadowBlur = 6;
            ctx.shadowColor = 'rgba(100, 255, 180, 0.3)';
            ctx.beginPath();
            ctx.moveTo(mark.ax, mark.ay);
            ctx.lineTo(mark.bx, mark.by);
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    ctx.lineWidth = 0.5;
    const drawnEdges = new Set<string>();

    for (const node of state.nodes) {
        for (const cid of node.connections) {
            const ek = node.id < cid ? `${node.id}-${cid}` : `${cid}-${node.id}`;
            if (drawnEdges.has(ek)) continue;
            drawnEdges.add(ek);

            const target = state.nodes[cid];
            if (!target) continue;
            const dist = Math.hypot(node.x - target.x, node.y - target.y);
            if (dist > NEURAL_CONFIG.DRAW_MAX_EDGE) continue;

            const falloff = Math.max(0, 1 - dist / NEURAL_CONFIG.DRAW_MAX_EDGE);
            const actBoost = (node.activity + target.activity) * 0.08;
            const zScaleEdge = 0.4 + ((node.z + target.z) / 2) * 0.6;
            const alpha = Math.min(1, falloff * 0.12 + actBoost) * zScaleEdge;

            ctx.globalAlpha = alpha;
            ctx.beginPath();
            if (dist > 120) {
                const cp = getCtrl(node.x, node.y, target.x, target.y);
                ctx.moveTo(node.x, node.y);
                ctx.quadraticCurveTo(cp.cx, cp.cy, target.x, target.y);
            } else {
                const mx = (node.x + target.x) / 2 + Math.sin(node.id + now * 0.001) * 10;
                const my = (node.y + target.y) / 2 + Math.cos(target.id + now * 0.001) * 10;
                ctx.moveTo(node.x, node.y);
                ctx.quadraticCurveTo(mx, my, target.x, target.y);
            }

            const er = Math.floor(NEURAL_CONFIG.EDGE_BASE_R + actBoost * (NEURAL_CONFIG.EDGE_ACT_R - NEURAL_CONFIG.EDGE_BASE_R));
            const eg = Math.floor(NEURAL_CONFIG.EDGE_BASE_G + actBoost * (NEURAL_CONFIG.EDGE_ACT_G - NEURAL_CONFIG.EDGE_BASE_G));
            const eb = Math.floor(NEURAL_CONFIG.EDGE_BASE_B + actBoost * (NEURAL_CONFIG.EDGE_ACT_B - NEURAL_CONFIG.EDGE_BASE_B));
            ctx.strokeStyle = `rgba(${er}, ${eg}, ${eb}, 1)`;
            ctx.stroke();
        }
    }

    ctx.globalAlpha = 1;
    for (const node of state.nodes) {
        const zScale = 0.4 + node.z * 1.2;
        const breathScale = 1 + Math.sin(node.breathPhase) * 0.25;
        const r = (node.radius + node.activity * 2) * breathScale * zScale;

        ctx.globalAlpha = (0.15 + node.activity * 0.6) * zScale;

        ctx.beginPath();
        const points = 7;
        for (let j = 0; j < points; j++) {
            const angle = (j / points) * Math.PI * 2;
            const wiggle = Math.sin(node.breathPhase * 2 + angle * 3) * (r * 0.15);
            const px = node.x + Math.cos(angle + node.breathPhase * 0.2) * (r + wiggle);
            const py = node.y + Math.sin(angle + node.breathPhase * 0.2) * (r + wiggle);
            if (j === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const nr = Math.floor(NEURAL_CONFIG.BASE_R + node.activity * (NEURAL_CONFIG.ACTIVE_R - NEURAL_CONFIG.BASE_R));
        const ng = Math.floor(NEURAL_CONFIG.BASE_G + node.activity * (NEURAL_CONFIG.ACTIVE_G - NEURAL_CONFIG.BASE_G));
        const nb = Math.floor(NEURAL_CONFIG.BASE_B + node.activity * (NEURAL_CONFIG.ACTIVE_B - NEURAL_CONFIG.BASE_B));
        ctx.fillStyle = `rgb(${nr}, ${ng}, ${nb})`;
        ctx.fill();

        ctx.lineWidth = 0.5;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.globalAlpha *= 0.5;
        for (let j = 0; j < 5; j++) {
            const angle = node.breathPhase + j * ((Math.PI * 2) / 5) + node.id;
            const len = r * (1.2 + node.activity * 0.8 + Math.sin(node.breathPhase * 3 + j) * 0.3);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node.x + Math.cos(angle) * len, node.y + Math.sin(angle) * len);
            ctx.stroke();
        }

        if (node.activity > 0.3) {
            ctx.globalAlpha = node.activity * 0.1;
            ctx.beginPath();
            ctx.arc(node.x, node.y, r * 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 160, 60, 1)';
            ctx.fill();
        }
    }

    ctx.globalAlpha = 1;

    for (let i = state.actionPotentials.length - 1; i >= 0; i--) {
        const sig = state.actionPotentials[i];
        const fromNode = state.nodes[sig.fromId];
        const toNode = state.nodes[sig.toId];
        if (!fromNode || !toNode) continue;

        let sx: number, sy: number;
        if (sig.trail.length > 0) {
            sx = sig.trail[sig.trail.length - 1].x;
            sy = sig.trail[sig.trail.length - 1].y;
        } else {
            sx = fromNode.x; sy = fromNode.y;
        }

        if (sig.trail.length >= 2) {
            ctx.globalAlpha = 0.35;
            ctx.lineWidth = 1.2;
            ctx.strokeStyle = 'rgba(255, 180, 50, 1)';
            ctx.beginPath();
            ctx.moveTo(sig.trail[0].x, sig.trail[0].y);
            for (let t = 1; t < sig.trail.length; t++) {
                ctx.lineTo(sig.trail[t].x, sig.trail[t].y);
            }
            ctx.stroke();
        }

        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 240, 160, 1)';
        ctx.fill();

        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.arc(sx, sy, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 120, 20, 1)';
        ctx.fill();
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.restore();
}
