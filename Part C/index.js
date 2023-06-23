const express = require('express');
const app =express();
const path = require('path');
const BodyParser = require('body-parser');
const bodyParser = require("body-parser");
const port = 7070;
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
