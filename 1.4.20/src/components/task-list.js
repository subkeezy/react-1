import React from "react";

import Tasks from "./tasks";

import propTypes from 'prop-types';

const TaskList = ({todos, onDeleted, onToggleEdit, onToggleDone, onEditing}) => {
  const elements = todos.map(el => {
    const { id, ...elProps} = el;
    return (
      <Tasks key={id} {...elProps}
      onDeleted={() => onDeleted(id)}
      onToggleDone={() => onToggleDone(id)}
      onToggleEdit={() => onToggleEdit(id)}
      onEditing={(e) => onEditing(e, id)}
      />
    )
  })

  TaskList.propTypes = {
    todos: propTypes.arrayOf(propTypes.object).isRequired,
    onDeleted: propTypes.func.isRequired,
    onToggleEdit: propTypes.func.isRequired,
    onToggleDone: propTypes.func.isRequired,
    onEditing: propTypes.func.isRequired
  }

  return (
    <section className="main" id="main">
      <ul className="todo-list">
        { elements }
      </ul>
    </section>
  )
}

export default TaskList