import React from "react";

import TasksFilter from "./tasks-filter";


class Footer extends React.Component {

  render() {
    const {todoCount, deleteCompleted, onFilterChange, filter} = this.props;
           

    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TasksFilter 
          filter={filter}
          onFilterChange={onFilterChange}
          />
        <button
        className="clear-completed"
        onClick={deleteCompleted}
        >Clear completed
        </button>
      </footer>
    )
  }
}

export default Footer;