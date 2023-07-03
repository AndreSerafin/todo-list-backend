import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { Task } from '../models/task'

export async function createTask(req: FastifyRequest, rep: FastifyReply) {
  const createTaskSchema = z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    isCompleted: z.string(),
  })

  try {
    const { isCompleted, title, description } = createTaskSchema.parse(req.body)

    let response
    const isCompletedBool = isCompleted === 'true'
    if (isCompletedBool) {
      console.log(isCompletedBool)
      response = await Task.create({
        title,
        description,
        isCompleted: isCompletedBool,
        completedAt: new Date().toISOString(),
      })
    } else {
      response = await Task.create({
        title,
        description,
        isCompleted: isCompletedBool,
      })
    }

    rep.status(201).send({ response, message: 'Task Successfully Created' })
  } catch (e: any) {
    rep.status(400).send({ message: e.message })
  }
}

export async function getAllTasks(req: FastifyRequest, rep: FastifyReply) {
  try {
    const payload = await Task.find()
    rep.status(200).send(payload)
  } catch (e: any) {
    rep.status(400).send({ message: e.message })
  }
}

const getIdSchema = z.object({ id: z.string() })

export async function getTaskById(req: FastifyRequest, rep: FastifyReply) {
  const { id } = getIdSchema.parse(req.params)
  try {
    const payload = await Task.findById(id)
    if (!payload) {
      rep.status(404).send({ message: 'Id not found' })
    }
    rep.status(200).send(payload)
  } catch (e: any) {
    rep.status(400).send({ message: e.message })
  }
}

export async function updateTask(req: FastifyRequest, rep: FastifyReply) {
  const { id } = getIdSchema.parse(req.params)
  const updateTaskSchema = z.object({
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    isCompleted: z.string(),
  })
  const { title, isCompleted, description } = updateTaskSchema.parse(req.body)

  const isCompletedBool = isCompleted === 'true'
  let payload = null
  try {
    if (isCompletedBool) {
      payload = await Task.findByIdAndUpdate(
        id,
        {
          title,
          description,
          isCompletedBool,
          completedAt: new Date().toISOString(),
        },
        { new: true },
      )
    } else {
      payload = await Task.findByIdAndUpdate(
        id,
        {
          title,
          description,
          isCompletedBool,
          completedAt: '',
        },
        { new: true },
      )
    }
    rep.status(202).send({ msg: payload })
  } catch (e: any) {
    rep.status(400).send({ message: e.message })
  }
}

export async function deleteTask(req: FastifyRequest, rep: FastifyReply) {
  const { id } = getIdSchema.parse(req.params)
  try {
    const deletedTask = await Task.findByIdAndDelete(id)
    if (!deletedTask) {
      rep.status(404).send({ message: 'Id not found' })
    }
    rep.status(200)
  } catch (e: any) {
    rep.status(404).send({ message: e.message })
  }
}

export async function completeTask(req: FastifyRequest, rep: FastifyReply) {
  const { id } = getIdSchema.parse(req.params)
  try {
    const currentDate = new Date().toISOString()
    const task = await Task.findById(id)
    if (task) {
      let { isCompleted, completedAt } = task
      if (isCompleted === false) {
        isCompleted = true
        completedAt = currentDate
      } else {
        isCompleted = false
        completedAt = ''
      }
      await Task.findByIdAndUpdate(id, { isCompleted, completedAt })
    } else {
      rep.send({ message: 'Id not found' })
    }
  } catch (e: any) {
    rep.status(404).send({ message: e.message })
  }
}
