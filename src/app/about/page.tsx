import DemoShell from "@/components/DemoShell";

const renderedAt = new Date().toISOString();

export const metadata = {
  title: "SSG",
  description: "SSG 페이지",
};

export default function AboutPage() {
  console.log("SSR/SSG Rendering on Server...");

  return (
    <DemoShell
      badge="SSG"
      badgeClassName="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
      title="정적 생성 (SSG)"
      definition="빌드 시점에 HTML이 생성됩니다. 데이터 페칭 없이 정적 텍스트만 사용하므로 프로덕션 빌드에서는 아래 시간이 빌드 시각으로 고정되고, 새로고침해도 변하지 않습니다. (개발 모드 `next dev`에서는 편의상 재생성될 수 있습니다.)"
      renderedLabel="Rendered at (build / prerender):"
      renderedAt={renderedAt}
    >
      <section className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          정적 콘텐츠
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          이 문단은 서버에서 미리 렌더된 정적 마크업입니다. 외부 API나 Firestore
          호출이 없어 빌드 파이프라인에서 페이지 전체를 캐시할 수 있습니다.
        </p>
      </section>
      <ul className="list-inside list-disc space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
        <li>
          라우트:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">
            /about
          </code>
        </li>
        <li>특징: 요청마다 서버 로직이 다시 실행되지 않는 정적 HTML</li>
        <li>
          확인:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">
            npm run build && npm run start
          </code>{" "}
          후 새로고침하여 시간 고정을 확인하세요.
        </li>
      </ul>
    </DemoShell>
  );
}