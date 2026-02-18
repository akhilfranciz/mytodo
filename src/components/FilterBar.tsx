import React from 'react';
import type { TaskStatus } from '../types/Task';
import './FilterBar.css';

export type FilterOption = 'all' | TaskStatus;

interface FilterBarProps {
  active: FilterOption;
  onChange: (filter: FilterOption) => void;
  counts: Record<FilterOption, number>;
}

const filters: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

const FilterBar: React.FC<FilterBarProps> = ({ active, onChange, counts }) => {
  return (
    <div className="filter-bar" role="tablist" aria-label="Filter tasks by status">
      {filters.map((f) => (
        <button
          key={f.value}
          role="tab"
          aria-selected={active === f.value}
          className={`filter-bar__btn ${active === f.value ? 'filter-bar__btn--active' : ''}`}
          onClick={() => onChange(f.value)}
        >
          {f.label}
          <span className="filter-bar__badge">{counts[f.value]}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
