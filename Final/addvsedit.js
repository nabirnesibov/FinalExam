let BASE_URL = "http://localhost:8000/cards";
let FAVS_URL = "  http://localhost:8000/favs";

let id = new URLSearchParams(window.location.search).get("id");

let title = document.querySelector("#title");
let content = document.querySelector("#name");
let price = document.querySelector("#price");
let photo = document.querySelector("#photo");
let form = document.querySelector("form");
let formBtn = document.querySelector("#formBtn");

if (id) {
  formBtn.innerHTML = "Edit";

  async function getData() {
    const res = await axios(`${BASE_URL}/${id}`);
    const data = await res.data;
    title.value = data.title;
    content.value = data.content;
    price.value = data.price;
  }
  getData();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (id) {
    editElement();
  } else {
    addElemet();
  }
});

async function editElement() {
  let obj = {
    title: title.value,
    content: content.value,
    price: price.value,
    photo: photo.value
      ? `./assets/images/${photo.value.split("\\")[2]}`
      : "./assets/img/featured_1.jpg",
  };

  const res = await axios(FAVS_URL);
  const data = await res.data;
  let check = data.find((item) => item.id == id);
  if (check) {
    await axios.patch(`${FAVS_URL}/${id}`, obj);
  }
  await axios.patch(`${BASE_URL}/${id}`, obj);
  window.location = "home.html";
}

async function addElemet() {
  let obj = {
    title: title.value,
    content:content.value,
    price: price.value,
    photo: photo.value
      ? `./assets/images/${photo.value.split("\\")[2]}`
      : "./assets/img/featured_1.jpg",
  };
  await axios.post(BASE_URL, obj);
  window.location = "home.html";
}
