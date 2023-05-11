const http = require("http");
const app = require("./app");
const mongoose = require('mongoose')



mongoose.connect('mongodb://127.0.0.1:27017/fd_mongoose')
    .catch((error) => console.log(error));

const server = http.createServer(app);

const port = process.env.PORT || 3000 ;

server.listen(port, ()=>{
    console.log("Server started on port ===> " + port);
})