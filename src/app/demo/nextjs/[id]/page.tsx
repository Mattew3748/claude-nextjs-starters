import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 빌드 시 미리 렌더할 id 목록 (Cache Components 에서 동적 params 를 정적으로 만드는 방법)
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function DynamicRoutePage({
  params,
}: PageProps<"/demo/nextjs/[id]">) {
  const { id } = await params;

  return (
    <>
      <h1 className="text-2xl font-bold">동적 라우트</h1>
      <Card>
        <CardHeader>
          <CardTitle>
            id = {id} <Badge variant="secondary">서버 컴포넌트</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <p>
            URL 의 <code>[id]</code> 자리에서 받은 값입니다. 주소를 바꿔서 확인해보세요.
          </p>
          <Link href="/demo/nextjs" className="text-primary underline">
            ← 돌아가기
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
