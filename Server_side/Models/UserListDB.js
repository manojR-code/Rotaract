const mongoose = require('mongoose');
const MemberList = mongoose.Schema({
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
        required:true
    }
});
module.exports = mongoose.model('MemberList', MemberList);
