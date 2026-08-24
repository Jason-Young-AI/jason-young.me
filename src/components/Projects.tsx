import type { ProjectEntry } from "@/types/content"

import ArrowCard from "@/components/ArrowCard"

type Props = {
  data: ProjectEntry[]
}

export default function Projects({ data }: Props) {
  return (
    <div class="flex flex-col">
      <div class="text-sm uppercase mb-2">
        Showing {data.length} Projects
      </div>
      <ul class="flex flex-col gap-3">
        {data.map((project) => (
          <li>
            <ArrowCard entry={project} />
          </li>
        ))}
      </ul>
      {data.length === 0 && (
        <div class="text-sm italic text-gray-500 mt-4">
          No projects found.
        </div>
      )}
    </div>
  )
}