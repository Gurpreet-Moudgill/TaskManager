const Task = require("../models/taskSchema");
const mongodb = require("mongodb");

const createTask = async(req, res)=>{
    const { taskNumber, timeEstimate, estimateNotes } = req.body;
    if (!/^[A-Za-z]\d{5}$/.test(taskNumber)) {
        return res.status(400).json({ error: 'Task number must be in format L#####' });
      }
    
      if (timeEstimate.toString().split('.')[1]?.length > 2 || timeEstimate.toString().split('.')[1] > 59) {
        return res.status(400).json({ error: 'Decimal part must be between 0 and 59' });
      }
    try {
        const task = { taskNumber, timeEstimate, estimateNotes, completed: false };
        const response = await Task.create(task)
        console.log(response);
        res.status(201).send({message: "Task creation successfull",data: response});
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
}

const getTask = async(req, res)=>{
    try {
        const tasks = await Task.find();
        res.status(200).json({message: "Tasks fetched successfuly",});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
const updateTask = async(req, res) =>{
  const { id } = req.params;
  const updateFields = {};

  if (req.body.timeEstimate !== undefined) {
    const timeEstimate = req.body.timeEstimate;
    if (timeEstimate.toString().split('.')[1]?.length > 2 || timeEstimate.toString().split('.')[1] > 59) {
      return res.status(400).json({ error: 'Decimal part must be between 0 and 59' });
    }
    updateFields.timeEstimate = timeEstimate;
  }

  if (req.body.estimateNotes !== undefined) {
    updateFields.estimateNotes = req.body.estimateNotes;
  }

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id },
      { $set: updateFields },
      { returnOriginal: false }
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({message: "Taks updated successfully", data: task});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const completeTask = async(req, res) => {
  const { id } = req.params;
  const updateFields = {};

  if (req.body.actualHours !== undefined) {
    const actualHours = req.body.actualHours;
    if (actualHours.toString().split('.')[1]?.length > 2 || actualHours.toString().split('.')[1] > 59) {
      return res.status(400).json({ error: 'Decimal part must be between 0 and 59' });
    }
    updateFields.actualHours = actualHours;
  }

  if (req.body.finalNotes !== undefined) {
    updateFields.finalNotes = req.body.finalNotes;
  }

  updateFields.completed = true;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id },
      { $set: updateFields },
      { returnOriginal: false }
    );
    console.log(task);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = {createTask, getTask, updateTask, completeTask}