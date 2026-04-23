"use client";

import { useEffect, useState } from "react";
import DemoShell from "@/components/DemoShell";

type Phase = "loading" | "ready";

type Payload = {
  message: string;
  loadedAt: string;
};

export default function ContactPage() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    console.log("CSR Rendering on Browser...");

    const id = setTimeout(() => {
      setPayload({
        message: "클라이언트에서 지연 로딩된 데모 데이터입니다.",
        loadedAt: new Date().toISOString(),
      });
      setPhase("ready");
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  const renderedAt =
    phase === "ready" && payload
      ? payload.loadedAt
      : "로딩 중… (1초 후 클라이언트에서 확정)";

  return (
    <DemoShell
      badge="CSR"
      badgeClassName="bg-violet-100 text-violet-900 dark:bg-violet-950 dark:text-violet-100"
      title="클라이언트 사이드 렌더링 (CSR)"
      definition="이 페이지는 &quot;use client&quot; 컴포넌트입니다. 초기 HTML 이후 브라우저에서 하이드레이션되고, useEffect 안에서만 브라우저 전용 API·지연 로딩을 안전하게 실행할 수 있습니다."
      renderedLabel="Rendered at (client, after simulated fetch):"
      renderedAt={renderedAt}
    >
      <section className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          로딩 시뮬레이션
        </h2>
        {phase === "loading" ? (
          <div className="mt-3 flex items-center gap-3">
            <span
              className="inline-block size-4 animate-spin rounded-full border-2 border-violet-500 border-t-transparent"
              aria-hidden
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              1초 동안 클라이언트에서 로딩 중…
            </p>
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {payload?.message}
            </p>
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              데이터 시각: {payload?.loadedAt}
            </p>
          </div>
        )}
      </section>
      <ul className="list-inside list-disc space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
        <li>
          브라우저 개발자 도구 콘솔에서{" "}
          <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-800">
            CSR Rendering on Browser...
          </code>{" "}
          로그 위치를 확인하세요.
        </li>
        <li>
          서버 터미널에는 위 로그가 나타나지 않습니다 (useEffect는 브라우저에서만
          실행).
        </li>
      </ul>
    </DemoShell>
  );
}