import { describe, expect, it } from "vitest";
import {
  detectMacArchitecture,
  detectOperatingSystem,
  formatDownloadSize,
  formatPublishedDate,
  parseGitHubRelease,
} from "./downloads";

function githubRelease(options?: { digest?: string | null; hostileUrl?: boolean; wrongVersionPath?: boolean }) {
  const version = "0.1.15";
  const digest = options?.digest === undefined ? `sha256:${"f".repeat(64)}` : options.digest;
  const artifact = (name: string) => ({
    name,
    size: 202_422_575,
    browser_download_url: options?.hostileUrl
      ? `https://example.com/releases/download/v${version}/${name}`
      : options?.wrongVersionPath
        ? `https://github.com/Refinex-Space/markune/releases/download/v0.1.14/${name}`
        : `https://github.com/Refinex-Space/markune/releases/download/v${version}/${name}`,
    digest,
  });
  return {
    tag_name: `v${version}`,
    published_at: "2026-07-26T06:07:09.000Z",
    html_url: `https://github.com/Refinex-Space/markune/releases/tag/v${version}`,
    assets: [
      artifact("Markune_aarch64.dmg"),
      artifact("Markune_x64.dmg"),
      artifact("Markune_x64-setup.exe"),
    ],
  };
}

describe("GitHub release payload", () => {
  it("accepts the latest GitHub Releases schema", () => {
    const manifest = parseGitHubRelease(githubRelease());
    expect(manifest.version).toBe("0.1.15");
    expect(manifest.artifacts["macos-arm64-dmg"].sha256).toBe("f".repeat(64));
    expect(formatDownloadSize(202_422_575)).toBe("202.4 MB");
    expect(formatPublishedDate("2026-07-26T06:07:09.000Z")).toBe("2026年7月26日");
  });

  it("allows missing digests and rejects missing artifacts or unexpected hosts", () => {
    expect(parseGitHubRelease(githubRelease({ digest: null })).artifacts["windows-x64-exe"].sha256).toBeNull();

    const missing = githubRelease();
    missing.assets = missing.assets.filter((asset) => asset.name !== "Markune_x64.dmg");
    expect(() => parseGitHubRelease(missing)).toThrow("Missing download artifact");

    expect(() => parseGitHubRelease(githubRelease({ hostileUrl: true }))).toThrow("Unexpected download URL");
  });

  it("rejects artifact paths that do not match the release version", () => {
    expect(() => parseGitHubRelease(githubRelease({ wrongVersionPath: true }))).toThrow("Unexpected download URL");
  });
});

describe("platform detection", () => {
  it("recognizes macOS, Windows, and unsupported platforms", () => {
    expect(detectOperatingSystem({ userAgentData: { platform: "macOS" } })).toBe("macos");
    expect(detectOperatingSystem({ platform: "Win32" })).toBe("windows");
    expect(detectOperatingSystem({ platform: "Linux x86_64" })).toBe("unknown");
  });

  it("uses architecture hints when available and defaults to Apple Silicon", async () => {
    await expect(detectMacArchitecture({ userAgentData: { getHighEntropyValues: async () => ({ architecture: "arm" }) } })).resolves.toBe("arm64");
    await expect(detectMacArchitecture({ userAgentData: { getHighEntropyValues: async () => ({ architecture: "x86", bitness: "64" }) } })).resolves.toBe("x64");
    await expect(detectMacArchitecture({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" })).resolves.toBe("arm64");
  });
});
