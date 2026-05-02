import { BookOpen, CheckSquare, Timer, BarChart3, Flame, Moon, Plus, GripVertical } from 'lucide-react';

export default function Help() {
  const sections = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      items: [
        {
          title: 'Welcome to StudyFlow',
          description: 'StudyFlow is your personal study management system. Create subjects, manage tasks, track your study time, and maintain your learning streak.',
        },
        {
          title: 'Create Your First Subject',
          description: 'Click the floating "+" button (bottom right) and select "Create Subject". Choose a name and color for your subject. You can create multiple subjects for different courses.',
        },
        {
          title: 'Add Tasks',
          description: 'Use the floating "+" button to create tasks. Each task must be linked to a subject and can have a deadline, description, and tags for easy searching.',
        },
      ],
    },
    {
      title: 'Dashboard',
      icon: BookOpen,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      items: [
        {
          title: 'My Subjects',
          description: 'View all your subjects as colorful cards. Click on any subject to see its related tasks and reminders in a side panel.',
        },
        {
          title: 'Drag & Drop Subjects',
          description: 'Subjects are draggable! Grab a subject card and drop it into your weekly schedule to plan your study time.',
        },
        {
          title: 'Weekly Schedule',
          description: 'Plan your week by dragging subjects into time slots. Each cell represents a time period (Morning, Afternoon, Evening, Night). Hover over a scheduled subject and click "×" to remove it.',
        },
        {
          title: 'Overdue Tasks',
          description: 'Tasks past their deadline appear at the top in a red warning section, so you never miss important deadlines.',
        },
      ],
    },
    {
      title: 'Task Manager',
      icon: CheckSquare,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      items: [
        {
          title: 'View All Tasks',
          description: 'See all your tasks in a comprehensive table view with columns for name, subject, deadline, and status.',
        },
        {
          title: 'Filter & Sort',
          description: 'Use the filters to view tasks by status (To Do, In Progress, Done) or by subject. Click column headers to sort tasks.',
        },
        {
          title: 'Task Status',
          description: 'Change task status using the dropdown. When you mark a task as "In Progress", it automatically starts a study timer for that subject!',
        },
        {
          title: 'Tags',
          description: 'Add tags to tasks (comma-separated) like "urgent", "exam", "homework" for better organization and searching.',
        },
        {
          title: 'Deadline Colors',
          description: 'Tasks are color-coded by urgency: Red (overdue/today), Yellow (2 days), Green (3-7 days), Gray (7+ days).',
        },
      ],
    },
    {
      title: 'Timer',
      icon: Timer,
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      items: [
        {
          title: 'Study Mode',
          description: 'Start a study timer and select which subject you\'re studying. All study time is tracked and added to your analytics.',
        },
        {
          title: 'Play Mode',
          description: 'Track your break/play time to maintain a healthy study-life balance. Play time is tracked separately.',
        },
        {
          title: 'Switch Modes',
          description: 'While timer is running, you can switch between Study and Play modes. The previous session is saved and a new one starts.',
        },
        {
          title: 'Auto-Start Timer',
          description: 'When you mark a task as "In Progress" from anywhere in the app, it automatically navigates to the Timer page and starts tracking!',
        },
      ],
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
      items: [
        {
          title: 'Study Statistics',
          description: 'View your total study time, play time, and number of study sessions at a glance.',
        },
        {
          title: 'Subject Distribution',
          description: 'Pie chart shows how your study time is distributed across different subjects. Each subject uses its assigned color.',
        },
        {
          title: 'Time by Subject',
          description: 'Bar chart displays study hours for each subject, making it easy to see which subjects need more attention.',
        },
        {
          title: 'Detailed Breakdown',
          description: 'Table view shows exact hours and percentages for each subject, helping you balance your study time.',
        },
      ],
    },
    {
      title: 'Features',
      icon: Flame,
      color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
      items: [
        {
          title: 'Study Streak',
          description: 'Maintain your daily study streak! The flame icon next to the notification bell shows your current streak. Keep it burning by studying every day!',
        },
        {
          title: 'Dark Mode',
          description: 'Toggle between light and dark themes using the sun/moon icon in the top navigation bar. Your preference is saved automatically.',
        },
        {
          title: 'Draggable FAB',
          description: 'The floating "+" button can be dragged anywhere on the screen! Click and hold to move it to your preferred position.',
        },
        {
          title: 'Quick Actions',
          description: 'Hover over the floating "+" button to reveal quick actions: Create Task, Create Reminder, and Create Subject.',
        },
        {
          title: 'Search',
          description: 'Use the search bar in the top navigation to quickly find tasks and subjects.',
        },
      ],
    },
  ];

  return (
    <div className="h-full p-8 overflow-auto bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            StudyFlow User Guide
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Learn how to make the most of your study management system
          </p>
        </div>

        {/* Sections */}
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Section Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${section.color} rounded-xl flex items-center justify-center`}>
                  <section.icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {section.title}
                </h2>
              </div>
            </div>

            {/* Section Content */}
            <div className="p-6 space-y-6">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Tips Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            💡 Pro Tips
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Use tags like "urgent", "exam", "project" to organize tasks and find them quickly</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-600 dark:text-purple-400">•</span>
              <span>Review your Analytics page weekly to ensure balanced study time across subjects</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 dark:text-green-400">•</span>
              <span>Drag the floating "+" button to a convenient spot on your screen</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-600 dark:text-orange-400">•</span>
              <span>Track both study and play time to maintain a healthy work-life balance</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-600 dark:text-red-400">•</span>
              <span>Keep your streak alive! Study a little every day to build consistency</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Need more help? Your productivity journey starts here! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
