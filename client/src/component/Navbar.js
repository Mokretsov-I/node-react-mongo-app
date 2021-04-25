import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = e => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav className="blue-grey darken-1">
            <div className="nav-wrapper container">
                <NavLink to="/" className="brand-logo">Чек-лист проектов</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать</NavLink></li>
                    <li><NavLink to="/projects">Проекты</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}