import { useState, useMemo, useRef, useEffect } from 'react';
import { Bell, Search, Flame, Moon, Sun, Edit2, Trash2 } from 'lucide-react';
import { useAppStore } from './store';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TopNav() {
  const { theme, toggleTheme, tasks, subjects, reminders, openCreateModal, openEditModal, deleteReminder } = useAppStore();
  const { user, token, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    const results: Array<{ type: string; title: string; action: () => void; subtitle?: string }> = [];

    // Functions/Actions
    const actions = [
      { title: 'Create Task', action: () => openCreateModal('task') },
      { title: 'Create Subject', action: () => openCreateModal('subject') },
      { title: 'Create Reminder', action: () => openCreateModal('reminder') },
      { title: 'Go to Dashboard', action: () => navigate('/dashboard') },
      { title: 'Go to Tasks', action: () => navigate('/tasks') },
      { title: 'Go to Timer', action: () => navigate('/timer') },
      { title: 'Go to Analytics', action: () => navigate('/analytics') },
    ];
    actions.forEach(action => {
      if (action.title.toLowerCase().includes(query)) {
        results.push({ type: 'Action', ...action });
      }
    });

    // Subjects
    subjects.forEach(subject => {
      if (subject.name.toLowerCase().includes(query)) {
        results.push({ type: 'Subject', title: subject.name, action: () => navigate('/dashboard') });
      }
    });

    // Tasks
    tasks.forEach(task => {
      if (task.name.toLowerCase().includes(query)) {
        results.push({ type: 'Task', title: task.name, subtitle: `Due: ${task.deadline}`, action: () => navigate('/tasks') });
      }
    });

    // Reminders
    reminders.forEach(reminder => {
      if (reminder.name.toLowerCase().includes(query)) {
        results.push({ type: 'Reminder', title: reminder.name, subtitle: `Due: ${reminder.dueDate}`, action: () => setIsNotifOpen(true) });
      }
    });

    return results;
  }, [searchQuery, subjects, tasks, reminders, navigate, openCreateModal]);

  const displayUser = user?.nickname || user?.username || 'Guest';
  const displayRole = user?.role || 'User';
  const initial = displayUser.charAt(0).toUpperCase();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allReminders = reminders.map(r => ({ id: r.id, name: r.name, date: r.dueDate, subjectId: r.subjectId, type: 'reminder' as const }));

  const allNotifications = [...allReminders].sort((a, b) => {
    // Sắp xếp theo ngày tăng dần (cũ nhất/quá hạn lâu nhất lên đầu, tương lai xa nhất ở cuối)
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const getReminderColor = (dateString: string) => {
    const dueDate = new Date(dateString);
    dueDate.setHours(0, 0, 0, 0);
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
      return "text-red-600 dark:text-red-400"; // Overdue
    } else if (daysDiff <= 2) {
      return "text-yellow-600 dark:text-yellow-500"; // <= 2 days
    } else {
      return "text-gray-900 dark:text-gray-100"; // Normal
    }
  };

  const todayDate = new Date().toISOString().split('T')[0];
  const canClickFlame = user && user.last_streak_date !== todayDate;
  const displayStreak = user?.streak || 0;

  const hasOverdueReminders = allNotifications.some(notif => {
    const dueDate = new Date(notif.date);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() < today.getTime();
  });

  const handleFlameClick = async () => {
    if (!canClickFlame || !user) return;
    try {
      const response = await fetch('http://localhost:8000/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          streak: displayStreak + 1,
          last_streak_date: todayDate
        })
      });
      if (response.ok) {
        const updatedUser = await response.json();
        updateUser(updatedUser);
      }
    } catch (err) {
      console.error("Failed to update streak", err);
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 transition-colors">
      <div className="flex-1 max-w-xl" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search functions, tasks, subjects, reminders..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
          />
          
          {isSearchOpen && searchQuery.trim() !== '' && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
              {searchResults.length === 0 ? (
                <div className="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">No results found</div>
              ) : (
                <div className="py-2">
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        result.action();
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-gray-100">{result.title}</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-500 dark:text-gray-400">{result.type}</span>
                      </div>
                      {result.subtitle && <span className="text-xs text-gray-500 dark:text-gray-400">{result.subtitle}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
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
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            {hasOverdueReminders && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 p-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                Reminders
              </h3>
              <div className="max-h-64 overflow-y-auto pt-2">
                {allNotifications.length === 0 ?
                  <p className="text-sm text-gray-500 dark:text-gray-400 px-3 py-2 text-center">No new reminders</p>
                : (
                  allNotifications.map(notif => {
                    const subject = subjects.find(s => s.id === notif.subjectId);
                    return (
                    <div key={`${notif.type}-${notif.id}`} className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center justify-between group">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-medium ${getReminderColor(notif.date)}`}>{notif.name}</p>
                          {subject && (
                            <span 
                              className="text-[10px] px-1.5 py-0.5 rounded font-medium whitespace-nowrap"
                              style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                            >
                              {subject.name}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Due: {notif.date}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(notif.type, notif.id);
                            setIsNotifOpen(false);
                          }}
                          className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                          title={`Edit ${notif.type}`}
                        >
                          <Edit2 className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (notif.type === 'reminder') {
                              if (window.confirm("Are you sure you want to delete this reminder?")) {
                                deleteReminder(notif.id);
                              }
                            }
                          }}
                          className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                          title={`Delete ${notif.type}`}
                        >
                          <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
                        </button>
                      </div>
                    </div>
                  );
                })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Streak */}
        <button 
          onClick={handleFlameClick}
          className={`flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors ${canClickFlame ? 'hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer' : 'cursor-default opacity-80'}`}
          title={canClickFlame ? "Click to claim today's streak!" : "Streak already claimed today"}
        >
          <Flame className={`w-5 h-5 ${displayStreak > 0 ? 'text-orange-500' : 'text-gray-400'} ${canClickFlame ? 'animate-pulse' : ''}`} />
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {displayStreak}
          </span>
        </button>

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
