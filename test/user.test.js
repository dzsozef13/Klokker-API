const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

describe('User tests', () => {

    it('Register + Find + Delete', (done) => {

        // Register
        let user = {
            email: "zxc@petersen.com",
            password: "12345678",
            name: "Peter Petersen",
            role: "user"
        }
        console.log("user test started");
        chai.request(app)
            .post('/user')
            .send(user)
            .end((err, res) => {
                console.log(res);
                expect(res.status).to.be.equal(200);   
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.equal(null);
                console.log("user created");
               
                // Find
                let userId = "644b1e70c16d697ed6b97f03"
                chai.request(app)
                    .get('/user/' + userId)
                    .send()
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body.error).to.be.equal(null);
                        console.log("user found");                      
                        
                        // Delete
                        chai.request(app)
                            .delete('/user/' + userId)
                            .send()
                            .end((err, res) => {
                                expect(res.status).to.be.equal(203);
                                console.log("user deleted");  
                                done()                   
                            });
                    });
            });

    });
});