
import React from 'react';
import styles from './Home.module.css';
import Header from '../Banner/Header';
import ProfComponent from '../Banner/ProfComponent';
import Footer from '../Footer/Footer';
import Projects from '../Projects/Projects';
import Services from '../Service/Services';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <Header />
        <ProfComponent />
      </div>
      <Services />
      <div className={styles.lightColor}>
        <Projects />
      </div>
      <div className={styles.lightColor}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;