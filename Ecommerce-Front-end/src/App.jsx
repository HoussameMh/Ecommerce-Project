import { Routes, Route } from 'react-router'
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from './pages/RegisterPage'
import './App.css'
function App() {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />}></Route>
    </Routes>

  )
}

export default App
