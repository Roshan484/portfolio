import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/*"],
      disallow: ["/roshan_dashboard", "/roshan_dashboard/*"],
    },
    sitemap: "https://roshanaryal.dev/sitemap.xml",
  };
}
