const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();

//proxy api requests to backend server
app.use("/api", proxy({target: "http://backend-einsler.cloudapps.unc.edu", changeOrigin: true}));

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
