import { useNavigate } from 'react-router-dom';
import { X, CheckSquare, Bell, Plus } from 'lucide-react';
import { useAppStore } from './store';

interface SubjectDrawerProps {
  subjectId: string | null;
  onClose: () => void;
}

export default function SubjectDrawer({ subjectId, onClose }: SubjectDrawerProps) {
  const navigate = useNavigate();
  const { subjects, tasks, reminders, updateTask, startTimer, openCreateModal } = useAppStore();

  if (!subjectId) return null;

  const subject = subjects.find((s) => s.id === subjectId);
  const subjectTasks = tasks.filter((t) => t.subjectId === subjectId);
  const subjectReminders = reminders.filter((r) => r.subjectId === subjectId);

  if (!subject) return null;

  const toggleTaskStatus = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const statusMap = {
      'todo': 'in-progress',
      'in-progress': 'done',
      'done': 'todo',
    } as const;

    const newStatus = statusMap[task.status];
    
    if (newStatus === 'in-progress') {
      const confirmStart = window.confirm("Do you want to start the timer?");
      if (confirmStart) {
        updateTask(taskId, { status: newStatus });
        startTimer('study', task.subjectId);
        navigate('/timer');
        onClose();
      } else {
        updateTask(taskId, { status: newStatus });
      }
    } else {
      updateTask(taskId, { status: newStatus });
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: subject.color }}
            />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{subject.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-auto h-[calc(100vh-4rem)]">
          {/* Tasks Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Tasks</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">({subjectTasks.length})</span>
              </div>
              <button 
                onClick={() => openCreateModal('task', subjectId)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-2">
              {subjectTasks.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">No tasks yet</p>
              ) : (
                subjectTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={task.status === 'done'}
                        onChange={() => toggleTaskStatus(task.id)}
                        className="mt-1 w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-400"
                      />
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${task.status === 'done' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                          {task.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Due: {task.deadline}</p>
                        {task.description && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                        )}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          task.status === 'done'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : task.status === 'in-progress'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {task.status === 'done' ? 'Done' : task.status === 'in-progress' ? 'In Progress' : 'To Do'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Reminders Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Reminders</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">({subjectReminders.length})</span>
              </div>
              <button 
                onClick={() => openCreateModal('reminder', subjectId)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-2">
              {subjectReminders.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">No reminders yet</p>
              ) : (
                subjectReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{reminder.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Due: {reminder.dueDate}</p>
                    {reminder.description && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{reminder.description}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
