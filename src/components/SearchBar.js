import { FaSearch, FaCaretDown } from "react-icons/fa";
import { useState } from "react";

import styles from "./SearchBar.module.css";
import { Link } from "react-router-dom";
const CATEGORIES = [
  "All",
  "Electronics",
  "Boys Fashion",
  "Computers",
  "Video Games",
];
const SearchBar = () => {
  const [display, setDisplay] = useState("none");
  const [category, setCategory] = useState("All");
  const [searchWord, setSearchWord] = useState("");

  const inputHandler = (event) => {
    setSearchWord(event.target.value);
  };

  function menuHandler() {
    if (display === "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  }
  const categoriesHandler = (event) => {
    setCategory(event.target.innerHTML);
    setDisplay("none");
  };

  return (
    //  <div class={styles["wrapper"]}>
    <div className={styles["search_box"]}>
      <div className={styles["dropdown"]}>
        <div className={styles["default_option"]}>
          <span>{category}</span>
          <FaCaretDown size="1.5rem" color="blue" onClick={menuHandler} />
          {/* <FontAwesomeIcon icon={faSolid,faCaretDown} /> */}
        </div>

        <ul style={{ display: display }}>
          {CATEGORIES.map((category) => (
            <li key={category} onClick={categoriesHandler}>
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles["search_field"]}>
        <input
          onChange={inputHandler}
          type="text"
          className={styles["input"]}
          placeholder="Search"
        ></input>
        {searchWord.trim().length>0?<Link to={`/results/${category}/${searchWord}`}>
          <FaSearch className={styles["fas"]} />
          
        </Link>:<FaSearch className={styles["fas"]} />}
        {/* <FontAwesomeIcon icon={faSearch} className={styles["fas"]}></FontAwesomeIcon> */}
      </div>
    </div>
    // </div>
  );
};
export default SearchBar;
