import { FastifyInstance } from 'fastify'
import {
  completeTask,
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from '../controllers/tasks'

export async function tasksRoutes(app: FastifyInstance) {
  app.post('/', createTask)
  app.get('/', getAllTasks)
  app.get('/:id', getTaskById)
  app.put('/:id', updateTask)
  app.delete('/:id', deleteTask)
  app.patch('/:id/complete', completeTask)
}
