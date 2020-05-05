//функциональный компонент без состояния
import React from "react"

const Task = ({task, ...props}) => {
    const ActionBtn = () => (
        <div>{!task.done
            //галочка
            ? <p className="" aria-label="done" role="img" onClick={props.doneTask}>&#x2718; </p>
            // крестик не выполнена задача/
            : <p className="" aria-label="done" role="img" onClick={props.deleteTask}>&#x2714;</p>}
        </div>)

    const className = 'task ' + (task.done ? 'task-done' : '')
    return (
        <div className={className}>
            <p>{task.title}</p>
            <ActionBtn></ActionBtn>
        </div>
    )
}
export default Task

