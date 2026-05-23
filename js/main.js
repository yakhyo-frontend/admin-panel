const elForm = document.querySelector(".form");
const API = `https://fakestoreapi.com/auth/login`;

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = elForm["username"].value.trim();
  const password = elForm["password"].value.trim();

  if (!username || !password) {
    Toastify({
      text: "Iltimos barcha maydonlarni toldiring",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #b00000, #c93d3d)",
      },
    }).showToast();

    return;
  }

  const userData = {
    username: username,
    password: password,
  };

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Incorrect username or password. Please try again");
      }
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        Toastify({
          text: "Login successful!",
          duration: 2000,
          close: true,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to right, #0fb000, #4dc93d)",
          },
        }).showToast();

        localStorage.setItem("userToken", data.token);

        elForm.reset();

        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      }
    })
    .catch((error) => {
      console.error("Xatolik:", error);

      Toastify({
        text: "Notogri username yoki password. Iltimos qaytadan urinib ko'ring",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #b00000, #c93d3d)",
        },
      }).showToast();
    });
});
