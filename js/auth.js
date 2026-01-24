import {users} from "./users.js"
document.addEventListener('DOMContentLoaded', () =>{
  const form =document.getElementById("loginForm")
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorMessage =document.getElementById("errorMessage")
    emailInput.addEventListener("input", () =>{
        errorMessage.textContent= "";
    })
    passwordInput.addEventListener("input", () =>{
        errorMessage.textContent= "";
    })


  form.addEventListener("submit",  (e)  =>{
  e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "" || password === "") {
        errorMessage.textContent=("Completa todos los campos");
    return;
  }
     // Buscar usuario válido
    const userFound = users.find(
      user => user.email === email && user.password === password
    );

    if (userFound) {
      sessionStorage.setItem("crudzaso_session",
        JSON.stringify(userFound)
      )
      window.location.href = "habits.html";
    } else {
     errorMessage.textContent = "Email o contraseña incorrectos";
    }
  });
});

   /*   if (passwordInput && savedPassword) {
        passwordInput.value = savedPassword;
    }

    if (emailInput === savedEmail && passwordInput ===savedPassword) {
        alert("Login successful");
        // window.location.href = "index.html";
    } else {
        alert("Invalid email or password");
    }
  if (user.value === emailInput && user.value === passwordInput) {
    sessionStorage.setItem("logueado", "true");
    window.location.href = "habits.html";
  } else {
    alert("Credenciales incorrectas");
  }
});
  /*  const
        if (emailInput && savedEmail) {
        emailInput.value = savedEmail;
    }

    if (passwordInput && savedPassword) {
        passwordInput.value = savedPassword;
    }

    if (email === savedEmail && password) {
        alert("Login successful");
        // window.location.href = "index.html";
    } else {
        alert("Invalid email or password");
    }
*/
        
    



/*/ USUARIOS QUE PUEDEN INGRESAR
const usuario = "usuario@gmail.com";
const contrasena = "123";

// VERIFICAMOS QUE SI ESTE LOGUEADO Y REDIRIGIMOS
if (sessionStorage.getItem("logueado") === "true") {
  window.location.href = "./home.html";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (user.value === "" || pass.value === "") {
    alert("Completa todos los campos");
    return;
  }

  if (user.value === usuario && pass.value === contrasena) {
    sessionStorage.setItem("logueado", "true");
    window.location.href = "./home.html";
  } else {
    alert("Credenciales incorrectas");
  }
});*/