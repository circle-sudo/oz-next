import DemoShell from "@/components/DemoShell";
import { fetchLatestLogs } from "@/lib/firestoreLogs";

export const dynamic = "force-dynamic";

export default async function TimePage() {
  console.log("SSR/SSG Rendering on Server...");

  const renderedAt = new Date().toISOString();
  let logs: Awaited<ReturnType<typeof fetchLatestLogs>> = [];
  let fetchError: string | null = null;

  try {
    logs = await fetchLatestLogs(8);
  } catch (err) {
    fetchError = err instanceof Error ? err.message : String(err);
  }

  return (
    <DemoShell
      badge="SSR + Firestore"
      badgeClassName="bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-100"
      title="서버 사이드 렌더링 (SSR)"
      definition="매 요청마다 서버에서 컴포넌트가 실행됩니다. Firebase Admin SDK로 Firestore `logs` 컬렉션을 조회한 뒤, 그 결과와 서버 시각을 HTML에 포함해 응답합니다."
      renderedLabel="Rendered at (server, this request):"
      renderedAt={renderedAt}
    >
      {fetchError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
          <p className="font-semibold">Firestore 연결 실패</p>
          <p className="mt-2 font-mono text-xs leading-relaxed opacity-90">
            {fetchError}
          </p>
          <p className="mt-3 text-xs leading-relaxed opacity-90">
            <code className="rounded bg-amber-100/80 px-1 dark:bg-amber-900/60">
              src/lib/firebaseAdmin.ts
            </code>
            에서 사용하는 환경 변수를 확인하세요.
          </p>
        </div>
      ) : (
        <section className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Firestore <code className="font-mono text-xs">logs</code> 최신 문서
          </h2>
          {logs.length === 0 ? (
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              아직 문서가 없습니다. 콘솔이나 클라이언트에서{" "}
              <code className="rounded bg-zinc-200 px-1 font-mono text-xs dark:bg-zinc-800">
                logs
              </code>{" "}
              컬렉션에 문서를 추가하면 여기에 표시됩니다. 권장 필드:{" "}
              <code className="rounded bg-zinc-200 px-1 font-mono text-xs dark:bg-zinc-800">
                createdAt
              </code>{" "}
              (Timestamp) — 있으면 최신순 정렬에 사용됩니다.
            </p>
          ) : (
            <ul className="mt-3 space-y-3">
              {logs.map(({ id, data }) => (
                <li
                  key={id}
                  className="rounded-lg border border-zinc-200 bg-white p-3 text-xs dark:border-zinc-700 dark:bg-zinc-950"
                >
                  <p className="font-mono font-medium text-zinc-800 dark:text-zinc-200">
                    {id}
                  </p>
                  <pre className="mt-2 max-h-40 overflow-auto rounded bg-zinc-100 p-2 font-mono text-[11px] leading-relaxed text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      <ul className="list-inside list-disc space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
        <li>
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">
            export const dynamic = &quot;force-dynamic&quot;
          </code>{" "}
          로 매 요청마다 동적 렌더링
        </li>
        <li>
          서버 터미널에서{" "}
          <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-800">
            SSR/SSG Rendering on Server...
          </code>{" "}
          로그가 요청마다 찍히는지 확인하세요.
        </li>
      </ul>
    </DemoShell>
  );
}