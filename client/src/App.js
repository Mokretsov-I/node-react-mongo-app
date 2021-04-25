import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import { useRouts } from './routes'
import { useAuth } from './hooks/auth.hooks'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './component/Navbar'
import { Loader } from './component/Loader'
import 'materialize-css'

function App() {
  const {userId, token, login, logout, ready} = useAuth()
  const isAuth = !!token
  const routes = useRouts(isAuth)

  if(!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value= {{
      token, userId, login, logout, isAuth
    }}>
      <BrowserRouter>
        { isAuth && <Navbar /> }
        <div className="container">
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
