import "./Login.css";
import { FaUserCircle, FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    e.preventDefault();
  };
  const handleClick = async (e) => {
    e.preventDefault();

    axios.post(`http://localhost:8080/auth/signin`, JSON.stringify(userData),{ headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        }})
        .catch((err) => console.log(err))
    .then(res => {
      if (res.status == 200) {
        localStorage.setItem("user",JSON.stringify({id:res.data.id,username:res.data.username,email:res.data.email}));
               navigate("/");
             }

      console.log(res);
      console.log(res.data);
    })
    // fetch("http://localhost:8080/auth/signin", {
    //   method: "POST",

    //   headers: {
    //     Accept: "application/json, text/plain",
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(userData),
    // })
    //   .catch((err) => console.log(err))
    //   .then((response) => {
    //     console.log(response);
    //     console.log(userData);
    //     if (response.status == 200) {
    //       navigate("/");
    //     }
    //   });
  };
  return (
    <div className="container">
      <div className="form-box2">
        <div className="header-form">
          <h4 className="text-primary text-center">
            <FaUserCircle style={{ fontSize: "110px" }}></FaUserCircle>
          </h4>
          <div className="image"></div>
        </div>
        <div className="body-form">
          <form onSubmit={handleClick}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FaUser></FaUser>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="username Or Email"
                name="usernameOrEmail"
                value={userData?.usernameOrEmail}
                onChange={handleChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FaLock></FaLock>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                name="password"
                value={userData?.password}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-secondary btn-block">LOGIN</button>
            <div className="message"></div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
