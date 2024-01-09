import React from "react";

const filterBtns = [
  {name: 'all', description: 'All'},
  {name: 'active', description: 'Active'},
  {name: 'completed', description: 'Completed'}
]

const TasksFilter = ({filter, onFilterChange}) => {
  const buttons = filterBtns.map(({name, description}) => {
    const isActive = name === filter;
    let classNames;
    if (isActive) {
      classNames = 'selected';
    } else {
      classNames = '';
    }

    return (
      <button key={name}
              type="button"
              onClick={() => onFilterChange(name)}
              className={classNames}
      >{description}</button>
    )
  });

  return (
    <ul className="filters">
      <li>
        { buttons }
      </li>
    </ul>
  )
}

// class TasksFilter extends React.Component {

//   state = {
//     selected: false
//   }

//   render() {

//     return (
//       <ul className="filters">
//         <li>
//           <button className={classSelected}
//             onClick={filterAll}
//           >All</button>
//         </li>
//         <li>
//           <button className={classSelected}
//             onClick={filterActive}
//           >Active</button>
//         </li>
//         <li>
//           <button className={classSelected}
//             onClick={filterCompleted}
//           >Completed</button>
//         </li>
//       </ul>
//     )
//   }
// }


export default TasksFilter;