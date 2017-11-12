import mongoose from 'mongoose';
import { Schema } from 'mongoose';

let workflowSchema = new Schema({
    ItineraryId: String,
    AirlineName: String,
    AirlineLogoAddress: String,
    InboundFlightsDuration: Number,
    OutboundFlightsDuration: Number,
    Stops: Number,
    TotalAmount: Number
});

export default mongoose.model('Workflow', workflowSchema, 'workflow');