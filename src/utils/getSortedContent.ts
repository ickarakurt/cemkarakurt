import type { CollectionEntry } from "astro:content";
import contentFilter from "./contentFilter";

const getSortedContent = <
  T extends CollectionEntry<"blog">,
>(
  content: T[]
) => {
  return content
    .filter(contentFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

export default getSortedContent;
