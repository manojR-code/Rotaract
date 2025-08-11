const express = require('express');
const Router = express.Router();
const Mail = require('nodemailer');
const TransPort = Mail.createTransport({
    service: 'gmail',
    auth: {
       user:process.env.EMAIL,
       pass:process.env.PASSEMAIL
   }
});

Router.post('/Mail', (req, res) => {
    const { from, to, subject, text, no } = req.body;
    const SendMail = TransPort.sendMail({
    from:`${from}`,
    to:process.env.EMAIL,
    subject:`${subject}`,
    text:`${text} You Can Call Me on +91${no}`
    });
    SendMail.then(() => {
        res.status(200).json({ message: 'Email sent successfully' });
    }).catch((error) => {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    });
});
Router.post('/Contact', (req, res) => {
    const { fullName,email,enquiry } = req.body;
    const SendMail = TransPort.sendMail({
    from:`${email}`,
    to:process.env.EMAIL,
    subject:`Contact Enquiry from ${fullName}`,
    text:`${enquiry} You Can Call Me on +91${no}`
    });
    SendMail.then(() => {
        res.status(200).json({ message: 'Email sent successfully' });
    }).catch((error) => {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    });
});
module.exports = Router;