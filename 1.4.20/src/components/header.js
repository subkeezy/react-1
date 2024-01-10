import React from "react";

import NewTaskForm from "./new-task-form";

import propTypes from "prop-types";

const Header = ({onItemAdded}) => {
  Header.propTypes = {
    onItemAdded: propTypes.func
  }

  return (
    <header className="header">
    <h1>todos</h1>
    <NewTaskForm
      onItemAdded={(e) => onItemAdded(e)}/>
  </header>
  )
}

export default Header