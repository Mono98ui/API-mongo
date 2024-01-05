const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');


describe('Product API Endpoints', () => {
  let productId;

  afterAll((done) => {
    app.close(done);
    mongoose.disconnect();
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
      "name":"todel",
      "quantity": 10,
      "price":5,
      "image": "https://images.pexels.com/photos/6683036/pexels-photo-6683036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("todel");
    expect(res.body.quantity).toEqual(10);
    expect(res.body.price).toEqual(5);
    expect(res.body.image).toEqual("https://images.pexels.com/photos/6683036/pexels-photo-6683036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
    productId = res.body._id;
  });

  it('should get all books', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should get a single book by ID', async () => {
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("todel");
    expect(res.body.quantity).toEqual(10);
    expect(res.body.price).toEqual(5);
    expect(res.body.image).toEqual("https://images.pexels.com/photos/6683036/pexels-photo-6683036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
  });

  it('should update a book', async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .send({
      "name":"todeldel",
      "quantity": 11,
      "price":6,
      "image": "https://cdn.pixabay.com/photo/2023/09/14/16/17/wave-8253292_1280.jpg"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("todeldel");
    expect(res.body.quantity).toEqual(11);
    expect(res.body.price).toEqual(6);
    expect(res.body.image).toEqual("https://cdn.pixabay.com/photo/2023/09/14/16/17/wave-8253292_1280.jpg");
  });

  it('should delete a book', async () => {
    const res = await request(app).delete(`/api/products/${productId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("todeldel");
    expect(res.body.quantity).toEqual(11);
    expect(res.body.price).toEqual(6);
    expect(res.body.image).toEqual("https://cdn.pixabay.com/photo/2023/09/14/16/17/wave-8253292_1280.jpg");
  });
});
