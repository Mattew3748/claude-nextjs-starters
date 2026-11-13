import { create } from "zustand";
import { persist } from "zustand/middleware";

type CounterState = {
  count: number;
  inc: () => void;
  dec: () => void;
  reset: () => void;
};

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      inc: () => set((s) => ({ count: s.count + 1 })),
      dec: () => set((s) => ({ count: s.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    { name: "starter-counter", skipHydration: true },
  ),
);
