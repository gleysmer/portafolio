import { useState } from "react";
import Headers from "../header/Headers";
import Swal from "sweetalert2";
// import { BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

import style from './Login.module.css'


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
  
    if ( validateForm() !== 0) {
      alert("email or password invalid");
    } else {
      try {
        const response = await fetch("http://localhost:3001/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...user}),
        });
       
        const data = await response.json();
        
        const dato = {
          data_user: data.data.dataValues,
          token: data.data.token,
        };
        window.localStorage.setItem('user-log', JSON.stringify(dato));
        


        // console.log("datos", dato)
        if (response.status === 401) { // Verificar si el usuario no existe o la contraseña es incorrecta
          setLoginError("Email or Password is invalid");
          
          return ;
        }
        if (!data) {
          throw new Error(data.message || "Something went wrong");
        }
        else if(data.data.dataValues.rol === "admin"){
          // Swal.fire({
          //   icon: "success",
          //   title: "Congratulations!",
          //   text: response.data.message,
          //   confirmButtonText: "Continue",
          // });
          navigate("/dashboard");
        }
        else {
          setUser("");
          setControl("");
          setSeePassword(false);
          setLoginError("");
          navigate('/home');
        }
      } catch (err) {
        if (err.message === "User does not exist" || err.message === "Invalid password") {
          setLoginError(err);
        } else {
          setErrors(err.message || "Something went wrong");
        }
    }
  };
}

  return (
    <div className={style.container}>
      <Headers />
      <div className={style.conte_comple}>
      <div className={style.logii}>
        <div className={style.bien}>
          <h3 className={style.bienvenido} >welcome</h3>
          <h5 className={style.init}>Login and Enjoy</h5>
      </div>
      </div>
    <div className={style.form_conte}>
      

        <div className={style.tituloH}>
          <h1 className={style.titulo}>
            Login to your account
          </h1>
        </div>
        <div >
          <form onSubmit={handleSubmit} className={style.form} >
          <div>
          <div className={style.div_email}>
              <label className={style.label}>
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
              className={style.input}
            />
           {errors.email && <p className={style.error}>{errors.email}</p>}
            
            </div>
            <div className={style.div_pass}>
              <label className={style.label}>
                Password
              </label>
            </div>

            <div className={style.pass}>
              <div>
              <input
                onChange={handleUser}
                type={seePassword ? "text" : "password"}
                placeholder="Password..."
                name="password"
                value={user.password}
                autoComplete="off"
                className={style.input}
              />  
            </div>
            </div>

            <button
              type="submit"
              className={style.btn_login}
            >
              LOGIN
            </button>
            {loginError && <p className="error">{loginError}</p>}
            
            <p className="">{control}</p>
          </form>

          </div>
          
          <div className={style.divv}>      
          <p className={style.registro}>
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
            className={style.cambio}
          >
            I forgot my password
          </Link>
        </div>
        </div>
        </div>

 </div>
 
    
  );
}
