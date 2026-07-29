"use client";

import {
  AppleLogo,
  ArrowClockwise,
  Check,
  Copy,
  DownloadSimple,
  WindowsLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  detectMacArchitecture,
  detectOperatingSystem,
  DOWNLOAD_MANIFEST_URL,
  DOWNLOAD_RELEASES_URL,
  formatDownloadSize,
  formatPublishedDate,
  parseDownloadManifest,
} from "@/content/downloads";
import { assets } from "@/content/site";
import type {
  DetectedOs,
  DownloadManifest,
  DownloadTarget,
  MacArchitecture,
  NavigatorPlatformInfo,
} from "@/types/download";

type SelectableOs = Exclude<DetectedOs, "unknown">;
type LoadState = "loading" | "ready" | "error";

function browserPlatformInfo(): NavigatorPlatformInfo {
  const navigatorWithHints = navigator as Navigator & { userAgentData?: NavigatorPlatformInfo["userAgentData"] };
  return {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    userAgentData: navigatorWithHints.userAgentData,
  };
}

async function requestDownloadManifest(signal?: AbortSignal): Promise<DownloadManifest> {
  const response = await fetch(DOWNLOAD_MANIFEST_URL, { cache: "no-store", signal });
  if (!response.ok) throw new Error(`Download manifest returned ${response.status}`);
  return parseDownloadManifest(await response.json());
}

async function detectBrowserPlatform() {
  const platformInfo = browserPlatformInfo();
  const os = detectOperatingSystem(platformInfo);
  const architecture = os === "macos" ? await detectMacArchitecture(platformInfo) : null;
  return { architecture, os };
}

export function DownloadSelector() {
  const [manifest, setManifest] = useState<DownloadManifest | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [detectedOs, setDetectedOs] = useState<DetectedOs>("unknown");
  const [detectionComplete, setDetectionComplete] = useState(false);
  const [selectedOs, setSelectedOs] = useState<SelectableOs | null>(null);
  const [macArchitecture, setMacArchitecture] = useState<MacArchitecture>("arm64");
  const [copied, setCopied] = useState(false);
  const manualOsSelection = useRef(false);
  const manualArchitectureSelection = useRef(false);
  const copyResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const retryManifest = async () => {
    setLoadState("loading");
    try {
      setManifest(await requestDownloadManifest());
      setLoadState("ready");
    } catch {
      setManifest(null);
      setLoadState("error");
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    void requestDownloadManifest(controller.signal).then((nextManifest) => {
      if (!controller.signal.aborted) {
        setManifest(nextManifest);
        setLoadState("ready");
      }
    }).catch(() => {
      if (!controller.signal.aborted) {
        setManifest(null);
        setLoadState("error");
      }
    });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    let active = true;
    void detectBrowserPlatform().then(({ architecture, os }) => {
      if (!active) return;
      setDetectedOs(os);
      if (!manualOsSelection.current && os !== "unknown") setSelectedOs(os);
      if (architecture && !manualArchitectureSelection.current) setMacArchitecture(architecture);
      setDetectionComplete(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => () => {
    if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
  }, []);

  const target: DownloadTarget | null = useMemo(() => {
    if (selectedOs === "windows") return "windows-x64-exe";
    if (selectedOs === "macos") return macArchitecture === "arm64" ? "macos-arm64-dmg" : "macos-x64-dmg";
    return null;
  }, [macArchitecture, selectedOs]);
  const artifact = target && manifest ? manifest.artifacts[target] : null;
  const selectedLabel = selectedOs === "windows"
    ? "Windows x64"
    : macArchitecture === "arm64" ? "macOS Apple Silicon" : "macOS Intel";

  const chooseOs = (os: SelectableOs) => {
    manualOsSelection.current = true;
    setSelectedOs(os);
    setCopied(false);
  };

  const chooseMacArchitecture = (architecture: MacArchitecture) => {
    manualArchitectureSelection.current = true;
    setMacArchitecture(architecture);
    setCopied(false);
  };

  const copyChecksum = async () => {
    if (!artifact) return;
    try {
      await navigator.clipboard.writeText(artifact.sha256);
      setCopied(true);
      if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
      copyResetTimer.current = setTimeout(() => setCopied(false), 2_000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="download-panel">
      <div aria-label="Choose operating system" className="download-os-switch" role="group">
        <button aria-pressed={selectedOs === "macos"} className={selectedOs === "macos" ? "active" : ""} onClick={() => chooseOs("macos")} type="button">
          <AppleLogo aria-hidden size={18} weight="fill" />macOS
        </button>
        <button aria-pressed={selectedOs === "windows"} className={selectedOs === "windows" ? "active" : ""} onClick={() => chooseOs("windows")} type="button">
          <WindowsLogo aria-hidden size={18} weight="fill" />Windows
        </button>
      </div>

      <div className="download-panel-body">
        <div className="download-primary">
          <span className="download-app-icon"><Image alt="" aria-hidden height={38} src={assets.logo} width={38} /></span>
          {selectedOs ? (
            <>
              <div className="download-recommendation-row">
                <p className="eyebrow">{selectedLabel}</p>
                {detectedOs === selectedOs ? <span className="recommended-badge">Recommended for this device</span> : null}
              </div>
              <h2>Download Madora</h2>
              <p className="download-primary-description">A local-first workspace for Markdown, writing, planning, and focused work.</p>
              {selectedOs === "macos" ? (
                <div aria-label="Choose Mac processor" className="download-architecture-switch" role="group">
                  <button aria-pressed={macArchitecture === "arm64"} className={macArchitecture === "arm64" ? "active" : ""} onClick={() => chooseMacArchitecture("arm64")} type="button">
                    <strong>Apple Silicon</strong><span>M1 or later</span>
                  </button>
                  <button aria-pressed={macArchitecture === "x64"} className={macArchitecture === "x64" ? "active" : ""} onClick={() => chooseMacArchitecture("x64")} type="button">
                    <strong>Intel</strong><span>Intel processor</span>
                  </button>
                </div>
              ) : null}
              {loadState === "loading" ? <p aria-live="polite" className="download-status" role="status">Checking the latest release…</p> : null}
              {loadState === "ready" && artifact ? (
                <a className="button button--primary download-main-button" data-testid="download-link" href={artifact.url}>
                  <DownloadSimple aria-hidden size={18} weight="bold" />
                  Download for {selectedOs === "macos" ? "macOS" : "Windows"}
                </a>
              ) : null}
            </>
          ) : detectionComplete ? (
            <div className="download-unknown-platform" aria-live="polite" role="status">
              <p className="eyebrow">CHOOSE YOUR PLATFORM</p>
              <h2>Madora supports macOS and Windows.</h2>
              <p>Select an operating system above to see the right installer for your computer.</p>
            </div>
          ) : (
            <div className="download-unknown-platform" aria-live="polite" role="status">
              <p className="eyebrow">DETECTING YOUR DEVICE</p>
              <h2>Finding the right Madora installer…</h2>
              <p>Checking your operating system and the latest stable release.</p>
            </div>
          )}
          {loadState === "error" ? (
            <div aria-live="polite" className="download-error" role="alert">
              <p>We couldn&apos;t load the latest release. Check your connection and try again.</p>
              <div>
                <button className="button button--primary" onClick={() => void retryManifest()} type="button"><ArrowClockwise aria-hidden size={17} />Retry</button>
                <a className="text-link" href={DOWNLOAD_RELEASES_URL} rel="noreferrer" target="_blank">View GitHub Releases</a>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="download-details" aria-label="Release details">
          <p className="download-details-title">Latest stable release</p>
          {manifest ? (
            <>
              <dl>
                <div><dt>Version</dt><dd>{manifest.version}</dd></div>
                <div><dt>Published</dt><dd>{formatPublishedDate(manifest.publishedAt)}</dd></div>
                <div><dt>Installer</dt><dd>{artifact?.name ?? "Choose a platform"}</dd></div>
                <div><dt>Size</dt><dd>{artifact ? formatDownloadSize(artifact.size) : "—"}</dd></div>
              </dl>
              <div className="download-checksum">
                <span>SHA-256</span>
                <code>{artifact?.sha256 ?? "Choose a platform to view its checksum"}</code>
                <button aria-label="Copy SHA-256 checksum" disabled={!artifact} onClick={() => void copyChecksum()} type="button">
                  {copied ? <Check aria-hidden size={16} weight="bold" /> : <Copy aria-hidden size={16} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </>
          ) : (
            <div className="download-details-loading" aria-hidden>
              <span /><span /><span /><span />
            </div>
          )}
          <p className="download-details-note">Installers are delivered directly from Madora&apos;s verified Shanghai OSS release channel.</p>
        </aside>
      </div>
    </div>
  );
}
