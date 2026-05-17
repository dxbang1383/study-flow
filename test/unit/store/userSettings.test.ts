import { describe, it, expect } from 'vitest';
import { useAppStore } from '@/app/components/store';

describe('Zustand Store - User Settings', () => {
  it('should toggle theme from light to dark', () => {
    useAppStore.setState({ theme: 'light' });
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    useAppStore.setState({ theme: 'dark' });
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('light');
  });

  it('should start timer', () => {
    useAppStore.getState().startTimer('study', '1');
    expect(useAppStore.getState().activeTimer).not.toBeNull();
  });

  it('should stop timer and create session', () => {
    useAppStore.getState().startTimer('study', '1');
    useAppStore.getState().stopTimer();
    expect(useAppStore.getState().activeTimer).toBeNull();
    expect(useAppStore.getState().timerSessions.length).toBeGreaterThan(0);
  });

  it('should switch timer mode', () => {
    useAppStore.getState().startTimer('study', '1');
    useAppStore.getState().switchTimerMode('play');
    expect(useAppStore.getState().activeTimer?.type).toBe('play');
  });

  it('should return null when stopping timer with no active timer', () => {
    useAppStore.setState({ activeTimer: null });
    useAppStore.getState().stopTimer();
    expect(useAppStore.getState().activeTimer).toBeNull();
  });

  it('should preserve study streak', () => {
    expect(typeof useAppStore.getState().studyStreak).toBe('number');
  });

  it('should preserve totalStudyTime', () => {
    expect(typeof useAppStore.getState().totalStudyTime).toBe('number');
  });

  it('should have default createModalType as task', () => {
    useAppStore.getState().closeCreateModal();
    expect(useAppStore.getState().createModalType).toBe('task');
  });

  it('should not switch timer mode when no active timer', () => {
    useAppStore.setState({ activeTimer: null });
    useAppStore.getState().switchTimerMode('play');
    expect(useAppStore.getState().activeTimer).toBeNull();
  });
});
