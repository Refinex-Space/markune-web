import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DownloadSelector } from "./DownloadSelector";

const version = "0.1.15";
const ossHost = "https://madora-releases-2026.oss-cn-shanghai.aliyuncs.com";

function manifest() {
  const artifact = (name: string) => ({
    name,
    url: `${ossHost}/releases/v${version}/${name}`,
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

function mockPlatform(platform: string) {
  vi.spyOn(navigator, "platform", "get").mockReturnValue(platform);
}

function mockSuccessfulManifest() {
  return vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify(manifest()), { status: 200 }));
}

afterEach(() => vi.restoreAllMocks());

describe("DownloadSelector", () => {
  it("automatically recommends the Windows installer", async () => {
    mockPlatform("Win32");
    mockSuccessfulManifest();
    render(<DownloadSelector />);

    expect(await screen.findByText("推荐此设备使用")).toBeInTheDocument();
    expect(screen.getByTestId("download-link")).toHaveAttribute("href", `${ossHost}/releases/v${version}/Madora_x64-setup.exe`);
  });

  it("defaults a Mac to Apple Silicon and preserves a manual Intel choice", async () => {
    const user = userEvent.setup();
    mockPlatform("MacIntel");
    mockSuccessfulManifest();
    render(<DownloadSelector />);

    await screen.findByTestId("download-link");
    expect(screen.getByRole("button", { name: /Apple Silicon/ })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: /Intel 处理器/ }));
    expect(screen.getByTestId("download-link")).toHaveAttribute("href", `${ossHost}/releases/v${version}/Madora_x64.dmg`);
  });

  it("asks unsupported systems to choose a platform manually", async () => {
    const user = userEvent.setup();
    mockPlatform("Linux x86_64");
    mockSuccessfulManifest();
    render(<DownloadSelector />);

    expect(await screen.findByText("Madora 支持 macOS 和 Windows。")).toBeInTheDocument();
    expect(screen.queryByTestId("download-link")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Windows" }));
    expect(await screen.findByTestId("download-link")).toHaveAttribute("href", `${ossHost}/releases/v${version}/Madora_x64-setup.exe`);
  });

  it("shows a recoverable error and reloads the manifest", async () => {
    const user = userEvent.setup();
    mockPlatform("Linux x86_64");
    vi.spyOn(globalThis, "fetch")
      .mockRejectedValueOnce(new TypeError("offline"))
      .mockResolvedValueOnce(new Response(JSON.stringify(manifest()), { status: 200 }));
    render(<DownloadSelector />);

    expect(await screen.findByRole("alert")).toHaveTextContent("无法加载最新版本");
    await user.click(screen.getByRole("button", { name: "重试" }));
    await user.click(screen.getByRole("button", { name: "Windows" }));
    expect(await screen.findByTestId("download-link")).toBeInTheDocument();
  });

  it("copies the selected SHA-256 and reports success", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockPlatform("Win32");
    mockSuccessfulManifest();
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<DownloadSelector />);

    await screen.findByTestId("download-link");
    await user.click(screen.getByRole("button", { name: "复制 SHA-256 校验值" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("f".repeat(64)));
    expect(screen.getByRole("button", { name: "复制 SHA-256 校验值" })).toHaveTextContent("已复制");
  });
});
