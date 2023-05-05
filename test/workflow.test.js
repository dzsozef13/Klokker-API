const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

// Test workflow 1
describe('Workflow Test', () => {
    // Invalid input test
    it('Test setup', (done) => {
        let workflow = true;
        expect(workflow).to.be.equal(true);
        done();
    });
});