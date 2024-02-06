import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import Header from './Header';
import TaskList from './TaskList';
import Footer from './Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(sessionStorage.getItem('todos')) || [],
      filter: 'all'
    };
  }

  componentDidUpdate() {
    sessionStorage.setItem('todos', JSON.stringify(this.state.data))
  }

  onToggleEdit(id) {
    this.setState(({ data }) => ({
      data: this.toggleProperty(data, id, 'edit'),
    }));
  }

  onEditing(event, id) {
    if (event.key === 'Enter') {
      this.setState(({ data }) => {
        const idx = data.findIndex((el) => el.id === id);

        const oldItem = data[idx];
        const newItem = {
          ...oldItem,
          description: event.target.value,
          edit: !oldItem.edit,
        };

        const newData = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];

        return {
          data: newData,
        };
      });
    } else if (event.key === 'Escape') {
      this.setState(({ data }) => ({
        data: this.toggleProperty(data, id, 'edit'),
      }));
    }
  }

  onToggleDone(id) {
    this.setState(({ data }) => ({
      data: this.toggleProperty(data, id, 'done'),
    }));
  }

  onFilter(data, filter) {
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

  deleteCompleted() {
    this.setState(({ data }) => {
      const filteredData = data.filter((el) => !el.done);
      return {
        data: filteredData,
      };
    });
  }

  deleteItem(id) {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);

      const newData = [...data.slice(0, idx), ...data.slice(idx + 1)];

      return {
        data: newData,
      };
    });
  }

  onPauseTimer(id, minutes, seconds) {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);

      const oldItem = data[idx];
      const newItem = {
        ...oldItem,
        min: minutes,
        sec: seconds
      };

      const newData = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
      sessionStorage.setItem('todos', JSON.stringify(newData))

      return {
        data: newData,
      };
    });
  }

  addItem(text, min, sec) {
    const newItem = this.createTodoItem(text, min, sec);

    this.setState(({ data }) => {
      const newArray = [...data, newItem];
      sessionStorage.setItem('todos', JSON.stringify(newArray))
      return {
        data: newArray,
      };
    });

  }

  onFilterChange(filter) {
    this.setState({ filter });
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  createTodoItem(description, min, sec) {
    return {
      id: Math.random(),
      description,
      created: this.createdTime(),
      done: false,
      edit: false,
      min,
      sec
    };
  }

  createdTime = () => {
    const time = ` created ${formatDistanceToNow(new Date(), {
      includeSeconds: true,
    })} ago`;
    return time;
  };


  render() {
    const { data, filter} = this.state;
    const doneCount = data.filter((el) => el.done).length;
    const todoCount = data.length - doneCount;
    const visibleItems = this.onFilter(data, filter);

    return (
      <section className="todoapp">
        <Header onItemAdded={this.addItem.bind(this)} todos={visibleItems} />
        <TaskList
          todos={visibleItems}
          onDeleted={this.deleteItem.bind(this)}
          onToggleEdit={this.onToggleEdit.bind(this)}
          onToggleDone={this.onToggleDone.bind(this)}
          onEditing={this.onEditing.bind(this)}
          onPauseTimer={this.onPauseTimer.bind(this)} 
        />
        <Footer
          doneCount={doneCount}
          todoCount={todoCount}
          deleteCompleted={this.deleteCompleted.bind(this)}
          filter={filter}
          onFilterChange={this.onFilterChange.bind(this)}
        />
      </section>
    );
  }
}

export default App;
