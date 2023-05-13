import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import s from './PasswordReset.module.css'

const PasswordReset = () => {

  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
      axios
      .post('http://localhost:3001/user/passwordCode', { email })
      .then((res) => {
         setMessage(res.data.message); 
         setTimeout(() => {
          navigate("/reset")
        }, 5000);
        
      }).catch((err) => {
        setError(err.response.data.message);
      });
      
      
  };
  

  return (

    <div  className={s.container}>
            <h1 className={s.title}>
            Reset password
            </h1>
          <div className= {s.cont}>
          
          <form onSubmit={handleSubmit} className={s.form}>

              <div className={s.label}>
              <label htmlFor="email" className="">Enter your email address:</label>
              </div>

              <div className={s.input_div}>
                  <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  required
                  className={s.input}
                 
                />
              </div>
          <div>
            <button
              type="submit"
              className={s.btn} 
              
            >
              Send confirmation code
            </button>
            </div>
            <div>
              <Link to="/">
            <button
              
              className={s.btn} 
              
            >
              Back
            </button>
            </Link>
            </div>
          </form>

          {message && <p className={s.message} >{message}</p>}
          {error && <p className={s.mess}>{error}</p>}
          </div>   
          
    </div>
  );
};

export default PasswordReset;