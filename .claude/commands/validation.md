---
description: 커밋 전 소스 전체 통합 검증 (정적검사·빌드·라우트 스모크)
allowed-tools: Bash(npm run format:check), Bash(npm run lint), Bash(npm run typecheck), Bash(npm run build), Bash(npx next start:*), Bash(curl:*), Bash(lsof:*), Bash(kill:*), Bash(git status:*), Bash(git diff:*), Bash(grep:*), Bash(find:*), Read, Grep, Glob
---

커밋 전에 프로젝트 소스 전체에 오류가 없는지 통합 검증해주세요.
**검증만 합니다 — 파일 수정·커밋·push 는 하지 않습니다.**
앞 단계가 실패해도 중단하지 말고 끝까지 돌려서 전체 결과를 한 번에 보고하세요.

## 단계

### 0. 변경 범위

`git status --short` 와 `git diff --stat` 으로 이번에 바뀐 파일을 파악해 보고에 요약합니다.

### 1. 포맷

`npm run format:check` — 위반 파일이 0 이면 PASS.

### 2. 린트

`npm run lint` — error 0 이면 PASS. warning 은 WARN 으로 목록만 보고.

### 3. 타입

`npm run typecheck` — 에러 0 이면 PASS.

### 4. 프로젝트 규칙

`src/` 를 검색해 아래가 0건인지 확인합니다 (`components/ui` 생성물 포함).

- `asChild` — 이 프로젝트의 shadcn 은 Base UI 기반이라 없어야 함 (`render={...}` 사용)
- `from "cn"` — 서드파티 `cn` 패키지 대신 `@/lib/utils` 의 `cn` 사용
- `console.log`, `debugger` — 남은 디버그 코드
- 하드코딩된 비밀값 의심 문자열 (`password=`, `token=`, `secret`, `api_key` 등 값이 직접 들어간 경우)
- 커밋 대상에 `.env*` 파일이 포함됐는지 (`git status --short` 로 확인)

### 5. 빌드

`npm run build` — 성공하면 PASS. 출력의 Route 목록을 다음 단계에 사용합니다.

### 6. 라우트 스모크

빌드 결과로 서버를 띄워 모든 페이지가 응답하는지 확인합니다.

1. **포트 4000 은 사용자의 dev 서버가 쓰므로 쓰지 않습니다.** 4100 부터 `lsof -i :<포트>` 로 비어 있는 포트를 고릅니다.
2. `npx next start -p <포트>` 를 백그라운드로 실행하고, 그 **PID 를 기록**합니다. 로그는 스크래치 디렉터리 파일로 보냅니다.
3. 몇 초 기다려 서버가 뜬 걸 확인한 뒤, `src/app/**/page.tsx` 와 5단계 Route 목록으로 경로를 만들어 각각 `curl -s -o /dev/null -w "%{http_code}"` 로 요청합니다.
   - 동적 라우트(`[id]` 등)는 해당 페이지의 `generateStaticParams` 에 적힌 값으로 대체합니다.
4. 모든 경로가 200 이고, 서버 로그에 `Error` / `Unhandled` 가 없으면 PASS.

### 7. 정리

6단계에서 띄운 **그 PID 만** `kill` 하고, `lsof -i :<포트>` 로 포트가 해제됐는지 확인합니다.
실패·중단 시에도 반드시 정리합니다.

## 안전 규칙

- `pkill -f "next ..."` 처럼 이름 패턴으로 프로세스를 종료하지 않습니다. 사용자의 dev 서버가 같이 죽을 수 있습니다.
- 프로세스 확인에 `pgrep -fl`, `ps e`, `ps aux` 처럼 **환경변수가 출력되는 명령을 쓰지 않습니다** (비밀값 노출). 포트 확인은 `lsof -i :<포트>` 만 사용합니다.
- 출력에 비밀값이 보이면 값은 언급하지 말고 키 이름과 위치만 보고합니다.

## 결과 보고 형식

1. 맨 위 한 줄 결론: `✅ 커밋 가능` 또는 `❌ N개 항목 실패`
2. 표 — 항목 / 결과(PASS·FAIL·WARN) / 요약
3. 실패 항목마다 `파일:라인`, 원인, 수정 제안
4. 실패가 있으면 마지막에 **"수정할까요?"** 라고 묻고 대기합니다. 승인받으면 수정 → 실패했던 항목부터 재검증 → 전체 결과를 다시 보고합니다.
5. 모두 PASS 면 `/commit` 으로 넘어가도 된다고 안내합니다.
