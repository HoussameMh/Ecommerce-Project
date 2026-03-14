import axios from 'axios'
import { Routes, Route, useNavigate } from 'react-router'
import { useEffect, useState } from "react";
import { LoginPage } from "./pages/auth/LoginPage"
import { RegisterPage } from './pages/auth/RegisterPage'
import { HomePage } from './pages/home/HomePage'
import { Header } from './components/Header'
import './App.css'

function App() {

  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('/api/v1/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const totalItems = response.data.cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
      setCartCount(totalItems);
    } catch (error) {
      console.error("error fetch count:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <>
      <Header isAuth={isAuth} handleLogout={handleLogout} cartCount={cartCount} />
      <Routes>
        <Route path='login' element={<LoginPage onAuthSuccess={handleAuthUpdate} />} />
        <Route path='register' element={<RegisterPage onAuthSuccess={handleAuthUpdate} />}></Route>
        <Route index element={<HomePage  refreshCart={fetchCartCount}/>}  ></Route>
      </Routes>
    </>

  )
}

export default App
