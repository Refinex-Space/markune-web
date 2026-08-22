import { describe, expect, it } from "vitest";
import { changelogEntries } from "./changelog";

describe("changelogEntries", () => {
  it("lists markune release versions newest first", () => {
    expect(changelogEntries[0]?.version).toBe("0.2.1");
    expect(changelogEntries.at(-1)?.version).toBe("0.1.7");
    expect(changelogEntries).toHaveLength(15);
  });

  it("does not include placeholder product copy", () => {
    const joined = changelogEntries.flatMap((entry) => [entry.title, ...entry.paragraphs]).join("\n");
    expect(joined).not.toContain("Figma");
    expect(joined).not.toContain("Business 方案");
    expect(joined).not.toContain("通知偏好");
  });
});
