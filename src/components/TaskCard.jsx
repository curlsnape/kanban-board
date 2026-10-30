import {
  Calendar,
  ChevronRight,
  EllipsisVertical,
  Pencil,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

const PRIORITY_CONFIG = {
  high: {
    label: 'High',
    dotClass: 'bg-red-500',
    badgeClass: 'bg-red-50 text-red-700 border border-red-200',
  },
  medium: {
    label: 'Medium',
    dotClass: 'bg-amber-500',
    badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200',
  },
  low: {
    label: 'Low',
    dotClass: 'bg-emerald-500',
    badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  },
}

const STATUS_OPTIONS = [
  { value: 'todo', label: 'Todo' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
]

export default function TaskCard({ task, onEdit, onDelete, onMove }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium

  const otherStatuses = STATUS_OPTIONS.filter((s) => s.value !== task.status)

  const formatDate = (dateStr) => {
    if (!dateStr) return null
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const isOverdue = (dateStr) => {
    if (!dateStr) return false
    return new Date(dateStr) < new Date() && task.status !== 'completed'
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between mb-2">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${priority.badgeClass}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${priority.dotClass}`} />
          {priority.label}
        </span>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <EllipsisVertical size={14} className="text-gray-400" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={() => {
                    onEdit()
                    setMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                {otherStatuses.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => {
                      onMove(s.value)
                      setMenuOpen(false)
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    <ChevronRight size={14} />
                    Move to {s.label}
                  </button>
                ))}

                <hr className="my-1 border-gray-100" />

                <button
                  onClick={() => {
                    onDelete()
                    setMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <h3 className="font-medium text-gray-900 text-sm mb-1 leading-snug">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}
      {task.dueDate && (
        <div
          className={`inline-flex items-center gap-1 text-xs ${
            isOverdue(task.dueDate)
              ? 'text-red-500 font-medium'
              : 'text-gray-400'
          }`}
        >
          <Calendar size={12} />
          {formatDate(task.dueDate)}
          {isOverdue(task.dueDate) && (
            <span className="ml-1 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
              Overdue
            </span>
          )}
        </div>
      )}
    </div>
  )
}