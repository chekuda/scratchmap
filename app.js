require('dotenv').config({silent: true});

const express = require('express');
const bodyParser = require('body-parser');
const documentDbClient = require('./documentdbClient.js');

const server = express();

const port = process.env.port || 3000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static('public'));

server.get('/', (req, res) => {
	res.sendFile('index.html');
});
server.post('/login', (req,res,next) => {
    if(req.body.name === 'scratch' && req.body.password === '000000'){
        console.log(req.body);
        res.send(JSON.stringify({success: true,data: req.body}));
    } else {
        res.send(JSON.stringify({success: false}))
    }

})

server.listen(port, (err) => {
	if(err){
		console.log(`Error thrown ${err}`);
	}
    console.log(`Listening on port ${port}`);
    documentDbClient.test();
});