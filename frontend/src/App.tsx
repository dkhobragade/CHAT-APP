import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../src/components/Navbar'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { SettingPage } from './pages/SettingPage'
import { SignUpPage } from './pages/SignUpPage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import Loading from './lowLevelComponents/Loading'
import { Toaster } from 'react-hot-toast'


const App = () =>

  {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

    useEffect(()=>{
      checkAuth()
    },[checkAuth])

    console.log({authUser})

    if(isCheckingAuth && !authUser){
      return <Loading/>
    }

    return (
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={ authUser ?<HomePage /> : <Navigate to='/login'/>} />
          <Route path='/signUp' element={ !authUser? <SignUpPage /> : <Navigate to='/'/> } />
          <Route path='/login' element={ !authUser? <LoginPage /> : <Navigate to='/'/> } />
          <Route path='/setting' element={ <SettingPage /> } />
          <Route path='/profile' element={ authUser? <ProfilePage /> :<Navigate to='/login'/> } />
        </Routes>
        <Toaster/>
      </div>
    )
  }

  export default App