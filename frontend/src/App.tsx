import { useState, useEffect } from 'react';
import type { Task } from '@/types/task';
import { getTasks, updateTaskStatus, deleteTask } from '@/services/api';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const filter = statusFilter === 'all' ? undefined : statusFilter;
      const data = await getTasks(page, 10, filter);
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch {
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, statusFilter]);

  const handleStatusChange = async (id: string, status: 'todo' | 'in-progress' | 'done') => {
    try {
      await updateTaskStatus(id, status);
      fetchTasks();
    } catch {
      setError('Failed to update task status.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch {
      setError('Failed to delete task.');
    }
  };

  return (
    <div className="min-h-screen bg-background w-full relative">
      {/* Background Grid-Design*/}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          maskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
          `,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />
      {/* Main Container */}
      <div className="relative z-10 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Task Manager</h1>

        <div className="grid gap-8 md:grid-cols-[1fr_3fr]">

          {/* Create Task Form */}
          <div>
            <TaskForm onTaskCreated={fetchTasks} />
          </div>

          {/* Task List Section  */}
          <div className="space-y-4">
            {/* Dropdown */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Tasks</h2>
              <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setPage(1); }}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Error Message  */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Task-list  */}
            <TaskList
              tasks={tasks}
              loading={loading}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />

            {/* Pagination-Controls  */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
