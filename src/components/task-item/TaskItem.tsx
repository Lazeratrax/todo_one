import React from 'react'
import './TaskItem.css'
import { Task } from '../../models/Task'

interface TaskProps extends Task {
    onComplete: (id: number) => void
    onDelete: (id: number) => void
}

class TaskItem extends React.Component<TaskProps> {
    render() {
        const { id, title, done, onComplete, onDelete } = this.props;
        return (
            <div>
                <span>{title}</span>
        {!done && <button onClick={() => onComplete(id)}>DONE</button>}
        <button onClick={() => onDelete(id)}>DELETE</button>
        </div>
        );
    }
}

export default TaskItem
