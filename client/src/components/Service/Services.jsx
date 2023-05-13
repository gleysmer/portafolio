import React from "react";
import { MdDesignServices } from "react-icons/md";
import { FiCodesandbox } from "react-icons/fi";

import styled from "styled-components";
import Card from "./Card";
import { Slide } from "react-awesome-reveal";

const Services = () => {
  return (
    <Container id="service">
      <Slide direction="down">
        <h4>
          My <span className="green">Skill</span>
        </h4>
        <h1>What I Do</h1>
      </Slide>
      <Cards>
        <Slide direction="left">
          <Card
            Icon={MdDesignServices}
            title={"Front-end"}
            disc={`
              Tengo conocimientos en Frontend Development, utilizando lenguajes como HTML, CSS y JavaScript,
              para diseñar y programar la interfaz de usuario de una aplicación web. Además, tengo experiencia
              en el uso de frameworks como React y Redux para crear interfaces de usuario escalables y eficientes,
              gestionando el estado de la aplicación y programando componentes reutilizables. También he trabajado
              en la optimización de la experiencia de usuario, utilizando técnicas de diseño responsive y accesibilidad web. En resumen,
              mi conjunto de habilidades en Frontend me permite crear interfaces de usuario atractivas y eficientes, utilizando
              tecnologías modernas como React y Redux para lograr una experiencia de usuario óptima.`}
          />
        </Slide>
        <Slide direction="up">
          <Card
            Icon={FiCodesandbox}
            title={"Back-end"}
            disc={`Tengo experiencia en el desarrollo de aplicaciones web en el lado del servidor, utilizando tecnologías como Node.js,
             Express y Sequelize, para crear endpoints de API y gestionar la lógica de negocio de una aplicación web. También tengo conocimientos 
             en la utilización de bases de datos relacionales, en particular MySQL y PostgreSQL, para almacenar y recuperar datos de manera eficiente y segura.
              Además, he trabajado en la implementación de autenticación y autorización en la API, y en la optimización del rendimiento de la aplicación.
               En resumen, mi conjunto de habilidades en Backend Development me permite crear aplicaciones web robustas y escalables, utilizando tecnologías
                modernas como Node.js, Express, Sequelize,MySQL y PostgreSQL.`}
          />
        </Slide>
       
      </Cards>
    </Container>
  );
};

export default Services;

const Container = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0;
  @media (max-width: 840px) {
    width: 90%;
  }

  h1 {
    padding-top: 1rem;
  }
`;
const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 4rem;
  gap: 1rem;
`;
