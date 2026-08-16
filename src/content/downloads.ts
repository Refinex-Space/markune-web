import type {
  DetectedOs,
  DownloadArtifact,
  DownloadManifest,
  DownloadTarget,
  MacArchitecture,
  NavigatorPlatformInfo,
} from "@/types/download";

export const GITHUB_REPO = "Refinex-Space/markune";
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO}`;
export const DOWNLOAD_RELEASES_URL = `${GITHUB_REPO_URL}/releases`;
export const DOWNLOAD_LATEST_RELEASE_API = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;

export const downloadTargetNames: Record<DownloadTarget, string> = {
  "macos-arm64-dmg": "Markune_aarch64.dmg",
  "macos-x64-dmg": "Markune_x64.dmg",
  "windows-x64-exe": "Markune_x64-setup.exe",
};

const downloadTargets = Object.keys(downloadTargetNames) as DownloadTarget[];
const versionPattern = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/;
const sha256Pattern = /^[0-9a-f]{64}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseVersion(tagName: unknown): string {
  if (typeof tagName !== "string") throw new Error("Invalid release tag");
  const version = tagName.startsWith("v") ? tagName.slice(1) : tagName;
  if (!versionPattern.test(version)) throw new Error("Invalid release version");
  return version;
}

function parseSha256(digest: unknown): string | null {
  if (digest == null) return null;
  if (typeof digest !== "string") throw new Error("Invalid asset digest");
  const match = /^sha256:([0-9a-f]{64})$/i.exec(digest.trim());
  if (!match) throw new Error("Invalid SHA-256 digest");
  return match[1].toLowerCase();
}

function parseArtifact(value: unknown, target: DownloadTarget, version: string): DownloadArtifact {
  if (!isRecord(value)) throw new Error(`Missing download artifact: ${target}`);

  const name = value.name;
  const size = value.size;
  const url = value.browser_download_url;
  const sha256 = parseSha256(value.digest);
  if (name !== downloadTargetNames[target]) throw new Error(`Unexpected file name for ${target}`);
  if (!Number.isInteger(size) || Number(size) <= 0) throw new Error(`Invalid file size for ${target}`);
  if (typeof url !== "string") throw new Error(`Invalid download URL for ${target}`);
  if (sha256 !== null && !sha256Pattern.test(sha256)) throw new Error(`Invalid SHA-256 for ${target}`);

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error(`Invalid download URL for ${target}`);
  }

  const expectedPath = `/${GITHUB_REPO}/releases/download/v${version}/${name}`;
  if (
    parsedUrl.protocol !== "https:" ||
    parsedUrl.hostname !== "github.com" ||
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

export function parseGitHubRelease(value: unknown): DownloadManifest {
  if (!isRecord(value)) throw new Error("Unsupported GitHub release payload");

  const version = parseVersion(value.tag_name);
  const publishedAt = value.published_at;
  const releaseUrl = value.html_url;
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
    parsedReleaseUrl.pathname !== `/${GITHUB_REPO}/releases/tag/v${version}` ||
    parsedReleaseUrl.username ||
    parsedReleaseUrl.password ||
    parsedReleaseUrl.search ||
    parsedReleaseUrl.hash
  ) {
    throw new Error("Unexpected release URL");
  }

  if (!Array.isArray(value.assets)) throw new Error("Download release is missing assets");
  const assetsByName = new Map<string, unknown>();
  for (const asset of value.assets) {
    if (!isRecord(asset) || typeof asset.name !== "string") throw new Error("Invalid release asset");
    assetsByName.set(asset.name, asset);
  }

  const artifacts = Object.fromEntries(
    downloadTargets.map((target) => [target, parseArtifact(assetsByName.get(downloadTargetNames[target]), target, version)]),
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
