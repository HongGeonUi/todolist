import React from 'react';
import '../css/TodoItem.css';

class TodoItem extends React.Component {
    render() {
        const {content, isComplete, id, onToggle, onRemove} = this.props;

        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="todo-item-remove" onClick={(e) => {
                    e.stopPropagation(); // 이벤트 확산을 멈춰줌
                    onRemove(id)}
                }>
                    &times;
                </div>
                <div className={`todo-item-content ${isComplete ? 'isComplete' : ''}`}>
                    <div>
                        {content}
                    </div>
            </div>
            {
                isComplete && (<div className='isComplete-mark'>✓</div>)
            }
            </div>
        )
    }
}

export default TodoItem;