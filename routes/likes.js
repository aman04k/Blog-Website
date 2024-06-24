const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const like = require('../models/like')
const verifyToken = require('../verifyToken')


router.post('/likes', async (req, res) => {
    try {
        const newLike = new Like(req.body);
        await newLike.save();
        res.status(201).send(newLike);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all likes or filter by user/item
router.get('/likes', async (req, res) => {
    try {
        const likes = await Like.find(req.query);
        res.status(200).send(likes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a like
router.delete('/likes/:id', async (req, res) => {
    try {
        const like = await Like.findByIdAndDelete(req.params.id);
        if (!like) {
            return res.status(404).send();
        }
        res.status(200).send(like);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a like (if necessary)
router.put('/likes/:id', async (req, res) => {
    try {
        const like = await Like.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!like) {
            return res.status(404).send();
        }
        res.status(200).send(like);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
