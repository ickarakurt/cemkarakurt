import { slugifyStr } from "@utils/slugify";
import type { CollectionEntry } from "astro:content";
import Datetime from "./Datetime";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
  collection?: string;
}

export default function Card({
  href,
  frontmatter,
  secHeading = true,
  collection,
}: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;

  return (
    <article
      className="
      group relative
      flex flex-col gap-3 h-full
      p-5 rounded-lg
      bg-skin-card border border-skin-border/60
      transition-all duration-300 ease-sharp
      hover:border-skin-accent/40
      hover:shadow-lg hover:shadow-skin-accent/8
      hover:-translate-y-0.5
      overflow-hidden
    "
    >
      {/* Data attribute badge */}
      <div className="flex items-center gap-2 mb-0.5">
        <span className="font-mono text-xxs uppercase tracking-wider text-skin-base/25">
          {collection === "blog" ? "article" : "note"}
        </span>
        <span className="w-6 h-px bg-skin-border/40"></span>
      </div>

      <div className="flex flex-col gap-2">
        {/* Title */}
        <a href={href} className="inline-block group/link">
          {secHeading ? (
            <h2
              style={{ viewTransitionName: slugifyStr(title) }}
              className="
                text-base font-display font-semibold tracking-tight
                text-skin-base group-hover/link:text-skin-accent
                transition-colors duration-200
                leading-snug
              "
            >
              {title}
            </h2>
          ) : (
            <h3
              style={{ viewTransitionName: slugifyStr(title) }}
              className="
                text-base font-display font-semibold tracking-tight
                text-skin-base group-hover/link:text-skin-accent
                transition-colors duration-200
                leading-snug
              "
            >
              {title}
            </h3>
          )}
        </a>

        {/* Description */}
        <p className="text-skin-base/60 text-sm leading-relaxed line-clamp-2 font-sans">
          {description}
        </p>
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between pt-3 mt-auto border-t border-skin-border/30">
        <div className="flex items-center gap-2">
          {/* Collection Badge */}
          {collection && (
            <span
              className={`
                inline-flex items-center gap-1
                px-2 py-0.5 text-xxs font-medium rounded uppercase tracking-wider font-mono
                transition-all duration-200
                ${
                  collection === "blog"
                    ? "bg-skin-accent/8 text-skin-accent border border-skin-accent/15"
                    : "bg-skin-card-muted text-skin-base/60 border border-skin-border/40"
                }
              `}
            >
              {collection === "blog" ? (
                <>
                  <svg
                    className="w-2.5 h-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  <span>blog</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-2.5 h-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span>note</span>
                </>
              )}
            </span>
          )}

          <div className="text-skin-base/40 text-xs font-mono">
            <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
          </div>
        </div>

        {/* Arrow indicator */}
        <svg
          className="w-3.5 h-3.5 text-skin-base/25 group-hover:text-skin-accent transition-colors duration-200 transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </article>
  );
}
