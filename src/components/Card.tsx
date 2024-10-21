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
              className={`text-xs italic p-1 rounded ${collection === "blog" ? "bg-blue-600 text-white" : "bg-yellow-600 text-white"}`}
            >
              {collection === "blog" ? "Blog Post" : "Note"}
            </span>
          </>
        )}
      </div>
      <p>{description}</p>
    </li>
  );
}
