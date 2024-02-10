import propTypes from 'prop-types';

import NewTaskForm from './NewTaskForm';

function Header({ onItemAdded }) {
  Header.propTypes = {
    onItemAdded: propTypes.func.isRequired,
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onItemAdded={onItemAdded}/>
    </header>
  );
}

export default Header;