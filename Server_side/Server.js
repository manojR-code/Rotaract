require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const MemberList = require('./Routes/User_Create');
const DB = require('./Config/DataBaseConnection');
const Mail = require('./Routes/Mailer');
app.use(cors({
  origin: true,
  methods: ['GET', 'POST']
}));
app.use(express.json());
app.use('/api/user', MemberList);
app.use('/api/Mails',Mail);
app.listen(3000, (err,res) => {
    if (err) {
        return;
    }
    console.log('Server is running on port 3000');
})