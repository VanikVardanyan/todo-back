import supertest from 'supertest'
import app from '../../index'
import Task from '../../models/task'

const request = supertest(app)

describe('API Controllers', function () {
  let taskId: string

  this.timeout(5000)

  it('should create a new task', (done) => {
    const taskDescription = 'Test Task'

    request
      .post('/api/tasks')
      .send({ description: taskDescription })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        taskId = res.body._id

        done()
      })
  })

  it('should get an array of tasks including the created one', (done) => {
    request
      .get('/api/tasks')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        const createdTask = res.body.find((task: any) => task._id === taskId)

        if (!createdTask) {
          return done(new Error('Created task not found in the array'))
        }

        done()
      })
  })

  it('should complete the created task', (done) => {
    request
      .post(`/api/tasks/${taskId}/complete`)
      .expect(200)
      .end(async (err, res) => {
        if (err) {
          return done(err)
        }

        const updatedTask = await Task.findById(taskId)

        if (!updatedTask || !updatedTask.completed) {
          return done(new Error('Task was not successfully completed'))
        }

        done()
      })
  })
})
