import React from 'react'
import Task from './components/Task'
import TaskInput from "./components/TaskInput"
import { Task } from './models/Task'
// import {ITodo, ITodoList, ITodoListItem} from "./interfaces"

// type StateType = {
//     todos: Array<ITodoList>,
//     isLoading: boolean
// }

interface AppState {
    tasks: Task[]
}

class App extends React.Component<{}, AppState>{
constructor() {
    super();

    this.state = {
        tasks: [
            {id: 1, title: 'Задача раз', done: false},
            {id: 2, title: 'Задача два', done: false},
            {id: 3, title: 'Задача три', done: false}
        ],
        isLoading: false
    }
}

    addTask = task => {
        this.setState(state => {
            let {todoList} = state
            todoList.push({
                id: todoList.length !== 0 ? todoList.length : 0,
                title: todoList,
                done: false
            })
            return todoList
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
