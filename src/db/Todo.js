const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    id: {
        type: Int16Array,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    todos: {
        type: Array,
        required: false,
    }
})

mongoose.model('Todo', todoSchema)