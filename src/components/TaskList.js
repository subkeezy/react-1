import propTypes from 'prop-types';

import Task from './Task';

function TaskList({ todos, onDeleted, onToggleEdit, onToggleDone, onEditing, onPauseTimer}) {
  const elements = todos.map((el) => {
    const { id, ...elProps } = el;
    return (
      <Task
        key={id}
        {...elProps}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleEdit={() => onToggleEdit(id)}
        onEditing={(e) => onEditing(e, id)}
        onPauseTimer={onPauseTimer}
        id={id}
      />
    );
  });

  TaskList.propTypes = {
    todos: propTypes.arrayOf(propTypes.object).isRequired,
    onDeleted: propTypes.func,
    onToggleEdit: propTypes.func.isRequired,
    onToggleDone: propTypes.func.isRequired,
    onEditing: propTypes.func.isRequired,
  };

  return (
    <section className="main" id="main">
      <ul className="todo-list">{elements}</ul>
    </section>
  );
}

export default TaskList;