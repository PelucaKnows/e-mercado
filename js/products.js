///Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//FILTRADO PRODUCTOS
const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_SOLD_QTTY = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let products_Array = [];
const searchInput = document.querySelector("[data-search]");

//Función Buscador
searchInput.addEventListener("input", (e) => {
  clearFilterInput(); // PARA BORRAR EL FILTRO MIN MAX SI SE HACE BUSQUEDA RAPIDA
  const value = e.target.value;
  function filterByText(product) {
    if (product.name.toLowerCase().includes(value.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }
  currentProductsArray = products_Array.filter(filterByText);
  showProductsList();
});
//Función Ordenar
function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_SOLD_QTTY) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}
/*const autos_URL =
"https://japceibal.github.io/emercado-api/cats_products/101.json";*/
//Función que muestra el array productos
function showProductsList() {
  let htmlContentToAppend = "";
  if (currentProductsArray.length == 0) {
    document.getElementById("container2").innerHTML =
      "No se encontraron productos que cumplan estos requisitos.";
  }
  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];
    const productID = product.id;
    htmlContentToAppend +=
      `
          <a onClick="onProductClick(${productID})" class="list-group-item-action">
              <div class="list-group-item list-group-item-action">
                  <div class="row">
                      <div class="col-3">
                          <img src="` +
      product.image +
      `" alt="` +
      product.description +
      `" class="img-thumbnail">
                      </div>
                      <div class="col">
                          <div class="row">
                              <div class="d-flex w-100 justify-content-between">
                                  <h4 class="mb-1">` +
      product.name +
      `</h4> &nbsp <h4>` +
      product.currency +
      `</h4><h4>` +
      product.cost +
      `</h4>
                                  <small class="text-muted">` +
      product.soldCount +
      ` vendidos</small>
                              </div>
                          </div>
                          <div class="row">
                              <h6>` +
      product.description +
      `</h6>
                          </div>
                      
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
          </a>
          `;
    document.getElementById("container2").innerHTML = htmlContentToAppend;
  }
}
//SET PRODUCT ID

function onProductClick(id) {
  //console.log(id);
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}


//Ordena y muestra(cuando se apreta botón)
function sortAndShowProducts(sortCriteria, products_Array) {
  currentSortCriteria = sortCriteria;

  if (products_Array != undefined) {
    currentProductsArray = products_Array;
  }

  currentProductsArray = sortProducts(
    currentSortCriteria,
    currentProductsArray
  );

  //Muestro las categorías ordenadas
  showProductsList(currentProductsArray);
}
//Limpia el filtro vacía
function clearFilterInput() {
  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";

  currentProductsArray = products_Array;
}

document.addEventListener("DOMContentLoaded", async function (e) {
  //document.getElementById("container_p-5").innerHTML = "hola";
  const catID = localStorage.getItem("catID");
  if (!catID) {
    showError();
  } else {
    const url = `${PRODUCTS_URL}${catID}.json`;//String Interpolation. Variables dentro de los strings con llaves y signos de pesos.
    try {
      let resultObj = await getJSONData(url);
      if (resultObj.status === "ok") {
        products_Array = resultObj.data.products;
        currentProductsArray = products_Array;
        showProductsList();
      } else if (resultObj.status === "error") {
        console.error(resultObj.data);
        showError();
      }
    } catch (errormsg) {
      showError();
      console.error(errormsg);
    }
  }
  // FILTRO
  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_COST);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_COST);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_PROD_SOLD_QTTY);
  });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      clearFilterInput();
      showProductsList();
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      let minCost = undefined;
      let maxCost = undefined;
      searchInput.value = "" //Cuando ponemos filtro borramos búsqueda rápida.
      //Obtengo el mínimo y máximo de los intervalos para filtrar por precio de los productos
      minCost = document.getElementById("rangeFilterCountMin").value;
      maxCost = document.getElementById("rangeFilterCountMax").value;

      if (minCost != undefined && minCost != "" && parseInt(minCost) >= 0) {
        minCost = parseInt(minCost);
      } else {
        minCost = undefined;
      }

      if (maxCost != undefined && maxCost != "" && parseInt(maxCost) >= 0) {
        maxCost = parseInt(maxCost);
      } else {
        maxCost = undefined;
      }
      function filterByCost(product) {
        let isFiltered = true;
        if (maxCost < minCost){ // Caso borde, si costo maximo es menor que el mínimo. No retorna nada.
        return false 
        }


        if (minCost != undefined) {
            isFiltered = (product.cost > minCost) // Se filtra si precio es mayor al costo min
        }
        if (maxCost != undefined) {
          isFiltered = (product.cost < maxCost) //Devuelvo Booleano
        }
        return isFiltered;
      }

      currentProductsArray = products_Array.filter(filterByCost);
      showProductsList();
    });
});

function showError() {
  document.getElementById("container2").innerHTML =
    "Hemos tenido problemas técnicos, ya estamos trabajando en la solución";
}
