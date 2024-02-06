import React from "react";

import Tasks from "./tasks";

const TaskList = ({todos}) => {
  const elements = todos.map(el => {
    const { id, ...elProps} = el;
    return (
        <li key={el.id} className={el.status}>
          <Tasks {... elProps} 
          />
          <input type="text" className="edit" defaultValue="Editing task" />
        </li>
    )
  })

  return (
    <section className="main" id="main">
      <ul className="todo-list">
        { elements }
      </ul>
    </section>
  )
}

export default TaskList