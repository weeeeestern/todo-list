import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }

  render() {
    const { todos, onToggle, onRemove, onUpdate } = this.props;

    const todoList = todos.map(
      ({ id, title, is_completed, created_at, updated_at }) => (
        <TodoItem
          id={id}
          text={title}
          checked={is_completed}
          created_at={created_at}
          updated_at={updated_at}
          onToggle={onToggle}
          onRemove={onRemove}
          onUpdate={onUpdate}
          key={id}
        />
      )
    );

    return (
      <div>
        {todoList}    
      </div>
    );
  }
}

export default TodoItemList;
