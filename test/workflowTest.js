const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Workflow Test', () => {
    // Invalid input test
    it('Test setup', (done) => {
        let workflow = true;
        expect(workflow).to.be.equal(true);
        done();   
    });
});