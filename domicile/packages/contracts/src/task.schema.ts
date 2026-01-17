import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  completed: z.boolean(),
  createdAt: z.string().datetime()
});

export type Task = z.infer<typeof TaskSchema>;

// API Request/Response Schemas
export const CreateTaskRequestSchema = TaskSchema.omit({ id: true, createdAt: true });
export const UpdateTaskRequestSchema = TaskSchema.partial().omit({ id: true, createdAt: true });

export const TaskListResponseSchema = z.object({
  tasks: z.array(TaskSchema),
  total: z.number(),
  page: z.number().optional(),
  pageSize: z.number().optional()
});

export type CreateTaskRequest = z.infer<typeof CreateTaskRequestSchema>;
export type UpdateTaskRequest = z.infer<typeof UpdateTaskRequestSchema>;
export type TaskListResponse = z.infer<typeof TaskListResponseSchema>;
