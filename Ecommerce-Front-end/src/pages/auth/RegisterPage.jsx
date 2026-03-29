import { api } from './utils/api'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { showToast } from '../../utils/showToast';


import AuthImage from '../../assets/authImage.png'

import './authPages.css'

export function RegisterPage({onAuthSuccess}) {
  const navigate = useNavigate()

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/v1/auth/register', {
        lastName,
        firstName,
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      onAuthSuccess()
      showToast("Register successful! Redirecting...", "success");
      navigate('/');
    }
    catch (error) {
      console.error(error.response.data.msg);
      showToast("Unable to reach the server. Please try again.", "error");
    }
  }



  return (
    <>

      <title> Nova Market - Register </title>
      <main>
        <div className='left-side'>
          <img src={AuthImage} className='login-image' />
        </div>

        <div className='right-side'>
          <div className='login-card'>
            <form onSubmit={handleRegister}>
              <h2>Register</h2>
              <div className='full-name-input'>
                <div className='input-group'>
                  <input
                    type='text'
                    placeholder='lastName'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <i className="fa-solid fa-id-card" />
                </div>
                <div className='input-group'>
                  <input
                    type='text'
                    placeholder='firstName'
                    value={lastName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <i className="fa-solid fa-user" />
                </div>

              </div>
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
              <button type='submit' className='btn'> Register</button>
            </form>
            <div className=' login-to-register'>
              Already have an account ? <Link to='/login' className='registre'>Login</Link>
            </div>
          </div>

        </div>



      </main >

    </>
  )

}