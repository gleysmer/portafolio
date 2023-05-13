import styled from "styled-components";
import PasswordReset from "./components/ActPassword/PasswordReset";
import Reset from "./components/ActPassword/Reset";

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import FormRegister from "./components/FormRegister/FormRegister";
import Dashboard from "./components/Dashboard/Dashboard";
import RutePrivate from "./components/Dashboard/RutePrivate";


function App() {

  
  // console.log('userrrrrr', user)
  
  
  const datos = window.localStorage.getItem("user-log");
        const Value = JSON.parse(datos)?.data_user;
  

    return (
    //  
   
    
    <Container>
      <Banner>
        
      <Routes>

      <Route exact path="/" element={<Login />} />
      <Route exact path="/home" element={<Home />} />
      <Route path="/passwordReset" element={<PasswordReset />} />
      <Route path="/reset" element={<Reset />} />
      <Route exact path="/register" element={<FormRegister />} />
      {/* <Route exact path="/dashboard" element={ <Dashboard /> } /> */}
   
      <Route element={ <RutePrivate />}>
        <Route exact path="/dashboard" element={ <Dashboard /> } />
      </Route>
    
      </Routes>
      </Banner>
    </Container>
    
     )}

export default App;

const Container = styled.div``;
const Banner = styled.div`
  background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
  height: 100vh;
  @media (max-width: 640px) {
    height: 100%;
    padding-bottom: 2rem;
  }
`;

// const LightColor = styled.div`
//   background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
// `;
