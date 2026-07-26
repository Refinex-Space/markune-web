import Link from "next/link";
import { Children, cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "lime";
  className?: string;
}

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonLinkProps) {
  const parts = Children.toArray(children);
  const trailingIcon = parts.length > 1 && isValidElement(parts.at(-1))
    ? parts.at(-1) as ReactElement
    : null;
  const label = (trailingIcon ? parts.slice(0, -1) : parts).map((part) => typeof part === "string" ? part.trimEnd() : part);

  return (
    <Link className={`button button--${variant}${trailingIcon ? " button--icon-swap" : ""} ${className}`.trim()} href={href}>
      {trailingIcon ? <span aria-hidden className="button-icon button-icon--leading">{cloneElement(trailingIcon)}</span> : null}
      <span className="button-label">{label}</span>
      {trailingIcon ? <span aria-hidden className="button-icon button-icon--trailing">{cloneElement(trailingIcon)}</span> : null}
    </Link>
  );
}
