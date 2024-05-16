import React from 'react';
import { Button } from 'react-bootstrap';

const TaskItem = ({ task, onComplete }) => {
  return (
    <tr>
      <td>{task.taskNumber}</td>
      <td>{task.timeEstimate}</td>
      <td>{task.estimateNotes}</td>
      <td>
        <Button variant="primary" onClick={() => onComplete(task)} disabled={task.completed}>
          Complete Task
        </Button>
      </td>
    </tr>
  );
};

export default TaskItem;
