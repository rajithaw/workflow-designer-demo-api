import Workflow from '../../data/workflow';

export class SearchWorkflowService {
    find (filter, callback) {
        let itemsQuery = Workflow.find({
            name: { $regex : '^' + filter.name },
            createdDate: { '$gte': new Date(filter.createdAfter), '$lt': new Date(filter.createdBefore) }
        });

        if (filter.sortBy) {
            let sortOrder = filter.sortOrder < 0 ? -1 : 1;
            let sortOptions = {};
            sortOptions[filter.sortBy] = sortOrder;

            itemsQuery = itemsQuery.sort(sortOptions);
        }

        if (filter.pageIndex >= 0 && filter.pageSize >= 0) {
            let skip = filter.pageIndex * filter.pageSize;
            let limit = filter.pageSize;

            itemsQuery = itemsQuery.skip(skip).limit(limit);
        }

        let countQuery = Workflow.find().count();
        
        Promise.all([countQuery.exec(), itemsQuery.exec()]).then((results) => {
            let searchResult = {
                TotalCount: results[0],
                ItemsPage: results[1]
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