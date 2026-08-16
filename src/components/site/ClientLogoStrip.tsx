import NextdotjsIcon from "@thesvg/react/nextdotjs";
import ReactIcon from "@thesvg/react/react";
import RustIcon from "@thesvg/react/rust";
import TailwindCssIcon from "@thesvg/react/tailwind-css";
import TauriIcon from "@thesvg/react/tauri";
import TypescriptIcon from "@thesvg/react/typescript";
import { ArrowUpRight, CircleNotch, Cube, SquaresFour, StarFour, WaveSine } from "@phosphor-icons/react/dist/ssr";

const clientLogos = [
  { label: "Codecraft_", renderIcon: () => <SquaresFour aria-hidden size={28} weight="fill" /> },
  { label: "Frequencii", renderIcon: () => <WaveSine aria-hidden size={28} weight="fill" /> },
  { label: "Kintsugi", renderIcon: () => <StarFour aria-hidden size={28} weight="fill" /> },
  { label: "CoreOS", renderIcon: () => <Cube aria-hidden size={28} weight="fill" /> },
  { label: "Luminary", renderIcon: () => <CircleNotch aria-hidden size={28} weight="fill" /> },
  { label: "45 Degrees°", renderIcon: () => <ArrowUpRight aria-hidden size={28} weight="fill" /> },
];

const technologyStack = [
  { label: "Next.js", renderIcon: () => <NextdotjsIcon aria-hidden height={28} variant="mono" width={28} /> },
  { label: "React", renderIcon: () => <ReactIcon aria-hidden height={28} variant="mono" width={28} /> },
  { label: "TypeScript", renderIcon: () => <TypescriptIcon aria-hidden height={28} variant="mono" width={28} /> },
  { label: "Tauri", renderIcon: () => <TauriIcon aria-hidden height={28} variant="mono" width={28} /> },
  { label: "Rust", renderIcon: () => <RustIcon aria-hidden height={28} variant="mono" width={28} /> },
  { label: "Tailwind CSS", renderIcon: () => <TailwindCssIcon aria-hidden height={28} variant="mono" width={28} /> },
];

export function ClientLogoStrip({ showMetric = false, showTechnologyStack = false }: { showMetric?: boolean; showTechnologyStack?: boolean }) {
  const items = showTechnologyStack ? technologyStack : clientLogos;
  const sectionLabel = showTechnologyStack ? "Markune 技术栈" : "信任 Markune 的客户";
  const summary = showTechnologyStack
    ? "Markune 基于以下核心技术栈构建"
    : "已有 240 万项任务通过 Markune 完成";

  return (
    <section aria-label={sectionLabel} className={`logo-strip ${showMetric ? "" : "logo-strip--logos-only"} ${showTechnologyStack ? "logo-strip--technology" : ""}`}>
      {showMetric ? <p>{summary}</p> : null}
      <div className="logo-ticker">
        <div className="logo-track">
          {[...items, ...items].map(({ label, renderIcon }, index) => (
            <span
              className={`client-logo ${showTechnologyStack ? "client-logo--technology" : ""}`}
              data-technology={showTechnologyStack ? label : undefined}
              key={`${label}-${index}`}
            >
              {renderIcon()}
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
