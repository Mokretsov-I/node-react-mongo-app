import React, { useContext, useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
    const {loading, request} = useHttp()
    const auth = useContext(AuthContext)
    const history = useHistory()
    const [form, setForm] = useState({
        title: '',
        description: '',
        finelDate: '',
        repository: ''
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const createHandler = async () => {
        const data = await request('/api/project/create', 'POST', {...form}, {
            Authorization: `Bearer ${auth.token}`
        })
        if(data && data.project._id) {
            history.push(`/project/${data.project._id}`)
        }
    }

    return(
        <div className="row">
            <div className="col s8 offset-s2" style={{marginTop: '2rem'}}>
                <h2 style={{marginBottom: '2rem'}}>Создание нового проекта</h2>
                <div className="input-field">
                    <input 
                        placeholder="Введите название" 
                        id="title" 
                        type="text"
                        name="title"
                        className="blue-color"
                        onChange={changeHandler}
                        value={form.title}
                    />
                    <label htmlFor="title">Название проекта</label>
                </div>
                <div className="input-field">
                    <input 
                        placeholder="Введите описание" 
                        id="description" 
                        type="text"
                        name="description"
                        className="blue-color"
                        onChange={changeHandler}
                        value={form.description}
                    />
                    <label htmlFor="description">Описание проекта</label>
                </div>
                <div className="input-field">
                    <input 
                        placeholder="Выберите дату" 
                        id="finelDate" 
                        type="date"
                        name="finelDate"
                        className="blue-color"
                        onChange={changeHandler}
                        value={form.finelDate}
                    />
                    <label htmlFor="finelDate">Планируемая дата завершения</label>
                </div>
                <div className="input-field">
                    <input 
                        placeholder="Вставьте ссылку" 
                        id="repository" 
                        type="text"
                        name="repository"
                        className="blue-color"
                        onChange={changeHandler}
                        value={form.repository}
                    />
                    <label htmlFor="repository">Ссылка на репозиторий</label>
                </div>
                <button 
                    className="btn right green darken-1" 
                    onClick={createHandler}
                    disabled={loading}
                >
                    Создать
                </button>
            </div>
        </div>
    )
}