import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const TaskModal = ({updateData}) => {
    const {loading, request} = useHttp()
    const auth = useContext(AuthContext)
    const refModal = useRef(null)
    const projectId = useParams().id
    const [form, setForm] = useState({
        name: '',
        finelDate: '',
    })

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const createHandler = async () => {
        const data = await request(`/api/task/${projectId}/createTask`, 'POST', {...form}, {
            Authorization: `Bearer ${auth.token}`
        })
        if(data) {
            window.M.Modal.getInstance(refModal.current).close()
            updateData()
        }
    }

    useEffect(() => {
        window.M.Modal.init(refModal.current)
        window.M.updateTextFields()
    }, [])

    return(
        <>
            <a className="waves-effect waves-light btn modal-trigger" href="#addTask" style={{borderRadius: '50%', padding: '0 9px'}}><i className="material-icons">add</i></a>

            <div id="addTask" className="modal" ref={refModal}>
                <div className="modal-header right">
                    <span className="modal-close"><i className="material-icons" style={{margin: '10px 15px'}}>close</i></span>
                </div>
                <div className="modal-content">
                    <div className="input-field">
                        <input 
                            placeholder="Введите название" 
                            id="name" 
                            type="text"
                            name="name"
                            className="blue-color"
                            onChange={changeHandler}
                            value={form.name}
                        />
                        <label htmlFor="title">Название задачи</label>
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
                </div>
                <div className="modal-footer center">
                    <button 
                        className="btn green darken-1" 
                        onClick={createHandler}
                        disabled={loading}
                        style={{ margin: '0 auto', display: 'block' }}
                    >
                        Добавить
                    </button>
                </div>
            </div>
        </>
    )
}