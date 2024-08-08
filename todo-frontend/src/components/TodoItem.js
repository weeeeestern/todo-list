import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
  state = {
    isEditing: false,
    newText: this.props.text
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked ||
           this.state.isEditing !== nextState.isEditing ||
           this.state.newText !== nextState.newText ||
           this.props.text !== nextProps.text; 
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.setState({ newText: this.props.text });
    }
  }

  handleEditClick = () => {
    this.setState({ isEditing: true });
  };

  handleSaveClick = (e) => {
    e.stopPropagation();
    this.props.onUpdate(this.props.id, this.state.newText);
    this.setState({ isEditing: false });
  };

  handleChange = (e) => {
    this.setState({ newText: e.target.value });
  };

  render() {
    const { text, checked, id, onToggle, onRemove, created_at, updated_at } = this.props;
    const { isEditing, newText } = this.state;

    const displayDate = updated_at !== created_at ? updated_at : created_at;

    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div className="remove" onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
        }}>&times;</div>
        {isEditing ? (
          <>
            <input 
              type="text"
              value={newText}
              onChange={this.handleChange}
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={this.handleSaveClick}>Save</button>
          </>
        ) : (
          <div className={`todo-text ${checked ? 'checked' : ''}`}>
            <div>{text}</div>
            <div>{new Date(displayDate).toLocaleString()}</div>
            <button onClick={(e) => { e.stopPropagation(); this.handleEditClick(); }}>Edit</button>
          </div>
        )}

        {checked && (<div className="check-mark">✓</div>)}
      </div>
    );
  }
}

export default TodoItem;
