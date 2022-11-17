function autenticar(event) {
  event.preventDefault();//para que no se recargue
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  
  if (email.value !== "" && password.value !== "") {
    // login ok! 
    sessionStorage.setItem("user", email.value);
    sessionStorage.setItem("login", true);
    window.location = "index.html";
  }
  const forms = document.getElementsByClassName("needs-validation");
  forms[0].classList.add("was-validated");
}
