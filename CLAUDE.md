# Claude Next.js Starter

Claude 학습용으로 웹앱을 빠르게 만들어보는 스타터 킷. **백엔드 없음** — 모든 데이터는 프론트(Zustand + localStorage)에서 처리한다.

@AGENTS.md

## 스택
Next.js (App Router, Turbopack) · React · TypeScript · Tailwind CSS v4 · shadcn/ui (Base UI 기반) · Zustand · react-hook-form + zod · next-themes · sonner

## 명령어
```bash
npm run dev          # 개발 서버 (http://localhost:4000)
npm run build        # 프로덕션 빌드
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run format       # Prettier (tailwind 클래스 자동 정렬)
```
작업 끝나면 `lint` → `typecheck` → `build` 순으로 확인.

## 폴더 규칙
```
src/app/                 라우트 (page.tsx, layout.tsx)
src/components/ui/       shadcn 생성물 — 직접 수정 지양, 필요하면 래퍼 컴포넌트로 감싼다
src/components/<기능>/    기능별 컴포넌트 (todos/, layout/ ...)
src/stores/              zustand 스토어 (persist → localStorage)
src/lib/schemas/         zod 스키마 + 파생 타입 (폼·스토어 공용)
src/hooks/               커스텀 훅
```

## 규칙
- 서버/DB/API 라우트를 만들지 않는다. 데이터는 `src/stores/` 의 persist 스토어에 둔다.
- persist 스토어는 `skipHydration: true` + `useTodoHydrated` 같은 훅으로 마운트 후 복원 (SSR 하이드레이션 불일치 방지). 스토어를 쓰는 페이지는 `"use client"`.
- 폼은 react-hook-form + zod(`zodResolver`) + `components/ui/field.tsx`. 스키마는 `lib/schemas/` 에 두고 타입은 `z.infer` 로 파생.
- 스타일은 Tailwind 유틸리티 + shadcn 토큰(`bg-background`, `text-muted-foreground` 등). 하드코딩 색상 지양. 다크모드는 `dark:` 변형.
- 클래스 병합은 `cn()` (`@/lib/utils`).
- 이 shadcn 버전은 **Base UI** 기반이라 `asChild` 가 없다. 트리거 교체는 `render={<Button />}`, 링크 버튼은 `<Link className={buttonVariants()}>`.
- 이 Next.js 는 학습 데이터와 다를 수 있다 — API 를 쓰기 전 `node_modules/next/dist/docs/` 확인 (AGENTS.md 참고).

## 새 기능 추가 레시피
1. `lib/schemas/<name>.ts` — zod 스키마와 타입
2. `stores/<name>-store.ts` — zustand + persist (`name` 키는 고유하게)
3. `components/<name>/` — 폼·목록 컴포넌트
4. `app/<name>/page.tsx` — 페이지, `site-header.tsx` 의 `NAV` 에 링크 추가
5. 필요한 shadcn 컴포넌트: `npx shadcn@latest add <component>`

## 예제
- `/todos` — 폼 검증 + 스토어 CRUD + 토스트
- `/dashboard` — 스토어 데이터 집계 카드 + 테이블
- `/demo/*` — 메인 카드에서 연결되는 기술별 데모 (목록은 `src/lib/demos.ts` 한 곳에서 관리, 메인 카드·사이드 메뉴가 공유)
  - `nextjs` 라우팅·동적 라우트 / `react` useState·useEffect·useMemo / `tailwind` 클래스 조작
  - `shadcn` 컴포넌트 갤러리 / `zustand` 두 컴포넌트 상태 공유 + persist / `form` zod 검증 폼
- 데모 추가: `lib/demos.ts` 에 항목 추가 + `app/demo/<slug>/page.tsx` 생성
- 동적 라우트는 `cacheComponents` 때문에 `generateStaticParams` 로 미리 렌더할 값을 알려줘야 빌드가 통과한다
