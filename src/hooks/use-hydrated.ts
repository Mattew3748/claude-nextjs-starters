"use client";

import { useEffect, useState } from "react";

type PersistedStore = {
  persist: { rehydrate: () => Promise<void> | void };
};

/**
 * `skipHydration: true` 로 만든 persist 스토어를 마운트 후 복원하고, 완료 여부를 반환한다.
 * SSR 결과와 클라이언트 첫 렌더가 달라지는 하이드레이션 불일치를 막기 위한 패턴.
 */
export function useStoreHydrated(store: PersistedStore) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    Promise.resolve(store.persist.rehydrate()).then(() => setHydrated(true));
  }, [store]);

  return hydrated;
}
