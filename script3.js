document
  .querySelector(".signup-form")
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
      let storedUser = localStorage.getItem("user");

      if (storedUser) {
        let userData = JSON.parse(storedUser);

        if (login === userData.login && password === userData.password) {
          alert("Tizimga muvaffaqiyatli kirdingiz!");
          window.location.href = "./dashboard.html";
        } else {
          alert("Login yoki parol noto'g'ri!");
        }
      } else {
        alert("Bunday foydalanuvchi mavjud emas. Iltimos, ro'yxatdan o'ting!");
      }
    }
  });
