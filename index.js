const { log } = require('console');
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors())

const post = {};

app.get('/posts', (req, res) => {
    res.send(post);
});

app.post('/posts/create', async(req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    
    post[id] = {
        id, title
    };

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'POST',
        data: {
            id, title
        }
    });

    res.status(201).send(post[id])
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.send({});
});

app.listen(4000, () => {
    log('v55')
    log('Listening on port: 4000')
});