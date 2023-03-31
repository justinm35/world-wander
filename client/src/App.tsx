import './App.css'
import ErrorPage from './components/ErrorPage'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Route, Outlet, Routes} from 'react-router-dom'
import Navbar from './features/Navbar/Navbar'
import UserHome from './features/UserHome/UserHome'
import PrivateRoutes from './Utils/PrivateRoutes'
import Account from './features/Account/Account'
import Landing from './features/Landing/Landing'
import Login from './features/AuthPage/Login'
import Register from './features/AuthPage/Register'


function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route index element={<Landing/>}/>
      {/* <Route path="/auth" element={<Auth/>}/> */}
      <Route path="/auth">
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
      <Route element={<PrivateRoutes/>}>
          <Route element={<Account/>} path="/account/*"/>
          <Route path="/mywanders" element={<UserHome/>}/>
      </Route>
    </Routes>
      <Outlet/>
    </>
  )
}

export default App
