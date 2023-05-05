const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
const faker = require('faker');

chai.use(chaiHttp);

describe('Auth tests', () => {
    it('Register + Login + Delete', (done) => {

        // Login
        let loginBody =  {
            email: 'test@klokker.com',
            password: '12345678'
        }
        chai.request(app)
            .post('/auth/login')
            .send(loginBody)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.token).to.exist;                

                let userId = res.body.user._id
                let token = res.body.token
                // Delete
                chai.request(app)
                    .delete('/user/' + userId)
                    .set({ "Authorization": `Bearer ${token}` })
                    .send()
                    .end((err, res) => {
                        expect(res.status).to.be.equal(204);
                        done()                   
                    });
            });
    });
});