import { z } from "zod";

export const todoFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "제목을 입력해주세요")
    .max(100, "제목은 100자 이하여야 합니다"),
  description: z.string().trim().max(500, "설명은 500자 이하여야 합니다"),
  priority: z.enum(["low", "medium", "high"]),
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;

export type Todo = TodoFormValues & {
  id: string;
  done: boolean;
  createdAt: number;
};

export const PRIORITY_LABEL: Record<TodoFormValues["priority"], string> = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};
