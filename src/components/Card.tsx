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
    <li className="group relative mt-2">
      <article className="
        flex flex-col gap-2 
        p-4 rounded-lg
        border border-gray-200 dark:border-gray-800
        hover:border-gray-300 dark:hover:border-gray-700
        transition-all duration-200
        hover:shadow-sm
      ">
        {/* Title with hover effect */}
        <a href={href} className="relative">
          {secHeading ? (
            <h2
              style={{ viewTransitionName: slugifyStr(title) }}
              className="
                text-xl font-semibold 
                text-gray-900 dark:text-gray-100
                group-hover:text-black dark:group-hover:text-white
                mb-1 transition-colors duration-200
              "
            >
              {title}
            </h2>
          ) : (
            <h3
              style={{ viewTransitionName: slugifyStr(title) }}
              className="
                text-xl font-semibold 
                text-gray-900 dark:text-gray-100
                group-hover:text-black dark:group-hover:text-white
                mb-1 transition-colors duration-200
              "
            >
              {title}
            </h3>
          )}
        </a>

        {/* Meta information row */}
        <div className="flex items-center gap-3 text-sm">
          {/* Date */}
          <div className="text-gray-600 dark:text-gray-400">
            <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
          </div>

          {/* Separator */}
          {collection && (
            <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          )}

          {/* Collection Badge */}
          {collection && (
            <span
              className={`
                inline-flex items-center gap-1.5 
                px-2 py-0.5 text-xs font-medium rounded
                ${
                  collection === "blog"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                }
              `}
            >
              {collection === "blog" ? (
                <>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  <span>Blog</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span>Note</span>
                </>
              )}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="
          text-gray-600 dark:text-gray-400 
          text-sm leading-relaxed
          line-clamp-2
        ">
          {description}
        </p>
      </article>
    </li>
  );
}
