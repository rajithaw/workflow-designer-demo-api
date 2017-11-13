import chai from 'chai';
import sinon from 'sinon';
import 'sinon-mongoose';

import SearchWorkflowService from '../src/workflow/services/searchWorkflowService';
import Workflow from '../src/data/workflow';

const expect = chai.expect;

describe('searchWorkflowService', () => {

    describe('find', () => {
        it('should find workflows by the provided filter criteria', () => {
            let filter = {
                name: 'name 1',
                createdAfter: '',
                createdBefore: '',
                sortBy: 'name',
                sortOrder: 1,
                pageIndex: 0,
                pageSize: 50
            };
            let itemsPage = [{id: 1, name: 'name 1'},{id: 2, name: 'name 2'}];
            let totalCount = 20;

            let workflowMock = sinon.mock(Workflow);

            workflowMock.expects('find')
                .chain('sort')
                .chain('skip')
                .chain('limit')
                .chain('exec')
                .resolves(itemsPage);

            workflowMock.expects('find')
                .chain('count')
                .chain('exec')
                .resolves(totalCount);

            SearchWorkflowService.find(filter, (err, result) => {
                workflowMock.verify();
                workflowMock.restore();

                expect(result.TotalCount).to.equal(totalCount);
                expect(result.ItemsPage).to.equal(itemsPage);
            });
        });
    });

    describe('findById', () => {
        it('should find workflow by id', () => {
            let id = 123;
            let workflow = {
                id: id,
                name: 'workflow name'
            };

            let workflowMock = sinon.mock(Workflow)
                .expects('findById')
                .withArgs(id)
                .chain('exec')
                .yields(null, workflow);

            SearchWorkflowService.findById(id, (err, result) => {
                workflowMock.verify();
                workflowMock.restore();
                expect(result).to.equal(workflow);
            });
        });
    });
});