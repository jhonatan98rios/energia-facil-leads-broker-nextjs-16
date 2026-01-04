"use client";

import { useEffect, useState } from "react";
import { sanityClient } from "@/lib/vendors/sanity";
import { urlFor } from "@/lib/vendors/sanityImage";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  body: any[];
  image: any;
}

export default function ArticlesList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data: Post[] = await sanityClient.fetch({
            query: `
                *[_type == "post"]{
                    _id,
                    title,
                    slug,
                    publishedAt,
                    body,
                    image
                }
            `
        });
        setPosts(data);
      } catch (err) {
        console.error("Erro ao buscar posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-28 text-gray-500 bg-neutral-100 min-h-screen">
        Carregando artigos...
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden mt-14 bg-neutral-100 min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Últimos Artigos
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post._id}
              className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition cursor-pointer"
              onClick={() =>
                window.location.assign(`/blog/${post.slug.current}`)
              }
            >
              <img
                src={urlFor(post.image).auto("format").url()}
                alt={post.title}
                className="w-full rounded-xl object-cover"
              />

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h3>

              <p className="text-gray-500 text-sm mb-4">
                {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
