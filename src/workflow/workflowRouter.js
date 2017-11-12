import { Router } from 'express';

import WorkflowController from './controllers/workflowController';

export class WorkflowRouter {
    /**
     * Initialize the Router
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * Find workflows matching the given criteria.
     */
    find(req, res) {
        WorkflowController.find({
            name: req.query.name,
            createdAfter: req.query.createdAfter,
            createdBefpre: req.query.createdBefore,
            pageIndex: +req.query.pageIndex,
            pageSize: +req.query.pageSize,
            sortBy: req.query.sortBy,
            sortOrder: +req.query.sortOrder
        }, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            res.send(result);
        });
    }

    get(req, res) {
        WorkflowController.findById(req.params.id, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            res.send(result);
        });
    }

    create(req, res) {
        req.body.id = null;
        WorkflowController.save(req.body, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            res.send(result);
        });
    }

    update(req, res) {
        req.body.id = req.parms.id;
        WorkflowController.save(req.body, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            res.send(result);
        });
    }

    delete(req, res) {
        WorkflowController.delete(req.query.id ,(err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            res.send(result);
        });
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.find);
        this.router.get('/workflow/:id', this.get);
        this.router.post('/workflow', this.create);
        this.router.put('/workflow/:id', this.update);
        this.router.delete('/workflow/:id', this.delete);
    }

}

// Create the Router, and export its configured Express.Router
export default new WorkflowRouter().router;