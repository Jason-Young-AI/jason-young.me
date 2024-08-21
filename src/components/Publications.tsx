import type { CollectionEntry } from "astro:content"

import { createEffect, createSignal, For } from "solid-js"
import { clsx } from "clsx"

import ArrowCard from "@components/ArrowCard"


type Props = {
  data: CollectionEntry<"publications">[]
  tags: string[]
}

export default function Projects({ data, tags }: Props) {
  const [filter, setFilter] = createSignal(new Set<string>())
  const [publications, setPublications] = createSignal<CollectionEntry<"publications">[]>([])

  createEffect(() => {
    setPublications(data.filter((entry) => 
      Array.from(filter()).every((value) => 
        entry.data.tags.some((tag:string) => 
          tag.toLowerCase() === String(value).toLowerCase()
        )
      )
    ))
  })

  function toggleTag(tag: string) {
    setFilter((prev) => 
      new Set(prev.has(tag) 
        ? [...prev].filter((t) => t !== tag) 
        : [...prev, tag]
      )
    )
  }

  return (
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div class="col-span-3 sm:col-span-1">
        <div class="sticky top-24">
          <div class="text-sm font-semibold uppercase mb-2 text-black dark:text-white">Filter</div>
          <ul class="flex flex-wrap sm:flex-col gap-1.5">
            <For each={tags}>
              {(tag) => (
                <li>
                  <button onClick={() => toggleTag(tag)} class={clsx("w-full text-sm px-2 py-1 rounded", "whitespace-nowrap overflow-hidden overflow-ellipsis", "flex gap-2 items-center", "bg-black/5 dark:bg-white/10", "hover:bg-black/10 hover:dark:bg-white/15", "transition-colors duration-300 ease-in-out", filter().has(tag) && "text-black dark:text-white")}>
                    <svg class={clsx("size-5 fill-black/50 dark:fill-white/50", "transition-colors duration-300 ease-in-out", filter().has(tag) && "fill-black dark:fill-white")}>
                      <use href={`/logos/ui.svg#square`} class={clsx(!filter().has(tag) ? "block" : "hidden")} />
                      <use href={`/logos/ui.svg#square-check`} class={clsx(filter().has(tag) ? "block" : "hidden")} />
                    </svg>
                    {tag}
                  </button>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
      <div class="col-span-3 sm:col-span-2">
        <div class="flex flex-col">
          <div class="text-sm uppercase mb-2">
            Showing {publications().length} of {data.length} Publications
          </div>
          <ul class="flex flex-col gap-3">
            {publications().map((publication) => (
              <li>
                <ArrowCard entry={publication} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}