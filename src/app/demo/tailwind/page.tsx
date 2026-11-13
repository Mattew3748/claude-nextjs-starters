"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Tailwind 는 소스에서 완성된 클래스 문자열만 인식하므로 `p-${n}` 처럼 조립하지 않고 전부 적어둔다.
const OPTIONS = {
  padding: ["p-2", "p-6", "p-10"],
  rounded: ["rounded-none", "rounded-lg", "rounded-full"],
  color: ["bg-blue-500", "bg-emerald-500", "bg-rose-500"],
  shadow: ["shadow-none", "shadow-md", "shadow-xl"],
} as const;

type Group = keyof typeof OPTIONS;

export default function TailwindDemoPage() {
  const [picked, setPicked] = useState<Record<Group, string>>({
    padding: OPTIONS.padding[1],
    rounded: OPTIONS.rounded[1],
    color: OPTIONS.color[0],
    shadow: OPTIONS.shadow[1],
  });

  const className = cn("text-center text-white transition-all", Object.values(picked));

  return (
    <>
      <h1 className="text-2xl font-bold">Tailwind CSS</h1>
      <Card>
        <CardHeader>
          <CardTitle>클래스 조작</CardTitle>
          <CardDescription>
            버튼을 눌러 클래스를 바꾸면 박스가 즉시 바뀝니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {(Object.keys(OPTIONS) as Group[]).map((group) => (
            <div key={group} className="flex flex-wrap items-center gap-2">
              <span className="w-16 text-sm text-muted-foreground">{group}</span>
              {OPTIONS[group].map((value) => (
                <Button
                  key={value}
                  size="sm"
                  variant={picked[group] === value ? "default" : "outline"}
                  onClick={() => setPicked((p) => ({ ...p, [group]: value }))}
                >
                  {value}
                </Button>
              ))}
            </div>
          ))}
          <div className="flex min-h-40 items-center justify-center rounded-lg border bg-muted/30 p-4">
            <div className={className}>미리보기</div>
          </div>
          <code className="rounded-md bg-muted p-3 text-xs break-all">{className}</code>
        </CardContent>
      </Card>
    </>
  );
}
