import type { MetadataRoute } from "next";

const hostname = "https://roshanaryal.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${hostname}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
