const mongoose = require('mongoose');
const SingleImage = mongoose.Schema({
    SingleImage: {
        type: 'Buffer',
        required: false
    }
});
module.exports = mongoose.model('SingleImage', SingleImage);