import styles from "./logoutdisplay.module.css";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const LogoutDisplay = (props) => {
  const navigate = useNavigate();

  const [display, setDisplay] = useState("none");
  const saved = JSON.parse(localStorage.getItem("user"));
  const FavoritesHandler = () => {
    navigate("/favorites");
  };
  const logoutHandler = (event) => {
    axios
      .post(`http://localhost:8080/auth/signout`, {
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
      })
      .catch((err) => console.log(err))
      .then((res) => {
        if (res.status == 200) {
          localStorage.removeItem("user");
          navigate("/");
        }

        console.log(res);
        console.log(res.data);
      });
    setDisplay("none");
  };
  function menuHandler() {
    if (display == "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  }
  return (
    <div className={styles["dropdown"]}>
      {/* <div className={styles.user}>
        <FaUserCircle
          style={{ fontSize: "40px" }}
          onClick={menuHandler}
        ></FaUserCircle>
        <p>{saved.username}</p>
      </div> */}
      <div className={styles.user}>
        <GiHamburgerMenu
          style={{ fontSize: "40px" }}
          onClick={menuHandler}
        ></GiHamburgerMenu>
      </div>
      <ul style={{ display: display }}>
        <li key={"logout"} onClick={logoutHandler}>
          {`Logout ${saved.username.toUpperCase()}`}
        </li>
        {!props.isfavorites?<li key={"Favorites"} onClick={FavoritesHandler}>
          {"Favorites"}
        </li>:null}
      </ul>
    </div>
  );
};
export default LogoutDisplay;
