// username - mor_2314 | password - 83r5^_

const API = `https://fakestoreapi.com/products`;
const tBody = document.querySelector("tbody");

const getProducts = (url) => {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => showProducts(data))
    .catch((error) => {
      console.error(error);
      Toastify({
        text: "Invalid API URL",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #b00000, #c93d3d)",
        },
      }).showToast();
    });
};

getProducts(API);

function showProducts(data) {
  data.forEach((element) => {
    const { id, image, title, price, category, description } = element;

    tBody.innerHTML += `
    <tr>
      <td>${element.id}</td>
      <td><img src="${element.image}" alt="${element.title}" width="50" /></td>
      <td class="t-title">${element.title.slice(0, 20)}...</td>
      <td>$${element.price.toFixed(2)}</td>
      <td>${element.category}</td>
      <td>${element.description.slice(0, 120)}...</td>
      <td>
        <button class="btn btn-primary">View</button>
        <button class="btn btn-primary">Edit</button>
        <button class="btn btn-danger" onclick="deleteProduct(${id})">Delete</button>
      </td>
    </tr>
    `;
  });
}

const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");

if (openModal && closeModal && modal) {
  openModal.addEventListener("click", () => {
    modal.classList.add("show");
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
}

const elForm = document.querySelector(".form");

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const image = elForm["image"].value.trim();
  const title = elForm["title"].value.trim();
  const price = elForm["price"].value.trim();
  const category = elForm["category"].value.trim();
  const description = elForm["description"].value.trim();

  const newProduct = {
    image: image,
    title: title,
    price: price,
    category: category,
    description: description,
  };

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));

  Toastify({
    text: "Product added succesfully",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #17b000, #77c93d)",
    },
  }).showToast();

  elForm.reset();
});

function deleteProduct(id) {
  if (window.confirm("Are you sure you want to delete this product ?")) {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    Toastify({
      text: "Product deleted succesfully",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #17b000, #77c93d)",
      },
    }).showToast();
  } else {
    Toastify({
      text: "Product deletion cancelled",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #b02000, #cd2d17)",
      },
    }).showToast();
  }
}
