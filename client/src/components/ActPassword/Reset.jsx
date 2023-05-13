import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import s from './Reset.module.css'


function Reset() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [seePassword, setSeePassword] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3001/user/resetPassword', { email, code, password });
        setMessage(response.data.message);
        navigate('/login')
      } catch (error) {
        setMessage(error.response.data.message);
      }
    };
  
    return (
      <div className={s.container}>

        <div className={s.cont}>
          <h2 className={s.title}>reset password</h2>
          <form onSubmit={handleSubmit} className={s.form}>
            <label htmlFor="email" className={s.label}>Email:</label>
            <input type="email" id="email" className={s.input} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="code" className={s.label}>Confirmation code:</label>
            <input type="number" id="code" className={s.input} onChange={(e) => setCode(parseInt(e.target.value))} />
            <label htmlFor="password" className={s.label}>New Password:</label>
            <input type= "password"  id="password" className={s.input} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className={s.btn}>Send</button>
            {message && <div className={s.message}>{message}</div>}
          </form>

        </div>


      </div>
    );
  }
  export default Reset;