import React from 'react'
import './TaskInput.css'

interface TaskInputProps {
    onAdd: (title: string) => void
}
interface TaskInputState {
    title: string
}

class TaskInput extends React.Component<TaskInputProps, TaskInputState> {
    state = {
        title: ''
    }

    handleChange = (e: any) => {
        this.setState({ title: e.target.value });
    }

    handleAddClick = () => {
        const { title } = this.state;
        const { onAdd } = this.props;
        if (title) {
            onAdd(title);
            this.setState({ title: '' });
        }
    }

    render() {
        const { title } = this.state;
        return (
            <div>
                <input type="text" value={title} onChange={this.handleChange}/>
        <button onClick={this.handleAddClick}>ADD</button>
            </div>
    );
    }
}

export default TaskInput
