import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import TaskItem from './TaskItem';
import CompleteTaskModal from './CompleteTaskModel';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      const response = await axios.get("http://localhost:5000/api/tasks");
      console.log(response.data.data);
      setTasks(response.data.data);
    };
    loadTasks();
  }, []);

  const handleCompleteTask = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleTaskCompleted = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    handleCloseModal();
  };

  return (
    <>
      <Table striped bordered hover responsive className="task-table">
        <thead>
          <tr>
            <th>Task Number</th>
            <th>Time Estimate</th>
            <th>Estimate Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskItem key={task._id} task={task} onComplete={handleCompleteTask} />
          ))}
        </tbody>
      </Table>
      {selectedTask && (
        <CompleteTaskModal
          show={showModal}
          handleClose={handleCloseModal}
          task={selectedTask}
          onTaskCompleted={handleTaskCompleted}
        />
      )}
    </>
  );
};

export default TaskList;
