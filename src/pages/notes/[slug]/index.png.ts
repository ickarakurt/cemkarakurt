import { generateOgImageForNote } from "@utils/generateOgImages";
import { slugifyStr } from "@utils/slugify";
import type { APIContext } from "astro";
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

export async function GET({ props }: APIContext) {
  return new Response(
    new Uint8Array(
      await generateOgImageForNote(props as CollectionEntry<"note">)
    ),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
}
