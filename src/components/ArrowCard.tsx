import { type CollectionEntry } from "astro:content"
import { formatDate } from "@lib/utils"

type Props = {
  entry: CollectionEntry<"publications"> | CollectionEntry<"projects"> | CollectionEntry<"posts">
  pill?: boolean
}

export default function ArrowCard({entry, pill}: Props) {
    return (
      <a href={`/${entry.collection}/${entry.slug}`} class="group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out">
      <div class="w-full group-hover:text-black group-hover:dark:text-white blend">
        <div class="flex flex-wrap items-center gap-2">
          {pill &&
            <div class="text-sm capitalize px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25">
              {entry.collection}
            </div>
          }
          <div class="text-sm uppercase">
            {formatDate(entry.data.date)}
          </div>
        </div>
        <div class="font-semibold mt-3 text-black dark:text-white">
          {entry.data.title}
        </div>

        <div class="flex flex-wrap items-center mt-1 mb-0 gap-1">
          <div class="text-sm font-bold">
            Authors:
          </div>
          {(entry.data.authors.length == 1) &&
            <div class="text-sm px-1 py-0.5">
              {entry.data.authors[0]}
            </div>
          }
          {(entry.data.authors.length == 2) &&
            <div class="text-sm px-1 py-0.5">
              {entry.data.authors[0]} and {entry.data.authors[1]}
            </div>
          }
          {(entry.data.authors.length >= 3) &&
            <div class="text-sm px-1 py-0.5">
              {entry.data.authors[0]} et al.
            </div>
          }
        </div>

        {(entry.collection == 'publications') &&
          <div class="flex flex-wrap items-center mt-0 mb-1 gap-1">
            <div class="text-sm font-bold">
              Publish @
            </div>
            <div class="text-sm py-0.5">
              {entry.data.position}
            </div>
          </div>
        }

        <div class="text-sm line-clamp-2">
          {entry.data.summary}
        </div>
        <ul class="flex flex-wrap mt-2 gap-1">
          {entry.data.tags.map((tag:string) => ( // this line has an error; Parameter 'tag' implicitly has an 'any' type.ts(7006)
            <li class="text-xs uppercase py-0.5 px-1 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white">
        <line x1="5" y1="12" x2="19" y2="12" class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
        <polyline points="12 5 19 12 12 19" class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
      </svg>
    </a>
   )
}