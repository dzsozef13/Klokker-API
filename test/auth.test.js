const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
const faker = require('faker');

chai.use(chaiHttp);

describe('Auth tests', () => {
    
    it('should create & auth user for auth testing', (done) => {

        let user = {
            name: faker.name.findName(),
            email: faker.internet.email().toLowerCase(),
            password: "12345678",
            role: "user"
        }

        chai.request(app)
        .post('/user')
        .send(user)
        .end((err, res) => {
            chai.expect(res.status).to.be.equal(201);
            chai.expect(res.body).to.be.a('object');

            let loginBody =  {
                email: user.email,
                password: user.password
            }

            chai.request(app)
            .post('/auth/login')
            .send(loginBody)
            .end((err, res) => {
                chai.expect(res.status).to.be.equal(200);
                chai.expect(res.body.token).to.exist;

                userId = res.body.user._id;
                token = res.body.token;

                done()
            });
        });
    });

    it('should create & fail to auth user for user testing', (done) => {

        let user = {
            name: faker.name.findName(),
            email: faker.internet.email().toLowerCase(),
            password: "12345678",
            role: "user"
        }

        chai.request(app)
        .post('/user')
        .send(user)
        .end((err, res) => {
            chai.expect(res.status).to.be.equal(201);
            chai.expect(res.body).to.be.a('object');

            let wrongLoginBody =  {
                email: user.email,
                password: 'wrong password'
            }

            chai.request(app)
            .post('/auth/login')
            .send(wrongLoginBody)
            .end((err, res) => {
                chai.expect(res.status).to.be.equal(200);
                chai.expect(res.body.token).to.exist;

                userId = res.body.user._id;
                token = res.body.token;

                done()
            });
        });
    });

});