import type {
  DetectedOs,
  DownloadArtifact,
  DownloadManifest,
  DownloadTarget,
  MacArchitecture,
  NavigatorPlatformInfo,
} from "@/types/download";

export const DOWNLOAD_MANIFEST_URL = "https://madora-releases-2026.oss-cn-shanghai.aliyuncs.com/downloads/stable.json";
export const DOWNLOAD_RELEASES_URL = "https://github.com/Refinex-Space/madora-site/releases/latest";

export const downloadTargetNames: Record<DownloadTarget, string> = {
  "macos-arm64-dmg": "Madora_aarch64.dmg",
  "macos-x64-dmg": "Madora_x64.dmg",
  "windows-x64-exe": "Madora_x64-setup.exe",
};

const downloadTargets = Object.keys(downloadTargetNames) as DownloadTarget[];
const ossHost = "madora-releases-2026.oss-cn-shanghai.aliyuncs.com";
const versionPattern = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/;
const sha256Pattern = /^[0-9a-f]{64}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseArtifact(value: unknown, target: DownloadTarget, version: string): DownloadArtifact {
  if (!isRecord(value)) throw new Error(`Missing download artifact: ${target}`);

  const name = value.name;
  const size = value.size;
  const sha256 = value.sha256;
  const url = value.url;
  if (name !== downloadTargetNames[target]) throw new Error(`Unexpected file name for ${target}`);
  if (!Number.isInteger(size) || Number(size) <= 0) throw new Error(`Invalid file size for ${target}`);
  if (typeof sha256 !== "string" || !sha256Pattern.test(sha256)) throw new Error(`Invalid SHA-256 for ${target}`);
  if (typeof url !== "string") throw new Error(`Invalid download URL for ${target}`);

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error(`Invalid download URL for ${target}`);
  }

  const expectedPath = `/releases/v${version}/${name}`;
  if (
    parsedUrl.protocol !== "https:" ||
    parsedUrl.hostname !== ossHost ||
    parsedUrl.username ||
    parsedUrl.password ||
    parsedUrl.port ||
    parsedUrl.pathname !== expectedPath ||
    parsedUrl.search ||
    parsedUrl.hash
  ) {
    throw new Error(`Unexpected download URL for ${target}`);
  }

  return { name, size: Number(size), sha256, url };
}

export function parseDownloadManifest(value: unknown): DownloadManifest {
  if (!isRecord(value) || value.schemaVersion !== 1) throw new Error("Unsupported download manifest schema");

  const version = value.version;
  const publishedAt = value.publishedAt;
  const releaseUrl = value.releaseUrl;
  if (typeof version !== "string" || !versionPattern.test(version)) throw new Error("Invalid release version");
  if (typeof publishedAt !== "string" || Number.isNaN(Date.parse(publishedAt))) throw new Error("Invalid publication date");
  if (typeof releaseUrl !== "string") throw new Error("Invalid release URL");

  let parsedReleaseUrl: URL;
  try {
    parsedReleaseUrl = new URL(releaseUrl);
  } catch {
    throw new Error("Invalid release URL");
  }
  if (
    parsedReleaseUrl.protocol !== "https:" ||
    parsedReleaseUrl.hostname !== "github.com" ||
    parsedReleaseUrl.pathname !== `/Refinex-Space/madora-site/releases/tag/v${version}` ||
    parsedReleaseUrl.username ||
    parsedReleaseUrl.password ||
    parsedReleaseUrl.search ||
    parsedReleaseUrl.hash
  ) {
    throw new Error("Unexpected release URL");
  }

  if (!isRecord(value.artifacts)) throw new Error("Download manifest is missing artifacts");
  const rawArtifacts = value.artifacts;
  const artifacts = Object.fromEntries(
    downloadTargets.map((target) => [target, parseArtifact(rawArtifacts[target], target, version)]),
  ) as Record<DownloadTarget, DownloadArtifact>;

  return { schemaVersion: 1, version, publishedAt, releaseUrl, artifacts };
}

export function detectOperatingSystem(navigatorInfo: NavigatorPlatformInfo): DetectedOs {
  const platform = [navigatorInfo.userAgentData?.platform, navigatorInfo.platform, navigatorInfo.userAgent]
    .filter(Boolean)
    .join(" ");
  if (/windows|win32|win64/i.test(platform)) return "windows";
  if (/macos|macintosh|macintel|iphone|ipad/i.test(platform)) return "macos";
  return "unknown";
}

export async function detectMacArchitecture(navigatorInfo: NavigatorPlatformInfo): Promise<MacArchitecture> {
  try {
    const values = await navigatorInfo.userAgentData?.getHighEntropyValues?.(["architecture", "bitness"]);
    const architecture = values?.architecture?.toLowerCase();
    if (architecture && /arm|aarch64/.test(architecture)) return "arm64";
    if (architecture && /x86|amd64/.test(architecture)) return "x64";
  } catch {
    // Browser privacy controls can reject high-entropy hints. Apple Silicon is the safe default.
  }

  if (/arm64|aarch64/i.test(navigatorInfo.userAgent ?? "")) return "arm64";
  return "arm64";
}

export function formatDownloadSize(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

export function formatPublishedDate(value: string): string {
  return new Intl.DateTimeFormat("zh-CN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}
