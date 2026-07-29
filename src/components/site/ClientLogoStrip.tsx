import { ArrowUpRight, CircleNotch, Cube, SquaresFour, StarFour, WaveSine } from "@phosphor-icons/react/dist/ssr";

const clientLogos = [
  { label: "Codecraft_", Icon: SquaresFour },
  { label: "Frequencii", Icon: WaveSine },
  { label: "Kintsugi", Icon: StarFour },
  { label: "CoreOS", Icon: Cube },
  { label: "Luminary", Icon: CircleNotch },
  { label: "45 Degrees°", Icon: ArrowUpRight },
];

export function ClientLogoStrip({ showMetric = false }: { showMetric?: boolean }) {
  return (
    <section aria-label="信任 Madora 的客户" className={`logo-strip ${showMetric ? "" : "logo-strip--logos-only"}`}>
      {showMetric ? <p>已有 240 万项任务通过 Madora 完成</p> : null}
      <div className="logo-ticker">
        <div className="logo-track">
          {[...clientLogos, ...clientLogos].map(({ label, Icon }, index) => (
            <span className="client-logo" key={`${label}-${index}`}><Icon aria-hidden size={28} weight="fill" />{label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
