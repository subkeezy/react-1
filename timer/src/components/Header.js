import propTypes from 'prop-types';

import NewTaskForm from './NewTaskForm';

function Header({ onItemAdded, todos }) {
  Header.propTypes = {
    onItemAdded: propTypes.func.isRequired,
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onItemAdded={onItemAdded} todos={todos}/>
    </header>
  );
}

export default Header;
