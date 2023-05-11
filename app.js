const express = require("express");
const { ValidationError } = require("yup");
const TaskController = require("./controllers/task.controller")
const CommentController = require('./controllers/comment.controller')

const app = express();
app.use(express.json());

//get
app.get('/tasks', TaskController.findAllTasks)
app.get('/tasks/:idTask', TaskController.findTask)
app.get('/comments', CommentController.getAllComments)

//delete
app.delete('/tasks/:idTask', TaskController.deleteTask)
app.delete('/comments/:idComment', CommentController.deleteComment)

//put
app.put('/tasks/:idTask', TaskController.updateTask)
app.put('/comments/:idComment', CommentController.updateComment)

//post
app.post('/tasks', TaskController.createTask)
app.post('/tasks/:idTask/comments', CommentController.addComment)


app.use( (err, req, res, next) =>{
    if(err instanceof ValidationError){
        err.statusCode = 400
    }
    const status = err.statusCode || 500
    const message = err.message || "Server error"
    res.status(status).send(message)
})

module.exports = app;

