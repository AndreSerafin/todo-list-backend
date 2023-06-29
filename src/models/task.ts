import { Schema, model } from 'mongoose'

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false },
)

export const Task = model('Task', taskSchema)
