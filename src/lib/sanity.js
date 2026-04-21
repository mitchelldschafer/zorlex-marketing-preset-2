import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "xvq24507", 
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  useCdn: true, 
  apiVersion: "2023-05-03", 
  token: import.meta.env.VITE_SANITY_API_TOKEN, 
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Common queries
export const queries = {
  posts: `*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "authorName": author->name,
    "categories": categories[]->title
  }`,
  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    body,
    "authorName": author->name,
    "categories": categories[]->title
  }`
};
