import React, { Component } from 'react'

export default class Task extends Component {

  render() {
    const { _id: id, title, completed } = this.props.task;
    return (
      <div className="task d-flex text-secondary align-items-center position-relative">
        <div className="task-checkbox">
          <input type="checkbox" className="d-none" id={`task${id}`} checked={ completed } onChange={_ => this.props.onTaskStatusChanged(id, title, completed)} />
          <label className="checkbox rounded-circle border border-2" htmlFor={ `task${id}` }></label>
        </div>
        <div className={`task-title ps-3 w-100 ${completed ? "text-decoration-line-through" : ""}`}>{title}</div>
        <div className="task-delete px-2 cursor-pointer position-absolute end-0 h-100 d-flex align-items-center bg-light opacity-0" title="Delete" onClick={_ => this.props.onTaskDeleted(id)}><i className="far fa-trash-can"></i></div>
      </div>
    )
  }
}
