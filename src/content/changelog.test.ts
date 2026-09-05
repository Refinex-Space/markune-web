import { describe, expect, it } from "vitest";
import { changelogEntries, formatReleaseDate } from "./changelog";

describe("changelogEntries", () => {
  it("lists the two verified releases newest first with dated source links", () => {
    expect(changelogEntries.map((entry) => entry.version)).toEqual(["0.2.4", "0.2.3"]);
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
