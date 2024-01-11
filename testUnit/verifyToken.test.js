require('dotenv').config()
const verify = require('../routes/verifyToken')
const express = require('express')
const jwt = require('jsonwebtoken');
const app = express()
const router = express.Router()
const request = require('supertest');

const setUpTokenTest = ()=>{
	const testVerify = (req, res)=>{
		res.status(200).send(req.user)
	}

	router.get('/testVerify', verify, testVerify)

	app.use('', router)

}

describe('verifyToken Unit Test', ()=>{

	beforeAll(() => {
		setUpTokenTest()
	});

	it('should fail (bad format token)', async()=>{
		const response = await request(app).get('/testVerify').send().set('auth-token', "1")
		expect(response.status).toEqual(400);
	})

	it('should fail (no token)', async()=>{
		const response = await request(app).get('/testVerify').send()
		expect(response.status).toEqual(401);
	})

	it('should be valid', async()=>{
		const token = jwt.sign({ _id: "1" }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
		const response = await request(app).get('/testVerify').send().set('auth-token', token)
		expect(response.status).toEqual(200);
	})
})