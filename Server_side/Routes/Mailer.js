const express = require('express');
const Router = express.Router();
const Mail = require('nodemailer');
const TransPort=Mail.createTransport({
    auth: {
       user:'',
       pass:''
   }
});

Router.post('/Mail', (req, res) => {
    const SendMail = TransPort.sendMail({
    from:"",
    to:"",
    subject:"",
    text:""
});
});
module.exports = Router;