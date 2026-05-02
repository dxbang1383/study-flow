import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Subject {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  name: string;
  subjectId: string;
  deadline: string;
  status: 'todo' | 'in-progress' | 'done';
  description?: string;
  tags?: string[];
}

export interface Reminder {
  id: string;
  name: string;
  subjectId: string;
  dueDate: string;
  description?: string;
}

export interface ScheduleSlot {
  day: string;
  timeSlot: string;
  subjectId: string | null;
}

export interface TimerSession {
  id: string;
  type: 'study' | 'play';
  subjectId?: string;
  startTime: number;
  endTime?: number;
  duration: number;
}

interface AppState {
  subjects: Subject[];
  tasks: Task[];
  reminders: Reminder[];
  schedule: ScheduleSlot[];
  studyStreak: number;
  totalStudyTime: number;
  theme: 'light' | 'dark';
  timerSessions: TimerSession[];
  activeTimer: {
    type: 'study' | 'play';
    subjectId?: string;
    startTime: number;
  } | null;

  addSubject: (subject: Subject) => void;
  addTask: (task: Task) => void;
  addReminder: (reminder: Reminder) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setScheduleSlot: (day: string, timeSlot: string, subjectId: string | null) => void;
  toggleTheme: () => void;
  startTimer: (type: 'study' | 'play', subjectId?: string) => void;
  stopTimer: () => void;
  switchTimerMode: (type: 'study' | 'play', subjectId?: string) => void;
}

// Initial mock data
const initialSubjects: Subject[] = [
  { id: '1', name: 'Mathematics', color: '#93C5FD' },
  { id: '2', name: 'Physics', color: '#C4B5FD' },
  { id: '3', name: 'Computer Science', color: '#F9A8D4' },
  { id: '4', name: 'Chemistry', color: '#86EFAC' },
  { id: '5', name: 'English Literature', color: '#FCD34D' },
];

const initialTasks: Task[] = [
  {
    id: '1',
    name: 'Complete calculus homework',
    subjectId: '1',
    deadline: '2026-05-03',
    status: 'todo',
    description: 'Chapter 5 exercises',
    tags: ['homework', 'urgent'],
  },
  {
    id: '2',
    name: 'Study for midterm exam',
    subjectId: '2',
    deadline: '2026-05-05',
    status: 'in-progress',
    description: 'Chapters 1-4',
    tags: ['exam', 'important'],
  },
  {
    id: '3',
    name: 'Submit project proposal',
    subjectId: '3',
    deadline: '2026-05-08',
    status: 'todo',
    tags: ['project'],
  },
  {
    id: '4',
    name: 'Lab report submission',
    subjectId: '4',
    deadline: '2026-04-29',
    status: 'done',
    tags: ['lab', 'report'],
  },
  {
    id: '5',
    name: 'Read chapters 10-12',
    subjectId: '5',
    deadline: '2026-05-02',
    status: 'todo',
    tags: ['reading'],
  },
];

const initialReminders: Reminder[] = [
  {
    id: '1',
    name: 'Office hours with Prof. Smith',
    subjectId: '1',
    dueDate: '2026-05-02',
  },
  {
    id: '2',
    name: 'Group study session',
    subjectId: '3',
    dueDate: '2026-05-04',
  },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['Morning (8-12)', 'Afternoon (12-16)', 'Evening (16-20)', 'Night (20-24)'];

const initialSchedule: ScheduleSlot[] = [];
days.forEach((day) => {
  timeSlots.forEach((timeSlot) => {
    initialSchedule.push({ day, timeSlot, subjectId: null });
  });
});

// Add some sample schedule items
initialSchedule.find((s) => s.day === 'Monday' && s.timeSlot === 'Morning (8-12)')!.subjectId = '1';
initialSchedule.find((s) => s.day === 'Monday' && s.timeSlot === 'Afternoon (12-16)')!.subjectId = '3';
initialSchedule.find((s) => s.day === 'Tuesday' && s.timeSlot === 'Morning (8-12)')!.subjectId = '2';
initialSchedule.find((s) => s.day === 'Wednesday' && s.timeSlot === 'Evening (16-20)')!.subjectId = '5';
initialSchedule.find((s) => s.day === 'Thursday' && s.timeSlot === 'Morning (8-12)')!.subjectId = '4';
initialSchedule.find((s) => s.day === 'Friday' && s.timeSlot === 'Afternoon (12-16)')!.subjectId = '1';

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      subjects: initialSubjects,
      tasks: initialTasks,
      reminders: initialReminders,
      schedule: initialSchedule,
      studyStreak: 12,
      totalStudyTime: 145,
      theme: 'light',
      timerSessions: [],
      activeTimer: null,

      addSubject: (subject) =>
        set((state) => ({ subjects: [...state.subjects, subject] })),

      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),

      addReminder: (reminder) =>
        set((state) => ({ reminders: [...state.reminders, reminder] })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),

      setScheduleSlot: (day, timeSlot, subjectId) =>
        set((state) => ({
          schedule: state.schedule.map((slot) =>
            slot.day === day && slot.timeSlot === timeSlot
              ? { ...slot, subjectId }
              : slot
          ),
        })),

      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.classList.toggle('dark', newTheme === 'dark');
          return { theme: newTheme };
        }),

      startTimer: (type, subjectId) =>
        set({
          activeTimer: {
            type,
            subjectId,
            startTime: Date.now(),
          },
        }),

      stopTimer: () =>
        set((state) => {
          if (!state.activeTimer) return state;

          const duration = Date.now() - state.activeTimer.startTime;
          const newSession: TimerSession = {
            id: Date.now().toString(),
            type: state.activeTimer.type,
            subjectId: state.activeTimer.subjectId,
            startTime: state.activeTimer.startTime,
            endTime: Date.now(),
            duration,
          };

          return {
            timerSessions: [...state.timerSessions, newSession],
            activeTimer: null,
            totalStudyTime:
              state.totalStudyTime +
              (state.activeTimer.type === 'study' ? Math.round(duration / 1000 / 60 / 60) : 0),
          };
        }),

      switchTimerMode: (type, subjectId) =>
        set((state) => {
          if (!state.activeTimer) return state;

          const duration = Date.now() - state.activeTimer.startTime;
          const newSession: TimerSession = {
            id: Date.now().toString(),
            type: state.activeTimer.type,
            subjectId: state.activeTimer.subjectId,
            startTime: state.activeTimer.startTime,
            endTime: Date.now(),
            duration,
          };

          return {
            timerSessions: [...state.timerSessions, newSession],
            activeTimer: {
              type,
              subjectId,
              startTime: Date.now(),
            },
            totalStudyTime:
              state.totalStudyTime +
              (state.activeTimer.type === 'study' ? Math.round(duration / 1000 / 60 / 60) : 0),
          };
        }),
    }),
    {
      name: 'study-app-storage',
    }
  )
);
