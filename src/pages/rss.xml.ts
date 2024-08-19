import { getCollection } from "astro:content"
import { SITE } from "@consts"

import rss from "@astrojs/rss"


type Context = {
  site: string
}

export async function GET(context: Context) {
  const publications = await getCollection("publications")
  const projects = await getCollection("projects")
	const posts = await getCollection("posts")

  const publicationsWithType = publications.map(
    item => ({
      ...item,
      parent: 'publications',
    })
  );

  const projectsWithType = projects.map(
    item => ({
      ...item,
      parent: 'projects',
    })
  );

  const postsWithType = posts.map(
    item => ({
      ...item,
      parent: 'posts',
    })
  );

  const items = [...publicationsWithType, ...projectsWithType, ...postsWithType]

  items.filter(item => !item.data.draft).sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.date,
      link: `/${item..split("/")[0]]}/${item.slug}`,
    })),
  })
}