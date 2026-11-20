"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PRIORITY_LABEL, type Todo } from "@/lib/schemas/todo";
import { cn } from "@/lib/utils";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export function TodoItem({ todo: t, onToggle, onRemove }: TodoItemProps) {
  return (
    <li className="flex items-start gap-3 p-3">
      <Checkbox
        checked={t.done}
        onCheckedChange={() => onToggle(t.id)}
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
          onRemove(t.id);
          toast("");
        }}
      >
        <Trash2 className="size-4" />
      </Button>
    </li>
  );
}
