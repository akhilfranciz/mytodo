import React, { useState } from 'react';
import type { Task, TaskStatus } from '../types/Task';
import './EditTaskForm.css';

interface EditTaskFormProps {
  task: Task;
  onUpdate: (id: string, title: string, description: string, status: TaskStatus) => void;
  onCancel: () => void;
}

const statusOptions: { value: TaskStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Pending', color: '#9ca3af' },
  { value: 'in-progress', label: 'In Progress', color: '#d4a017' },
  { value: 'completed', label: 'Completed', color: '#16a34a' },
];

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentStatus = statusOptions.find((s) => s.value === status)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onUpdate(task.id, title.trim(), description.trim(), status);
    }
  };

  return (
    <form className="edit-task-form" onSubmit={handleSubmit}>
      <input
        className="edit-task-form__input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter the title"
      />
      <textarea
        className="edit-task-form__textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter the description"
        rows={4}
      />
      <div className="edit-task-form__status-wrapper">
        <button
          type="button"
          className="edit-task-form__status-btn"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span
            className="edit-task-form__status-dot"
            style={{ backgroundColor: currentStatus.color }}
          />
          <span className="edit-task-form__status-label">{currentStatus.label}</span>
          <svg
            className={`edit-task-form__chevron ${dropdownOpen ? 'edit-task-form__chevron--open' : ''}`}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M6 9L12 15L18 9" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {dropdownOpen && (
          <div className="edit-task-form__dropdown">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`edit-task-form__dropdown-item ${status === opt.value ? 'edit-task-form__dropdown-item--active' : ''}`}
                onClick={() => { setStatus(opt.value); setDropdownOpen(false); }}
              >
                <span
                  className="edit-task-form__status-dot"
                  style={{ backgroundColor: opt.color }}
                />
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="edit-task-form__actions">
        <button
          type="button"
          className="edit-task-form__btn edit-task-form__btn--cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="edit-task-form__btn edit-task-form__btn--update"
          disabled={!title.trim()}
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
