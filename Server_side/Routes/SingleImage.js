const express = require('express');
const Router = express.Router();
Router.use(express.json());
const multer = require('multer');
const Pomplates = require('../Models/Pomplates'); 
const upload = multer({ storage: multer.memoryStorage() });
Router.post('/SingleImage', upload.single('SingleImage'), async (req, res) => { 
    try {
        await new Pomplates.create({
        SingleImage: req.file.buffer
    });
    res.status(200).json({ message: 'Single Image Uploaded Successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to upload single image', error: error.message });
    }
    
})
Router.get('/SingleImage', async (req, res) => { 
    try {
        const singleImage = await Pomplates.findOne({});
        if (!singleImage) {
            return res.status(404).json({ message: 'No single image found' });
        }
        res.status(200).json({ SingleImage: singleImage.SingleImage });
    } catch (error) {
        console.error('Error fetching single image:', error);
        res.status(500).json({ message: 'Failed to fetch single image', error: error.message });
    }
})
module.exports = Router;