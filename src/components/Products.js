import styles from "./Products.module.css";
import axios from "axios";
import { MdFavoriteBorder,MdFavorite } from "react-icons/md";
import {useState} from 'react';
function Products(props) {
  const saved = JSON.parse(localStorage.getItem("user"));
  const favoriteHandler = (userData) => {
    console.log(userData);
    axios
      .patch(
        `http://localhost:8080/api/users/${saved.id}/products`,
        JSON.stringify(userData),
        {
          headers: {
            Accept: "application/json, text/plain",
            "Content-type": "application/json",
          },
        }
      )
      .catch((err) => console.log(err))
      .then((res) => {
        // if (res.status == 200) {
        //   localStorage.setItem("user",JSON.stringify({id:res.data.id,username:res.data.username,email:res.data.email}));

        //        }

        console.log(res);
        console.log(res.data);
      });
  };
  let x = props.currency;
  let cu = "$";
  switch (x) {
    case "GBP":
      x = 0.76;
      cu = "£";
      break;
    case "MAD":
      x = 9.4;
      cu = "DH";
      break;
    case "EUR":
      x = 0.889;
      cu = "€";
      break;

    default:
      x = 1;
      break;
  }
  let data = props.products.sort((a, b) => b.price - a.price);
  return (
    <section className={styles["arrival"]} id="arrival">
      <div className={styles["box-container"]}>
        {
          /*products&&*/ data.map((product) => (
            <div className={styles["box"]}>
              <div className={styles["image"]}>
                <img src={product.image} alt=""></img>
              </div>
              <div className={styles["info"]}>
                <h4>
                  {product.title.length > 120
                    ? `${product.title.substring(0, 120)}...`
                    : product.title}
                </h4>
                <div className={styles["subInfo"]}>
                  <strong className={styles["price"]}>{`${cu}${(
                    product.price * x
                  ).toFixed(2)}`}</strong>
                  {!props.isfavorites?<MdFavoriteBorder
                    size="2.5rem"
                    style={{ cursor:"pointer" }}
                    color="red"
                    onClick={() => {
                      favoriteHandler(product);
                    }}
                  ></MdFavoriteBorder>:null}

                  <a
                    target="_blank"
                    href={product.url}
                    className={styles["button3"]}
                  >
                    Source
                  </a>
                  {/* <button className={styles["button3"]} onClick={()=>{favoriteHandler(product)}}>add to favorite</button> */}
                </div>
              </div>
              <div className={styles["overlay"]}>
                {/* <a href="#" style="--i:1;" class="fas fa-heart"></a>
            <a href="#" style="--i:2;" class="fas fa-shopping-cart"></a>
            <a href="#" style="--i:3;" class="fas fa-search"></a> */}
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
}

export default Products;
