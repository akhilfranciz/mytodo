import { useState, useMemo, useCallback } from 'react';
import type { Task, TaskStatus } from './types/Task';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import type { FilterOption } from './components/FilterBar';
import TaskSection from './components/TaskSection';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todoapp-tasks', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Counts for filter badges
  const filterCounts = useMemo(() => ({
    all: tasks.length,
    'in-progress': tasks.filter((t) => t.status === 'in-progress').length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  }), [tasks]);

  // Apply search + filter
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Status filter
    if (activeFilter !== 'all') {
      result = result.filter((t) => t.status === activeFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [tasks, searchQuery, activeFilter]);

  const handleAddTask = useCallback((title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: 'pending',
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setShowAddForm(false);
  }, [setTasks]);

  const handleUpdateTask = useCallback((id: string, title: string, description: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, description, status } : task
      )
    );
    setEditingTask(null);
  }, [setTasks]);

  const handleDeleteTask = useCallback((id: string) => {
    // Add exit animation class, then remove after animation
    const el = document.querySelector(`[data-task-id="${id}"]`);
    if (el) {
      el.classList.add('task-item--exiting');
      setTimeout(() => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      }, 300);
    } else {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  }, [setTasks]);

  if (editingTask) {
    return (
      <div className="app app--page-enter">
        <Header title="Edit Task" showBack onBack={() => setEditingTask(null)} />
        <EditTaskForm
          task={editingTask}
          onUpdate={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
        />
      </div>
    );
  }

  if (showAddForm) {
    return (
      <div className="app app--page-enter">
        <Header title="Add Task" showBack onBack={() => setShowAddForm(false)} />
        <AddTaskForm onAdd={handleAddTask} onCancel={() => setShowAddForm(false)} />
      </div>
    );
  }

  return (
    <div className="app">
      <Header title="TO-DO APP" />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <FilterBar active={activeFilter} onChange={setActiveFilter} counts={filterCounts} />
      <div className="app__sections">
        {(activeFilter === 'all' || activeFilter === 'in-progress') && (
          <TaskSection
            title="In Progress"
            status="in-progress"
            tasks={filteredTasks}
            onEditClick={setEditingTask}
            onDelete={handleDeleteTask}
          />
        )}
        {(activeFilter === 'all' || activeFilter === 'pending') && (
          <TaskSection
            title="Pending"
            status="pending"
            tasks={filteredTasks}
            onEditClick={setEditingTask}
            onDelete={handleDeleteTask}
          />
        )}
        {(activeFilter === 'all' || activeFilter === 'completed') && (
          <TaskSection
            title="Completed"
            status="completed"
            tasks={filteredTasks}
            onEditClick={setEditingTask}
            onDelete={handleDeleteTask}
          />
        )}
      </div>
      <button
        className="app__fab"
        onClick={() => setShowAddForm(true)}
        aria-label="Add task"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

export default App;
