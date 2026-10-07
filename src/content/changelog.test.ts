import { describe, expect, it } from "vitest";
import { changelogEntries, formatReleaseDate } from "./changelog";

describe("changelogEntries", () => {
  it("lists releases newest first with dated source links", () => {
    expect(changelogEntries.map((entry) => entry.version)).toEqual(["0.3.1", "0.3.0", "0.2.9", "0.2.8", "0.2.7", "0.2.6", "0.2.5", "0.2.4", "0.2.3", "0.2.2", "0.2.1", "0.2.0", "0.1.19", "0.1.18", "0.1.17", "0.1.16", "0.1.15", "0.1.14", "0.1.13", "0.1.12", "0.1.11", "0.1.10", "0.1.9", "0.1.8", "0.1.7"]);
    for (const entry of changelogEntries) {
      expect(entry.releaseHref).toBe(`https://github.com/Refinex-Space/markune/releases/tag/v${entry.version}`);
      expect(Number.isNaN(Date.parse(entry.publishedAt))).toBe(false);
    }
    expect(Date.parse(changelogEntries[0].publishedAt)).toBeGreaterThan(Date.parse(changelogEntries[1].publishedAt));
  });

  it("formats release dates in Shanghai time independently of the build host", () => {
    expect(formatReleaseDate("2026-09-02T13:50:54Z")).toBe("2026年9月2日");
    expect(formatReleaseDate("2026-09-01T18:00:00Z")).toBe("2026年9月2日");
  });
});
