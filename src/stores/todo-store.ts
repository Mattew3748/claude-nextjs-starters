import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Todo, TodoFormValues } from "@/lib/schemas/todo";

type TodoState = {
  todos: Todo[];
  add: (values: TodoFormValues) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clearDone: () => void;
};

// 백엔드 없이 localStorage("starter-todos")에 영속화.
// SSR 하이드레이션 불일치를 피하려고 skipHydration + useHydrated 훅 조합을 쓴다.
export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      add: (values) =>
        set((s) => ({
          todos: [
            {
              ...values,
              id: crypto.randomUUID(),
              done: false,
              createdAt: Date.now(),
            },
            ...s.todos,
          ],
        })),
      toggle: (id) =>
        set((s) => ({
          todos: s.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),
      remove: (id) => set((s) => ({ todos: s.todos.filter((t) => t.id !== id) })),
      clearDone: () => set((s) => ({ todos: s.todos.filter((t) => !t.done) })),
    }),
    { name: "starter-todos", skipHydration: true },
  ),
);
