import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import User from './pages/User'

function App() {
    return (
        <>
            <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/users' element={<User />} />
            </Routes>
        </>
    )
}

export default App
