import React from 'react'
import { TaskModal } from './addTask.modal'
import { Loader } from './Loader'
import { TasksList } from './TasksList'

export const ProjectsCard = ({ projectData, taskData }) => {
    return(
        <div className='projectDetail' style={{marginTop: '2rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                <h2 style={{lineHeight: 1, margin: 0}}>{projectData.title}</h2>
                { projectData.ended && <span className='green-text' style={{fontSize: '2rem'}}>Проект завершен</span>}
                { projectData.repository && 
                    <a style={{marginRight: 15}} href={projectData.repository} target="_blank" rel="noreferrer noopener">
                        <i style={{fontSize: '3rem'}} className="material-icons">code</i>
                    </a>}
            </div>
            <p>Дата создание проекта: <b>{new Date(projectData.date).toLocaleDateString()}</b></p>
            { projectData.finelDate && <p>Ожидаемая дата завершения: <b>{new Date(projectData.finelDate).toLocaleDateString()}</b></p>}
            { projectData.description && <p style={{fontWeight: 400, fontSize: '1.4rem'}}>{projectData.description}</p>}

            <div className='center'>
                <h3>Задачи</h3>

                { taskData ? < TasksList taskData={taskData}/> : <Loader/> }

                <div style={{margin: '15px 0'}}><TaskModal /></div>
            </div>

        </div>
    )
}