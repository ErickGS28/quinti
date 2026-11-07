import { poolCopy } from "../copy";

export function FundPageHeader() {
  return (
    <header>
      <h1 className="text-4xl font-semibold tracking-tight">{poolCopy.title}</h1>
      <p className="mt-2 max-w-xl text-pretty text-lg text-ink-soft">{poolCopy.subtitle}</p>
    </header>
  );
}
