#!/bin/bash
# PostToolUse(Write|Edit): src/**/*.{ts,tsx,css} 에 prettier 실행 + .claude/hook.log 에 기록
# 로그 형식: 시각 | 도구 | 파일 | 결과(formatted=포맷이 파일을 바꿈 / unchanged / failed)
# formatted 일 때는 변경 위치(행)와 바뀐 내용(- 전 / + 후)을 아래에 들여써서 함께 남긴다.

MAX_DIFF_LINES=30

input=$(cat)
tool=$(printf '%s' "$input" | jq -r '.tool_name // "?"')
f=$(printf '%s' "$input" | jq -r '.tool_response.filePath // .tool_input.file_path // empty')
log="${CLAUDE_PROJECT_DIR:-.}/.claude/hook.log"

case "$f" in
  */src/*.ts | */src/*.tsx | */src/*.css) ;;
  *) exit 0 ;;
esac

backup=$(mktemp)
trap 'rm -f "$backup"' EXIT
cp "$f" "$backup" 2>/dev/null || exit 0

if npx prettier --write "$f" >/dev/null 2>&1; then
  if cmp -s "$backup" "$f"; then result="unchanged"; else result="formatted"; fi
else
  result="failed"
fi

rel="${f#"${CLAUDE_PROJECT_DIR:-}"/}"
{
  printf '%s | %s | %s | %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$tool" "$rel" "$result"

  if [ "$result" = "formatted" ]; then
    # 변경 위치: 포맷 후 파일 기준 행 범위 (예: 12-14행, 36행)
    ranges=$(diff -U0 "$backup" "$f" | awk '
      /^@@/ {
        split($3, a, ","); start = substr(a[1], 2); len = (a[2] == "" ? 1 : a[2])
        if (len == 0) next
        end = start + len - 1
        out = out (out ? ", " : "") (start == end ? start "행" : start "-" end "행")
      }
      END { print out }')
    [ -n "$ranges" ] && printf '    변경 위치: %s\n' "$ranges"

    # 바뀐 내용: - 는 포맷 전, + 는 포맷 후
    diff -U0 "$backup" "$f" | grep -E '^[-+]' | grep -vE '^(---|\+\+\+)' \
      | head -n "$MAX_DIFF_LINES" | sed 's/^/    /'
    total=$(diff -U0 "$backup" "$f" | grep -E '^[-+]' | grep -vcE '^(---|\+\+\+)')
    [ "$total" -gt "$MAX_DIFF_LINES" ] && printf '    ... (%s줄 더 있음)\n' "$((total - MAX_DIFF_LINES))"
  fi
} >>"$log"

exit 0
