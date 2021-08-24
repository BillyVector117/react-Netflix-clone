import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

import { logOut } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  //console.log('active user: ', user)
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
        {/*   <span>New and Popular</span>
          <span>My List</span> */}
        </div>
        <div className="right">
          <Search className="icon" />
          <span>{user.isAdmin ? "VIP" : "STANDAR"} </span>
          <Notifications className="icon" />
          <span style={{marginRight:"10px"}}>{user.username}</span>
          <img
            src={user.imagePath ? user.imagePath : "https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
            alt={user.username}
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <Link to="/settings" className="link">
                <span className="navbarmainLinks">Settings</span>
              </Link>
              <span className="navbarmainLinks" onClick={() => logOut(dispatch)} >Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
