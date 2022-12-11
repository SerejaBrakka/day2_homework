let wrapper = document.querySelector(".wrapper");
const DB = "SerejaBrakka";

//MODAL
const modal = document.querySelector("#modal");

function closeModal() {
  modal.classList.toggle("closed");
  modal.innerHTML = "";
}

let changedCat = {};

function changeCatInfo(id) {
  fetch(`https://cats.petiteweb.dev/api/single/${DB}/update/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(changedCat),
  })
    .then((res) => res.json())
    .then((json) => alert(json.message));
}
function changeDescription(value) {
  changedCat.description = value;
}
function changeImg(value) {
  changedCat.image = value;
}
function changeModal(cat) {
  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "afterbegin",
    `<div class ='cardModal' style='display:flex;flex-direction:column'>
    <p>Можно менять описание и фото</p>
    <input placeholder = ${cat.description}  value = ${cat.description} onchange = 'changeDescription(value)'>
    <input placeholder = 'ссылка на новую картинку'  value = ${cat.image}onchange = 'changeImg(value)'>
    <img src =${cat.image} alt ='sorry image not fount'>
    <button onclick= 'changeCatInfo(${cat.id})'>Редактировать</button>
    <button onclick = 'closeModal()'>Закрыть</button>
    </div>`
  );
}
function getCatInfo(id) {
  fetch(`https://cats.petiteweb.dev/api/single/${DB}/show/${id}`)
    .then((res) => res.json())
    .then((res) => {
      modal.classList.toggle("closed");
      modal.insertAdjacentHTML(
        "afterbegin",
        `<div class='cardModal'>
        <h1>${res.name}</h1>
        <p>id: ${res.id}</p>
        <p>${res.description}</p>
        <img src = ${res.image} alt='sorry image not found'/>
        <button onclick = 'closeModal()'>Закрыть</button>
        <button onclick = 'deleteCat(${res.id})'>Удалить</button>
        <button onclick = 'changeModal(${JSON.stringify(
          res
        )})'>Редактировать</button>
        </div>`
      );
    });
}

//GET ALL CAT
function getCat(cat) {
  return `<div class = 'card' onclick = 'getCatInfo(${cat.id})'>
  <h2>${cat.name}</h2>
  <p>id : ${cat.id}</p>
  <img src = ${cat.image} class='img' alt='sorry image not found'/></div>`;
}
fetch(`https://cats.petiteweb.dev/api/single/${DB}/show/`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    wrapper.insertAdjacentHTML(
      "afterbegin",
      data.map((cat) => getCat(cat)).join("")
    );
  });

let inputName = document.querySelector(".inputName");
inputName.onchange = function () {
  cat.name = inputName.value;
};
let inputDescription = document.querySelector(".inputDescription");
inputDescription.onchange = function () {
  cat.description = inputDescription.value;
};
let inputImg = document.querySelector(".inputImg");
inputImg.onchange = function () {
  cat.image = inputImg.value;
};

const addButton = document.querySelector(".addButton");

let cat = {
  id: Date.now(),
};
function addCat() {
  fetch(`https://cats.petiteweb.dev/api/single/${DB}/add/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cat),
  })
    .then((res) => res.json())
    .then((json) => alert(json.message))
    .then(() => window.location.reload());
  localStorage.setItem(`${cat.id}`, JSON.stringify(cat));
}
addButton.addEventListener("click", addCat);

// DELETE CAT

function deleteCat(catID) {
  fetch(`https://cats.petiteweb.dev/api/single/${DB}/delete/${catID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => alert(json.message))
    .then(() => window.location.reload());
}
