import React from 'react'
import { NavLink } from 'react-router-dom'

export const ProjectsList = ({ projectList }) => {

    if(!projectList || projectList.length === 0) {
        return <p>Проектов пока нет</p>
    }

    return(
        <div className='projectContainer'>
        { 
            projectList.map( p => {
                return(
                    <NavLink to={`/project/${p._id}`} key={p._id} className={'projectCard ' + (p.ended && 'card-green')} >
                        <div className='projectCard__header'>
                            <h5>{p.title}</h5> <b>{new Date(p.date).toLocaleDateString()}</b>
                        </div>
                        <div className='projectCard__description'>
                        { p.description ? <p>Описание: <span>{p.description}</span></p> : <p>Описание отсутствует</p>}
                        </div>
                    </NavLink>
                )
            }) 
        }
        </div>
    )
}