import React from 'react'
import {Task} from './models/Task'
import TaskItem from './components/task-item/TaskItem'
import TaskInput from './components/task-input/TaskInput'
import Header from "./components/header/Header"

interface AppState {
    tasks: Task[]
}

class App extends React.Component<{}, AppState> {


    state = {
        tasks: [ {id: 0, title: "null", done: true}]
    }

    addTask = (title: string) => {
        const {tasks} = this.state;
        const newTasks = [...tasks, {title, id: tasks.length, done: false}];
        this.setState({tasks: newTasks});
    }

    completeTask = (id: number) => {
        const {tasks} = this.state;
        const newTasks = tasks.map(t => t.id === id ? {...t, done: true} : t);
        this.setState({tasks: newTasks});
    }

    deleteTask = (id: number) => {
        const {tasks} = this.state;
        this.setState({tasks: tasks.filter(t => t.id !== id)});
    }

    render() {
        const {tasks} = this.state;
        const activeTasks = tasks.filter(task => !task.done);
        const doneTasks = tasks.filter(task => task.done);

        return (
            <div className="App">
                <Header/>
                <main className="main">
                    <h1 className="top">Active tasks: {activeTasks.length}</h1>
                    <TaskInput onAdd={this.addTask}/>
                    {[...activeTasks, ...doneTasks].map(task => (
                        <TaskItem
                            {...task}
                            key={task.id}
                            onComplete={this.completeTask}
                            onDelete={this.deleteTask}>
                        </TaskItem>
                    ))}
                </main>
            </div>
        );
    }
}

export default App
