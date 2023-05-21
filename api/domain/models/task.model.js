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
        state: { 
            type: String,
            require: true,
            default: 'todo'
        },

        _assigneeId: {
            type: String,
        },
        _projectId: {
            type: String,
        }
    }
);

taskSchema.statics.isAssigned = async function (taskId, userId) {
    const task = await this.findOne({ _id: taskId, _assigneeId: userId });
    return !!task;
}

module.exports = mongoose.model("Task", taskSchema);