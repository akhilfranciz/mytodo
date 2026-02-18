import React, { useState } from 'react';
import type { Task, TaskStatus } from '../types/Task';
import TaskItem from './TaskItem';
import './TaskSection.css';

interface TaskSectionProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onEditClick: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskSection: React.FC<TaskSectionProps> = ({
  title,
  status,
  tasks,
  onEditClick,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(status === 'in-progress');

  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div className="task-section">
      <button
        className="task-section__header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className="task-section__title">
          {title} (<span className="task-section__count">{filteredTasks.length}</span>)
        </span>
        <svg
          className={`task-section__chevron ${isExpanded ? 'task-section__chevron--expanded' : ''}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 9L12 15L18 9" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {isExpanded && (
        <div className="task-section__list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEditClick={onEditClick}
              onDelete={onDelete}
            />
          ))}
          {filteredTasks.length === 0 && (
            <p className="task-section__empty">No tasks</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskSection;
