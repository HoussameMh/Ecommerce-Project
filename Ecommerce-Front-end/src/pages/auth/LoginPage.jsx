import { api } from './utils/api'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { showToast } from '../../utils/showToast';

import AuthImage from '../../assets/authImage.png'

import './authPages.css'

export function LoginPage({onAuthSuccess}) {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/v1/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      onAuthSuccess();
      showToast("Login successful! Redirecting...", "success");
      navigate('/');
    }
    catch (error) {
      console.error(error.response.data.msg);
      showToast("Unable to reach the server. Please try again.", "error");
    }
  }



  return (
    <>

      <title> Nova Market - Login </title>
      <main>
        <div className='left-side'>
          <img src={AuthImage} className='login-image' />
        </div>

        <div className='right-side'>
          <div className='login-card'>
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
              <div className='input-group'>
                <input
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="fa-solid fa-envelope fa-xl" style={{ color: '#1a1a1aff' }} />
              </div>

              <div className='input-group'>
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="fa-solid fa-lock fa-xl" style={{ color: '#1a1a1aff' }} />
              </div>
              <button type='submit' className='btn'> Login</button>
            </form>
            <div className=' login-to-register'>
              Don't have an account ? <Link to='/register' className='registre'>Register</Link>
            </div>
          </div>

        </div>



      </main >

    </>
  )

}