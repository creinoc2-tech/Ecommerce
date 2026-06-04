import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface CounterStore {
  counts: Record<string, number>; // 👈 clave: productId -> count
  increment: (id: string) => void;
  decrement: (id: string) => void;
}

const storeApi: StateCreator<CounterStore> = (set) => ({
  counts: {},

  increment: (id) => {
    set((state) => ({
      counts: {
        ...state.counts,
        [id]: (state.counts[id] ?? 1) + 1,
      },
    }));
  },

  decrement: (id) => {
    set((state) => ({
      counts: {
        ...state.counts,
        [id]: Math.max(1, (state.counts[id] ?? 1) - 1),
      },
    }));
  },
});

export const useCounterStore = create<CounterStore>()(
  devtools(storeApi)
);