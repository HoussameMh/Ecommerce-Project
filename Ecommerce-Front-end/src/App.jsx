import { Routes, Route,useNavigate } from 'react-router'
import { useEffect, useState } from "react";
import { LoginPage } from "./pages/auth/LoginPage"
import { RegisterPage } from './pages/auth/RegisterPage'
import { HomePage } from './pages/home/HomePage'
import { Header } from './components/Header'
import './App.css'

function App() {

  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
  }, []);

  const handleAuthUpdate = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
    navigate('/login');
  };
  return (
    <>
      <Header isAuth={isAuth}  handleLogout={handleLogout}/>
      <Routes>
        <Route path='login' element={<LoginPage onAuthSuccess={handleAuthUpdate} />} />
        <Route path='register' element={<RegisterPage onAuthSuccess={handleAuthUpdate} />}></Route>
        <Route index element={<HomePage />}></Route>
      </Routes>
    </>

  )
}

export default App
