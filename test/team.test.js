const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
const config = require('../api/config/config');
const faker = require('faker');

chai.use(chaiHttp);

describe('Team tests', () => {
    it('Create + Find + Assign', (done) => {
        
        // Register
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
                console.log(res);
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('object');

                // Login
                let loginBody =  {
                    email: user.email,
                    password: user.password
                }
                chai.request(app)
                    .post('/auth/login')
                    .send(loginBody)
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body.token).to.exist;                

                        // Find
                        let userId = res.body.user._id
                        let token = res.body.token
                        chai.request(app)
                            .get('/user/' + userId)
                            .auth(token, { type: 'bearer' })
                            .send()
                            .end((err, res) => {
                                expect(res.status).to.be.equal(200);

                                // Delete
                                chai.request(app)
                                    .delete('/user/' + userId)
                                    .auth(token, { type: 'bearer' })
                                    .send()
                                    .end((err, res) => {
                                        expect(res.status).to.be.equal(204);
                                        done()
                                    });
                            });
                    });
            });
    });
});