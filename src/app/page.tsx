import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DEMOS } from "@/lib/demos";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Claude Next.js Starter</h1>
        <p className="text-muted-foreground">
          백엔드 없이 프론트만으로 빠르게 웹앱을 만들어보는 학습용 스타터 킷입니다. 카드를
          눌러 기술별 데모를 직접 만져보세요.
        </p>
        <div className="flex gap-2">
          <Link href="/todos" className={buttonVariants()}>
            할 일 예제
          </Link>
          <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
            대시보드 예제
          </Link>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEMOS.map((d) => (
          <Link key={d.slug} href={d.href} className="group">
            <Card className="h-full transition-colors group-hover:border-foreground/30">
              <CardHeader>
                <CardTitle>{d.name}</CardTitle>
                <CardDescription>{d.desc}</CardDescription>
                <p className="pt-2 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                  데모 보기 →
                </p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
