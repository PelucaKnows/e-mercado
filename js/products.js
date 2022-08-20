//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const autos_URL =
  "https://japceibal.github.io/emercado-api/cats_products/101.json";

function showProductsList(products_Array) {
  let htmlContentToAppend = "";
  // console.log(products_Array)
  for (let i = 0; i < products_Array.length; i++) {
    let product = products_Array[i];
    htmlContentToAppend +=
      `
            <a href="product-info.html?producto=` +
      i +
      `" class="list-group-item-action">
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
    // console.log(htmlContentToAppend)
    document.getElementById("container2").innerHTML = htmlContentToAppend;
  }
}

document.addEventListener("DOMContentLoaded", async function (e) {
  //document.getElementById("container_p-5").innerHTML = "hola";
  try {
    let resultObj = await getJSONData(autos_URL);
    if (resultObj.status === "ok") {
      const products_Array = resultObj.data.products;
      showProductsList(products_Array);
    } else if (resultObj.status === "error") {
      console.error(resultObj.data);
      showError();
    }
  } catch (errormsg) {
    showError();
    console.error(errormsg);
  }
});

function showError() {
  document.getElementById("container2").innerHTML = "Hemos tenido problemas técnicos, ya estamos trabajando en la solución";
}
