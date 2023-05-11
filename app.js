const express = require("express");
const { ValidationError } = require("yup");
const TaskController = require("./controllers/task.controller")

const app = express();
app.use(express.json());


app.get('/tasks', TaskController.findAllTasks)
app.get('/tasks/:idTask', TaskController.findTask)
app.delete('/tasks/:idTask', TaskController.deleteTask)
app.put('/tasks/:idTask', TaskController.updateTask)
app.post('/tasks', TaskController.createTask)


app.use( (err, req, res, next) =>{
    if(err instanceof ValidationError){
        err.statusCode = 400
    }
    const status = err.statusCode || 500
    const message = err.message || "Server error"
    res.status(status).send(message)
})

module.exports = app;

