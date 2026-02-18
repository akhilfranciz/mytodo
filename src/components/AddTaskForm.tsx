import React, { useState } from 'react';
import './AddTaskForm.css';

interface AddTaskFormProps {
  onAdd: (title: string, description: string) => void;
  onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        className="add-task-form__input"
        type="text"
        placeholder="Enter the title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <textarea
        className="add-task-form__textarea"
        placeholder="Enter the description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />
      <div className="add-task-form__actions">
        <button
          type="button"
          className="add-task-form__btn add-task-form__btn--cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="add-task-form__btn add-task-form__btn--add"
          disabled={!title.trim()}
        >
          ADD
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
