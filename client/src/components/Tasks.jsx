import React, { Component } from 'react'
import Task from './Task'
import AddTask from './AddTask';

export default class Tasks extends Component {

  render() {
    return (
      <div className="tasks bg-light pt-4 px-5 pb-5 fw-semibold shadow">
        {this.props.tasks.length ? this.props.tasks.map(task => <Task key={task.id} task={task} onTaskStatusChanged={ this.props.onTaskStatusChanged } onTaskDeleted={this.props.onTaskDeleted} />) : <div className="text-center text-secondary fs-5 fw-bold">No Tasks Yet'</div>}
        {this.props.addTask ? <AddTask showAddTask={this.props.showAddTask} confirmTask={ this.props.confirmTask } abortTask={this.props.abortTask} /> : null}
      </div>
    )
  }
}