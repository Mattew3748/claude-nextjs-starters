export type Demo = {
  slug: string;
  name: string;
  desc: string;
  href: string;
};

export const DEMOS: Demo[] = [
  {
    slug: "nextjs",
    name: "Next.js",
    desc: "파일 기반 라우팅 · 동적 라우트",
    href: "/demo/nextjs",
  },
  {
    slug: "react",
    name: "React",
    desc: "useState · useEffect · useMemo",
    href: "/demo/react",
  },
  {
    slug: "tailwind",
    name: "Tailwind CSS",
    desc: "유틸리티 클래스 실시간 조작",
    href: "/demo/tailwind",
  },
  {
    slug: "shadcn",
    name: "shadcn/ui",
    desc: "컴포넌트 갤러리",
    href: "/demo/shadcn",
  },
  {
    slug: "zustand",
    name: "Zustand",
    desc: "전역 상태 · localStorage 영속",
    href: "/demo/zustand",
  },
  {
    slug: "form",
    name: "폼 · 검증",
    desc: "react-hook-form + zod",
    href: "/demo/form",
  },
];
