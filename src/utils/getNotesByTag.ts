import type { CollectionEntry } from "astro:content";
import getSortedContent from "./getSortedContent";
import { slugifyAll } from "./slugify";

const getNotesByTag = (notes: CollectionEntry<"note">[], tag: string) =>
  getSortedContent(
    notes.filter(note => slugifyAll(note.data.tags).includes(tag))
  );

export default getNotesByTag;
