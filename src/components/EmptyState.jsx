import { ClipboardList, SearchX } from 'lucide-react'

export default function EmptyState({ columnTitle, hasSearchQuery }) {
  if (hasSearchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
          <SearchX size={20} className="text-gray-400" />
        </div>
        <p className="text-sm text-gray-500 font-medium">No results found</p>
        <p className="text-xs text-gray-400 mt-1">
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
        <ClipboardList size={20} className="text-gray-400" />
      </div>
      <p className="text-sm text-gray-500 font-medium">
        No tasks in {columnTitle}
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Tasks will appear here when added
      </p>
    </div>
  )
}
