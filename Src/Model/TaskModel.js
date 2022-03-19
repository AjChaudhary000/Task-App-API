const mongoose = require('mongoose');
const TaskSchema = mongoose.Schema({
    desc: {
        type: String,
        trim: true,
        required: true,
    },
    completed: {
        type: Boolean,
        default: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true })
const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;