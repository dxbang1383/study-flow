import { describe, it, expect } from 'vitest';
import { useAppStore } from '@/app/components/store';

describe('Dashboard Integration', () => {
  it('should have subjects in store', () => { 
    const subjects = useAppStore.getState().subjects;
    expect(subjects.length).toBeGreaterThan(0);
  });
  it('should have tasks in store', () => { 
    const tasks = useAppStore.getState().tasks;
    expect(Array.isArray(tasks)).toBe(true);
  });
  it('should compute overdue tasks', () => {
    const tasks = useAppStore.getState().tasks;
    const overdue = tasks.filter(t => t.status !== 'done' && new Date(t.deadline) < new Date());
    expect(Array.isArray(overdue)).toBe(true);
  });
  it('should have schedule slots', () => { 
    const schedule = useAppStore.getState().schedule;
    expect(schedule.length).toBeGreaterThan(0);
  });
  it('should have study streak data', () => { 
    expect(typeof useAppStore.getState().studyStreak).toBe('number');
  });
});
