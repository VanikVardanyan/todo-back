import Task from '../models/task'
import { Request, RequestHandler, Response } from 'express'

export const createTask: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { description } = req.body

  try {
    const doc = await Task.create({
      description,
      completed: false,
    })

    const tasks = await doc.save()
    res.status(201).json(tasks)
  } catch (err) {
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

export const getTasks: RequestHandler = async (
  _req: Request,
  res: Response,
) => {
  try {
    const tasks = await Task.find().exec()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

export const completeTask: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params

    const task = await Task.findById(id)

    if (!task) {
      return res.status(404).json({ error: 'задача не найден' })
    }

    await Task.updateOne({ _id: id }, { completed: true })

    res.json({
      success: true,
    })
  } catch (err) {
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}
