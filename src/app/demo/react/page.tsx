"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const FRUITS = ["사과", "바나나", "포도", "딸기", "수박", "복숭아", "귤", "참외", "망고"];

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>useState</CardTitle>
        <CardDescription>값이 바뀌면 컴포넌트가 다시 그려집니다.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <Button variant="outline" onClick={() => setCount((c) => c - 1)}>
          −
        </Button>
        <span className="w-10 text-center text-xl tabular-nums">{count}</span>
        <Button onClick={() => setCount((c) => c + 1)}>+</Button>
      </CardContent>
    </Card>
  );
}

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer); // 정리(cleanup)
  }, [running]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>useEffect</CardTitle>
        <CardDescription>
          running 이 바뀔 때마다 타이머를 켜고, 끌 때 정리합니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <span className="w-16 text-xl tabular-nums">{seconds}초</span>
        <Button onClick={() => setRunning((r) => !r)}>{running ? "정지" : "시작"}</Button>
        <Button
          variant="outline"
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
        >
          초기화
        </Button>
      </CardContent>
    </Card>
  );
}

function SearchList() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => FRUITS.filter((f) => f.includes(query.trim())), [query]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>useMemo</CardTitle>
        <CardDescription>query 가 바뀔 때만 목록을 다시 계산합니다.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Input
          placeholder="과일 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          {filtered.length > 0 ? filtered.join(", ") : "결과 없음"}
        </p>
      </CardContent>
    </Card>
  );
}

export default function ReactDemoPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">React</h1>
      <Counter />
      <Stopwatch />
      <SearchList />
    </>
  );
}
