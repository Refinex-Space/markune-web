import Link from "next/link";
import { ArrowUpRight, BookOpenText, Compass, Toolbox } from "@phosphor-icons/react/dist/ssr";
import type { GuideSummary } from "@/types/site";
import styles from "./guides.module.css";

export function BlogCard({ post }: { post: GuideSummary }) {
  const Icon = post.category === "开始使用" ? BookOpenText : post.category === "日常工作流" ? Compass : Toolbox;
  return (
    <article className={styles.card}>
      <Link aria-label={post.title} className={styles.cardLink} href={`/blog/${post.slug}/`}>
        <div className={styles.cardTop}><Icon aria-hidden size={23} weight="light" /><span>{post.category}</span></div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className={styles.cardBottom}><span>约 {post.readTime} 分钟</span><span>阅读指南 <ArrowUpRight aria-hidden size={17} /></span></div>
      </Link>
    </article>
  );
}
