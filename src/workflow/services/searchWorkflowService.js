import Workflow from '../../data/workflow';

export class SearchWorkflowService {
    find (filter, callback) {
        let query = Workflow.find();

        if (filter.sortBy) {
            let sortOrder = filter.sortOrder < 0 ? -1 : 1;
            let sortOptions = {};
            sortOptions[filter.sortBy] = sortOrder;

            query.sort(sortOptions);
        }

        if (filter.pageIndex >= 0 && filter.pageSize >= 0) {
            let skip = filter.pageIndex * filter.pageSize;
            let limit = filter.pageSize;

            query = query.skip(skip).limit(limit);
        }

        query.exec((err, result) => {
            if (err) {
                console.log(err);
                callback(err, null);
                return;
            }

            let searchResult = {
                TotalCount: 370,
                ItemsPage: result
            };

            callback(null, searchResult);
        });
    }

    findById (id, callback) {
        let query = Workflow.findById(id);

        query.exec((err, result) => {
            if (err) {
                console.log(err);
                callback(err, null);
                return;
            }

            callback(null, result);
        });
    }
}

let service = new SearchWorkflowService();
export default service;