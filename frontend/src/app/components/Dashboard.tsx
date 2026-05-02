import { useState, useMemo } from 'react';
import { useAppStore } from './store';
import SubjectCard from './SubjectCard';
import WeeklySchedule from './WeeklySchedule';
import SubjectDrawer from './SubjectDrawer';
import { AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { subjects, tasks } = useAppStore();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const overdueTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.filter((task) => {
      if (task.status === 'done') return false;
      const deadline = new Date(task.deadline);
      deadline.setHours(0, 0, 0, 0);
      return deadline < today;
    }).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  }, [tasks]);

  const getSubject = (subjectId: string) => {
    return subjects.find((s) => s.id === subjectId);
  };

  return (
    <div className="h-full">
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your study overview for today.</p>
          </div>

          {/* Overdue Tasks Section */}
          {overdueTasks.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <h2 className="text-lg font-semibold text-red-900 dark:text-red-100">
                  Overdue Tasks ({overdueTasks.length})
                </h2>
              </div>
              <div className="space-y-2">
                {overdueTasks.map((task) => {
                  const subject = getSubject(task.subjectId);
                  const daysOverdue = Math.ceil(
                    (new Date().getTime() - new Date(task.deadline).getTime()) / (1000 * 60 * 60 * 24)
                  );

                  return (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-gray-900 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{task.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {subject && (
                            <span
                              className="text-xs px-2 py-1 rounded-full text-gray-800 dark:text-gray-200"
                              style={{ backgroundColor: subject.color }}
                            >
                              {subject.name}
                            </span>
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Due: {task.deadline}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">
                        {daysOverdue} day{daysOverdue !== 1 ? 's' : ''} overdue
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Subjects Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">My Subjects</h2>
            <div className="flex flex-wrap gap-3">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onClick={() => setSelectedSubjectId(subject.id)}
                />
              ))}
            </div>
          </div>

          {/* Weekly Schedule */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Weekly Schedule</h2>
            <WeeklySchedule />
          </div>
        </div>
      </div>

      {/* Subject Drawer */}
      <SubjectDrawer
        subjectId={selectedSubjectId}
        onClose={() => setSelectedSubjectId(null)}
      />
    </div>
  );
}
