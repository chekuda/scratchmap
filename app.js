const express = require('express');

const server = express();

const port = process.env.port || 3000;

server.get('/', (req, res, err) => {
	res.send('SCRATMATCH');
});

server.listen(port, (err) => {
	if(err){
		console.log(`Error thrown ${err}`);
	}
    console.log(`Listening on port ${port}`);
});