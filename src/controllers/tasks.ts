import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { Task } from '../models/task'

export async function createTask(req: FastifyRequest, rep: FastifyReply) {
  const createTaskSchema = z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    completedAt: z.string().nullable().optional(),
  })

  try {
    const payload = createTaskSchema.parse(req.body)

    const response = await Task.create(payload)

    rep.status(201).send({ response, msg: 'Task Successfully Created' })
  } catch (e: any) {
    rep.status(400).send(e.message)
  }
}

export async function getAllTasks(req: FastifyRequest, rep: FastifyReply) {
  try {
    const payload = await Task.find()
    rep.status(200).send(payload)
  } catch (e: any) {
    rep.status(400).send(e.message)
  }
}

const getIdSchema = z.object({ id: z.string() })

export async function getTaskById(req: FastifyRequest, rep: FastifyReply) {
  const { id } = getIdSchema.parse(req.params)
  try {
    const payload = await Task.findById(id)
    rep.status(200).send(payload)
  } catch (e: any) {
    rep.status(400).send(e.message)
  }
}

export async function updateTask(req: FastifyRequest, rep: FastifyReply) {
  const { id } = getIdSchema.parse(req.params)
  const updateTaskSchema = z.object({
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    completedAt: z.string().nullable().optional(),
  })

  const updatedTask = updateTaskSchema.parse(req.body)
  try {
    const payload = await Task.findByIdAndUpdate(id, updatedTask)
    rep.status(202).send(payload)
  } catch (e: any) {
    rep.status(400).send(e.message)
  }
}

export async function deleteTask(req: FastifyRequest, rep: FastifyReply) {
  const { id } = getIdSchema.parse(req.params)
  try {
    const deletedTask = await Task.findByIdAndDelete(id)
    if (!deletedTask) {
      rep.status(404).send({ msg: 'Id not found' })
    }
    rep.status(200)
  } catch (e: any) {
    rep.status(404).send(e.message)
  }
}
