import { useState } from "react";
import Headers from "../header/Headers";
// import { BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

import './styles.css'


export default function Login(){


  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [control, setControl] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleUser = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
    setLoginError("");
    setControl("");
  };

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

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(validateForm() !== 0){
      alert("TIENES ERRORES");
    }
    
    else {
      try {
        const response = await fetch("http://localhost:3001/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            
            ...user
          }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }
  
        setUser("");
        setControl("")
        setSeePassword(false)
        setLoginError("")
      } catch (err) {
        setErrors(err.message || "Something went wrong");
      }

      navigate('/home')
  }
}

  return (
    <div className="container">
      <Headers />
      <div className="conte-comple">
      <div className="logii">
        <div className="bien">
          <h3 className="bienvenido" >welcome</h3>
          <h5 className="init">Login and Enjoy</h5>
      </div>
      </div>
    <div className="form-conte">
      

        <div className="tituloH">
          <h1 className="titulo">
            Login to your account
          </h1>
        </div>
        <div >
          <form onSubmit={handleSubmit} className="form" >
          <div>
          <div className="div-email">
              <label className="label">
                email
              </label>
            </div>
            
            <input
              onChange={handleUser}
              type="text"
              placeholder="Email..."
              name="email"
              value={user.email}
              autoComplete="off"
              className="input"
            />
            <p className="">{loginError}</p>
            </div>
            <div className="div-pass">
              <label className="label">
                Password
              </label>
            </div>

            <div className="pass">
              <div>
              <input
                onChange={handleUser}
                type={seePassword ? "text" : "password"}
                placeholder="Password..."
                name="password"
                value={user.password}
                autoComplete="off"
                className="input"
              />
              </div>
              
              
            </div>

            <button
              type="submit"
              className="btn-login"
            >
              LOGIN
            </button>
            <p className="">{control}</p>
          </form>

          </div>
          
          <div>      
          <p className="registro">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className=""
            >
              Sign up here
            </Link>
          </p>
          <Link
            to={"/passwordReset"}
            className="cambio"
          >
            I forgot my password
          </Link>
        </div>
        </div>
        </div>

 </div>
 
    
  );
}
