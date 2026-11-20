"use client";

import { Button } from "@/components/ui/button";
import { TodoItem } from "./todo-item";
import { useTodoStore } from "@/stores/todo-store";

export function TodoList() {
  const todos = useTodoStore((s) => s.todos);
  const toggle = useTodoStore((s) => s.toggle);
  const remove = useTodoStore((s) => s.remove);
  const clearDone = useTodoStore((s) => s.clearDone);
  const doneCount = todos.filter((t) => t.done).length;

  if (todos.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        아직 할 일이 없습니다. 위에서 추가해보세요.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col divide-y rounded-md border">
        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} onToggle={toggle} onRemove={remove} />
        ))}
      </ul>
      {doneCount > 0 && (
        <Button variant="outline" size="sm" className="self-end" onClick={clearDone}>
          완료 항목 {doneCount}개 지우기
        </Button>
      )}
    </div>
  );
}
