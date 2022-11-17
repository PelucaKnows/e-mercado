let currentSubtotals = []; //Subtotales actuales mostrados en el listado (en orden según orden los artículos)
let currentQuantity = []; //Cantidad actual de items por artículos ya sea seleccinados o cargados del JSON (en orden según orden los artículos)
let cartContent = [];
let rateForShipping;
let currentTypeOfPayment = "";
const DOLAR = 40;
//currentQuantity = JSON.parse(localStorage.getItem("catID", "productID"));

function refreshCosts(rate) {
  ///*La llama el evento onclick al seleccionar un nuevo tipo de envio y  actualiza //currentRateForShipping. Luego vuelve a imprimir costos*/
  rateForShipping = rate;
  document.getElementById("costos").innerHTML = htmlCosts();
}
function refreshQuantity() {
  for (let i = 0; i < currentQuantity.length; i++) {
    currentQuantity[i] = document.getElementById("cant" + i).value;
  }
  refreshSubtotal();
}

/*Actualiza los subtotales directamente al cambiar las cantidades*/
function refreshSubtotal() {
  for (let i = 0; i < currentQuantity.length; i++) {
    currentSubtotals[i] =
      cartContent[i].currency == "USD"
        ? cartContent[i].cost * currentQuantity[i]
        : (cartContent[i].cost / 40) * currentQuantity[i];
    document.getElementById("subtotalTabla" + i).innerHTML =
      "US$ " + currentSubtotals[i];
  }
}

/*Devuelve html que formará la seección Artículos*/
function htmlArticulos() {
  cartContent = getCartList();
  for (let i = 0; i < cartContent.length; i++) {
    currentQuantity[i] = 1;
  }
  let htmlContentToAppend = "";
  htmlContentToAppend += `
        <table border="0">
            <thead>
            <tr style="border-bottom:0.5px solid grey">
                <th></th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
            </thead>
            <tbody>
        `;
  /*Para poder acceder a cualquier número de cantidades y subtotales se nombra de manera flexible estos campos
    (cant0 cant1 cant2 etc y subtotalTabla0 subtotalTabla1 subtotalTabla2 etc)*/
  for (let i = 0; i < cartContent.length; i++) {
    currentSubtotals[i] =
      cartContent[i].currency == "USD"
        ? cartContent[i].cost * currentQuantity[i]
        : (cartContent[i].cost / 40) * currentQuantity[i];
    htmlContentToAppend +=
      `
            <tr>
                <td><img class="imgArticulo" src="${cartContent[i].images[0]}"></td>
                <td><p>${cartContent[i].name}</p></td>
                <td><p>` +
      "US$ " +
      (cartContent[i].currency == "USD"
        ? cartContent[i].cost
        : cartContent[i].cost / DOLAR) +
      `</p></td>
                <td><input id="cant${i}" type="number"  value="${currentQuantity[i]}" oninput="refreshQuantity()" min="1"></td>
                <td><p id="subtotalTabla${i}">US$ ${currentSubtotals[i]}</p></td>
            </tr>
        `;
  }
  htmlContentToAppend += `
            <tbody>
        </table>`;
  return htmlContentToAppend;
}

function htmlCosts() {
  let htmlContentToAppend = "";
  let subtotal = 0;
  for (let i = 0; i < currentSubtotals.length; i++) {
    subtotal += currentSubtotals[i];
  }
  htmlContentToAppend += `
    <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col">
                <p>Subtotal</p>
            </div>
            <div class="col">
                <p>US$ ${subtotal}</p>
            </div>
        </div>
    </div>
    <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col">
                <p>Envío</p>
            </div>
            <div class="col">
                <p>U$S${/*parseInt*/ Math.round(subtotal * rateForShipping)}</p>
            </div>
        </div>
    </div>
    <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col">
                <p>Total</p>
            </div>
            <div class="col">
                <p>US$ ${
                  /*parseInt*/ Math.round(subtotal * (1 + rateForShipping))
                }</p>
            </div>
        </div>
    </div>
    `;

  return htmlContentToAppend;
}

//función que habilita o desabilita los campos modal:
function paymentType(type) {
  if (type == "creditcard") {
    document.getElementById("cc-number").removeAttribute("disabled");
    document.getElementById("cc-expiration").removeAttribute("disabled");
    document.getElementById("cc-cvv").removeAttribute("disabled");
    document.getElementById("ac-number").setAttribute("disabled", "enable");

    document.getElementById("ac-number").value = "";

    currentTypeOfPayment = "creditcard";
    document.getElementById("payType").innerHTML = "Tarjeta de Crédito";
  }
  if (type == "transfer") {
    document.getElementById("cc-number").setAttribute("disabled", "enable");
    document.getElementById("cc-expiration").setAttribute("disabled", "enable");
    document.getElementById("cc-cvv").setAttribute("disabled", "enable");
    document.getElementById("ac-number").removeAttribute("disabled");

    document.getElementById("cc-number").value = "";
    document.getElementById("cc-cvv").value = "";
    document.getElementById("cc-expiration").value = "";

    currentTypeOfPayment = "transfer";
    document.getElementById("payType").innerHTML = "Transferencia Bancaria";
  }
}
function finalizarCompra() {
  let adress1 = document.getElementById("street").value == "";
  let adress2 = document.getElementById("number").value == "";
  let adress3 = document.getElementById("cross").value == "";

  let transfer = document.getElementById("ac-number").value == "";

  let card1 = document.getElementById("cc-number").value == "";
  let card2 = document.getElementById("cc-expiration").value == "";
  let card3 = document.getElementById("cc-cvv").value == "";

  let delivery = !(
    document.getElementById("delivery1").checked ||
    document.getElementById("delivery2").checked ||
    document.getElementById("delivery3").checked
  );

  let isTransfer = currentTypeOfPayment == "transfer";
  let isCreditcard = currentTypeOfPayment == "creditcard";
    
  if ((isCreditcard || transfer) && (isTransfer || card1 || card2 || card3)){
    document.getElementById("errorModal").className += "invalid-feedback d-block";
    }
  
    if (
    delivery ||
    adress1 ||
    adress2 ||
    adress3 ||
    ((isCreditcard || transfer) && (isTransfer || card1 || card2 || card3))
  ) {
    alert("Faltan completar campos");
    const forms = document.getElementsByClassName("needs-validation");
    forms[0].classList.add("was-validated");
  } else {
    alert("Compra realizada con éxito");
    document.getElementById("errorModal").className += "none";
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  // getJSONData(CART_INFO_URL25801).then(function(resultObj){
  //     if (resultObj.status === "ok"){
  //         cartContent = resultObj.data.articles;
  //         for (let i = 0; i < cartContent.length; i++) {
  //             currentQuantity[i] = cartContent[i].count;
  //         }
  document.getElementById("articulos").innerHTML = htmlArticulos();
  document.getElementById("costos").innerHTML = htmlCosts();
});
//     });
// })
