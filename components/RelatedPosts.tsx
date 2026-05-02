import { Post } from "@/lib/types";
import PostCard from "@/components/PostCard";

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 border-t border-brand-border pt-16">
      <h2 className="mb-10 text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">
        More Insights for You
      </h2>
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            description={post.description ?? ""}
            date={post.date}
            category={post.category}
            slug={post.slug}
            cover={post.cover}
          />
        ))}
      </div>
    </section>
  );
}
