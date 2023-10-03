import React, { Component } from 'react'
import Tasks from './Tasks';
import AddButton from './buttons/AddButton';

import axios from 'axios';

export default class ToDo extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      isLoading: true,
      addTask: false,
      title: "Today ToDos!"
    }
  }

  componentDidMount() {
    fetch('http://localhost:2023/api/tasks')
      .then(response => response.json())
      .then(data => {
        this.setState({tasks: data, isLoading: false})
      })
      .catch(err => {
        console.error(err);
      })
  }

  getTasks = _ => {
    fetch('http://localhost:2023/api/tasks')
      .then(response => response.json())
      .then(data => this.setState({tasks: data, isLoading: false, addTask: false}))
      .catch(error => console.log(error))
  }

  taskCompleted = (taskId, title, currentStatus) => {
    axios.patch(`http://localhost:2023/api/tasks/${taskId}`, {
      title: title,
      completed: !currentStatus
    })
    .then(response => { this.getTasks(); })
    .catch(error => console.error(error))
  }

  confirmTask = (title) => {
    axios.post('http://localhost:2023/api/tasks', {
      title
    })
    .then(response => this.getTasks())
    .catch(error => console.log(error));
  }

  abortTask = _ => {
    this.setState({ addTask: false });
  }

  showAddTask = _ => {
    this.setState({ addTask: true });
  }

  deleteTask = taskId => {
    axios.delete(`http://localhost:2023/api/tasks/${taskId}`)
      .then(response => this.getTasks())
      .catch(error => console.log(error));
  }

  render() {
    const { tasks, isLoading, addTask, title } = this.state;
    if (isLoading) {
      return <div className="text-main fw-bolder fs-1 fst-italic">Loading...</div>
    } else {
    return (
      <div className="todo">
        <div className="todo-title p-4 w-100 text-light d-flex align-items-center mb-4 shadow">
          <div className="title-icon"><i className="fas fa-list"></i></div>
          <div className="title-text text-center w-100 fw-semibold">{title}</div>
        </div>
        <Tasks tasks={tasks} onTaskStatusChanged={this.taskCompleted} addTask={addTask} confirmTask={this.confirmTask} abortTask={this.abortTask} onTaskDeleted={ this.deleteTask } />
        <AddButton showAddTask={this.showAddTask} />
      </div>
    )
    }
  }
}
