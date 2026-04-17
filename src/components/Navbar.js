import Link from "next/link";

const links = [
  { href: "/", label: "홈" },
  { href: "/about", label: "SSG (/about)" },
  { href: "/time", label: "SSR (/time)" },
  { href: "/contact", label: "CSR (/contact)" },
];

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200/80 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          렌더링 데모
        </Link>
        <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 sm:text-sm"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}