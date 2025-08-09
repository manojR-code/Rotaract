const express = require('express');
const Router = express.Router();
const multer = require('multer');
const MemberList = require('../Models/UserListDB');
const EventList = require('../Models/Event');
const upload = multer({ storage: multer.memoryStorage() });
const HighPos = require('../Models/HighPos');
Router.post('/CreateUser', upload.single('image'), async (req, res) => {
    try {
        const { Name, Role, priority } = req.body;
        if (priority === "high") {
            const data = new HighPos({
                Name,
                Role,
                Imgae_Upload: req.file.buffer,
                Priority: priority
            });
            await data.save();
        } else {
            const Users = new MemberList({
                Name,
                Role,
                Imgae_Upload: req.file.buffer,
                Priority: priority
            });
            await Users.save();
        }
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
Router.post('/RemoveSelected', async (req, res) => {
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

});
Router.post('/CreateEvent', upload.single('image'), async (req, res) => {
    try {
        const { eventName, description } = req.body;
        const Events = new EventList({
            Event_image: req.file.buffer,
            Event_Name: eventName,
            Event_Description: description
        });
        await Events.save();
        return res.status(200).json({ message: 'Created Suuccessfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
Router.get('/EventsInfo', async (req, res) => {
    try {
        const Elist = await EventList.find({});
        return res.status(200).json({ message: 'Users Fteched Success', Events: Elist });
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
Router.post('/EventRemove', async (req, res) => {
    try {
        await EventList.findOneAndDelete({ _id: req.body.id });
        return res.status(200).json({ message: 'Event Removed' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
Router.post('/RemoveEvent', async (req, res) => {
    try {
        await EventList.findByIdAndDelete(req.body.id);
        return res.status(200).json({ message: 'Event Removed Successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
Router.get('/HighPos', async (req, res) => {
    try {
        const highpos = await HighPos.find({});
        return res.status(200).json({ message: 'Success', data: highpos });
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
});
module.exports = Router;