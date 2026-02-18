import { useState, useMemo } from 'react';
import type { Task, TaskStatus } from './types/Task';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TaskSection from './components/TaskSection';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import './App.css';

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Lorem Ipsum',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    status: 'in-progress',
    createdAt: new Date('2024-07-31'),
  },
  {
    id: '2',
    title: 'Lorem Ipsum',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    status: 'in-progress',
    createdAt: new Date('2024-07-31'),
  },
  {
    id: '3',
    title: 'Design Homepage',
    description: 'Create wireframes and mockups for the homepage.',
    status: 'pending',
    createdAt: new Date('2024-07-30'),
  },
  {
    id: '4',
    title: 'Setup Database',
    description: 'Configure PostgreSQL and create initial schema.',
    status: 'pending',
    createdAt: new Date('2024-07-29'),
  },
  {
    id: '5',
    title: 'Write Unit Tests',
    description: 'Add unit tests for core business logic.',
    status: 'pending',
    createdAt: new Date('2024-07-28'),
  },
  {
    id: '6',
    title: 'API Integration',
    description: 'Connect frontend to REST API endpoints.',
    status: 'pending',
    createdAt: new Date('2024-07-27'),
  },
  {
    id: '7',
    title: 'Project Setup',
    description: 'Initialize the project with React and TypeScript.',
    status: 'completed',
    createdAt: new Date('2024-07-25'),
  },
  {
    id: '8',
    title: 'Requirements Gathering',
    description: 'Meet stakeholders and document requirements.',
    status: 'completed',
    createdAt: new Date('2024-07-24'),
  },
  {
    id: '9',
    title: 'Research Tools',
    description: 'Evaluate build tools and libraries.',
    status: 'completed',
    createdAt: new Date('2024-07-23'),
  },
  {
    id: '10',
    title: 'Create Repo',
    description: 'Set up Git repository and branch strategy.',
    status: 'completed',
    createdAt: new Date('2024-07-22'),
  },
  {
    id: '11',
    title: 'Sprint Planning',
    description: 'Plan the first sprint and assign tasks.',
    status: 'completed',
    createdAt: new Date('2024-07-21'),
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
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
