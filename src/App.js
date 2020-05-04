import React from 'react'
import Task from './components/Task'
import TaskInput from "./components/TaskInput"

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            tasks: [
                {id: 0, title: "Create something", done: false},
                {id: 0, title: "Create vasa", done: true},
                {id: 0, title: "Create baba", done: false}
            ]
        }
    }

    addTask = task => {
        this.setState(state => {
            let {tasks} = state
            tasks.push({
                id: tasks.length !== 0 ? tasks.length : 0,
                title: task,
                done: false
            })
            return tasks
        })
    }

    doneTask = id => {
        const index = this.state.tasks.map(task => task.id)
            .indexOf(id)

        this.setState(state => {
            let {tasks} = state
            tasks[index].done = true
            return tasks
        })
    }

    deleteTask = id => {
        const index = this.state.tasks.map(task => task.id)
            .indexOf(id)

        this.setState(state => {
            let {tasks} = state
            delete tasks[index]
            //с помощью filter не работает
            // tasks.filter(task => task.id !==id)
        })
    }

    render() {
        const {tasks} = this.state
        const activeTasks = tasks.filter(task => !task.done)
        const doneTasks = tasks.filter(task => task.done)
        return (
            <div className="App">
                {/*берем длину массива - получаем количество задач*/}
                <h1 className="top">Active tasks: {activeTasks.length}</h1>
                {/*сначала невыполненные, потом выполненные*/}
                {[...activeTasks, ...doneTasks].map(task => (
                    <Task
                        doneTask={() => this.doneTask(task.id)}
                        deleteTask={() => this.deleteTask(task.id)}
                        task={task}
                        key={task.id}>
                    </Task>))}
                <TaskInput
                    addTask={this.addTask}
                >
                </TaskInput>
            </div>
        );
    }
}

export default App
