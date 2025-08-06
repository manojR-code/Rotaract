const mongoose = require('mongoose');
console.log(process.env.MONOGOOSE_CONNECTION);
mongoose.connect(process.env.MONOGOOSE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connection Established');
}).catch((err) => {
    console.log('Error Accured', err);
});
module.exports = mongoose;
