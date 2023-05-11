const mongoose = require('mongoose')
const { Schema } = mongoose;

const taskSchema = new Schema({
    content: { 
        type: String , 
        required: true ,
        validate: {
            validator: (v) => { return /[A-Za-z0-9]/.test(v); },
            message: props => `${props.value} is not a valid content!`
        }
    },
    isDone: { type: Boolean, default: false },
    dateAt: { type: Date, default: Date.now() },
    author: {
        name: { type: String , required: true },
        age: { type: Number , min: 14 ,max: 120 }
    }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;