import type { PublicationEntry } from "@/types/content";
import { createEffect, createMemo, createSignal, For } from "solid-js";

import ArrowCard from "@/components/ArrowCard"


type Props = {
  data: PublicationEntry[]
}

const publicationKindOrder = [
  "paper",
  "review",
  "monograph",
  "patent",
  "thesis",
  "book",
  "report",
  "other",
] as const

const publicationKindLabels: Record<string, string> = {
  paper: "Paper",
  review: "Review",
  monograph: "Monograph",
  patent: "Patent",
  thesis: "Thesis",
  book: "Book",
  report: "Report",
  other: "Other",
}

const getYear = (dateValue: string) => {
  const year = new Date(dateValue).getUTCFullYear()
  return Number.isNaN(year) ? "Unknown" : String(year)
}

const normalizeType = (typeValue: string) => typeValue.trim().toLowerCase()

const getTypeLabel = (typeValue: string) => {
  const normalized = normalizeType(typeValue)
  return publicationKindLabels[normalized] ?? (normalized ? `${normalized[0].toUpperCase()}${normalized.slice(1)}` : "Other")
}

export default function Publications({ data }: Props) {
  const [yearFilter, setYearFilter] = createSignal("all")
  const [typeFilter, setTypeFilter] = createSignal("all")
  const [venueFilter, setVenueFilter] = createSignal("all")
  const [viewFilter, setViewFilter] = createSignal("selected")

  const typeOptions = createMemo(() => {
    const available = new Set(data.map((entry) => normalizeType(entry.data.type)))
    const ordered = publicationKindOrder.filter((kind) => available.has(kind))
    const others = Array.from(available).filter((kind) => !publicationKindOrder.includes(kind as typeof publicationKindOrder[number]))
    return [...ordered, ...others]
  })

  const venueOptions = createMemo(() =>
    Array.from(
      new Set(
        data
          .map((entry) => entry.data.position?.trim())
          .filter((venue): venue is string => Boolean(venue && venue.length > 0)),
      ),
    ).sort((a, b) => a.localeCompare(b)),
  )

  const yearOptions = createMemo(() =>
    Array.from(
      new Set(
        data
          .filter((entry) => {
            const matchesType = typeFilter() === "all" || normalizeType(entry.data.type) === typeFilter()
            const matchesVenue = venueFilter() === "all" || (entry.data.position ?? "") === venueFilter()
            const matchesView = viewFilter() === "all" || Boolean(entry.data.select)
            return matchesType && matchesVenue && matchesView
          })
          .map((entry) => getYear(entry.data.date))
          .filter((year) => year !== "Unknown"),
      ),
    ).sort((a, b) => Number(b) - Number(a)),
  )

  createEffect(() => {
    if (yearFilter() !== "all" && !yearOptions().includes(yearFilter())) {
      setYearFilter("all")
    }
  })

  const filtered = createMemo(() =>
    data.filter((entry) => {
      const matchesYear = yearFilter() === "all" || getYear(entry.data.date) === yearFilter()
      const matchesType = typeFilter() === "all" || normalizeType(entry.data.type) === typeFilter()
      const matchesVenue = venueFilter() === "all" || (entry.data.position ?? "") === venueFilter()
      const matchesView = viewFilter() === "all" || Boolean(entry.data.select)
      return matchesYear && matchesType && matchesVenue && matchesView
    }),
  )

  const resetFilters = () => {
    setYearFilter("all")
    setTypeFilter("all")
    setVenueFilter("all")
    setViewFilter("selected")
  }

  return (
    <div class="flex flex-col">
      <div class="rounded-lg border border-black/15 dark:border-white/20 p-3 mb-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <label class="flex flex-col gap-1 text-sm">
            <span class="uppercase text-xs tracking-wide">Year</span>
            <select class="rounded border border-black/15 dark:border-white/20 bg-transparent px-2 py-1" value={yearFilter()} onChange={(event) => setYearFilter(event.currentTarget.value)}>
              <option value="all">All Years</option>
              <For each={yearOptions()}>{(year) => <option value={year}>{year}</option>}</For>
            </select>
          </label>

          <label class="flex flex-col gap-1 text-sm">
            <span class="uppercase text-xs tracking-wide">Type</span>
            <select class="rounded border border-black/15 dark:border-white/20 bg-transparent px-2 py-1" value={typeFilter()} onChange={(event) => setTypeFilter(event.currentTarget.value)}>
              <option value="all">All Types</option>
              <For each={typeOptions()}>{(typeValue) => <option value={typeValue}>{getTypeLabel(typeValue)}</option>}</For>
            </select>
          </label>

          <label class="flex flex-col gap-1 text-sm">
            <span class="uppercase text-xs tracking-wide">Venue</span>
            <select class="rounded border border-black/15 dark:border-white/20 bg-transparent px-2 py-1" value={venueFilter()} onChange={(event) => setVenueFilter(event.currentTarget.value)}>
              <option value="all">All Venues</option>
              <For each={venueOptions()}>{(venue) => <option value={venue}>{venue}</option>}</For>
            </select>
          </label>

          <label class="flex flex-col gap-1 text-sm">
            <span class="uppercase text-xs tracking-wide">Publications</span>
            <select class="rounded border border-black/15 dark:border-white/20 bg-transparent px-2 py-1" value={viewFilter()} onChange={(event) => setViewFilter(event.currentTarget.value)}>
              <option value="selected">Selected Only</option>
              <option value="all">All</option>
            </select>
          </label>

          <div class="flex items-end">
            <button type="button" class="w-full rounded border border-black/20 dark:border-white/25 px-2 py-1 text-sm hover:bg-black/5 hover:dark:bg-white/10 transition-colors" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div class="text-sm uppercase mb-2">
        Showing {filtered().length} of {data.length} Publications
      </div>
      <ul class="flex flex-col gap-3">
        {filtered().map((publication) => (
          <li>
            <ArrowCard entry={publication} />
          </li>
        ))}
      </ul>
      {filtered().length === 0 && (
        <div class="text-sm italic text-gray-500 mt-4">
          No publications match your selected filters.
        </div>
      )}
    </div>
  )
}