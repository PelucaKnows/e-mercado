let product = {};
let products = {};
let comments = [];
let relatedProductsImages = [];


function average(comments)
{
    let result = 0;
    for (let i = 0; i < comments.length; i++) {
        result += comments[i].score;
    }
    return (result/comments.length).toFixed(1);
}

function returnImagesGalleryCode(images) {

    let htmlContentToAppend = "";
    for (let i = 0; i < images.length; i++) {
        let imageSrc = images[i];
        htmlContentToAppend += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="${imageSrc}" alt="">
                </div>
            </div>
        `
    }
    return htmlContentToAppend;
};
function returnRelatedProductsCode(products) {
    let htmlContentToAppend = `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">`;
  products.forEach((product, index) => {
    htmlContentToAppend += `
    <div class="carousel-item ${(index == 0)? "active": ""}">
        <img onClick="onProductClick(${product.id})" src="${product.image}" class="d-block w-100 product-card" alt="${product.name}">
    </div>
    
    
        `    
  });

  htmlContentToAppend += `</div> <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>

</div>`
    return htmlContentToAppend;
}

function onProductClick(id) {
    //console.log(id);
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
  }


/*Cada una de las siguientes son disparadas al clickear sobre una estrella actualiza en pantalla el termómetro estrella al seleccionado*/
function star(score) {
    sessionStorage.setItem("selectedStarRating", true);
    document.getElementById("starRating").innerHTML = returnStarRatingCode(score, true);
}

/*Genera y devuelve códigp para impimir puntuación estrella. Si isClickable es true (para cuando se utiliza en publicar comentario), llevará también un onclick para actiualizarce*/
function returnStarRatingCode(score, isClickable) {
    if (isClickable){
    sessionStorage.setItem("currentScore", score);
    }
    let htmlContentToAppend = "";
    for (let j = 1; j <= 5; j++) {
        if (j <= score) {
            htmlContentToAppend += `<span class="fa fa-star checked"`;
            if (isClickable) {
                htmlContentToAppend += ` onclick="star(` + j + `)"`;
            }
            htmlContentToAppend += `></span>`;
        } else {
            htmlContentToAppend += `<span class="fa fa-star"`;
            if (isClickable) {
                htmlContentToAppend += ` onclick="star(` + j + `)"`;
            }
            htmlContentToAppend += `></span>`;
        }
    }
    return htmlContentToAppend;
}


function showCommentsList(comments) {
    let htmlContentToAppend = "";
    for (let i = 0; i < comments.length; i++) {
        let comment = comments[i];
        htmlContentToAppend += `
            <div class="row list-group-item list-group-item-action">
                <h5 class="mb-1">` + comment.user + `&nbsp&nbsp&nbsp&nbsp` + comment.dateTime + `&nbsp&nbsp&nbsp&nbsp`;

        htmlContentToAppend += returnStarRatingCode(comment.score, false);

        htmlContentToAppend += `</h5>
                <br>
                <p class="mb-1">` + comment.description + `</p>
                <br>
            </div>
        `
    }
    document.getElementById("comments").innerHTML = htmlContentToAppend;
}

/*Si ya se seleccionó la puntuación se adiciona el nuevo comentario al arreglo de comentarios y se muestran todos.
Luego se actualiza el valor medio, se resetean las estrellas, la variable que indica si ya se seleccionó la puntuación así
como el contenido del la caja de texto para el comentario*/
function upComment() {
    if (sessionStorage.getItem("selectedStarRating") == "true") {
        let nowDate = new Date();
        const newComments = {
            "score": parseInt(sessionStorage.getItem("currentScore")),
            "description": document.getElementById("comment").value,
            "user": sessionStorage.getItem("user"),
            "dateTime": nowDate.getFullYear() + `-0` + (nowDate.getMonth() + 1)  + `-` + nowDate.getDate() + ` ` + nowDate.getHours() + `:` + nowDate.getMinutes() + `:` + nowDate.getSeconds()//.toLocaleString()
        }
        comments.push(newComments);
        showCommentsList(comments);
        document.getElementById("averageScore").innerHTML = average(comments) + `/5` + `<span class="fa fa-star checked"></span>`;
        document.getElementById("starRating").innerHTML = returnStarRatingCode(0, true);
        sessionStorage.setItem("selectedStarRating", false);
        document.getElementById("comment").value = "";
    } else {
        alert("Seleccione puntuación")
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    const productID = localStorage.getItem("productID");
    const url = `${PRODUCT_INFO_URL}${productID}.json`;
    const relatedUrl = `${PRODUCTS_URL}${productID}.json`;
    getJSONData(url).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostAndCurrencyHTML = document.getElementById("productCostAndCurrency");
            let productSoldCountHTML = document.getElementById("productCount");
            let productRelatedHTML = document.getElementById("relatedProducts");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostAndCurrencyHTML.innerHTML = product.currency + ' ' + product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;
            productRelatedHTML.innerHTML = returnRelatedProductsCode(product.relatedProducts);

            //Muestro las imagenes en forma de galería
            document.getElementById("productImagesGallery").innerHTML = returnImagesGalleryCode(product.images);
            
            // getJSONData(url).then(function(resultObj) {
            //     if (resultObj.status === "ok") {
            //        products = resultObj.data;
            //         for (let i = 0; i < product.relatedProducts.length; i++) {
            //             relatedProductsImages[i] = products[product.relatedProducts[i]-1].imgSrc;
            //         }

            //         document.getElementById("relatedProducts").innerHTML = returnRelatedProductsCode(relatedProductsImages);
            //     }
            // });

        }
    });
    const urlComents = `${PRODUCT_INFO_COMMENTS_URL}${productID}.json`;
    getJSONData(urlComents).then(function(resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
            document.getElementById("averageScore").innerHTML = average(comments) + `/5` + `<span class="fa fa-star checked"></span>`;
            showCommentsList(comments);
        }
    });
    sessionStorage.setItem("selectedStarRating", false);
    document.getElementById("starRating").innerHTML = returnStarRatingCode(0, true);
});


function addProductStorage(){
  
    let productCartList = getCartList();
    //Get from local storage
    //if not exist, creat an array.
    //push to array
    // let productCartList = productID ? productID.split(',') : [];
     productCartList.push(product);
    localStorage.setItem('productCartList', JSON.stringify(productCartList));
    window.location = "cart.html";//json.parse
}
