import { Link } from "react-router-dom";
import { BsFillBagFill } from "react-icons/bs";
import './Header.css'
export default function Headers() {
  return (
    <div className="cont-header">
      <div className="port">
        <div>
        <h3 className="title">Portfolio</h3>
        </div>
        <div className="bs">
        <BsFillBagFill />
        </div>
      </div>
      <div className="div-button">
      <div>
        <Link to='/home'>
          <button className="button-inicio" href="">
            Continue
        </button>
        </Link>
        </div>
        <div>
        <Link to='/register'>
          <button className="register">Register</button>
        </Link>
      </div>
      </div>
    </div>
  );
}
