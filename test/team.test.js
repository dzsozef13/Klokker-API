const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const faker = require('faker');

chai.use(chaiHttp);

describe('team tests', () => {

    var userId;
    var token;

    it('create & auth user for team testing', (done) => {

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

    it('create & find & delete team for team testing', (done) => {

        let team = {
            name: faker.name.findName(),
            _ownerId: userId
        }

        chai.request(app)
        .post('/team')
        .auth(token, { type: 'bearer' })
        .send(team)
        .end((err, res) => {
            chai.expect(res.status).to.be.equal(201);
            chai.expect(res.body).to.be.a('object');

            let teamId = res.body._id;

            chai.request(app)
            .get('/team/' + teamId)
            .auth(token, { type: 'bearer' })
            .send()
            .end((err, res) => {
                chai.expect(res.status).to.be.equal(200);
                chai.expect(res.body).to.be.a('object');

                chai.request(app)
                .delete('/team/' + teamId)
                .auth(token, { type: 'bearer' })
                .send()
                .end((err, res) => {
                    chai.expect(res.status).to.be.equal(204);
                    done()
                });
            });
        });
    });

    it('delete user for team testing', (done) => {
        chai.request(app)
        .delete('/user/' + userId)
        .auth(token, { type: 'bearer' })
        .send()
        .end((err, res) => {
            chai.expect(res.status).to.be.equal(204);
            done()
        });
    });

});