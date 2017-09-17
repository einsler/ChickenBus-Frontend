const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());//body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('dist'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

// set port and start app on 8080======================
const port = process.env.PORT || 8080;
app.listen(port);

console.log('Listening to port: ' + port);
