const API = `https://fakestoreapi.com/products`;
const tBody = document.querySelector("tbody");

const getProducts = (url) => {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => showProducts(data))
    .catch((error) => {
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
  throw new Error(console.error(error));
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
        <button class="btn btn-danger">Delete</button>
      </td>
    </tr>
    `;
  });
}
