import type { FaqItem } from "@/types/site";

export const faqs: FaqItem[] = [
  {
    question: "我的文档保存在哪里？",
    answer:
      "Madora 将文档保存在你选择的本地工作区中，正文是普通 Markdown 文件。你可以随时用文件管理器或其他编辑器访问它们，无需迁移到专有数据库或强制上传到云端。",
  },
  {
    question: "可以直接使用已有的 Markdown 文件夹吗？",
    answer:
      "可以。选择已有文件夹后，Madora 会以磁盘上的 Markdown 文件为准，你可以继续沿用原有目录结构和文件命名，无需导入到封闭空间。",
  },
  {
    question: "支持哪些格式的导入与导出？",
    answer:
      "Madora 支持导入 Markdown、HTML、DOCX 和 PDF。需要分享时，可将单篇文档导出为 Markdown、HTML、Word 或 PDF，在保留内容结构的同时方便外部阅读与协作。",
  },
  {
    question: "如何备份或同步我的工作区？",
    answer:
      "你可以使用内置 Git 工具查看差异、提交修改并推送到自己配置的远端仓库。工作区仍由你掌控；是否启用同步、使用哪个远端，均由你决定。",
  },
  {
    question: "Codex 能如何帮助我？",
    answer:
      "Codex 可在工作区中协助理解和修改 Markdown、整理计划、处理文件与生成图稿。涉及网络、工具调用或文件变更时，仍会遵循 Codex 的授权流程，不会静默替你修改内容。",
  },
];
