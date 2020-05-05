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

    keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
           return this.handleAddClick()
        }
    }

    render() {
        const {title} = this.state;
        return (
            <div className="input-field mt2">
                <input
                    type="text"
                    value={title}
                    onChange={this.handleChange}
                    onKeyPress={this.keyPressHandler}
                />
                <button onClick={this.handleAddClick}>ADD</button>
                <label
                    htmlFor="title"
                    className="active"
                >
                    Введите название дела</label>
            </div>
        )
    }
}

export default TaskInput
