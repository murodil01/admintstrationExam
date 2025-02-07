document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let login = document.getElementById("login").value.trim();
    let password = document.getElementById("password").value.trim();

    let loginError = document.getElementById("loginError");
    let passwordError = document.getElementById("passwordError");

    loginError.style.display = "none";
    passwordError.style.display = "none";

    let isValid = true;

    if (login === "") {
      loginError.style.display = "block";
      isValid = false;
    }

    if (password === "") {
      passwordError.style.display = "block";
      isValid = false;
    }

    if (isValid) {
      let userData = {
        login: login,
        password: password,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      alert("Ro'yxatdan o'tish muvaffaqiyatli!");

      window.location.href = "./signin.html";
    }
  });
