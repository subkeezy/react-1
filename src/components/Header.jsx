import propTypes from 'prop-types';

import NewTaskForm from './NewTaskForm';

function Header({ onItemAdded }) {

  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onItemAdded={onItemAdded}/>
    </header>
  );
}

Header.propTypes = {
  onItemAdded: propTypes.func.isRequired,
};

export default Header;