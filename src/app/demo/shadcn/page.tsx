"use client";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-2">{children}</CardContent>
    </Card>
  );
}

export default function ShadcnDemoPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">shadcn/ui</h1>
      <CardDescription>
        새 컴포넌트는 <code>npx shadcn@latest add &lt;name&gt;</code> 으로 추가합니다.
      </CardDescription>

      <Section title="Button">
        <Button>default</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="outline">outline</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="link">link</Button>
      </Section>

      <Section title="Badge">
        <Badge>default</Badge>
        <Badge variant="secondary">secondary</Badge>
        <Badge variant="outline">outline</Badge>
        <Badge variant="destructive">destructive</Badge>
      </Section>

      <Section title="Dialog · Sheet">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            다이얼로그 열기
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>다이얼로그</DialogTitle>
              <DialogDescription>화면 가운데에 뜨는 모달입니다.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>시트 열기</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>시트</SheetTitle>
              <SheetDescription>가장자리에서 밀려 나오는 패널입니다.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Section>

      <Section title="Select">
        <Select defaultValue="react">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="svelte">Svelte</SelectItem>
          </SelectContent>
        </Select>
      </Section>

      <Card>
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="a">
            <TabsList>
              <TabsTrigger value="a">탭 A</TabsTrigger>
              <TabsTrigger value="b">탭 B</TabsTrigger>
            </TabsList>
            <TabsContent value="a">A 탭의 내용</TabsContent>
            <TabsContent value="b">B 탭의 내용</TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Section title="Toast (sonner)">
        <Button onClick={() => toast("기본 토스트")}>기본</Button>
        <Button variant="outline" onClick={() => toast.success("성공했습니다")}>
          성공
        </Button>
        <Button variant="outline" onClick={() => toast.error("오류가 발생했습니다")}>
          오류
        </Button>
      </Section>
    </>
  );
}
