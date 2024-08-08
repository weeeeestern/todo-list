import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import api from './api';

class App extends Component {
  state = {
    input: '',
    todos: []
  };

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = async () => {
    try {
      const response = await api.get('/todo');
      console.log('Loaded Todos:', response.data); // 디버깅용
      this.setState({ todos: response.data });
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleCreate = async () => {
    const { input, todos } = this.state;
    const newTodo = {
      title: input,
      is_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    try {
      const response = await api.post('/todo', newTodo);
      console.log('Created Todo:', response.data); // 디버깅용
      this.setState({
        input: '',
        todos: todos.concat(response.data)
      });
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleCreate();
    }
  };

  handleToggle = async (id) => {
    console.log('handleToggle id:', id); // 디버깅용
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const updatedTodo = {
      ...selected,
      is_completed: !selected.is_completed,
      updated_at: new Date().toISOString()
    };

    try {
      const response = await api.put(`/todo/${id}`, updatedTodo);
      const nextTodos = [...todos];
      nextTodos[index] = response.data;
      this.setState({ todos: nextTodos });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  handleRemove = async (id) => {
    console.log('handleRemove id:', id); // 디버깅용
    try {
      await api.delete(`/todo/${id}`);
      this.setState({
        todos: this.state.todos.filter(todo => todo.id !== id)
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  handleUpdate = async (id, newText) => {
    console.log('handleUpdate id:', id); // 디버깅용
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const updatedTodo = {
      ...selected,
      title: newText,
      updated_at: new Date().toISOString()
    };

    try {
      const response = await api.put(`/todo/${id}`, updatedTodo);
      const nextTodos = [...todos];
      nextTodos[index] = response.data;
      this.setState({ todos: nextTodos });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleUpdate
    } = this;

    return (
      <TodoListTemplate form={(
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
        />
      </TodoListTemplate>
    );
  }
}

export default App;
