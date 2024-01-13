import { body } from 'express-validator'

export const postCreateValidation = [
  body('description').notEmpty().withMessage('Текст не может быть пустым'),
]
