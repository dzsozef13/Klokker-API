const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
const faker = require('faker');

chai.use(chaiHttp);

describe('Auth tests', () => {

    it('Register + Login + Delete', (done) => {

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
                console.log("user created");
               
                // Find
                let userId = res.body._id
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
                        console.log("user logged in");                      

                        // Delete
                        chai.request(app)
                            .delete('/user/' + userId)
                            .send()
                            .end((err, res) => {
                                expect(res.status).to.be.equal(204);
                                console.log("user deleted");  
                                done()                   
                            });
                    });
            });

    });
});