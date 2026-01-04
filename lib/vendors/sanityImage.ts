import { createClient } from "@sanity/client";
import {createImageUrlBuilder} from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: "nrfh1qf7",
  dataset: "production",
  apiVersion: "2026-01-04",
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}