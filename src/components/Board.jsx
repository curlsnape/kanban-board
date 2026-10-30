import { CircleCheck, ListTodo, Loader } from 'lucide-react'
import Column from './Column'

const COLUMNS = [
  { id: 'todo', title: 'Todo', icon: ListTodo, iconColor: 'text-amber-500' },
  { id: 'inprogress', title: 'In Progress', icon: Loader, iconColor: 'text-blue-500' },
  { id: 'completed', title: 'Completed', icon: CircleCheck, iconColor: 'text-emerald-500' },
]

export default function Board({
  tasks,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  searchQuery,
}) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.id)
          return (
            <Column
              key={column.id}
              column={column}
              tasks={columnTasks}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
              onMoveTask={onMoveTask}
              searchQuery={searchQuery}
            />
          )
        })}
      </div>
    </main>
  )
}