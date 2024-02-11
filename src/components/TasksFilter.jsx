import propTypes from 'prop-types';
import cn from 'classnames';

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
    let classNames = cn({
      selected: isActive,
    });

    return (
      <li key={name}>
        <button type="button" onClick={() => onFilterChange(name)} className={classNames}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <ul className="filters">
      {buttons}
    </ul>
  );
}

export default TasksFilter;