const express = require('express');
const Message = require('../dao/models/message.model');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('chat');
});

router.post('/', async (req, res) => {
    const { user, message } = req.body;
    await Message.create({ user, message });
    res.status(201).send("Mensagem enviada");
});

module.exports = router;