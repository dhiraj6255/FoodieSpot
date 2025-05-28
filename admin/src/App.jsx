import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { useEffect, useState } from 'react'
import Login from './components/Login'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "$"

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])


  return (
    <main>
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className='bg-deep text-[#404040]'>
          <div className='max-auto max-h-[1440px] flex flex-col sm:flex-row'>
            <Sidebar setToken={setToken} />
            <Routes>
              <Route path='/' element={<Add token={token} />} />
              <Route path='/list' element={<List token={token} />} />
              <Route path='/orders' element={<Orders token={token} />} />
            </Routes>
          </div>
        </div>
      )}
    </main>
  )
}

export default App