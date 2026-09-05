"use client";

import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { useState } from "react";
import type { GuideSummary } from "@/types/site";
import { filterGuides } from "@/content/guide-utils";
import { BlogCard } from "./BlogCard";
import styles from "./guides.module.css";

const categories = ["全部", "开始使用", "日常工作流", "进阶能力"];

export function GuideLibrary({ guides }: { guides: GuideSummary[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const results = filterGuides(guides, query, category);

  return (
    <section aria-labelledby="guide-library-title" className={styles.library}>
      <div className={styles.libraryHeading}><h2 id="guide-library-title">按你现在要做的事，找到指南。</h2><span role="status">找到 {results.length} 篇指南</span></div>
      <div className={styles.filters}>
        <nav aria-label="指南分类" className={styles.categories}>{categories.map((item) => <button aria-pressed={category === item} key={item} onClick={() => setCategory(item)} type="button">{item}<span aria-hidden>{item === "全部" ? guides.length : guides.filter((guide) => guide.category === item).length}</span></button>)}</nav>
        <form className={styles.search} onSubmit={(event) => event.preventDefault()} role="search">
          <MagnifyingGlass aria-hidden size={18} />
          <input aria-label="搜索使用指南" onChange={(event) => setQuery(event.target.value)} placeholder="搜索指南，如 Git、导出…" type="search" value={query} />
          {query ? <button aria-label="清除搜索" onClick={() => setQuery("")} type="button"><X aria-hidden size={15} /></button> : null}
        </form>
      </div>
      {results.length ? <div className={styles.grid}>{results.map((post) => <BlogCard key={post.slug} post={post} />)}</div> : <div className={styles.empty}><h3>暂时没有匹配的指南</h3><p>试试“Markdown”“导出”或“Git”，也可以查看全部指南。</p><button onClick={() => { setQuery(""); setCategory("全部"); }} type="button">重置筛选</button></div>}
    </section>
  );
}
