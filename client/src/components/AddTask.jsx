import React, { Component } from 'react'

export default class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      newTaskTitle: ""
    }
  }

  onTaskInputChange = event => {
    this.setState({ newTaskTitle: event.target.value });
  }

  render() {
    return (
      <div className="task d-flex text-secondary align-items-center">
        <div className="task-checkbox">
          <input type="checkbox" className="d-none" />
          <label className="checkbox rounded-circle border border-2"></label>
        </div>
        <div className="task-title ps-3 pe-2 w-100">
          <input type="text" placeholder="New Task Title..." className="outline-0 border-0 bg-transparent text-secondary fw-semibold border-bottom border-2 border-main w-100 border-opacity-25" onChange={this.onTaskInputChange} />
        </div>
        <button className="confirm-task p-2 text-main btn" title="Confirm" onClick={ _ => this.props.confirmTask(this.state.newTaskTitle) }><i className="fas fa-check fa-fw"></i></button>
        <button className="abort-task p-2 text-main btn" title="Cancel" onClick={ _ => this.props.abortTask() }><i className="fas fa-xmark fa-fw"></i></button>
      </div>
    )
  }
}
