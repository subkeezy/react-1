import React from "react";

import NewTaskForm from "./new-task-form";

const Tasks = ({description, created}) => {
  return (
      <div className="view">
        <NewTaskForm />
        <label>
          <span className="description">{description}</span>
          <span className="created">{created}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
  )
}

export default Tasks