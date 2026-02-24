'use client';

import { useEffect, useRef } from 'react';
import { useNeuralNetworkStore } from '@/store/neuralNetworkStore';
import { NeuralState } from './types';
import { generateNetwork } from './generator';
import { updateSimulation, firePulse } from './physics';
import { renderFrame } from './renderer';
import { NEURAL_CONFIG } from './config';

export default function NeuralBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const burstActive = useNeuralNetworkStore((s) => s.burstActive);
    const burstRef = useRef(burstActive);

    useEffect(() => { burstRef.current = burstActive; }, [burstActive]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const state: NeuralState = {
            nodes: [],
            actionPotentials: [],
            ghostMarks: [],
            lastRewire: performance.now(),
            lastSpontaneous: performance.now(),
            mouse: { x: -9999, y: -9999 },
            targetScrollY: window.scrollY,
            currentScrollY: window.scrollY,
            w: window.innerWidth,
            h: window.innerHeight,
            currentGenH: window.innerHeight * 3,
        };

        const setSize = () => {
            state.w = window.innerWidth;
            state.h = window.innerHeight;
            canvas.width = state.w;
            canvas.height = state.h;
            state.currentGenH = state.h * 3;
        };
        setSize();

        const network = generateNetwork(state.w, state.currentGenH);
        state.nodes = network.nodes;
        state.actionPotentials = network.actionPotentials;

        let animId = 0;

        const draw = (now: number) => {
            animId = requestAnimationFrame(draw);
            updateSimulation(state, now, burstRef.current);
            renderFrame(ctx, state, now);
        };

        animId = requestAnimationFrame(draw);

        const screenToWorld = (cx: number, cy: number) => {
            const parallaxY = state.currentScrollY * NEURAL_CONFIG.SCROLL_PARALLAX_MULT;
            const scrollZoom = 1 + (state.currentScrollY * NEURAL_CONFIG.SCROLL_ZOOM_MULT);
            return {
                x: (cx - state.w / 2) / scrollZoom + state.w / 2,
                y: (cy - state.h / 2) / scrollZoom + state.h / 2 + parallaxY,
            };
        };

        const onMouseMove = (e: MouseEvent) => {
            const pw = screenToWorld(e.clientX, e.clientY);
            state.mouse.x = pw.x; state.mouse.y = pw.y;
        };
        const onMouseLeave = () => { state.mouse.x = -9999; state.mouse.y = -9999; };
        const onClick = (e: MouseEvent) => {
            const pw = screenToWorld(e.clientX, e.clientY);
            firePulse(state, pw.x, pw.y, performance.now());
        };
        const onResize = () => {
            setSize();
            const nw = generateNetwork(state.w, state.currentGenH);
            state.nodes = nw.nodes;
            state.actionPotentials = nw.actionPotentials;
        };
        const onScroll = () => { state.targetScrollY = window.scrollY; };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        window.addEventListener('click', onClick);
        window.addEventListener('resize', onResize);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            window.removeEventListener('click', onClick);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ backgroundColor: NEURAL_CONFIG.BACKGROUND_COLOR }}
        />
    );
}
