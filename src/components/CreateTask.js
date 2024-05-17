import axios from 'axios';
import React, { useState } from 'react';
// import './TaskModal.css';

const CreateTaskModal = ({ show, handleClose, onTaskCreated }) => {
  const [taskNumber, setTaskNumber] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [estimateNotes, setEstimateNotes] = useState('');

  if (!show) {
    return null;
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks',{ taskNumber, timeEstimate, estimateNotes });
      onTaskCreated(response.data.data);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Create Task</h5>
          <button type="button" className="close" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label>Task Number</label>
              <input
                type="text"
                className="form-control"
                value={taskNumber}
                onChange={(e) => setTaskNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Time Estimate</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="23.59"
                className="form-control"
                value={timeEstimate}
                onChange={(e) => setTimeEstimate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Estimate Notes</label>
              <textarea
                className="form-control"
                rows="3"
                value={estimateNotes}
                onChange={(e) => setEstimateNotes(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;