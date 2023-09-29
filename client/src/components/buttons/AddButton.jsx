import React, { Component } from 'react'

export default class AddTask extends Component {
  render() {
    return (
      <div className="w-100 text-center">
        <button className="add-task btn rounded-4 border-0 py-2 px-4 fw-bold text-light shadow bg-main" onClick={_ => this.props.showAddTask()}>
          <i className="fa fa-plus fa-xs"></i> <span className="ps-2">New Task</span>
        </button>
      </div>
    )
  }
}
