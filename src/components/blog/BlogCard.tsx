import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/site";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      <Link aria-label={post.title} className="blog-card-image" href={`/blog/${post.slug}/`}>
        <picture>
          <source
            sizes="(max-width: 809px) calc(100vw - 72px), (max-width: 1199px) calc((100vw - 108px) / 2), 386.667px"
            srcSet={`${post.cardImage} 512w`}
          />
          <Image alt="" fill sizes="(max-width: 809px) 100vw, 33vw" src={post.cardImage} />
        </picture>
      </Link>
      <div className="blog-card-meta"><span>{post.category}</span><time dateTime={post.date}>{post.date}</time></div>
      <h3><Link href={`/blog/${post.slug}/`}>{post.title}</Link></h3>
    </article>
  );
}
