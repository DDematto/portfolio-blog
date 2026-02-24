import { create } from 'zustand';

interface NeuralNetworkState {
    burstActive: boolean;
    triggerBurst: () => void;
}

export const useNeuralNetworkStore = create<NeuralNetworkState>((set) => ({
    burstActive: false,
    triggerBurst: () => {
        set({ burstActive: true });
        // Reset burst state after the explosion effect completes
        setTimeout(() => set({ burstActive: false }), 1500);
    },
}));
