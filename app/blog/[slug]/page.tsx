"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { sanityClient } from "@/lib/vendors/sanity";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/vendors/sanityImage";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  body: any[];
  image: any;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.slug) return;

    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          publishedAt,
          body,
          image
        }`;
        const data: Post = await sanityClient.fetch({ query, params: { slug: params.slug }});
        if (!data) {
          router.push("/blog"); // redireciona se slug não existe
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error("Erro ao buscar post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params?.slug, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-28 text-gray-500 bg-neutral-100 min-h-screen">
        Carregando artigo...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-28 text-gray-500 bg-neutral-100 min-h-screen">
        Artigo não encontrado.
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden mt-14 bg-neutral-100 min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-transparent" />

      <div className="relative max-w-3xl mx-auto px-6 py-16">

        <img
          src={urlFor(post.image).width(800).auto("format").url()}
          alt={post.title}
          className="w-full rounded-xl object-cover"
        />

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        <p className="text-gray-500 text-sm mb-10">
          Publicado em{" "}
          {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        <article className="prose prose-lg text-gray-700">
          <PortableText value={post.body} />
        </article>
      </div>
    </section>
  );
}
