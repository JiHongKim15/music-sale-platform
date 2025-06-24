import { Grid, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded ${
          view === 'grid'
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
            : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
      >
        <Grid size={20} />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded ${
          view === 'list'
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
            : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
      >
        <List size={20} />
      </button>
    </div>
  );
}