import { Link } from "react-router-dom";
import { BsFillBagFill } from "react-icons/bs";
import styles from './Header.module.css';
export default function Headers() {
  return (
    <div className={styles.cont_header}>
      <div className={styles.port}>
        <div>
        <h3 className={styles.title}>Portfolio</h3>
        </div>
        <div className={styles.bs}>
        <BsFillBagFill />
        </div>
      </div>
      <div className={styles.div_button}>
      <div>
        <Link to='/home'>
          <button className={styles.button_inicio} href="">
            Continue
        </button>
        </Link>
        </div>
        <div>
        <Link to='/register'>
          <button className={styles.register}>Register</button>
        </Link>
      </div>
      </div>
    </div>
  );
}
