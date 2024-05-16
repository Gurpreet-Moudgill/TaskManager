import React from 'react';
import { Container } from 'react-bootstrap';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  return (
    <Container>
      <h1 className="my-4">Task Manager</h1>
      <TaskList />
    </Container>
  );
};

export default App;
