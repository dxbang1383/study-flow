import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppStore } from './store';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'task' | 'reminder' | 'subject';
}

export default function CreateModal({ isOpen, onClose, type }: CreateModalProps) {
  const { subjects, tasks, reminders, addSubject, addTask, addReminder, updateTask, updateReminder, createModalSubjectId, editItemId } = useAppStore();
  const [formData, setFormData] = useState({
    name: '',
    subjectId: createModalSubjectId || '',
    deadline: '',
    description: '',
    color: '#93C5FD',
    tags: '',
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        subjectId: '',
        deadline: '',
        description: '',
        color: '#93C5FD',
        tags: '',
      });
    } else if (editItemId) {
      if (type === 'task') {
        const task = tasks.find(t => t.id === editItemId);
        if (task) {
          setFormData({
            name: task.name,
            subjectId: task.subjectId,
            deadline: task.deadline,
            description: task.description || '',
            color: '#93C5FD',
            tags: task.tags?.join(', ') || '',
          });
        }
      } else if (type === 'reminder') {
        const reminder = reminders.find(r => r.id === editItemId);
        if (reminder) {
          setFormData({
            name: reminder.name,
            subjectId: reminder.subjectId,
            deadline: reminder.dueDate,
            description: reminder.description || '',
            color: '#93C5FD',
            tags: '',
          });
        }
      }
    } else {
      setFormData(prev => ({
        ...prev,
        subjectId: createModalSubjectId || '',
      }));
    }
  }, [isOpen, createModalSubjectId, editItemId, type, tasks, reminders]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'subject') {
      addSubject({
        id: Date.now().toString(),
        name: formData.name,
        color: formData.color,
      });
    } else if (type === 'task') {
      const tags = formData.tags
        ? formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag)
        : [];

      if (editItemId) {
        updateTask(editItemId, {
          name: formData.name,
          subjectId: formData.subjectId,
          deadline: formData.deadline,
          description: formData.description,
          tags,
        });
      } else {
        addTask({
          id: Date.now().toString(),
          name: formData.name,
          subjectId: formData.subjectId,
          deadline: formData.deadline,
          status: 'todo',
          description: formData.description,
          tags,
        });
      }
    } else if (type === 'reminder') {
      if (editItemId) {
        updateReminder(editItemId, {
          name: formData.name,
          subjectId: formData.subjectId,
          dueDate: formData.deadline,
          description: formData.description,
        });
      } else {
        addReminder({
          id: Date.now().toString(),
          name: formData.name,
          subjectId: formData.subjectId,
          dueDate: formData.deadline,
          description: formData.description,
        });
      }
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {editItemId ? 'Edit' : 'Create'} {type.charAt(0).toUpperCase() + type.slice(1)}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {type === 'subject' ? 'Subject Name' : 'Title'}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder={type === 'subject' ? 'e.g., Mathematics' : 'e.g., Study for exam'}
            />
          </div>

          {/* Subject (for tasks and reminders) */}
          {type !== 'subject' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <select
                required
                value={formData.subjectId}
                onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Deadline/Due Date */}
          {type !== 'subject' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {type === 'task' ? 'Deadline' : 'Due Date'}
              </label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          )}

          {/* Color (for subjects) */}
          {type === 'subject' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex gap-2">
                {['#93C5FD', '#C4B5FD', '#F9A8D4', '#FCA5A5', '#FCD34D', '#86EFAC'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-10 h-10 rounded-lg transition-all ${
                      formData.color === color ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tags (for tasks only) */}
          {type === 'task' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (optional)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="e.g., homework, urgent, exam (comma separated)"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Separate tags with commas
              </p>
            </div>
          )}

          {/* Description */}
          {type !== 'subject' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description (optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                placeholder="Add details..."
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              {editItemId ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
