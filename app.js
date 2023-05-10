const express = require("express");

const app = express();

app.use(express.json());


app.get('/', ()=>{})
app.post('/', ()=>{})


module.exports = app;

