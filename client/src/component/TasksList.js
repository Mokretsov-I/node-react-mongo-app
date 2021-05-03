import React from 'react'

export const TasksList = ({taskData}) => {

    if(taskData.length === 0) return <p>Задач пока нет</p> 

    const editTask = (e) => {
        console.log(e.target.parentElement.parentElement.getAttribute('data-id'))
    }

    return(
        <div>

            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th className='center'>Дата добавления</th>
                    <th className='center'>Дата завершения</th>
                    <th>Коммит</th>
                    <th className='center'>Статус завершения</th>
                </tr>
                </thead>

                <tbody>
                    {taskData.map((task, i) => {
                        return (
                            <tr key={ task._id } data-id={ task._id }>
                                <td>{ i + 1 }</td>
                                <td><p>{ task.name }</p></td>
                                <td className='center'><p>{ new Date(task.date).toLocaleDateString() }</p></td>
                                <td className='center'><p>{ task.finelDate && new Date(task.finelDate).toLocaleDateString() }</p></td>
                                <td><p>{ task.commit }</p></td>
                                <td className='center'><span><i className={'material-icons' + (task.isComplite ? ' complite' : '')}>check</i></span></td>
                                <td className='control'>
                                    <i className='material-icons' onClick={editTask}>create</i>
                                    <i className='material-icons'>close</i>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}