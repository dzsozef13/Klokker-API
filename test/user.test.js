const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
const config = require('../api/config/config');
const faker = require('faker');

chai.use(chaiHttp);

describe('user tests', () => {

    var token;
    var userId;
    var teamId;

    it('should create & auth user for user testing', (done) => {

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

    it('should create team for user testing', (done) => {

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

            teamId = res.body._id;

            done()
        });
    });

    it('should find user for user testing', (done) => {
        chai.request(app)
        .get('/user/' + userId)
        .auth(token, { type: 'bearer' })
        .send()
        .end((err, res) => {
            chai.expect(res.status).to.be.equal(200);
            done()
        });
    });

    it('should assign user with team for user testing', (done) => {

        assignBody = {
            userId: userId,
            teamId: teamId
        }

        chai.request(app)
        .post('/user/team')
        .auth(token, { type: 'bearer' })
        .send(assignBody)
        .end((err, res) => {
            chai.expect(res.status).to.be.equal(200);
            done()
        });
    });

    it('should delete team for user testing', (done) => {
        chai.request(app)
        .delete('/team/' + teamId)
        .auth(token, { type: 'bearer' })
        .send()
        .end((err, res) => {
            chai.expect(res.status).to.be.equal(204);
            done()
        });
    });

    it('should delete user for user testing', (done) => {
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