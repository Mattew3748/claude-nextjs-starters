"use client";

import { TodoForm } from "@/components/todos/todo-form";
import { TodoList } from "@/components/todos/todo-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStoreHydrated } from "@/hooks/use-hydrated";
import { useTodoStore } from "@/stores/todo-store";

export default function TodosPage() {
  const hydrated = useStoreHydrated(useTodoStore);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">할 일</h1>
      <Card>
        <CardHeader>
          <CardTitle>새 할 일</CardTitle>
          <CardDescription>react-hook-form + zod 검증 예제</CardDescription>
        </CardHeader>
        <CardContent>
          <TodoForm />
        </CardContent>
      </Card>
      {hydrated ? (
        <TodoList />
      ) : (
        <p className="text-sm text-muted-foreground">불러오는 중…</p>
      )}
    </div>
  );
}
