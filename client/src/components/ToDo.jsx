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
    fetch('http://192.168.1.50:2023/api/tasks')
      .then(response => response.json())
      .then(data => {
        this.setState({tasks: data, isLoading: false})
      })
      .catch(err => {
        console.error(err);
      })
  }

  taskCompleted = (taskId) => {
    const task = this.state.tasks.find(task => task.id === Number(taskId));
    if (task) {
      axios.put(`http://localhost:2023/api/tasks/${taskId}`, {
        title: task.title,
        completed: !task.completed
      }).then(response => {
        this.setState({ tasks: response.data.data });
      }).catch(err => {
        console.error(err);
      })
    }
  }

  confirmTask = (title) => {
    title = title.trim();
    if (title.length) {
      title = title[0].toUpperCase() + title.slice(1);
      axios.post("http://localhost:2023/api/tasks", {
        title
      }).then(response => {
        this.setState({ tasks: response.data.data, addTask: false });
      })
    }
  }

  abortTask = _ => {
    this.setState({ addTask: false });
  }

  showAddTask = _ => {
    this.setState({ addTask: true });
  }

  deleteTask = taskId => {
    if (Number(taskId)) {
      axios.delete(`http://localhost:2023/api/tasks/${taskId}`, {})
        .then(response => {
          this.setState({ tasks: response.data.data });
        })
        .catch(err => {
          console.error(err);
        })
    }
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
