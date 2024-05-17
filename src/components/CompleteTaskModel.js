import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
// import './CompleteTaskModal.css'; // Import custom CSS for the modal

const CompleteTaskModal = ({ show, handleClose, task, onTaskCompleted }) => {
  const [actualHours, setActualHours] = useState('');
  const [finalNotes, setFinalNotes] = useState('');

  if (!show) {
    return null;
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/tasks/${task._id}/complete`, {
        actualHours, finalNotes 
      });
      console.log(response);
      onTaskCompleted(response.data);
      toast.success('Successfully completed!');
    } catch (error) {
      console.error('Error completing task:', error);
      toast.error(error?.response?.data?.error)
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Complete Task</h5>
          <button type="button" className="close" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label>Actual Hours</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="form-control"
                value={actualHours}
                onChange={(e) => setActualHours(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Final Notes</label>
              <textarea
                className="form-control"
                rows="3"
                value={finalNotes}
                onChange={(e) => setFinalNotes(e.target.value)}
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

export default CompleteTaskModal;
