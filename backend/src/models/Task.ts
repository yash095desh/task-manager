import { Schema, model, Document } from 'mongoose';

export interface Task_Interface extends Document {
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

const taskSchema = new Schema<Task_Interface>({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<Task_Interface>('Task', taskSchema);
