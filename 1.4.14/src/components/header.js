import React from "react";

import NewTaskForm from "./new-task-form";

const Header = ({onItemAdded}) => {
  return (
    <header className="header">
    <h1>todos</h1>
    <NewTaskForm
      onItemAdded={(e) => onItemAdded(e)}/>
  </header>
  )
}

export default Header