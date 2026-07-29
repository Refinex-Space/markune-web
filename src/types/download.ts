export type DownloadTarget = "macos-arm64-dmg" | "macos-x64-dmg" | "windows-x64-exe";

export type DetectedOs = "macos" | "windows" | "unknown";

export type MacArchitecture = "arm64" | "x64";

export interface DownloadArtifact {
  name: string;
  url: string;
  size: number;
  sha256: string;
}

export interface DownloadManifest {
  schemaVersion: 1;
  version: string;
  publishedAt: string;
  releaseUrl: string;
  artifacts: Record<DownloadTarget, DownloadArtifact>;
}

export interface NavigatorPlatformInfo {
  platform?: string;
  userAgent?: string;
  userAgentData?: {
    platform?: string;
    getHighEntropyValues?: (hints: string[]) => Promise<{
      architecture?: string;
      bitness?: string;
    }>;
  };
}
