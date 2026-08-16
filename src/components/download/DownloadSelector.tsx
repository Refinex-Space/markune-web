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
  DOWNLOAD_LATEST_RELEASE_API,
  DOWNLOAD_RELEASES_URL,
  formatDownloadSize,
  formatPublishedDate,
  parseGitHubRelease,
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

async function requestLatestRelease(signal?: AbortSignal): Promise<DownloadManifest> {
  const response = await fetch(DOWNLOAD_LATEST_RELEASE_API, {
    cache: "no-store",
    headers: { Accept: "application/vnd.github+json" },
    signal,
  });
  if (!response.ok) throw new Error(`GitHub release returned ${response.status}`);
  return parseGitHubRelease(await response.json());
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

  const retryRelease = async () => {
    setLoadState("loading");
    try {
      setManifest(await requestLatestRelease());
      setLoadState("ready");
    } catch {
      setManifest(null);
      setLoadState("error");
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    void requestLatestRelease(controller.signal).then((nextManifest) => {
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
    if (!artifact?.sha256) return;
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
      <div aria-label="选择操作系统" className="download-os-switch" role="group">
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
                {detectedOs === selectedOs ? <span className="recommended-badge">推荐此设备使用</span> : null}
              </div>
              <h2>下载 Markune</h2>
              <p className="download-primary-description">用于 Markdown、写作、规划和专注工作的 Local-first 工作区。</p>
              {selectedOs === "macos" ? (
                <div aria-label="选择 Mac 处理器" className="download-architecture-switch" role="group">
                  <button aria-pressed={macArchitecture === "arm64"} className={macArchitecture === "arm64" ? "active" : ""} onClick={() => chooseMacArchitecture("arm64")} type="button">
                    <strong>Apple Silicon</strong><span>M1 或更新机型</span>
                  </button>
                  <button aria-pressed={macArchitecture === "x64"} className={macArchitecture === "x64" ? "active" : ""} onClick={() => chooseMacArchitecture("x64")} type="button">
                    <strong>Intel</strong><span>Intel 处理器</span>
                  </button>
                </div>
              ) : null}
              {loadState === "loading" ? <p aria-live="polite" className="download-status" role="status">正在检查最新版本…</p> : null}
              {loadState === "ready" && artifact ? (
                <a className="button button--primary download-main-button" data-testid="download-link" href={artifact.url}>
                  <DownloadSimple aria-hidden size={18} weight="bold" />
                  下载 {selectedOs === "macos" ? "macOS" : "Windows"} 版
                </a>
              ) : null}
            </>
          ) : detectionComplete ? (
            <div className="download-unknown-platform" aria-live="polite" role="status">
              <p className="eyebrow">选择你的平台</p>
              <h2>Markune 支持 macOS 和 Windows。</h2>
              <p>请在上方选择操作系统，查看适合你电脑的安装包。</p>
            </div>
          ) : (
            <div className="download-unknown-platform" aria-live="polite" role="status">
              <p className="eyebrow">正在检测设备</p>
              <h2>正在查找合适的 Markune 安装包…</h2>
              <p>正在检查你的操作系统与最新稳定版本。</p>
            </div>
          )}
          {loadState === "error" ? (
            <div aria-live="polite" className="download-error" role="alert">
              <p>无法加载最新版本，请检查网络连接后重试。</p>
              <div>
                <button className="button button--primary" onClick={() => void retryRelease()} type="button"><ArrowClockwise aria-hidden size={17} />重试</button>
                <a className="text-link" href={DOWNLOAD_RELEASES_URL} rel="noreferrer" target="_blank">查看 GitHub Releases</a>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="download-details" aria-label="版本详情">
          <p className="download-details-title">最新稳定版本</p>
          {manifest ? (
            <>
              <dl>
                <div><dt>版本</dt><dd>{manifest.version}</dd></div>
                <div><dt>发布日期</dt><dd>{formatPublishedDate(manifest.publishedAt)}</dd></div>
                <div><dt>安装包</dt><dd>{artifact?.name ?? "请选择平台"}</dd></div>
                <div><dt>大小</dt><dd>{artifact ? formatDownloadSize(artifact.size) : "—"}</dd></div>
              </dl>
              <div className="download-checksum">
                <span>SHA-256</span>
                <code>{artifact?.sha256 ?? "发布页未提供校验值"}</code>
                <button aria-label="复制 SHA-256 校验值" disabled={!artifact?.sha256} onClick={() => void copyChecksum()} type="button">
                  {copied ? <Check aria-hidden size={16} weight="bold" /> : <Copy aria-hidden size={16} />}
                  {copied ? "已复制" : "复制"}
                </button>
              </div>
            </>
          ) : (
            <div className="download-details-loading" aria-hidden>
              <span /><span /><span /><span />
            </div>
          )}
          <p className="download-details-note">安装包由 GitHub Releases 直接提供，请核对版本与文件名。</p>
        </aside>
      </div>
    </div>
  );
}
