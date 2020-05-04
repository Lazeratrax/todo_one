import React from 'react'
import './TaskInput.css'
import {TaskInputProps, TaskInputState} from '../../models/Task'

class TaskInput extends React.Component<TaskInputProps, TaskInputState> {
    state = {
        title: ''
    }

    handleChange = (e: any) => {
        this.setState({title: e.target.value});
    }

    handleAddClick = () => {
        const {title} = this.state;
        const {onAdd} = this.props;
        if (title) {
            onAdd(title);
            this.setState({title: ''});
        }
    }

    render() {
        const {title} = this.state;
        return (
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleAddClick}>ADD</button>
            </div>
        );
    }
}

export default TaskInput
