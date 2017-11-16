import Workflow from '../../data/workflow';

export class SearchWorkflowService {
    find (query, callback) {
        let itemsQuery = Workflow.find({
            name: { $regex : '^' + query.name },
            createdDate: { '$gte': new Date(query.createdAfter), '$lt': new Date(query.createdBefore) }
        });

        if (query.sortBy) {
            let sortOrder = query.sortOrder < 0 ? -1 : 1;
            let sortOptions = {};
            sortOptions[query.sortBy] = sortOrder;

            itemsQuery = itemsQuery.sort(sortOptions);
        }

        if (query.pageIndex >= 0 && query.pageSize >= 0) {
            let skip = query.pageIndex * query.pageSize;
            let limit = query.pageSize;

            itemsQuery = itemsQuery.skip(skip).limit(limit);
        }

        let countQuery = Workflow.find().count();
        
        Promise.all([countQuery.exec(), itemsQuery.exec()]).then((results) => {
            let searchResult = {
                TotalCount: results[0],
                Workflows: results[1]
            };

            callback(null, searchResult);
        }, (error) => {
            console.log(error);
            callback(error, null);
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