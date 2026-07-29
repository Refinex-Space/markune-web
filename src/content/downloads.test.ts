import { describe, expect, it } from "vitest";
import {
  detectMacArchitecture,
  detectOperatingSystem,
  formatDownloadSize,
  parseDownloadManifest,
} from "./downloads";

function manifest() {
  const version = "0.1.15";
  const host = "https://madora-releases-2026.oss-cn-shanghai.aliyuncs.com";
  const artifact = (name: string) => ({
    name,
    url: `${host}/releases/v${version}/${name}`,
    size: 202_422_575,
    sha256: "f".repeat(64),
  });
  return {
    schemaVersion: 1,
    version,
    publishedAt: "2026-07-26T06:07:09.000Z",
    releaseUrl: "https://github.com/Refinex-Space/madora-site/releases/tag/v0.1.15",
    artifacts: {
      "macos-arm64-dmg": artifact("Madora_aarch64.dmg"),
      "macos-x64-dmg": artifact("Madora_x64.dmg"),
      "windows-x64-exe": artifact("Madora_x64-setup.exe"),
    },
  };
}

describe("download manifest", () => {
  it("accepts the stable OSS download schema", () => {
    expect(parseDownloadManifest(manifest()).version).toBe("0.1.15");
    expect(formatDownloadSize(202_422_575)).toBe("202.4 MB");
  });

  it("rejects missing artifacts and unexpected download hosts", () => {
    const missing = manifest();
    delete (missing.artifacts as Partial<typeof missing.artifacts>)["macos-x64-dmg"];
    expect(() => parseDownloadManifest(missing)).toThrow("Missing download artifact");

    const hostile = manifest();
    hostile.artifacts["windows-x64-exe"].url = "https://example.com/releases/v0.1.15/Madora_x64-setup.exe";
    expect(() => parseDownloadManifest(hostile)).toThrow("Unexpected download URL");
  });

  it("rejects artifact paths that do not match the manifest version", () => {
    const value = manifest();
    value.artifacts["macos-arm64-dmg"].url = value.artifacts["macos-arm64-dmg"].url.replace("v0.1.15", "v0.1.14");
    expect(() => parseDownloadManifest(value)).toThrow("Unexpected download URL");
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
