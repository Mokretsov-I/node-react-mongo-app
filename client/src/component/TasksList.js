import React from 'react'

export const TasksList = ({taskData}) => {

    if(taskData.length === 0) return <p>Задач пока нет</p> 

    return(
        <div>

            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>Дата добавления</th>
                    <th>Дата завершения</th>
                    <th>Коммит</th>
                    <th>Статус завершения</th>
                </tr>
                </thead>

                <tbody>
                    {taskData.map((task, i) => {
                        return (
                            <tr id={ task._id }>
                                <td>{ i + 1 }</td>
                                <td>{ task.name }</td>
                                <td>{ new Date(task.date).toLocaleDateString() }</td>
                                <td>{ task.finelDate && new Date(task.finelDate).toLocaleDateString() }</td>
                                <td>{ task.commit }</td>
                                <td><span><i className="material-icons">check</i></span></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}