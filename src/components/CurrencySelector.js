import styles from './CurrencySelector.module.css';
import { FaSearch, FaCaretDown } from "react-icons/fa";
import { useState } from "react";
const CURRENCIES = [
    "USD",
    "EUR",
    "GBP",
    "MAD",
    
  ];

const CurrencySelector= (props) =>{
    const [display, setDisplay] = useState("none");
  
    const currenciesHandler = (event) => {
       props.currenciesHandler(event.target.innerHTML);
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
        <div className={styles["default_option"]}>
          <span>{props.currency}</span>
          <FaCaretDown size="1.5rem" color="blue" onClick={menuHandler} />
          {/* <FontAwesomeIcon icon={faSolid,faCaretDown} /> */}
        </div>

        <ul style={{ display: display }}>
          {CURRENCIES.map((currency) => (
            <li key={currency} onClick={currenciesHandler}>
              {currency}
            </li>
          ))}
        </ul>
      </div>



    );
}
export default CurrencySelector;