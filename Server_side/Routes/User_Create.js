const express = require('express');
const Router = express.Router();
const multer = require('multer');
const MemberList = require('../Models/UserListDB');
const upload = multer({ storage: multer.memoryStorage() });
Router.post('/CreateUser', upload.single('image'), async (req, res) => {
    try {
        const { Name, Role } = req.body;
        const Users = new MemberList({
            Name,
            Role,
            Imgae_Upload: req.file.buffer
        })
        await Users.save();
        return res.status(200).json({ message: 'Created Suuccessfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
Router.get('/Members', async (req, res) => {
    try {
        const users = await MemberList.find({});
        return res.status(200).json({ message: 'Users Fteched Success', Users: users });
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
Router.post('/RemoveMember', async (req, res) => {
    try {
        await MemberList.findOneAndDelete({ _id: req.body.id });
        return res.status(200).json({ message: 'User Removed' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
Router.post('/RemoveSelected',async (req, res) => {
    try {
        await Promise.all(
            req.body.selected.map((id) =>
                MemberList.findOneAndDelete({ _id: id })
            )
        );
        return res.status(200).json({ message: 'User Removed' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }

})
module.exports = Router;