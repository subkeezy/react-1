import React from 'react';

import propTypes from 'prop-types';
import TasksFilter from './tasks-filter';

class Footer extends React.Component {
  static propTypes = {
    todoCount: propTypes.number.isRequired,
    deleteCompleted: propTypes.func.isRequired,
    onFilterChange: propTypes.func.isRequired,
    filter: propTypes.string.isRequired,
  };

  render() {
    const { todoCount, deleteCompleted, onFilterChange, filter } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button type="button" className="clear-completed" onClick={deleteCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;
