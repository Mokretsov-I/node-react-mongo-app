import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError]) 

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h2>Чек-лист проектов</h2>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div style={{marginTop: '3rem'}}>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите Email" 
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="blue-color"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите Пароль" 
                                    id="password" 
                                    type="password"
                                    name="password"
                                    className="blue-color"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn green darken-1" 
                            style={{marginRight: '2rem'}}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button 
                            className="btn blue darken-4"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}