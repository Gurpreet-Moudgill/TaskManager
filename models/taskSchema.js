const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskNumber: {
    type: String,
    unique: true,
    required: [true, 'Task number is required'],
    match: [/^[A-Za-z]\d{5}$/, 'Task number must be in format L#####']
  },
  timeEstimate: {
    type: Number,
    required: [true, 'Time estimate is required'],
    min: 0,
    max: 23.59,
    validate: {
      validator: function (v) {
        return v.toString().split('.')[1]?.length <= 2 && v.toString().split('.')[1] <= 59;
      },
      message: 'Decimal part must be between 0 and 59'
    }
  },
  estimateNotes: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  actualHours: {
    type: Number,
    min: 0,
    max: 23.59,
    validate: {
      validator: function (v) {
        return v.toString().split('.')[1]?.length <= 2 && v.toString().split('.')[1] <= 59;
      },
      message: 'Decimal part must be between 0 and 59'
    }
  },
  finalNotes: {
    type: String,
  },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
