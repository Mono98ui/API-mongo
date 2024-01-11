require('dotenv').config()
const request = require('supertest');
const  {registerValidation, loginValidation} = require('../controllers/validation')
let data


describe('verifyToken Unit Test', ()=>{

	it('registerValidation should be valid', async()=>{
		data = {
    "name":"John Del",
    "email":"JohnDel@hotmail.com",
    "password":"testtest12"
		}
		const response = registerValidation(data)
		expect(response.value).toEqual(data)
		expect(response.error).toBeUndefined()
	})

	it('registerValidation should not be valid', async()=>{
		data1 = {
    "name":"J",
    "email":"JohnDel@hotmail.com",
    "password":"testtest12"
		}
		data2 = {
    "name":"John Del",
    "email":"J",
    "password":"testtest12"
		}
		data3 = {
    "name":"John Del",
    "email":"JohnDel@hotmail.com",
    "password":"t"
		}

		data4 = {
    "name":"John Del",
    "email":"JohnDelhotmail.com",
    "password":"testtest12"
		}
		let response = registerValidation(data1)
		expect(response.value).toEqual(data1)
		expect(response.error).not.toBeUndefined()

		response = registerValidation(data2)
		expect(response.value).toEqual(data2)
		expect(response.error).not.toBeUndefined()

		response = registerValidation(data3)
		expect(response.value).toEqual(data3)
		expect(response.error).not.toBeUndefined()

		response = registerValidation(data4)
		expect(response.value).toEqual(data4)
		expect(response.error).not.toBeUndefined()
	})


})