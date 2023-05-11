const Comment = require('./../models/Coment');
const Task = require('./../models/Task');

//add comment
module.exports.addComment = async (req, res, next) => {
    try {
        const {params: {idTask}, body} = req;
        const comment = await Comment.create({...body, task: idTask});
        const taskComments = await Task.findById(idTask);
        await Task.findByIdAndUpdate(idTask, {comments: [...taskComments.comments,comment._id]})
        res.status(201).send({data: comment})
    } catch (error) {
        next(error)
    }
}
//get all commets
module.exports.getAllComments = async (req, res , next) => {
    try {
        const comments = await Comment.find().populate('task')
        res.status(200).send({data: comments})
    } catch (error) {
        next(error)
    }
}
// delete comment
module.exports.deleteComment = async (req, res , next) => {
    try {
        const {params: {idComment}} = req
        const comment = await Comment.findByIdAndRemove(idComment)
        res.status(200).send({data: comment})
    } catch (error) {
        next(error)
    }
}

// update comment
module.exports.updateComment = async (req, res , next) => {
    try {
        const {params: {idComment},body} = req
        const comment = await Comment.findByIdAndUpdate(idComment,{bodyComment:body.bodyComment})
        res.status(200).send({data: comment})
    } catch (error) {
        next(error)
    }
}