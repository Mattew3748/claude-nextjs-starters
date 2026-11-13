import { DemoNav } from "@/components/demo/demo-nav";

export default function DemoLayout({ children }: LayoutProps<"/demo">) {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <DemoNav />
      <div className="flex min-w-0 flex-1 flex-col gap-6">{children}</div>
    </div>
  );
}
