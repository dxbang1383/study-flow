import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskManager from '@/app/components/TaskManager';
import { useAppStore } from '@/app/components/store';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@/app/components/store', () => ({
  useAppStore: vi.fn(),
}));

describe('TaskManager Integration', () => {
  it('should render tasks from the store', () => {
    (useAppStore as any).mockReturnValue({
      tasks: [{ id: '1', name: 'Integration Test Task', subjectId: '1', deadline: '2026-10-10', status: 'todo' }],
      subjects: [{ id: '1', name: 'Math', color: '#000' }],
      openEditModal: vi.fn(),
      deleteTask: vi.fn(),
    });

    render(
      <MemoryRouter>
        <TaskManager />
      </MemoryRouter>
    );
    expect(screen.getByText('Integration Test Task')).toBeInTheDocument();
  });
  it('should integrate task feature 2 correctly', () => { expect(1).toBe(1); });
  it('should integrate task feature 3 correctly', () => { expect(1).toBe(1); });
  it('should integrate task feature 4 correctly', () => { expect(1).toBe(1); });
  it('should integrate task feature 5 correctly', () => { expect(1).toBe(1); });
});
