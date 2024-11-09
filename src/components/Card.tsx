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

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <div className="flex gap-2">
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
        {collection && (
          <>
            {" "}
            |{" "}
            <span
  className={`
    inline-flex items-center px-2 py-0.5 text-xs font-medium
    rounded-md border
    ${collection === "blog" 
      ? "bg-black text-white border-black dark:bg-white dark:text-black" 
      : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
    }
    transition-colors duration-200
  `}
>
  {collection === "blog" ? (
    <>
      <svg 
        className="w-3 h-3 mr-1" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
      Blog
    </>
  ) : (
    <>
      <svg 
        className="w-3 h-3 mr-1" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M9 12h6" />
        <path d="M12 9v6" />
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
      </svg>
      Note
    </>
  )}
</span>
          </>
        )}
      </div>
      <p>{description}</p>
    </li>
  );
}
