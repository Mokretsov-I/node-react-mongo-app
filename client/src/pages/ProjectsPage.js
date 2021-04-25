import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../component/Loader'
import { ProjectsList } from '../component/ProjectsList'

export const ProjectsPage = () => {
    const {token} = useContext(AuthContext)
    const [projects, setProjects] = useState(null)
    const {loading, request} = useHttp()

    const fetching = useCallback(async () => {
        try {
            const data = await request('/api/project/', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setProjects(data.projects)
        } catch(e) {}
    }, [token, request])

    useEffect(() => {
        fetching()
    }, [fetching])

    if(loading || !projects) {
        return <Loader />
    }

    return(
        <>
            {!loading && <ProjectsList projectList={projects} /> }
        </>
    )
}