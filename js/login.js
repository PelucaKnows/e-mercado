function autenticar()
{
    let email = document.getElementById("email");
    sessionStorage.setItem("user", email.value);
    let password = document.getElementById("password");
    if((email.value !== "") && (password.value !== ""))
    {
        sessionStorage.setItem("login", true);
        window.location = "index.html";
    }
}
