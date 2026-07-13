"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import RevealGroup from "@/components/RevealGroup";

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  author: string;
  date: string;
};

export default function ArticleGrid({ pages }: { pages: Article[][] }) {
  const [page, setPage] = useState(0);

  const prev = () => setPage((p) => (p - 1 + pages.length) % pages.length);
  const next = () => setPage((p) => (p + 1) % pages.length);

  return (
    <div className="relative">
      {pages.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous articles"
            className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 text-primary shadow-md transition hover:bg-sage-100 sm:left-0 sm:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next articles"
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 text-primary shadow-md transition hover:bg-sage-100 sm:right-0 sm:flex"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-3">
        {pages[page].map((article) => (
          <a
            key={article.id}
            href="#"
            className="flex flex-col overflow-hidden rounded-xl border border-sage-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[16/9] w-full bg-sage-100">
              {article.imageUrl && (
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <p className="font-serif text-lg font-bold text-foreground">{article.title}</p>
              <p className="flex-1 text-sm text-foreground/70">{article.excerpt}</p>

              <div className="flex items-center gap-2 pt-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-gold-light">
                  {article.author[0]}
                </div>
                <div className="text-xs text-foreground/60">
                  <p className="font-medium text-foreground">{article.author}</p>
                  {article.date && <p>{article.date}</p>}
                </div>
              </div>
            </div>
          </a>
        ))}
      </RevealGroup>

      {pages.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Go to article page ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === page ? "w-6 bg-primary" : "w-2 bg-primary/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
