const createHTTPError = require("http-errors")
const Task = require("./../models/Task")

//create task
module.exports.createTask = async (req, res, next ) => {
    try {
        const {body} = req;
        const task = await Task.create(body);
        if(!task){
            return next(createHTTPError(400,"Bad request"))
        }
        res.status(201).send({ data:task })
    } catch (error) {
        next(error)
    }
}

//get all tasks
module.exports.findAllTasks = async  ( req, res, next ) =>{
    try {
        const task = await Task.find({})
        if(task.length === 0){
            return next(createHTTPError(404,"Tasks not found"))
        }
        res.status(200).send({data:task})
    } catch (error) {
        next(error)
    }
}

//get onne task
module.exports.findTask = async  ( req, res, next ) =>{
    try {
        const {params:{idTask}} = req
        const task = await Task.findById(idTask)
        if(!task){
            return next(createHTTPError(404,"Task not found"))
        }
        res.status(200).send({data:task})
    } catch (error) {
        next(error)
    }
}

//delete task
module.exports.deleteTask = async  ( req, res, next ) =>{
    try {
        const {params:{idTask}} = req;
        const task = await Task.findByIdAndRemove(idTask)
        if(!task){
            return next(createHTTPError(404 , "Task not found"))
        }
        res.status(200).send({data:task})
    } catch (error) {
        next(error)
    }
}
//update task
module.exports.updateTask = async  ( req, res, next ) =>{
    try {
        const {params:{idTask}} = req
        const {content} = req.body
        const task = await Task.findOneAndUpdate({_id:idTask},{content:content},{new:true})
        if(!task){
            return next(createHTTPError(404 , "Task not found"))
        }
        res.status(200).send({data:task})
    } catch (error) {
        next(error)
    }
}