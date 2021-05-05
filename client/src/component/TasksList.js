import React, {useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const TasksList = ({taskData}) => {

    const [value, setValue] = useState({
        id: '',
        name: '',
        finelDate: '',
        commit: '',
        isComplite: false
    })
    const [isChange, setIsChange] = useState(false)
    const {request} = useHttp()
    const {token} = useContext(AuthContext)

    const editTask = (e) => {
        let editRow = e.target.parentElement.parentElement
        setValue({
            id: editRow.getAttribute('data-id'),
            name: editRow.querySelector('[data-field="name"]').textContent,
            finelDate: editRow.querySelector('[data-field="finelDate"]').textContent,
            commit: editRow.querySelector('[data-field="commit"]').textContent,
            isComplite: editRow.querySelector('td span i.material-icons').classList.contains('complite')
        })
        setIsChange(true)
    }

    const toggleComplite = async (e) => {
        setValue({
            ...value,
            id: e.target.parentElement.parentElement.parentElement.getAttribute('data-id'),
            isComplite: !e.target.classList.contains('complite')
        })
        if(value.id) {
            try {
                const data = await request('/api/task/editTask/', 'POST', value, {
                    Authorization: `Bearer ${token}`
                })
                console.log(data)
            } catch(e) {}
        }
    }

    const saveTask = async () => {
        if(value.id) {
            try {
                const data = await request('/api/task/editTask/', 'POST', value, {
                    Authorization: `Bearer ${token}`
                })
                console.log(data)
            } catch(e) {}
        }
    }

    const changeHandler = event => {
        setValue({ ...value, [event.target.name]: event.target.value })
    }

    if(taskData.length === 0) return <p>Задач пока нет</p> 

    console.log(value)

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
                                <td>
                                    {isChange && task._id === value.id
                                        ? <input name='name' value={value.name} onChange={changeHandler}/>
                                        : <p data-field='name'>{ task.name }</p>}
                                </td>
                                <td className='center'>
                                    <p>{ new Date(task.date).toLocaleDateString() }</p>
                                </td>
                                <td className='center'>
                                    {isChange && task._id === value.id
                                        ? <input name='finelDate' type='date' value={value.finelDate} onChange={changeHandler}/>
                                        : <p data-field='finelDate'>{ task.finelDate && new Date(task.finelDate).toLocaleDateString() }</p>}
                                </td>
                                <td>
                                    {isChange && task._id === value.id
                                        ? <input name='commit' value={value.commit} onChange={changeHandler}/>
                                        : <p data-field='commit'>{ task.commit }</p>}
                                </td>
                                <td className='center'>
                                    <span>
                                        <i onClick={toggleComplite} className={'material-icons' + (task.isComplite ? ' complite' : '')}>check</i>
                                    </span>
                                </td>
                                <td className='control'>
                                    <i className='material-icons' onClick={editTask}>create</i>
                                    <i className='material-icons' onClick={saveTask}>save</i>
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