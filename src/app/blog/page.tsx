import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText } from "@phosphor-icons/react/dist/ssr";
import { GuideLibrary } from "@/components/blog/GuideLibrary";
import { blogPosts, toGuideSummary } from "@/content/blog";
import styles from "@/components/blog/guides.module.css";

export const metadata: Metadata = {
  title: "使用指南",
  description: "Markune 用户手册：从本地工作区与 Markdown 写作，到 Inbox、Daily、画板、图谱、导入导出、Git 同步和 Codex 协作。",
};

export default function BlogPage() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.hero}>
          <div><p className={styles.eyebrow}>使用指南 <span>MARKUNE HANDBOOK</span></p><h1>把 Markune<br />用得更顺手。</h1><p className={styles.heroDescription}>从第一篇笔记开始，逐步建立自己的记录与整理方式。这里有可以照着操作的步骤，也有每项功能需要了解的边界。</p><p className={styles.heroMeta}>基于 Markune 0.2.4 桌面版 · {blogPosts.length} 篇指南</p></div>
          <aside className={styles.startCard}><p><BookOpenText aria-hidden size={18} />推荐从这里开始</p><h2>第一次使用 Markune？</h2><ol><li>选择一个本地目录，建立工作区</li><li>创建并保存第一篇 Markdown 笔记</li><li>用 Inbox 与 Daily 开始日常记录</li></ol><Link href="/blog/getting-started/">从第一篇指南开始 <ArrowRight aria-hidden size={18} /></Link></aside>
        </section>
        <GuideLibrary guides={blogPosts.map(toGuideSummary)} />
        <div className={styles.indexNote}><p>查找版本变化，请阅读<Link href="/changelog/">更新日志</Link>。<br />需要先安装应用，可以前往<Link href="/download/">下载页面</Link>。</p><Link href="/about/">认识 Markune 背后的开发者 →</Link></div>
      </div>
    </div>
  );
}
