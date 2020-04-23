import React from 'react'
import Task from './components/Task'
import TaskInput from "./components/TaskInput"

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            //единственный объект. который бдует ранить стейт - это сами задачи. массив объектов
            tasks: [
                //done - сделана задача ли нет. по умолчанию false
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


    //хэлпер отметки о выполнении таска
    doneTask = id => {
        //положение задачи в массиве. берем массив task ов и возвращаем массив id
        const index = this.state.tasks.map(task => task.id)
            //из полученного массив получаем нужный нам id  !!
            .indexOf(id)

        //теперь изменяем состояние приложения
        this.setState(state => {
            //при помощи деструктуризации определяем переменную
            let {tasks} = state
            //изменяем свойство done
            tasks[index].done = true
            return tasks
        })
    }

    //хэлпер удаления таска
    deleteTask = id => {
        //положение задачи в массиве. берем массив task ов и возвращаем массив id
        const index = this.state.tasks.map(task => task.id)
            //из полученного массив получаем нужный нам id  !!
            .indexOf(id)

        this.setState(state => {
            let {tasks} = state
            delete tasks[index]
            //с помощью filter не работает
            // tasks.filter(task => task.id !==id)
        })
    }


    render() {
        //деструкуирующее присваивание. возьмем переменные
        const {tasks} = this.state

        //для переноса выполненных тасков в конец списка
        //filter возвращает только те задачи, которые еще не выполнены
        const activeTasks = tasks.filter(task => !task.done)
        // и которые выполнены
        const doneTasks = tasks.filter(task => task.done)
        return (
            <div className="App">
                {/*берем длину массива - получаем количество задач*/}
                <h1 className="top">Active tasks: {activeTasks.length}</h1>
                {/*сначала невыполненные, потом выполненные*/}
                {[...activeTasks, ...doneTasks].map(task => (
                    // task = props key = чтобы js понимал уникальность каждого элемента
                    // doneTask оборачиваем в стрелочную функцию, чтобы она не выполнилась на стадии render
                    // doneTask(task.id) находит ту задачу, которую нужно выплнить из массива
                    <Task
                        doneTask={() => this.doneTask(task.id)}
                        deleteTask={() => this.deleteTask(task.id)}
                        task={task}
                        key={task.id}>
                    </Task>))}
                <TaskInput
                    // не оборачиваем в стрелочную функцию, т.к. здесь не передаем параметры
                    addTask={this.addTask}
                >

                </TaskInput>
            </div>
        );
    }


}

export default App;
