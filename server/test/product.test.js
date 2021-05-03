const request = require('supertest')
const { app } = require('../app')
const { populateUsers } = require('../helpers/table-hooks')
const product = require('../data/product')
const { admin_token, customer_token } = require('./test-data/access-token')

beforeAll(async (done) => {
  try {
    await populateUsers()
    done()
  } catch (error) {
    console.error(error)
  }
})

describe('Products', () => {
  describe('Create new product', () => {
    describe('POST /products', () => {
      describe('Correct request(s)', () => {
        describe('Add new product into database, and create new category if category doesnt exist', () => {
          it('Should create and return new product with new category', (done) => {
            const body = { ...product }
            request(app)
              .post('/products')
              .set('access_token', admin_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty('id')
                Object.keys(product).forEach((key) => {
                  if (key === 'category') return
                  expect(res.body).toHaveProperty(key)
                })
                expect(res.body).toHaveProperty('CategoryId', 1)
                done()
              })
          })
          it('Should show added category in the database', (done) => {
            request(app)
              .get('/categories')
              .set('access_token', admin_token)
              .end((err, res) => {
                expect(res.status).toBe(200)
                expect(res.body[0]).toHaveProperty('id')
                expect(res.body[0]).toHaveProperty('name', product.category)
                done()
              })
          })
          it('Should add new product with default values, when price and stock not provided', (done) => {
            const { price, stock, ...body } = product
            request(app)
              .post('/products')
              .set('access_token', admin_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty('id')
                Object.keys(product).forEach((key) => {
                  if (key === 'category') return
                  expect(res.body).toHaveProperty(key)
                })
                expect(res.body).toHaveProperty('price', 0)
                expect(res.body).toHaveProperty('stock', 0)
                done()
              })
          })

          it('Should not create another category, after adding new product with the same category', (done) => {
            request(app)
              .get('/categories')
              .set('access_token', admin_token)
              .end((err, res) => {
                expect(res.status).toBe(200)
                expect(res.body.length).toBe(1)
                done()
              })
          })
        })
      })
      describe('Incorrect request(s)', () => {
        describe('Request with no access token or access token which is not the role of an admin', () => {
          it('Should return error indicating access token is not provided', (done) => {
            const body = { ...product }
            request(app)
              .post('/products')
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(401)
                expect(res.body.message).toContain('user not authenticated')
                done()
              })
          })

          it('Should return error indicating access token is provided, but its a non privileged user', (done) => {
            const body = { ...product }
            request(app)
              .post('/products')
              .set('access_token', customer_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(401)
                expect(res.body.message).toContain('user not authorized')
                done()
              })
          })
        })
        describe('Invalid user inputs', () => {
          it('Should return error indicating required field name must be provided', (done) => {
            const { name, ...body } = { ...product }
            request(app)
              .post('/products')
              .set('access_token', admin_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(res.body.message).toContain('name cannot be empty')
                done()
              })
          })
          it('Should return error indicating stock must be a postitive integer', (done) => {
            const { body } = { ...product }
            request(app)
              .post('/products')
              .set('access_token', admin_token)
              .send({ ...body, stock: -1 })
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(res.body.message).toContain(
                  'stock must be a positive integer',
                )
                done()
              })
          })

          it('Should return error indicating price must be a postitive integer', (done) => {
            const { body } = { ...product }
            request(app)
              .post('/products')
              .set('access_token', admin_token)
              .send({ ...body, price: -1 })
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(res.body.message).toContain(
                  'price must be a positive integer',
                )
                done()
              })
          })
          it('Should return error indicating price and stock must be an integer', (done) => {
            const { body } = { ...product }
            request(app)
              .post('/products')
              .set('access_token', admin_token)
              .send({ ...body, price: 'asd', stock: 'qwe' })
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(res.body.message).toContain('stock must be an integer')
                expect(res.body.message).toContain('price must be an integer')
                done()
              })
          })
        })
      })
    })
  })
  describe('Read all products', () => {
    describe('GET /products', () => {
      describe('Correct request(s)', () => {
        describe('Retrieve all products from the database', () => {
          it('Should return all products available at database', (done) => {
            request(app)
              .get('/products')
              .set('access_token', customer_token)
              .end((err, res) => {
                expect(res.status).toBe(200)
                expect(Array.isArray(res.body))
                done()
              })
          })
        })
      })
      describe('Incorrect request(s)', () => {
        describe('Both admin and client may read the products, but it require valid access_token', () => {
          it('Should return error indicating access token doesnt exist', (done) => {
            request(app)
              .get('/products')
              .end((err, res) => {
                expect(res.status).toBe(401)
                expect(Array.isArray(res.body.message))
                expect(res.body.message).toContain('user not authenticated')
                done()
              })
          })
        })
      })
    })
  })
  describe('Read one product', () => {
    describe('GET /products/:id', () => {
      describe('Correct request(s)', () => {
        describe('Retrieve one products which is selected from the request params id', () => {
          it('Should return one product from database', (done) => {
            request(app)
              .get('/products/1')
              .set('access_token', customer_token)
              .end((err, res) => {
                expect(res.status).toBe(200)
                expect(!Array.isArray(res.body))
                expect(res.body).toHaveProperty('id')
                Object.keys(product).forEach((key) => {
                  if (key === 'category') return
                  expect(res.body).toHaveProperty(key)
                })
                done()
              })
          })
        })
      })
      describe('Incorrect request(s)', () => {
        describe('Accessing data without authenticating', () => {
          it('Should return error indicating access token doesnt exist', (done) => {
            request(app)
              .get('/products')
              .end((err, res) => {
                expect(res.status).toBe(401)
                expect(Array.isArray(res.body.message))
                expect(res.body.message).toContain('user not authenticated')
                done()
              })
          })
        })

        describe('Invalid user inputs', () => {
          it('Should update and return one product from database', (done) => {
            request(app)
              .get('/products/999')
              .set('access_token', admin_token)
              .end((err, res) => {
                expect(res.status).toBe(404)
                expect(res.body.message).toContain('data not found')
                done()
              })
          })
        })
      })
    })
  })
  describe('Update one product', () => {
    describe('PUT /products/:id', () => {
      describe('Correct requests(s)', () => {
        describe('Update and retrieve one products from the database which is selected from the request params id ', () => {
          it('Should update and return one product from database', (done) => {
            const body = {
              name: 'Anne Pro 2',
              stock: 300,
              price: 2000000,
              category: 'keyboard',
            }
            request(app)
              .put('/products/1')
              .set('access_token', admin_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('id')
                Object.keys(product).forEach((key) => {
                  if (key === 'category') return
                  expect(res.body).toHaveProperty(key)
                })
                expect(res.body).toHaveProperty('CategoryId', 2)
                done()
              })
          })
        })
      })
      describe('Incorrect request(s)', () => {
        describe('Request with no access token or access token which is not the role of an admin', () => {
          it('Should return error indicating access token is not provided', (done) => {
            const body = { name: 'Cherry MX Red', stock: 300, price: 2000 }
            request(app)
              .put('/products/1')
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(401)
                expect(res.body.message).toContain('user not authenticated')
                done()
              })
          })

          it('Should return error indicating access token is provided, but its a non privileged user', (done) => {
            const body = { name: 'Cherry MX Red', stock: 300, price: 2000 }
            request(app)
              .put('/products/1')
              .set('access_token', customer_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(401)
                expect(res.body.message).toContain('user not authorized')
                done()
              })
          })
        })
        describe('Invalid user inputs', () => {
          it('Should return error indication the product with that id doesnt exist', (done) => {
            const body = { name: '', stock: 300, price: 2000 }
            request(app)
              .put('/products/999')
              .set('access_token', admin_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(404)
                expect(res.body.message).toContain('data not found')
                done()
              })
          })
          it('Should return error indicating required field name must be provided', (done) => {
            const body = { name: '', stock: 300, price: 2000 }
            request(app)
              .put('/products/1')
              .set('access_token', admin_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(res.body.message).toContain('name cannot be empty')
                done()
              })
          })
          it('Should return error indicating stock must be a postitive integer', (done) => {
            const body = { name: 'Cherry MX Red', stock: -1, price: 2000 }
            request(app)
              .put('/products/1')
              .set('access_token', admin_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(res.body.message).toContain(
                  'stock must be a positive integer',
                )
                done()
              })
          })

          it('Should return error indicating price must be a postitive integer', (done) => {
            const body = { name: 'Cherry MX Red', stock: 300, price: -1 }
            request(app)
              .put('/products/1')
              .set('access_token', admin_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(res.body.message).toContain(
                  'price must be a positive integer',
                )
                done()
              })
          })
          it('Should return error indicating price and stock must be an integer', (done) => {
            const body = { name: 'Cherry MX Red', price: 'asd', stock: 'qwe' }
            request(app)
              .put('/products/1')
              .set('access_token', admin_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(res.body.message).toContain('stock must be an integer')
                expect(res.body.message).toContain('price must be an integer')
                done()
              })
          })
        })
      })
    })
  })
  describe('Patch One Product', () => {
    describe('PATCH /products/:id', () => {
      describe('Correct requests(s)', () => {
        describe('Update and retrieve one products from the database which is selected from the request params id ', () => {
          it('Should update and return one product from database', (done) => {
            const body = { stock: 1000 }
            request(app)
              .patch('/products/1')
              .set('access_token', admin_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('id')
                Object.keys(product).forEach((key) => {
                  if (key === 'category') return
                  expect(res.body).toHaveProperty(key)
                })
                done()
              })
          })
        })
      })
      describe('Incorrect request(s)', () => {
        describe('Request with no access token or access token which is not the role of an admin', () => {
          it('Should return error indicating access token is not provided', (done) => {
            const body = { stock: 1000 }
            request(app)
              .patch('/products/1')
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(401)
                expect(res.body.message).toContain('user not authenticated')
                done()
              })
          })

          it('Should return error indicating access token is provided, but its a non privileged user', (done) => {
            const body = { stock: 1000 }
            request(app)
              .patch('/products/1')
              .set('access_token', customer_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(401)
                expect(res.body.message).toContain('user not authorized')
                done()
              })
          })
        })
        describe('Invalid user inputs', () => {
          it('Should return error indication the product with that id doesnt exist', (done) => {
            const body = { stock: 1000 }
            request(app)
              .patch('/products/999')
              .set('access_token', admin_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(404)
                expect(res.body.message).toContain('data not found')
                done()
              })
          })
          it('Should return error indicating stock must be a postitive integer', (done) => {
            const body = { stock: -1 }
            request(app)
              .patch('/products/1')
              .set('access_token', admin_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(res.body.message).toContain(
                  'stock must be a positive integer',
                )
                done()
              })
          })

          it('Should return error indicating price and stock must be an integer', (done) => {
            const body = { stock: 'qwe' }
            request(app)
              .patch('/products/1')
              .set('access_token', admin_token)
              .send(body)
              .end((err, res) => {
                expect(res.status).toBe(400)
                expect(res.body.message).toContain('stock must be an integer')
                done()
              })
          })
        })
      })
    })
  })
  describe('Delete One Product', () => {
    describe('DELETE /products/:id', () => {
      describe('Correct request(s)', () => {
        describe('Deleting one from database according to request params id', () => {
          it('Should return a message indicating the deletion is successful', (done) => {
            request(app)
              .delete('/products/1')
              .set('access_token', admin_token)
              .end((err, res) => {
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('product deletion is successful')
                done()
              })
          })
        })
      })
      describe('Incorrect request(s)', () => {
        describe('Request with no access token or access token which is not the role of an admin', () => {
          it('Should return error indicating access token is not provided', (done) => {
            request(app)
              .delete('/products/1')
              .end((err, res) => {
                expect(res.status).toBe(401)
                expect(res.body.message).toContain('user not authenticated')
                done()
              })
          })

          it('Should return error indicating access token is provided, but its a non privileged user', (done) => {
            request(app)
              .delete('/products/1')
              .set('access_token', customer_token)
              .end((err, res) => {
                expect(res.status).toBe(401)
                expect(res.body.message).toContain('user not authorized')
                done()
              })
          })
        })
        describe('Invalid user inputs', () => {
          it('Should return error indication the product with that id doesnt exist', (done) => {
            request(app)
              .delete('/products/999')
              .set('access_token', admin_token)
              .end((err, res) => {
                expect(res.status).toBe(404)
                expect(res.body.message).toContain('data not found')
                done()
              })
          })
        })
      })
    })
  })
})
