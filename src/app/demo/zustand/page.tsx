"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStoreHydrated } from "@/hooks/use-hydrated";
import { useCounterStore } from "@/stores/counter-store";

// 두 컴포넌트는 서로 props 를 주고받지 않고 같은 스토어만 바라본다.
function CounterControls() {
  const inc = useCounterStore((s) => s.inc);
  const dec = useCounterStore((s) => s.dec);
  const reset = useCounterStore((s) => s.reset);

  return (
    <Card>
      <CardHeader>
        <CardTitle>컴포넌트 A — 조작</CardTitle>
        <CardDescription>여기서 값을 바꿉니다.</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button variant="outline" onClick={dec}>
          −
        </Button>
        <Button onClick={inc}>+</Button>
        <Button variant="ghost" onClick={reset}>
          초기화
        </Button>
      </CardContent>
    </Card>
  );
}

function CounterDisplay({ hydrated }: { hydrated: boolean }) {
  const count = useCounterStore((s) => s.count);

  return (
    <Card>
      <CardHeader>
        <CardTitle>컴포넌트 B — 표시</CardTitle>
        <CardDescription>A 의 조작이 그대로 반영됩니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-4xl font-bold tabular-nums">{hydrated ? count : "–"}</span>
      </CardContent>
    </Card>
  );
}

export default function ZustandDemoPage() {
  const hydrated = useStoreHydrated(useCounterStore);

  return (
    <>
      <h1 className="text-2xl font-bold">Zustand</h1>
      <p className="text-sm text-muted-foreground">
        값을 바꾼 뒤 새로고침해보세요. persist 미들웨어가 localStorage(
        <code>starter-counter</code>)에 저장해서 유지됩니다.
      </p>
      <CounterControls />
      <CounterDisplay hydrated={hydrated} />
    </>
  );
}
