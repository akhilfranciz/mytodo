import { useState, useMemo } from 'react';
import type { Task, TaskStatus } from './types/Task';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TaskSection from './components/TaskSection';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    const query = searchQuery.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
    );
  }, [tasks, searchQuery]);

  const handleAddTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: 'pending',
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setShowAddForm(false);
  };

  const handleUpdateTask = (id: string, title: string, description: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, description, status } : task
      )
    );
    setEditingTask(null);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  if (editingTask) {
    return (
      <div className="app">
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
      <div className="app">
        <Header title="Add Task" showBack onBack={() => setShowAddForm(false)} />
        <AddTaskForm onAdd={handleAddTask} onCancel={() => setShowAddForm(false)} />
      </div>
    );
  }

  return (
    <div className="app">
      <Header title="TO-DO APP" />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <div className="app__sections">
        <TaskSection
          title="In Progress"
          status="in-progress"
          tasks={filteredTasks}
          onEditClick={setEditingTask}
          onDelete={handleDeleteTask}
        />
        <TaskSection
          title="Pending"
          status="pending"
          tasks={filteredTasks}
          onEditClick={setEditingTask}
          onDelete={handleDeleteTask}
        />
        <TaskSection
          title="Completed"
          status="completed"
          tasks={filteredTasks}
          onEditClick={setEditingTask}
          onDelete={handleDeleteTask}
        />
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
