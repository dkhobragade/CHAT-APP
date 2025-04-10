import { Route, Routes } from 'react-router-dom'
import { Navbar } from '../src/components/Navbar'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { SettingPage } from './pages/SettingPage'
import { SignUpPage } from './pages/SignUpPage'


const App = () =>
{
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/signUp' element={ <SignUpPage /> } />
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/setting' element={ <SettingPage /> } />
        <Route path='/profile' element={ <ProfilePage /> } />
      </Routes>
    </div>
  )
}

export default App