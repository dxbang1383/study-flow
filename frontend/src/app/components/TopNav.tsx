import { useState } from 'react';
import { Bell, Search, Flame, Moon, Sun } from 'lucide-react';
import { useAppStore } from './store';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TopNav() {
  const { studyStreak, theme, toggleTheme, tasks } = useAppStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const displayUser = user?.nickname || user?.username || 'Guest';
  const displayRole = user?.role || 'User';
  const initial = displayUser.charAt(0).toUpperCase();

  const overdueTasks = tasks.filter((t) => {
    if (t.status === 'done') return false;
    const deadline = new Date(t.deadline);
    const today = new Date();
    deadline.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return deadline <= today;
  });

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 transition-colors">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search tasks, subjects..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          title="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            {overdueTasks.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 p-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                Reminders
              </h3>
              <div className="max-h-64 overflow-y-auto pt-2">
                {overdueTasks.length === 0 ?
                  <p className="text-sm text-gray-500 dark:text-gray-400 px-3 py-2 text-center">No new reminders</p>
                : (
                  overdueTasks.map(task => (
                    <div key={task.id} className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                      <p className="text-sm font-medium text-red-600 dark:text-red-400">Due: {task.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{task.deadline}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Streak */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Flame className={`w-5 h-5 ${studyStreak > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {studyStreak}
          </span>
        </div>

        {/* User Profile */}
        <button onClick={() => navigate('/profile')} className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700 hover:opacity-80 transition-opacity text-left">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{displayUser}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{displayRole}</div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-medium shadow-inner overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              initial
            )}
          </div>
        </button>
      </div>
    </header>
  );
}
