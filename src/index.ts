import config from 'config'
import express from 'express'
import mongoose from 'mongoose'

import { postCreateValidation } from './validations/task'
import handleValidationError from './middlewares/handleValidationError'
import cors from 'cors'
import {
  completeTask,
  createTask,
  getTasks,
} from './controllers/tasksController'
import { tasksRoutes } from './routes/tasksRoutes'

const app = express()
const PORT: number = parseInt(process.env.PORT || config.get('port'), 10)

// Middleware
app.use(express.json())
app.use(
  cors({
    origin: config.get("corsOrigin"),
    credentials: true,
  }),
)

// Routes
app.post(
  tasksRoutes.default,
  postCreateValidation,
  handleValidationError,
  createTask,
)
app.post(tasksRoutes.edit, completeTask)
app.get(tasksRoutes.default, getTasks)

// MongoDB Connection
mongoose
  .connect(config.get('mongoUri'))
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
  })

// Server Setup
const server = app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
  .on('error', (err) => {
    console.error('Server error:', err)
  })

export default server
