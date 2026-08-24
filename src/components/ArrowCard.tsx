import type { PublicationEntry, ProjectEntry, PostEntry } from "@/types/content"
import { formatDate } from "@/lib/utils"

type Props = {
  entry: PublicationEntry | ProjectEntry | PostEntry
  pill?: boolean
}

export default function ArrowCard({entry, pill}: Props) {
  const cofirstAuthors = entry.collection === "publications" ? (entry.data.cofirstAuthors ?? []) : []
  const correspondingAuthors = entry.collection === "publications" ? (entry.data.correspondingAuthors ?? []) : []
  const shouldShowCoFirst = entry.collection === "publications" && cofirstAuthors.length > 1
  const isPublication = entry.collection === "publications"
  const publicationCitation = isPublication
    ? (entry.data.bibtex?.trim().length ? entry.data.bibtex : `${entry.data.authors.join(", ")} (${new Date(entry.data.date).getUTCFullYear()}). ${entry.data.title}. ${entry.data.position ?? "Publication"}.`)
    : ""
  const publicationPaperLink = isPublication
    ? (entry.data.officialLink ?? entry.data.href ?? entry.data.arxivLink)
    : undefined
  const publicationArxivLink = isPublication ? entry.data.arxivLink : undefined
  const publicationDetailsLink = isPublication ? entry.data.yangsAiDetailUrl : undefined
  const href = entry.collection === "posts"
    ? `/${entry.collection}/${entry.slug}`
    : (entry.data.href ?? `/${entry.collection}`)

  const isNameHighlighted = (author: string) => author.trim().toLowerCase() === "zhengxin yang"

  const renderAuthor = (author: string) => (
    <span class={isNameHighlighted(author) ? "font-semibold text-black dark:text-white underline decoration-black/40 dark:decoration-white/40 underline-offset-2" : undefined}>
      {author}
      {shouldShowCoFirst && cofirstAuthors.includes(author) && <sup class="ml-[1px] relative top-[1px] text-[10px]">†</sup>}
      {correspondingAuthors.includes(author) && <sup class="ml-[1px] relative top-[1px] text-[10px]">*</sup>}
    </span>
  )

  const cardClass = "group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"
  const cardContent = (
    <>
      <div class="w-full group-hover:text-black group-hover:dark:text-white blend">
        <div class="flex flex-wrap items-center gap-2">
          {pill &&
            <div class="text-sm capitalize px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25">
              {entry.collection}
            </div>
          }
          <div class="text-sm uppercase">
            {formatDate(new Date(entry.data.date))}
          </div>
        </div>
        <div class="font-semibold mt-3 text-black dark:text-white">
          {entry.data.title}
        </div>

        {entry.data.authors.length > 0 &&
          <div class="flex flex-wrap items-center mt-1 mb-0 gap-1">
            <div class="text-sm font-bold">
              Authors:
            </div>
            <div class="text-sm px-1 py-0.5">
              {entry.data.authors.map((author, index) => (
                <span>
                  {index > 0 && ", "}
                  {renderAuthor(author)}
                </span>
              ))}
            </div>
          </div>
        }

        {(entry.collection == 'publications' && correspondingAuthors.length > 0) &&
          <div class="flex flex-wrap items-center mt-0 mb-1 gap-1">
            <div class="text-sm font-bold">
              Corresponding:
            </div>
            <div class="text-sm py-0.5">
              {correspondingAuthors.map((author, index) => (
                <span>
                  {index > 0 && ", "}
                  {author}<sup class="ml-[1px] relative top-[-2px] text-[10px]">*</sup>
                </span>
              ))}
            </div>
          </div>
        }

        {(entry.collection == 'publications' && shouldShowCoFirst) &&
          <div class="flex flex-wrap items-center mt-0 mb-1 gap-1">
            <div class="text-sm font-bold">
              Co-first:
            </div>
            <div class="text-sm py-0.5">
              {cofirstAuthors.map((author, index) => (
                <span>
                  {index > 0 && ", "}
                  {author}<sup class="ml-[1px] relative top-[-2px] text-[10px]">†</sup>
                </span>
              ))}
            </div>
          </div>
        }

        {(entry.collection == 'publications' && entry.data.position) &&
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
          {entry.data.tags.map((tag: string) => (
            <li class="text-xs uppercase py-0.5 px-1 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75">
              {tag}
            </li>
          ))}
        </ul>

        {isPublication &&
          <div class="mt-3 flex flex-wrap items-center justify-end gap-2">
            <details class="group/details relative">
              <summary class="list-none cursor-pointer text-xs uppercase tracking-wide rounded border border-black/20 dark:border-white/25 px-2 py-1 hover:bg-black/5 hover:dark:bg-white/10 transition-colors">
                View Citation
              </summary>
              <div class="absolute right-0 mt-2 w-[min(42rem,80vw)] rounded border border-black/15 dark:border-white/20 bg-white dark:bg-[#111] p-3 shadow-lg z-10">
                <pre class="text-xs whitespace-pre-wrap break-words max-h-[50vh] overflow-auto">{publicationCitation}</pre>
              </div>
            </details>

            {publicationPaperLink &&
              <a href={publicationPaperLink} target="_blank" rel="noreferrer" class="text-xs uppercase tracking-wide rounded border border-black/20 dark:border-white/25 px-2 py-1 hover:bg-black/5 hover:dark:bg-white/10 transition-colors">
                Open Paper
              </a>
            }

            {publicationArxivLink && publicationArxivLink !== publicationPaperLink &&
              <a href={publicationArxivLink} target="_blank" rel="noreferrer" class="text-xs uppercase tracking-wide rounded border border-black/20 dark:border-white/25 px-2 py-1 hover:bg-black/5 hover:dark:bg-white/10 transition-colors">
                Open Preprint
              </a>
            }

            {publicationDetailsLink &&
              <a href={publicationDetailsLink} target="_blank" rel="noreferrer" class="text-xs uppercase tracking-wide rounded border border-black dark:border-white px-2 py-1 hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black transition-colors">
                See Details at Yangs-AI
              </a>
            }
          </div>
        }
      </div>
      {!isPublication &&
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white">
          <line x1="5" y1="12" x2="19" y2="12" class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
          <polyline points="12 5 19 12 12 19" class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
        </svg>
      }
    </>
  )

  if (isPublication) {
    return <div class={cardClass}>{cardContent}</div>
  }

  return (
    <a href={href} target={entry.collection === "posts" ? undefined : "_blank"} rel={entry.collection === "posts" ? undefined : "noreferrer"} class={cardClass}>
      {cardContent}
    </a>
  )
}