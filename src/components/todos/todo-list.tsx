"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PRIORITY_LABEL } from "@/lib/schemas/todo";
import { cn } from "@/lib/utils";
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
          <li key={t.id} className="flex items-start gap-3 p-3">
            <Checkbox
              checked={t.done}
              onCheckedChange={() => toggle(t.id)}
              aria-label={`${t.title} 완료 표시`}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={cn(t.done && "text-muted-foreground line-through")}>
                  {t.title}
                </span>
                <Badge variant={t.priority === "high" ? "destructive" : "secondary"}>
                  {PRIORITY_LABEL[t.priority]}
                </Badge>
              </div>
              {t.description && (
                <p className="text-sm text-muted-foreground">{t.description}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="삭제"
              onClick={() => {
                remove(t.id);
                toast("삭제했습니다");
              }}
            >
              <Trash2 className="size-4" />
            </Button>
          </li>
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
