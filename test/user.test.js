const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
const config = require('../api/config/config');
const faker = require('faker');

chai.use(chaiHttp);

describe('User tests', () => {

    it('Register + Find + Delete', (done) => {

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
               
                // Find
                let userId = res.body._id
                chai.request(app)
                    .get('/user/' + userId)
                    .send()
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);              
                        done()

                        // Delete
                        chai.request(app)
                            .delete('/user/' + userId)
                            .send()
                            .end((err, res) => {
                                expect(res.status).to.be.equal(204);
                                done()                   
                            });
                    });
            });

    });
});