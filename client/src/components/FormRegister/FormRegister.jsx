import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';






import s from './form.module.css';
import swal from 'sweetalert';

export default function FormRegister() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [ errors, setErrors] = useState({});
  const navigate = useNavigate();


  const validateForm = () => {

    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if(!regex.test(user.email)){
      errors.email = 'Ingrese un formato válido de correo.';
    }
  
    if(!user.password){
      errors.password = 'Ingrese una contraseña válida.';
    }
  
    setErrors(errors);
    return Object.keys(errors).length;
  }

  const handleUser = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      if (validateForm() !== 0) {
        alert("TIENES ERRORES");
      } else {
        const response = await fetch("http://localhost:3001/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        } else {
          swal("User succesfully created");
          setUser({ name: "", email: "", password: "" });
        }
      }
    } catch (err) {
      setErrors(err.message || "Something went wrong");
    }

    navigate("/");
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>CREATE USER</h1>
      <div className={s.cont}>
        <form onSubmit={handleRegister} className={s.form}>
          <label className={s.label}>Name</label>
          <input
            onChange={handleUser}
            type="text"
            placeholder="Name..."
            name="name"
            value={user.name}
            autoComplete="off"
            className={s.input}
          />
          <label className={s.label}>Email</label>
          <input
            onChange={handleUser}
            type="text"
            placeholder="Email..."
            name="email"
            value={user.email}
            autoComplete="off"
            className={s.input}
          />
          <label className={s.label}>Password</label>
          <input
            onChange={handleUser}
            type="password"
            placeholder="Password..."
            name="password"
            value={user.password}
            autoComplete="off"
            className={s.input}
          />
          <div>
          <Link to="/">
            <button className={s.buttonBack}>Back</button>
          </Link>
          <button type="submit" className={s.button}>
            Register
          </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}