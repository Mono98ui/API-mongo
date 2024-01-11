require('dotenv').config()
const errorMiddleware = require('../middleware/errorMiddleware')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = express.Router()
const request = require('supertest');
const{getProduct} = require('../controllers/productController')

let server
const MONGO_DB = process.env.MONGO_URL
const PORT = 3001

const setUpErrroMiddlewareTest = ()=>{

	server =  app.listen(PORT, async () => {
  console.log(`Example app listening on port ${PORT}`)
  await mongoose.connect(MONGO_DB).then(()=>{
  console.log("Connectedto DB sucessfully")
  }).catch((error)=>{
  console.log(error)
  })
	});

	const testErrorMiddleware = (req, res)=>{
		res.status(200).send()
	}
	const testErrorMiddlewareNoStatus = (req, res)=>{
		res.status().send()
	}

	router.get('/testErrorMiddleware', testErrorMiddleware)
	router.get('/testErrorMiddlewareNoStatus', testErrorMiddlewareNoStatus)
	router.get('/testErrorMiddlewareMock', getProduct)
	app.use(errorMiddleware)
	app.use('', router)

}

describe('errorMiddleware Unit Test', ()=>{

	beforeAll(() => {
		setUpErrroMiddlewareTest()
	});

	afterAll((done) => {
		server.close(done)
		mongoose.disconnect();
	});

	it('should successfull', async()=>{
		const response = await request(app).get('/testErrorMiddleware').send()
		expect(response.status).toEqual(200)
	})

	it('should successfull in production', async()=>{
		process.env.NODE_ENV = "production"
		const response = await request(app).get('/testErrorMiddleware').send()
		expect(response.status).toEqual(200)
	})

	it('should fail in production (endpoint none existant)', async()=>{
		process.env.NODE_ENV = "production"
		const response = await request(app).get('/test').send()
		expect(response.status).toEqual(404)
	})

	it('should fail in production (no status)', async()=>{
		process.env.NODE_ENV = "production"
		const response = await request(app).get('/testErrorMiddlewareNoStatus').send()
		expect(response.status).toEqual(500)
	})

	it('should fail in development', async()=>{
		const response = await request(server).get('/testErrorMiddlewareMock').send()
		expect(response.status).toEqual(500)
	})

	
})