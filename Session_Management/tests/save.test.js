const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

describe('Session creation test', () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();     
    });

    it('should create a new session entry', async () => {
        const res = await request(app)
            .post('/save')
            .send({
            "year":"test",
            "month":"test",
            "day":"test",
            "email":"test",
            "radar":"test"
        })
        return expect(res.statusCode).toEqual(201);
      });

    it('should retrieve a session from the database', async() => {
        const res = await request(app)
            .post('/fetch')
            .send({
                "email":"test"
            })

    });

    it('should fail for making a GET request to /save', async () => {
        const res = await request(app)
            .get('/save')
            .send({
            "year":"test",
            "month":"test",
            "day":"test",
            "email":"test",
            "radar":"test"
        })
        return expect(res.statusCode).not.toEqual(201);
      });

      it('should fail for making a GET request to /fetch', async() => {
        const res = await request(app)
            .get('/fetch')
            .send({
                "email":"test"
            })
            return expect(res.statusCode).not.toEqual(200);
    }); 
});