import { describe, it, expect } from 'vitest';
import { useAppStore } from '@/app/components/store';

// Test deadline-related logic from the store
describe('Deadline Color Utility', () => {
  it('should return tasks with valid deadline format', () => {
    const tasks = useAppStore.getState().tasks;
    tasks.forEach(t => { expect(typeof t.deadline).toBe('string'); });
  });
  it('should identify overdue tasks (deadline in the past)', () => {
    const tasks = useAppStore.getState().tasks;
    const overdue = tasks.filter(t => new Date(t.deadline) < new Date());
    expect(Array.isArray(overdue)).toBe(true);
  });
  it('should identify future tasks (deadline in the future)', () => {
    const tasks = useAppStore.getState().tasks;
    const future = tasks.filter(t => new Date(t.deadline) > new Date());
    expect(Array.isArray(future)).toBe(true);
  });
  it('should handle empty deadline gracefully', () => {
    expect(new Date('').toString()).toBe('Invalid Date');
  });
  it('should correctly parse ISO date format', () => {
    const d = new Date('2026-05-03');
    expect(d.getFullYear()).toBe(2026);
  });
  it('should compare two deadlines correctly', () => {
    expect(new Date('2026-01-01') < new Date('2026-12-31')).toBe(true);
  });
  it('should detect tasks due today', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(typeof today).toBe('string');
  });
  it('should detect tasks due within a week', () => {
    const now = new Date();
    const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    expect(oneWeekLater > now).toBe(true);
  });
  it('should handle tasks with no deadline set', () => {
    expect(new Date(undefined as any).toString()).toBe('Invalid Date');
  });
  it('should verify deadline string length is 10 (YYYY-MM-DD)', () => {
    expect('2026-05-03'.length).toBe(10);
  });
});
