import propTypes from 'prop-types';

const filterBtns = [
  { name: 'all', description: 'All' },
  { name: 'active', description: 'Active' },
  { name: 'completed', description: 'Completed' },
];

function TasksFilter({ filter, onFilterChange }) {
  TasksFilter.propTypes = {
    filter: propTypes.string.isRequired,
    onFilterChange: propTypes.func.isRequired,
  };
  const buttons = filterBtns.map(({ name, description }) => {
    const isActive = name === filter;
    let classNames;
    if (isActive) {
      classNames = 'selected';
    } else {
      classNames = '';
    }

    return (
      <button key={name} type="button" onClick={() => onFilterChange(name)} className={classNames}>
        {description}
      </button>
    );
  });

  return (
    <ul className="filters">
      <li>{buttons}</li>
    </ul>
  );
}

export default TasksFilter;
