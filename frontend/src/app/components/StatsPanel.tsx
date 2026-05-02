import { Flame, Clock, CheckCircle2 } from 'lucide-react';
import { useAppStore } from './store';

export default function StatsPanel() {
  const { tasks, studyStreak, totalStudyTime, subjects } = useAppStore();

  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.deadline);
    const todayDate = new Date(today);
    return taskDate <= todayDate && task.status !== 'done';
  });

  const completedToday = tasks.filter((task) => {
    const taskDate = new Date(task.deadline);
    const todayDate = new Date(today);
    return taskDate.toDateString() === todayDate.toDateString() && task.status === 'done';
  });

  const getSubjectName = (subjectId: string) => {
    return subjects.find((s) => s.id === subjectId)?.name || 'Unknown';
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 space-y-6 overflow-auto">
      <h2 className="font-semibold text-gray-900">Today's Overview</h2>

      {/* Stats Cards */}
      <div className="space-y-3">
        {/* Streak */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{studyStreak}</p>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
          </div>
        </div>

        {/* Study Time */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalStudyTime}h</p>
              <p className="text-sm text-gray-600">Total Study Time</p>
            </div>
          </div>
        </div>

        {/* Completed Today */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedToday.length}</p>
              <p className="text-sm text-gray-600">Completed Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Upcoming Tasks</h3>
        <div className="space-y-2">
          {todayTasks.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">All caught up! 🎉</p>
          ) : (
            todayTasks.slice(0, 5).map((task) => {
              const daysUntil = Math.ceil(
                (new Date(task.deadline).getTime() - new Date(today).getTime()) / (1000 * 60 * 60 * 24)
              );

              let urgencyColor = 'bg-green-100 text-green-700';
              if (daysUntil <= 0) urgencyColor = 'bg-red-100 text-red-700';
              else if (daysUntil <= 2) urgencyColor = 'bg-yellow-100 text-yellow-700';

              return (
                <div
                  key={task.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900 mb-1">{task.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">{getSubjectName(task.subjectId)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${urgencyColor}`}>
                      {daysUntil < 0
                        ? 'Overdue'
                        : daysUntil === 0
                        ? 'Today'
                        : daysUntil === 1
                        ? 'Tomorrow'
                        : `${daysUntil}d`}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
