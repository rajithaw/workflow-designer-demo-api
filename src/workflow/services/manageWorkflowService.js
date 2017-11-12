import Workflow from '../../data/workflow';

export class ManageWorkflowService {
    save (workflow, callback) {
        if(workflow.id) {
            Workflow.create(workflow, callback);
        } else {
            Workflow.update({id: workflow.id}, workflow, callback);
        }
    }

    delete (id, callback) {
        Workflow.remove({id: id}, callback);
    }
}

let service = new ManageWorkflowService();
export default service;