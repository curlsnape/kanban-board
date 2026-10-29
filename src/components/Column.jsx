import TaskCard from './TaskCard'
import EmptyState from './EmptyState'

export default function Column({
  column,
  tasks,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  searchQuery,
}) {
  return (
    <div className="bg-gray-100 rounded-xl p-4 flex flex-col min-h-[300px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${column.color}`} />
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            {column.title}
          </h2>
        </div>
        <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto kanban-column pr-1">
        {tasks.length === 0 ? (
          <EmptyState
            columnTitle={column.title}
            hasSearchQuery={!!searchQuery}
          />
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
              onMove={(newStatus) => onMoveTask(task.id, newStatus)}
            />
          ))
        )}
      </div>
    </div>
  )
}
