import Link from "next/link";

type Mode = {
  href: string;
  name: string;
  subtitle: string;
  description: string;
  chip: string;
  chipClass: string;
};

const modes: Mode[] = [
  {
    href: "/about",
    name: "SSG",
    subtitle: "/about",
    description:
      "빌드 시 정적 HTML. 데이터 페칭 없이 고정된 시각을 유지하는 패턴을 확인합니다.",
    chip: "Static",
    chipClass:
      "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100",
  },
  {
    href: "/time",
    name: "SSR",
    subtitle: "/time",
    description:
      "요청마다 서버에서 Firestore를 조회하고, 서버 시각과 함께 HTML을 생성합니다.",
    chip: "Dynamic",
    chipClass:
      "bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-100",
  },
  {
    href: "/contact",
    name: "CSR",
    subtitle: "/contact",
    description:
      "클라이언트 컴포넌트와 useEffect로 지연 로딩을 시뮬레이션합니다.",
    chip: "Client",
    chipClass:
      "bg-violet-100 text-violet-900 dark:bg-violet-950 dark:text-violet-100",
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-12 sm:px-6">
      <section className="max-w-2xl space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Next.js App Router
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          CSR · SSG · SSR 비교 데모
        </h1>
        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          각 카드는 서로 다른 렌더링 전략을 사용합니다. 상단의{" "}
          <span className="font-medium text-zinc-800 dark:text-zinc-200">
            Rendered at
          </span>{" "}
          값과 브라우저·서버 콘솔 로그를 함께 보면 차이를 빠르게 감 잡을 수
          있습니다.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {modes.map((mode) => (
          <Link
            key={mode.href}
            href={mode.href}
            className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {mode.name}
              </h2>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${mode.chipClass}`}
              >
                {mode.chip}
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {mode.subtitle}
            </p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {mode.description}
            </p>
            <span className="mt-4 text-sm font-medium text-zinc-900 group-hover:underline dark:text-zinc-50">
              페이지 열기 →
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}