import type { APIRoute } from "astro"

export const GET: APIRoute = ({ site, redirect }) => {
  const sitemapIndexURL = new URL("sitemap-index.xml", site)
  return redirect(sitemapIndexURL.toString(), 301)
}
