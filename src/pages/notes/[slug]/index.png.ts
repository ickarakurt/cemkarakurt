import { generateOgImageForNote } from "@utils/generateOgImages";
import { slugifyStr } from "@utils/slugify";
import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("note").then(p =>
    p.filter(({ data }) => !data.draft)
  );

  return posts.map(post => ({
    params: { slug: slugifyStr(post.data.title) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(await generateOgImageForNote(props as CollectionEntry<"note">), {
    headers: { "Content-Type": "image/png" },
  });
