var express = require("express");
var app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
var http = require("http").createServer(app);
const path = require('path');

//const notification=require('./notification/index');
app.use(cors(corsOptions));
var corsOptions = {
    origin: "*",
    corsOptions: 200
};
const socket = require('./socket/socket')(http, {
    cors: {
        origin: ['*']
    }
})

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept",
        "Access-Control-Allow-Methods →GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
        "image/jpeg"
    );
    next();
});
global.__basedir = __dirname;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "./public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express());
require('./routes/index')(app);
const db = require("./models");
//query genarator
db.sequelize.sync();


app.use('/public', express.static('public'));
app.get("/", function (req, res) {
    res.send('sqc' + "  " +new Date());
});
//server port
const PORT = process.env.PORT || 4000;
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
//call socket  port

