import { useDrop } from 'react-dnd';
import { useAppStore } from './store';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['Shift 1 (1 - 3)', 'Shift 2 (4 - 6)', 'Shift 3 (7 - 9)', 'Shift 4 (10 - 12)'];

export default function WeeklySchedule() {
  const { schedule, subjects, setScheduleSlot } = useAppStore();

  const getSlot = (day: string, timeSlot: string) => {
    return schedule.find((s) => s.day === day && s.timeSlot === timeSlot);
  };

  const getSubject = (subjectId: string | null) => {
    if (!subjectId) return null;
    return subjects.find((s) => s.id === subjectId) || null;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-40">
                Time
              </th>
              {days.map((day) => (
                <th key={day} className="px-4 py-3 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((timeSlot) => (
              <tr key={timeSlot} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                <td className="px-4 py-6 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
                  {timeSlot}
                </td>
                {days.map((day) => {
                  const slot = getSlot(day, timeSlot);
                  const subject = getSubject(slot?.subjectId || null);

                  return (
                    <ScheduleCell
                      key={`${day}-${timeSlot}`}
                      day={day}
                      timeSlot={timeSlot}
                      subject={subject}
                      onDrop={(subjectId) => setScheduleSlot(day, timeSlot, subjectId)}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface ScheduleCellProps {
  day: string;
  timeSlot: string;
  subject: { id: string; name: string; color: string } | null;
  onDrop: (subjectId: string | null) => void;
}

function ScheduleCell({ day, timeSlot, subject, onDrop }: ScheduleCellProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'subject',
    drop: (item: { id: string }) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <td
      ref={drop as any}
      className={`px-4 py-6 text-center transition-all ${isOver ? 'bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-400 ring-inset' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}
    >
      {subject ? (
        <div className="relative group">
          <div
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-800 dark:text-gray-200 transition-all"
            style={{ backgroundColor: subject.color }}
          >
            {subject.name}
          </div>
          <button
            onClick={() => onDrop(null)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs hover:bg-red-600"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="text-xs text-gray-400 dark:text-gray-500">Drop here</div>
      )}
    </td>
  );
}
