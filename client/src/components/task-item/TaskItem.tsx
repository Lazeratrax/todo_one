import React from 'react'
import './TaskItem.css'
import {Task} from '../../models/Task'

interface TaskProps extends Task {
    onComplete: (id: number) => void
    onDelete: (id: number) => void
}

class TaskItem extends React.Component<TaskProps> {
    render() {
        const {id, title, done, onComplete, onDelete} = this.props;
        const classes = ['todo']
        return (
            <div className={classes.join(' ')}>
                <label>
                    {!done && <button onClick={() => onComplete(id)}>DONE</button>}
                    <span>{title}</span>
                    <button onClick={() => onDelete(id)}>DELETE</button>
                </label>
            </div>
        );
    }
}

export default TaskItem
