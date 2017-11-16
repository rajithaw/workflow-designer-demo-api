
import chai from 'chai';
import sinon from 'sinon';

import workflowController from '../src/workflow/controllers/workflowController';
import searchWorkflowService from '../src/workflow/services/searchWorkflowService';
import manageWorkflowService from '../src/workflow/services/manageWorkflowService';

const expect = chai.expect;

describe('workflowController', () => {

    describe('find', () => {
        it('should call service', () => {
            let query = { name: 'workflow name' };
            let callback = sinon.spy();

            let findSpy = sinon.stub(searchWorkflowService, 'find');

            workflowController.find(query, callback);

            expect(findSpy.calledWith(query, callback)).to.equal(true);
        });
    });

    describe('findById', () => {
        it('should call service', () => {
            let id = 123;
            let callback = sinon.spy();

            let findByIdSpy = sinon.stub(searchWorkflowService, 'findById');

            workflowController.findById(id, callback);

            expect(findByIdSpy.calledWith(id, callback)).to.equal(true);
        });
    });

    describe('save', () => {
        it('should call service', () => {
            let workflow = { id: 123, name: 'workflow name' };
            let callback = sinon.spy();

            let saveSpy = sinon.stub(manageWorkflowService, 'save');

            workflowController.save(workflow, callback);

            expect(saveSpy.calledWith(workflow, callback)).to.equal(true);
        });
    });

    describe('delete', () => {
        it('should call service', () => {
            let id = 123;
            let callback = sinon.spy();

            let deleteSpy = sinon.stub(manageWorkflowService, 'delete');

            workflowController.delete(id, callback);

            expect(deleteSpy.calledWith(id, callback)).to.equal(true);
        });
    });
});