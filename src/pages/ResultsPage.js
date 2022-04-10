import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Products from "../components/Products.js";
import Spinner from "../components/Spinner.js";
import SearchBar from "../components/SearchBar.js";
import styles from "./ResultsPage.module.css";
import CurrencySelector from "../components/CurrencySelector.js";
import { Link } from "react-router-dom";
import pic from "../logo/pricecomparator.png";
import { FaUserCircle } from "react-icons/fa";
import LogoutDisplay from "../components/logoutdisplay.js";
import axios from 'axios';

const ResultsPage = (props) => {
  const [currency, setCurrency] = useState("USD");
  const currenciesHandler = (currency) => {
    setCurrency(currency);
  };
  const saved = JSON.parse(localStorage.getItem("user"));

  let { searchWord } = useParams();
  let { category } = useParams();
  const [data, setData] = useState([]);
  const [content, setContent] = useState(false);
  const fetchData = () => {
    return axios.get(`http://localhost:8080/${searchWord}&${category}`)
      .then(data => {
         data.map((dat)=>{
                   if(dat.title.length>20){
                     // data.title=data.title.substring(0,200);
                     dat.set('title',dat.title.substring(0,20));
                   }
 setData(data);
                 });
                setContent(true);
      })
  //   return fetch(`http://localhost:8080/${searchWord}&${category}`)
  //     .then((response) => response.json())
  //     .then((data)=>{
  //       // data.map((dat)=>{
  //       //   if(dat.title.length>20){
  //       //     // data.title=data.title.substring(0,200);
  //       //     dat.set('title',dat.title.substring(0,20));
  //       //   }
  //       setData(data);
  //       // })
  //       setContent(true);
  //     }/*console.log(data)*/ );

  };
  console.log(data);

  useEffect(() => {
    // let isMounted = true;
    // if (isMounted)
    setContent(false);

    fetch(`http://localhost:8080/${searchWord}&${category}`)
      .then((response) => response.json())
      .then((data) => {
        // data.map((dat)=>{
        //   if(dat.title.length>20){
        //     // data.title=data.title.substring(0,200);
        //     dat.set('title',dat.title.substring(0,20));
        //   }
        setData(data);
        // })
        setContent(true);
      });
  }, [searchWord, category]);

  return (
    <div>
      <header className={styles.header}>
        <h3>
          <Link
            to={"/"}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <img className={styles.logo} src={pic} alt="logo" />
          </Link>
        </h3>
        <div className={styles.currency}>
          <CurrencySelector
            currency={currency}
            currenciesHandler={currenciesHandler}
          />
        </div>
        <div className={styles.searchbar}>
          <SearchBar />
        </div>
        {saved!=null?<LogoutDisplay></LogoutDisplay>:null}
      </header>
      <div></div>
      {/* <div>{searchWord}</div>
      <div>{category}</div> */}
      <section className={styles.content}>
        {content ? (
          <Products currency={currency} products={data} />
        ) : (
          <Spinner />
        )}
      </section>
      {/* {content?<Product/>:<Spinner/>} */}
      {/* <Product/>     */}
      {/* {data.map(product =><div key={product.id}>
          <img src={product.image}/>
      </div>)} */}
    </div>
  );
};

export default ResultsPage;
