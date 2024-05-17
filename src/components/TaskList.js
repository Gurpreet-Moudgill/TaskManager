import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import TaskItem from './TaskItem';
import CompleteTaskModal from './CompleteTaskModel';
import CreateTaskModal from './CreateTask';
import UpdateTaskModal from './UpdateTaskModel';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      const response = await axios.get("http://localhost:5000/api/tasks");
      console.log(response.data.data);
      setTasks(response.data.data);
    };
    loadTasks();
  }, []);

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleShowUpdateModal = (task) => {
    setSelectedTask(task);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedTask(null);
  };

  const handleShowCompleteModal = (task) => {
    setSelectedTask(task);
    setShowCompleteModal(true);
  };

  const handleCloseCompleteModal = () => {
    setShowCompleteModal(false);
    setSelectedTask(null);
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    handleCloseCreateModal();
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    handleCloseUpdateModal();
  };

  const handleTaskCompleted = (updatedTask) => {
    setTasks(tasks.map(task => task?._id === updatedTask?._id ? updatedTask : task));
    handleCloseCompleteModal();
  };

  return (
    <>
      <Button className="mb-3" onClick={handleShowCreateModal}>
        Create Task
      </Button>
      <Table striped bordered hover responsive className="task-table">
        <thead>
          <tr>
            <th>Task Number</th>
            <th>Time Estimate</th>
            <th>Estimate Notes</th>
            <th>Actions</th>
            <th>Udpate</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskItem
            key={task._id}
            task={task}
            onEdit={() => handleShowUpdateModal(task)}
            onComplete={() => handleShowCompleteModal(task)}
          />
          ))}
        </tbody>
      </Table>
      <CreateTaskModal
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        onTaskCreated={handleTaskCreated}
      />
      {selectedTask && (
        <UpdateTaskModal
          show={showUpdateModal}
          handleClose={handleCloseUpdateModal}
          task={selectedTask}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
      {selectedTask && (
        <CompleteTaskModal
          show={showCompleteModal}
          handleClose={handleCloseCompleteModal}
          task={selectedTask}
          onTaskCompleted={handleTaskCompleted}
        />
      )}
    </>
  );
};

export default TaskList;
