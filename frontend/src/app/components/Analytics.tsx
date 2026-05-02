import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Clock, Gamepad2, BookOpen } from 'lucide-react';
import { useAppStore } from './store';

export default function Analytics() {
  const { subjects, timerSessions, totalStudyTime } = useAppStore();

  const stats = useMemo(() => {
    let totalStudyMs = 0;
    let totalPlayMs = 0;
    const subjectTimes: Record<string, number> = {};

    timerSessions.forEach((session) => {
      if (session.type === 'study') {
        totalStudyMs += session.duration;
        if (session.subjectId) {
          subjectTimes[session.subjectId] = (subjectTimes[session.subjectId] || 0) + session.duration;
        }
      } else {
        totalPlayMs += session.duration;
      }
    });

    const totalStudyHours = totalStudyMs / (1000 * 60 * 60);
    const totalPlayHours = totalPlayMs / (1000 * 60 * 60);

    const subjectData = Object.entries(subjectTimes).map(([subjectId, ms]) => {
      const subject = subjects.find((s) => s.id === subjectId);
      return {
        name: subject?.name || 'Unknown',
        hours: ms / (1000 * 60 * 60),
        color: subject?.color || '#93C5FD',
      };
    }).sort((a, b) => b.hours - a.hours);

    return {
      totalStudyHours,
      totalPlayHours,
      subjectData,
    };
  }, [timerSessions, subjects]);

  const pieData = [
    ...stats.subjectData.map((subject) => ({
      name: subject.name,
      value: Math.round(subject.hours * 100) / 100,
      color: subject.color,
    })),
    ...(stats.totalPlayHours > 0 ? [{
      name: 'Play',
      value: Math.round(stats.totalPlayHours * 100) / 100,
      color: '#A855F7',
    }] : []),
  ].filter((item) => item.value > 0);

  return (
    <div className="h-full p-8 overflow-auto bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your study and play time statistics</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Study Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {Math.round(stats.totalStudyHours * 10) / 10}h
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Play Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {Math.round(stats.totalPlayHours * 10) / 10}h
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Study Sessions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {timerSessions.filter((s) => s.type === 'study').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Study vs Play Pie Chart */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Study vs Play Distribution
            </h2>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}h`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry) => (
                      <Cell key={`pie-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                No data yet. Start tracking your time!
              </div>
            )}
          </div>

          {/* Subject Time Bar Chart */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Time by Subject
            </h2>
            {stats.subjectData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.subjectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                      color: '#F9FAFB',
                    }}
                  />
                  <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                    {stats.subjectData.map((entry) => (
                      <Cell key={`bar-${entry.name}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                No subject data yet. Start studying to see analytics!
              </div>
            )}
          </div>
        </div>

        {/* Subject Breakdown Table */}
        {stats.subjectData.length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Subject Breakdown
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                      Hours
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.subjectData.map((subject, index) => {
                    const percentage =
                      stats.totalStudyHours > 0
                        ? (subject.hours / stats.totalStudyHours) * 100
                        : 0;

                    return (
                      <tr
                        key={index}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: subject.color }}
                            />
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {subject.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-700 dark:text-gray-300">
                          {Math.round(subject.hours * 10) / 10}h
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                            {Math.round(percentage)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
