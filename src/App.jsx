import { useState } from 'react'
import Header from './components/Header'
import Board from './components/Board'
import TaskModal from './components/TaskModal'
import './index.css'

// TODO: Replace with your own state management logic
const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Design homepage wireframe',
    description: 'Create low-fidelity wireframes for the new homepage layout',
    priority: 'high',
    dueDate: '2026-11-01',
    status: 'todo',
  },
  {
    id: '2',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    priority: 'medium',
    dueDate: '2026-11-05',
    status: 'inprogress',
  },
  {
    id: '3',
    title: 'Write unit tests',
    description: 'Add unit tests for the authentication module',
    priority: 'low',
    dueDate: '2026-10-28',
    status: 'completed',
  },
]

function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const handleAddTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      status: 'todo',
    }
    setTasks((prev) => [...prev, newTask])
    setIsModalOpen(false)
  }

  const handleEditTask = (taskData) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t))
    )
    setEditingTask(null)
    setIsModalOpen(false)
  }

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  const handleMoveTask = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    )
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesPriority =
      filterPriority === 'all' || task.priority === filterPriority
    const matchesStatus =
      filterStatus === 'all' || task.status === filterStatus
    return matchesSearch && matchesPriority && matchesStatus
  })

  const openAddModal = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterPriority={filterPriority}
        onFilterPriorityChange={setFilterPriority}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        onAddTask={openAddModal}
      />

      <Board
        tasks={filteredTasks}
        onEditTask={openEditModal}
        onDeleteTask={handleDeleteTask}
        onMoveTask={handleMoveTask}
        searchQuery={searchQuery}
      />

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onSubmit={editingTask ? handleEditTask : handleAddTask}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default App
