import SearchBar from "../components/SearchBar";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import pic from "../logo/pricecomparator.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();

  const saved = JSON.parse(localStorage.getItem("user"));
  console.log(saved);
  const logout = () => {
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
  };
  return (
    <div className={styles.homescreen}>
      <img className={styles.logo} src={pic} alt="logo" />
      <div className={styles.searchbar}>
        <SearchBar />
      </div>
      <p>
        Are you looking for a product with the cheapest price? start searching
        now
      </p>
      {saved == null ? (
        <div className={styles.registration}>
          <button
           className="btn btn-secondary btn-block">
            {" "}
            <Link
              to={"/auth/signup"}
              style={{ color: "white", textDecoration: "inherit" }}
            >
              sign up{" "}
            </Link>
          </button>
          <p>or</p>
          <button
           className="btn btn-secondary btn-block">
            <Link
              to={"/auth/signin"}
              style={{ color: "white", textDecoration: "inherit" }}
            >
              login
            </Link>
          </button>
        </div>
      ) : (
        <div className={styles.registration}>
          <button
           className="btn btn-secondary btn-block"
            
            onClick={logout}
          >
           {` Log Out ${saved.username.toUpperCase()}`}
          </button>
        </div>
      )}
    </div>
  );
};
export default HomePage;
