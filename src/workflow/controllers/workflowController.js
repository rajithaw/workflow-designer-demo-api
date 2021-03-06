import SearchWorkflowService from '../services/searchWorkflowService';
import ManageWorkflowService from '../services/manageWorkflowService';

export class WorkflowController {
    find(query, callback)  {
        SearchWorkflowService.find(query, callback);
    }

    findById(id, callback)  {
        SearchWorkflowService.findById(id, callback);
    }

    save(workflow, callback) {
        ManageWorkflowService.save(workflow, callback);
    }

    delete(id, callback) {
        ManageWorkflowService.delete(id, callback);
    }
}

let ctrl = new WorkflowController();
export default ctrl;