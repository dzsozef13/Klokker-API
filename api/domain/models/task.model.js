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

        _assigneeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        _projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            require: true,
        }
    }
);

taskSchema.statics.isAssigned = async function (taskId, userId) {
    const task = await this.findOne({ _id: taskId, _assigneeId: userId });
    return !!task;
}

module.exports = mongoose.model("Task", taskSchema);