const User = require('../model/Usermodel');
const { app } = require('../app')
const request= require('supertest');

describe('Admin', () => {
    
    test('should create a new admin user', (done) => {
        jest.setTimeout(30000);
       request(app)
        .post('/auth/register-admin')
        .send({
            fullname: "admin test",
            email: "admin-test@gmail.com",
            password: "testingAdmin12345",
        })
        .expect(200)
        .expect((res) => {
                //res.body.data.length = 8;
                res.body.fullname = "admin test";
                res.body.email = "admin-test@gmail.com";
                res.body.role = "admin";
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

describe('user', () => {
   
    test('should create a new user', (done) => {
        jest.setTimeout(30000);
        request(app)
            .post('/auth/register-user')
            .send({
            fullname: "user test",
            email: "user-test@gmail.com",
            password: "testingUser12345",
            })
            .expect(200)
            .expect((res) => {
                //res.body.data.length = 8;
                res.body.fullname = "user test";
                res.body.email = "user-test@gmail.com";
                res.body.role = "user";
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
     });

    test('should login user', (done)=>{
        jest.setTimeout(300000);
        request(app)
            .post('/auth/signin-user')
            .send({
                email: "user-test@gmail.com",
                password: "testingUser12345",
            })
            .expect(200)
            .expect((res) => {
                //res.body.data.length = 7;
                res.body.fullname = "user test";
                res.body.role = "user";
                res.body.status = "Logged in successfully";
                res.body.success = true;
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});
})