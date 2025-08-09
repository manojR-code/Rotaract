const mongoose = require('mongoose');
const HighPos = mongoose.Schema({
    Name: {
        type: 'String',
        required: true
    },
    Role: {
        type: 'String',
        required: true
    },
    Imgae_Upload: {
        type: 'Buffer',
        required: true
    },
    Priority: {
        type: 'String',
        require
    }
});
module.exports = mongoose.model('HighPos', HighPos);