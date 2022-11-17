const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_INFO_URL25801 = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
//Mientras no loguee no va a index
let passedThroughLogin = sessionStorage.getItem("login");


if(!passedThroughLogin)
{
    window.location = "login.html";
} else {      /*En un if, si no pasa por login, vuelve a login, sino el id usuario del index <a> y agarra el item user, que lo cargué anteriormente y lo coloca*/ 
  document.getElementById("dropdownMenuButton1").innerHTML = sessionStorage.getItem("user");
  
}
//usuario

function logout()
{
    sessionStorage.removeItem("user");
    sessionStorage.setItem("login", "");
    window.location = "index.html";
};

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};


function getCartList(){
  let productCartList = localStorage.getItem("productCartList");
    if (!productCartList){
        productCartList = [];
    }else{
        productCartList = JSON.parse(productCartList);
    }
    return productCartList;
}