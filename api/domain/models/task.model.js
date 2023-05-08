const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let taskSchema = new Schema(
    {
        title: { type: String, require: true },
        description: { type: String },

        allocMinutes: { type: Number },
        usedMinutes: { type: Number },
        dueDate: { type: Date, require: false },

        billable: { 
            type: Boolean,
            require: true,
            default: true
        },
        completed: { 
            type: Boolean,
            require: true,
            default: false
        },

        assigneeIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            require: true,
        }
    }
);

module.exports = mongoose.model("Task", taskSchema);