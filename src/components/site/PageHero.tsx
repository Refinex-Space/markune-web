import type { ReactNode } from "react";
import { Hexagon } from "@phosphor-icons/react/dist/ssr";

export function PageHero({ eyebrow, title, description, children, compact = false, variant }: { eyebrow?: string; title: string; description?: string; children?: ReactNode; compact?: boolean; variant?: "blog" | "changelog" }) {
  return (
    <section className={`page-hero ${compact ? "page-hero--compact" : ""} ${variant ? `page-hero--${variant}` : ""}`}>
      <div className={`container page-hero-grid${variant === "changelog" ? " page-load-reveal" : ""}`}>
        <div>
          {eyebrow ? <p className="eyebrow">{variant === "blog" ? <Hexagon aria-hidden size={12} /> : null}{eyebrow}</p> : null}
          <h1>{title}</h1>
        </div>
        {description || children ? <div className="page-hero-side">{description ? <p>{description}</p> : null}{children}</div> : null}
      </div>
    </section>
  );
}
