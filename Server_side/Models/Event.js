const mongoose = require('mongoose');
const EventList = mongoose.Schema({
    Event_image: {
        type: 'Buffer',
        required: true
    },
    Event_Name: {
        type: 'String',
        required: true
    },
    Event_Description: {
        type: 'String',
        required: true
    }
});
module.exports = mongoose.model('EventList', EventList);