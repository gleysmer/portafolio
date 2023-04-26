import styled from "styled-components";


// import Services from "./components/Service/Services";
// import Projects from "./components/Projects/Projects";

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
function App() {
  return (
    //  
    
    <Container>
      <Banner>
      <Routes>
      <Route exact path="/home" element={<Home />} />
      {/* <Route exact path="/projects" element={<Projects />} />
      <Route exact path="/services" element={<Services />} /> */}
        
      </Routes>
      </Banner>
    </Container>
    
     );      
}

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
