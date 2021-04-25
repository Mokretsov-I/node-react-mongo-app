import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { ProjectsPage } from './pages/ProjectsPage'

export const useRouts = isAuth => {
    if(isAuth) {
        return (
            <Switch>
                <Route path="/projects" exact>
                    <ProjectsPage />
                </Route>
                <Route path="/create" exact> 
                    <CreatePage />
                </Route>
                <Route path="/project/:id">
                    <DetailPage />
                </Route>
                <Redirect to="/projects" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}