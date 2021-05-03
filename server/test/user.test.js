const request = require('supertest')
const { app } = require('../app')
const { populateAdmin } = require('../helpers/table-hooks')

beforeAll(async (done) => {
  try {
    await populateAdmin()
  } catch (error) {
    console.error(error)
  }
  done()
})

describe('User', () => {
  describe('Create new user', () => {
    describe('POST /register', () => {
      describe('Correct request', () => {
        it('Should return new customer', (done) => {
          const body = {
            email: 'customer@email.com',
            password: 'test1234',
            name: 'John Blake',
          }

          request(app)
            .post('/register')
            .send(body)
            .end((err, res) => {
              expect(res.status).toBe(201)
              expect(res.body).toHaveProperty('id')
              expect(res.body).toHaveProperty('email', body.email)
              expect(res.body).not.toHaveProperty('password')
              expect(res.body).toHaveProperty('name', body.name)
              expect(res.body).toHaveProperty('role', 'customer')
              done()
            })
        })
      })
      describe('Incorrect request', () => {
        describe('Email already exist', () => {
          it('Should returns a message which indicates the email already exist in the database', (done) => {
            const body = {
              email: 'customer@email.com',
              password: 'test1234',
              name: 'John Blake',
            }
            request(app)
              .post('/register')
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(Array.isArray(res.body.message))
                expect(res.body.message).toContain('email already exist')
                done()
              })
          })
        })
        describe('Email, password, and / or name is empty', () => {
          it('Should return cannot be empty validation when [email], [password] or [name] is empty string', (done) => {
            const body = {
              email: '',
              password: '',
              name: '',
            }
            request(app)
              .post('/register')
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(Array.isArray(res.body.message))
                expect(res.body.message).toContain('email cannot be empty')
                expect(res.body.message).toContain('password cannot be empty')
                expect(res.body.message).toContain('name cannot be empty')
                done()
              })
          })
          it('Should return cannot be empty validation when [email], [password] or [name] is null or undefined', (done) => {
            const body = {}
            request(app)
              .post('/register')
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(Array.isArray(res.body.message))
                expect(res.body.message).toContain('email cannot be empty')
                expect(res.body.message).toContain('password cannot be empty')
                expect(res.body.message).toContain('name cannot be empty')
                done()
              })
          })
        })
        describe('Incorrect email format', () => {
          it('Should return error message which indicates invalid email address', (done) => {
            const body = {
              email: 'customer@email',
              password: 'test1234',
              name: 'John Blake',
            }
            request(app)
              .post('/register')
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(Array.isArray(res.body.message))
                expect(res.body.message).toContain('invalid email address')
                done()
              })
          })
        })
        describe('Incorrect password length', () => {
          it('Should return error message which indicates invalid password length', (done) => {
            const body = {
              email: 'customer@email.com',
              password: 'test',
              name: 'John Blake',
            }
            request(app)
              .post('/register')
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(Array.isArray(res.body.message))
                expect(res.body.message).toContain(
                  'password must be higher than 6 characters',
                )
                done()
              })
          })
        })
      })
    })
  })

  describe('User authentication', () => {
    describe('User login', () => {
      describe('POST /login', () => {
        describe('Correct request', () => {
          describe('Retrieve user data and its [access_token] ', () => {
            it('Should return user information without the password alongside the access token', (done) => {
              const body = {
                email: 'customer@email.com',
                password: 'test1234',
              }
              request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                  expect(res.status).toBe(200)
                  expect(res.body).toHaveProperty('id')
                  expect(res.body).toHaveProperty('email', body.email)
                  expect(res.body).toHaveProperty('name')
                  expect(res.body).not.toHaveProperty('password')
                  expect(res.body).toHaveProperty('role')
                  expect(res.body).toHaveProperty('access_token')
                  done()
                })
            })
          })
          describe('Retrieve user data and its [access_token] ', () => {
            it('Should return admin information without the password alongside the access token', (done) => {
              const body = {
                email: 'admin@mail.com',
                password: 'admin1234',
              }
              request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                  expect(res.status).toBe(200)
                  expect(res.body).toHaveProperty('id')
                  expect(res.body).toHaveProperty('email', body.email)
                  expect(res.body).toHaveProperty('name')
                  expect(res.body).not.toHaveProperty('password')
                  expect(res.body).toHaveProperty('role')
                  expect(res.body).toHaveProperty('access_token')
                  done()
                })
            })
          })
        })
        describe('Incorrect request', () => {
          describe('Invalid email or password', () => {
            it('Should return error when the email is not registered yet', (done) => {
              const body = {
                email: 'dummy@email.com',
                password: 'test1234',
              }
              request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                  expect(res.status).toBe(401)
                  expect(Array.isArray(res.body.message))
                  expect(res.body.message).toContain(
                    'invalid email or password',
                  )
                  done()
                })
            })

            it('Should return error when the email is registered, but the password is incorrect', (done) => {
              const body = {
                email: 'customer@email.com',
                password: 'randompassword',
              }
              request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                  expect(res.status).toBe(401)
                  expect(Array.isArray(res.body.message))
                  expect(res.body.message).toContain(
                    'invalid email or password',
                  )
                  done()
                })
            })
          })
          describe('Empty email field', () => {
            it('Should return error when the user doesnt input the email', (done) => {
              const body = {
                email: '',
                password: 'test1234',
              }
              request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                  expect(res.status).toBe(400)
                  expect(Array.isArray(res.body.message))
                  expect(res.body.message).toContain(
                    'email or password cannot be empty',
                  )
                  done()
                })
            })
            it('Should return error when the request doesnt contain email property', (done) => {
              const body = {
                password: 'test1234',
              }
              request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                  expect(res.status).toBe(400)
                  expect(Array.isArray(res.body.message))
                  expect(res.body.message).toContain(
                    'email or password cannot be empty',
                  )
                  done()
                })
            })
          })
          describe('Empty password field', () => {
            it('Should return error when the user doesnt input the password', (done) => {
              const body = {
                email: 'customer@email.com',
                password: '',
              }
              request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                  expect(res.status).toBe(400)
                  expect(Array.isArray(res.body.message))
                  expect(res.body.message).toContain(
                    'email or password cannot be empty',
                  )
                  done()
                })
            })
            it('Should return error when the request doesnt contain password property', (done) => {
              const body = {
                email: 'customer@email.com',
              }
              request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                  expect(res.status).toBe(400)
                  expect(Array.isArray(res.body.message))
                  expect(res.body.message).toContain(
                    'email or password cannot be empty',
                  )
                  done()
                })
            })
          })
        })
      })
    })
  })
})
