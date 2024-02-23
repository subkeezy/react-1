import React from 'react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { nanoid } from 'nanoid';

import Header from './Header';
import TaskList from './TaskList';
import Footer from './Footer';

export default function App() {
  const [data, setData] = useState(JSON.parse(sessionStorage.getItem('todos')) || [])
  const [filter, setFilter] = useState('all')

  const onToggleEdit = (id) => {
    setData(toggleProperty(data, id, 'edit'))
  }

  const onEditing = (event, id) => {
    const {value} = event.target
    if (event.key === 'Enter' && value.trim().length !== 0) {
      setData(
        data => {
          const idx = data.findIndex((el) => el.id === id);

          const oldItem = data[idx];
          const newItem = {
            ...oldItem,
            description: value,
            edit: !oldItem.edit,
          };
  
          const newData = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
  
          return newData
        }
      )
    } else if (event.key === 'Escape') {
      setData(data => toggleProperty(data, id, 'edit'))
    }
  }

  const onFilter = (data, filter) => {
    if (filter === 'all') {
      return data;
    }
    if (filter === 'active') {
      return data.filter((item) => !item.done);
    }
    if (filter === 'completed') {
      return data.filter((item) => item.done);
    }
  }

  const deleteCompleted = () => {
    setData(data => {
      const filteredData = data.filter((el) => !el.done);
      return filteredData
    })
  }

  const deleteItem = (id) => {
    setData(data => {
      const idx = data.findIndex((el) => el.id === id);

      const newData = [...data.slice(0, idx), ...data.slice(idx + 1)];
      sessionStorage.setItem('todos', JSON.stringify(newData))
      return newData
    })
  }

  const onTimerUnmount = (id, time, paused = true) => {
    setData(data => {
      const idx = data.findIndex((el) => el.id === id);
      if (idx < 0) {
        return {data}
      }

      const oldItem = data[idx];
      const newItem = {
        ...oldItem,
        min: time[0],
        sec: time[1],
        date: Date.now(),
        timerPaused: paused
      };

      const newData = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
      sessionStorage.setItem('todos', JSON.stringify(newData))

      return newData
    })
  }

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec);

    setData(data => {
      const newArray = [...data, newItem];
      sessionStorage.setItem('todos', JSON.stringify(newArray))
      return newArray
    })
  }
  
  const onFilterChange = (filter) => {
    setFilter(filter)
  }

  const onToggleDone = (id) => {
    setData(data => {
      return toggleProperty(data, id, 'done')
    })
  }

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  const createTodoItem = (description, min, sec) => {
    return {
      id: nanoid(5),
      description,
      created: createdTime(),
      done: false,
      edit: false,
      min,
      sec,
    };   
  }

  const createdTime = () => {
    const time = ` created ${formatDistanceToNow(new Date(), {
      includeSeconds: true,
    })} ago`;
    return time;
  };

  const doneCount = data.filter((el) => el.done).length;
  const todoCount = data.length - doneCount;
  const visibleItems = onFilter(data, filter);

  return (
    <section className="todoapp">
      <Header onItemAdded={addItem} />
      <TaskList
        todos={visibleItems}
        onDeleted={deleteItem}
        onToggleEdit={onToggleEdit}
        onToggleDone={onToggleDone}
        onEditing={onEditing}
        onTimerUnmount={onTimerUnmount} 
        filter={filter}
      />
      <Footer
        doneCount={doneCount}
        todoCount={todoCount}
        deleteCompleted={deleteCompleted}
        filter={filter}
        onFilterChange={onFilterChange}
      />
    </section>
  );
}