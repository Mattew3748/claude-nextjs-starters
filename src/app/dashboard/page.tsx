"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStoreHydrated } from "@/hooks/use-hydrated";
import { PRIORITY_LABEL } from "@/lib/schemas/todo";
import { useTodoStore } from "@/stores/todo-store";

export default function DashboardPage() {
  const hydrated = useStoreHydrated(useTodoStore);
  const todos = useTodoStore((s) => s.todos);

  const total = todos.length;
  const done = todos.filter((t) => t.done).length;
  const high = todos.filter((t) => t.priority === "high" && !t.done).length;

  const stats = [
    { label: "전체", value: total },
    { label: "완료", value: done },
    { label: "진행 중", value: total - done },
    { label: "높음(미완료)", value: high },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">대시보드</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardDescription>{s.label}</CardDescription>
              <CardTitle className="text-3xl">{hydrated ? s.value : "–"}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>최근 할 일</CardTitle>
          <CardDescription>/todos 에서 추가한 데이터가 그대로 집계됩니다</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>제목</TableHead>
                <TableHead>우선순위</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hydrated &&
                todos.slice(0, 5).map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.title}</TableCell>
                    <TableCell>{PRIORITY_LABEL[t.priority]}</TableCell>
                    <TableCell>
                      <Badge variant={t.done ? "secondary" : "outline"}>
                        {t.done ? "완료" : "진행 중"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
