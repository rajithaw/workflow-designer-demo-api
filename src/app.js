import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import WorkflowRouter from './workflow/workflowRouter';

// Creates and configures an ExpressJS web server.
class App {

    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.dbConnect();
    }

    // Configure Express middleware.
    middleware() {
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static('public'));
    }

    // Configure API endpoints.
    routes() {
        /* This is just to get up and running, and to make sure what we've got is
        * working so far. This function will change when we start to add more
        * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res) => {
            res.json([{
                name: 'List workflows',
                method: 'GET',
                url: '/api/v1/workflows?name=&createdAfter=&createdBefore=&pageIndex=&pageSize='
            },
            {
                name: 'Get workflow by id',
                method: 'GET',
                url: '/api/v1/workflows/workflow/{id}'
            },
            {
                name: 'Create workflow',
                method: 'POST',
                url: '/api/v1/workflows/workflow',
                body: '{ name: "workflow name", workflow: "wrokflow json" }'
            },
            {
                name: 'Update workflow',
                method: 'PUT',
                url: '/api/v1/workflows/workflow/{id}',
                body: '{ name: "workflow name", workflow: "wrokflow json" }'
            },
            {
                name: 'Delete workflow',
                method: 'DELETE',
                url: '/api/v1/workflows/workflow/{id}'
            }]);
        });
        this.express.use('/', router);
        this.express.use('/api/v1/workflows', WorkflowRouter);
    }

    dbConnect() {
        let uri = 'mongodb://sa:sa@ds157475.mlab.com:57475/workflow-designer';

        mongoose.connect(uri, {
            useMongoClient: true
        }, (err) => {
            if (err) {
                console.log(err.message);
                console.log(err);
            } else {
                console.log('Connected to MongoDb');
            }
        });
    }
}

export default new App().express;