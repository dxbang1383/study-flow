import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '@/app/components/store';

describe('Zustand Store - Task Actions', () => {
  beforeEach(() => {
    // Reset store to initial state
    useAppStore.setState({
      tasks: [],
      subjects: [{ id: '1', name: 'Math', color: '#93C5FD' }],
    });
  });

  it('should start with empty tasks after reset', () => {
    expect(useAppStore.getState().tasks).toEqual([]);
  });

  it('should add a new task', () => {
    useAppStore.getState().addTask({
      id: '100', name: 'Test Task', subjectId: '1', deadline: '2026-12-31', status: 'todo'
    });
    expect(useAppStore.getState().tasks.length).toBe(1);
  });

  it('should add multiple tasks', () => {
    useAppStore.getState().addTask({ id: '101', name: 'Task A', subjectId: '1', deadline: '2026-12-31', status: 'todo' });
    useAppStore.getState().addTask({ id: '102', name: 'Task B', subjectId: '1', deadline: '2026-12-31', status: 'todo' });
    expect(useAppStore.getState().tasks.length).toBe(2);
  });

  it('should update a task name', () => {
    useAppStore.getState().addTask({ id: '103', name: 'Old Name', subjectId: '1', deadline: '2026-12-31', status: 'todo' });
    useAppStore.getState().updateTask('103', { name: 'New Name' });
    expect(useAppStore.getState().tasks[0].name).toBe('New Name');
  });

  it('should update a task status', () => {
    useAppStore.getState().addTask({ id: '104', name: 'Task', subjectId: '1', deadline: '2026-12-31', status: 'todo' });
    useAppStore.getState().updateTask('104', { status: 'done' });
    expect(useAppStore.getState().tasks[0].status).toBe('done');
  });

  it('should delete a task', () => {
    useAppStore.getState().addTask({ id: '105', name: 'Delete Me', subjectId: '1', deadline: '2026-12-31', status: 'todo' });
    useAppStore.getState().deleteTask('105');
    expect(useAppStore.getState().tasks.length).toBe(0);
  });

  it('should not delete non-existent task', () => {
    useAppStore.getState().addTask({ id: '106', name: 'Keep Me', subjectId: '1', deadline: '2026-12-31', status: 'todo' });
    useAppStore.getState().deleteTask('999');
    expect(useAppStore.getState().tasks.length).toBe(1);
  });

  it('should add a subject', () => {
    useAppStore.getState().addSubject({ id: '10', name: 'Physics', color: '#FF0000' });
    expect(useAppStore.getState().subjects.length).toBe(2);
  });

  it('should add a reminder', () => {
    useAppStore.getState().addReminder({ id: 'r1', name: 'Test Reminder', subjectId: '1', dueDate: '2026-12-31' });
    expect(useAppStore.getState().reminders.length).toBeGreaterThan(0);
  });

  it('should update a reminder', () => {
    useAppStore.getState().addReminder({ id: 'r2', name: 'Old Reminder', subjectId: '1', dueDate: '2026-12-31' });
    useAppStore.getState().updateReminder('r2', { name: 'Updated Reminder' });
    const r = useAppStore.getState().reminders.find(r => r.id === 'r2');
    expect(r?.name).toBe('Updated Reminder');
  });

  it('should delete a reminder', () => {
    useAppStore.setState({ reminders: [{ id: 'r3', name: 'Del', subjectId: '1', dueDate: '2026-12-31' }] });
    useAppStore.getState().deleteReminder('r3');
    expect(useAppStore.getState().reminders.length).toBe(0);
  });

  it('should open create modal', () => {
    useAppStore.getState().openCreateModal('task', '1');
    expect(useAppStore.getState().isCreateModalOpen).toBe(true);
  });

  it('should close create modal', () => {
    useAppStore.getState().openCreateModal('task');
    useAppStore.getState().closeCreateModal();
    expect(useAppStore.getState().isCreateModalOpen).toBe(false);
  });

  it('should open edit modal', () => {
    useAppStore.getState().openEditModal('task', '1');
    expect(useAppStore.getState().editItemId).toBe('1');
  });

  it('should set schedule slot', () => {
    useAppStore.getState().setScheduleSlot('Monday', 'Shift 1 (1 - 3)', '1');
    const slot = useAppStore.getState().schedule.find(
      s => s.day === 'Monday' && s.timeSlot === 'Shift 1 (1 - 3)'
    );
    expect(slot?.subjectId).toBe('1');
  });
});
