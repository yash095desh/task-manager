import { Router } from 'express';
import { createTask, getAllTasks, updateTaskStatus, deleteTask } from '../controllers/taskController';

const router = Router();

router.post('/', createTask);
router.get('/', getAllTasks);
router.patch('/:id', updateTaskStatus);
router.delete('/:id', deleteTask);

export default router;
