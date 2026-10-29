import { Plus, Search, SlidersHorizontal } from 'lucide-react'

export default function Header({
  searchQuery,
  onSearchChange,
  filterPriority,
  onFilterPriorityChange,
  filterStatus,
  onFilterStatusChange,
  onAddTask,
}) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Kanban Board</h1>
          </div>

          <button
            onClick={onAddTask}
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pb-4">
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-gray-400 hidden sm:block" />

            <select
              value={filterPriority}
              onChange={(e) => onFilterPriorityChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => onFilterStatusChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="todo">📋 Todo</option>
              <option value="inprogress">🔄 In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}
