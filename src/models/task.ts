import { Schema, model } from 'mongoose'

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    isCompleted: { type: Boolean, default: false, nullable: false },
    completedAt: { type: String, default: '' },
  },
  { timestamps: true, versionKey: false },
)

export const Task = model('Task', taskSchema)
