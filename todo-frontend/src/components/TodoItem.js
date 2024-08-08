import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
    state = {
        isEditing : false,
        newText: this.props.text
    } // 자식 컴포넌트 안에서 관리되는 상태: 현재 수정중인가, 수정중인 텍스트
 shouldComponentUpdate(nextProps, nextState) {
   return this.props.checked !== nextProps.checked ||
          this.state.isEditing !== nextState.isEditing ||
          this.state.newText !== nextState.newText ||
          this.props.text !== nextProps.text; 
  }

  handleEditClick = () => {
    this.setState({ isEditing: true });
  };

  handleSaveClick = () => {
    this.props.onUpdate(this.props.id, this.state.newText);
    this.setState({ isEditing: false });
  };

  handleChange = (e) => {
    this.setState({ newText: e.target.value });
  };

  render() {
    const { text, checked, id, onToggle, onRemove } = this.props;
    const { isEditing, newText } = this.state;

    return (
    <div className="todo-item" onClick={() => onToggle(id)}>
        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // onToggle 이 실행되지 않도록 함
          onRemove(id)}
        }>&times;</div>
        {isEditing ? (
            <>
            <input 
              type="text"
              value={newText}
              onChange={this.handleChange}
              onClick={(e) => e.stopPropagation()} // onToggle 이 실행되지 않도록 함
            />
            <button onClick={this.handleSaveClick}>Save</button>
            </>
        ) : (
            <div className={`todo-text ${ checked ? ' checked' : '' }`}>
            <div>{text}</div>
            <button onClick={(e) => {e.stopPropagation(); this.handleEditClick();}}>Edit</button>
          </div>
        )}

        {
          checked && (<div className="check-mark">✓</div>)
        }
    </div>
    );
  }
}

export default TodoItem;