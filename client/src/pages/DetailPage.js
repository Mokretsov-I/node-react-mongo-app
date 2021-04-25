import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../component/Loader'
import { ProjectsCard } from '../component/ProjectsCard'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const [project, setProject] = useState(null)
    const [tasks, setTasks] = useState(null)
    const {loading, request} = useHttp()
    const projectId = useParams().id

    const fetching = useCallback(async () => {
        try {
            const data = await request(`/api/project/${projectId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setProject(data.project)
            setTasks(data.tasks)
        } catch(e) {}
    }, [token, request, projectId])

    useEffect(() => {
        fetching()
    }, [fetching])

    if(loading || !project) {
        return <Loader />
    }

    return(
        <>
            <ProjectsCard projectData={project} taskData={tasks} />
        </>
    )
}