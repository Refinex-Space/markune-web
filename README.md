# Markune Web

Flowline/Kodama 的 Next.js 静态重建版本。项目使用 Next.js App Router、React、Tailwind CSS、Radix Primitives 与 Phosphor Icons，构建产物输出到 `out/`。

## 本地开发

```bash
pnpm install
pnpm dev
```

设置 `NEXT_PUBLIC_SITE_URL` 后，Metadata API 会生成基于该域名的绝对 Open Graph 地址；未设置时不会写入模板站 canonical。

## 验证

```bash
pnpm verify
```

该命令依次执行 lint、类型检查、Vitest、生产构建、静态导出完整性检查和 Playwright 三视口端到端测试。

视觉证据位于 `design-qa/`。在源站与本地实现均可访问时，可分别运行：

```bash
QA_TARGET=source QA_SOURCE_ORIGIN=https://kodamatemplate.framer.website pnpm qa:capture
QA_TARGET=implementation pnpm qa:capture
pnpm qa:compare
```

`qa:compare` 在任一路由超过 0.1% 差异率时返回非零状态。
