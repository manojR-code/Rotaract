const mongoose = require('mongoose');
const EventList = mongoose.Schema({
    Event_image: {
        type: 'Buffer',
        required: false
    },
    Event_Name: {
        type: 'String',
        required: false
    },
    Event_Description: {
        type: 'String',
        required: false
    },
    SingleImage: {
        type: 'Buffer',
        required: false
    }
});
module.exports = mongoose.model('EventList', EventList);