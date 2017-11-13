import chai from 'chai';
import sinon from 'sinon';
import 'sinon-mongoose';

import ManageWorkflowService from '../src/workflow/services/manageWorkflowService';
import Workflow from '../src/data/workflow';

const expect = chai.expect;

describe('manageWorkflowService', () => {

    describe('save', () => {
        it('should create workflow if id is not present', () => {
            let workflow = {
                name: 'name 1'
            };

            let workflowMock = sinon.mock(Workflow)
                .expects('create')
                .withArgs(workflow)
                .yields(null, workflow);

            ManageWorkflowService.save(workflow, (err, result) => {
                workflowMock.verify();
                workflowMock.restore();
                expect(result).to.equal(workflow);
            });
        });

        it('should update workflow if id is present', () => {
            let workflow = {
                id: 123,
                name: 'name 1'
            };

            let workflowMock = sinon.mock(Workflow)
                .expects('update')
                .withArgs({id: workflow.id}, workflow)
                .yields(null, workflow);

            ManageWorkflowService.save(workflow, (err, result) => {
                workflowMock.verify();
                workflowMock.restore();
                expect(result).to.equal(workflow);
            });
        });
    });

    describe('delete', () => {
        it('should delete the workflow with the provided id', () => {
            let id = 123;
            let result = true;

            let workflowMock = sinon.mock(Workflow)
                .expects('remove')
                .withArgs({id})
                .yields(null, result);

            ManageWorkflowService.delete(id, (err, result) => {
                workflowMock.verify();
                workflowMock.restore();
                expect(result).to.equal(result);
            });
        });
    });
});