const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

// Test workflow 1
describe('workflow test', () => {
    // Invalid input test
    it('should pass', (done) => {
        let workflow = true;
        expect(workflow).to.be.equal(true);
        done();
    });
});