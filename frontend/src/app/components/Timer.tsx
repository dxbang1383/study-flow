import { useState, useEffect } from 'react';
import { Play, Pause, Square, RefreshCw } from 'lucide-react';
import { useAppStore } from './store';

export default function Timer() {
  const { subjects, activeTimer, startTimer, stopTimer, switchTimerMode } = useAppStore();
  const [selectedType, setSelectedType] = useState<'study' | 'play'>('study');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (activeTimer) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - activeTimer.startTime);
      }, 100);
    } else {
      setElapsedTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTimer]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (selectedType === 'study' && !selectedSubject) {
      alert("Please select a subject before starting!");
      return;
    }
    startTimer(selectedType, selectedSubject || undefined);
  };

  const handleStop = () => {
    stopTimer();
    setElapsedTime(0);
  };

  const handleSwitch = () => {
    const newType = selectedType === 'study' ? 'play' : 'study';
    setSelectedType(newType);

    if (activeTimer) {
      if (newType === 'study' && subjects.length > 0) {
        const newSubject = selectedSubject || subjects[0].id;
        setSelectedSubject(newSubject);
        switchTimerMode(newType, newSubject);
      } else {
        switchTimerMode(newType, undefined);
      }
    }
  };

  const currentSubject = activeTimer?.subjectId
    ? subjects.find((s) => s.id === activeTimer.subjectId)
    : subjects.find((s) => s.id === selectedSubject);

  return (
    <div className="h-full p-8 overflow-auto bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Timer</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your study and play time</p>
        </div>

        {/* Timer Display */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center space-y-8">
            {/* Time Display */}
            <div>
              <div className="text-7xl font-mono font-bold text-gray-900 dark:text-gray-100 mb-4">
                {formatTime(elapsedTime)}
              </div>
              <div className="flex items-center justify-center gap-3">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeTimer
                      ? activeTimer.type === 'study'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : selectedType === 'study'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  }`}
                >
                  {activeTimer ? (activeTimer.type === 'study' ? 'Studying' : 'Playing') : selectedType === 'study' ? 'Study Mode' : 'Play Mode'}
                </span>
                {currentSubject && (
                  <span
                    className="px-4 py-2 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200"
                    style={{ backgroundColor: currentSubject.color }}
                  >
                    {currentSubject.name}
                  </span>
                )}
              </div>
            </div>

            {/* Controls */}
            {!activeTimer ? (
              <div className="space-y-6">
                {/* Mode Selection */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setSelectedType('study')}
                    className={`flex-1 max-w-xs px-6 py-4 rounded-xl font-medium transition-all ${
                      selectedType === 'study'
                        ? 'bg-blue-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    📚 Study
                  </button>
                  <button
                    onClick={() => setSelectedType('play')}
                    className={`flex-1 max-w-xs px-6 py-4 rounded-xl font-medium transition-all ${
                      selectedType === 'play'
                        ? 'bg-purple-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    🎮 Play
                  </button>
                </div>

                {/* Subject Selection (only for study mode) */}
                {selectedType === 'study' && subjects.length > 0 && (
                  <div className="max-w-md mx-auto">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Subject
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-gray-100"
                    >
                      <option value="" disabled>-- Select a subject --</option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Start Button */}
                <button
                  onClick={handleStart}
                  className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-3 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  Start Timer
                </button>
              </div>
            ) : (
              <div className="flex gap-4 justify-center">
                {/* Stop Button */}
                <button
                  onClick={handleStop}
                  className="px-8 py-4 bg-red-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-3"
                >
                  <Square className="w-5 h-5" />
                  Stop
                </button>

                {/* Switch Mode Button */}
                <button
                  onClick={handleSwitch}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-3"
                >
                  <RefreshCw className="w-5 h-5" />
                  Switch to {activeTimer.type === 'study' ? 'Play' : 'Study'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            💡 <strong>Tip:</strong> Track your study sessions by subject to see detailed analytics.
            Switch between study and play modes to maintain a healthy balance!
          </p>
        </div>
      </div>
    </div>
  );
}
