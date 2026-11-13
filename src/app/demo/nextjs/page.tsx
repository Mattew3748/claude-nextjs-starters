import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const IDS = ["1", "2", "3"];

// 서버 컴포넌트: "use client" 가 없으면 서버에서 렌더된다.
export default function NextjsDemoPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Next.js</h1>
      <Card>
        <CardHeader>
          <CardTitle>파일 기반 라우팅</CardTitle>
          <CardDescription>폴더 구조가 곧 URL 입니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 font-mono text-sm">
          <p>
            <code>src/app/page.tsx</code> → <code>/</code>
          </p>
          <p>
            <code>src/app/todos/page.tsx</code> → <code>/todos</code>
          </p>
          <p>
            <code>src/app/demo/nextjs/[id]/page.tsx</code> → <code>/demo/nextjs/1</code>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            동적 라우트 <Badge variant="secondary">서버 컴포넌트</Badge>
          </CardTitle>
          <CardDescription>
            <code>[id]</code> 폴더가 URL 의 값을 <code>params</code> 로 받습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          {IDS.map((id) => (
            <Link
              key={id}
              href={`/demo/nextjs/${id}`}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
            >
              /demo/nextjs/{id}
            </Link>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
