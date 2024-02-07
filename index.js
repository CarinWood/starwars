const baseUrl = "https://swapi.dev/api/people/";

async function fetchStarwars(num) {
  try {
    const response = await fetch(baseUrl + num);
    const data = await response.json();
    return data.name;
  } catch (error) {
    console.error("Error", error);
  }
}

let characterList = document.querySelector(".characters");
let luke = document.querySelector(".luke");

for (let i = 0; i <= 6; i++) {
  fetchStarwars(i + 1)
    .then((name) => (characterList.children[i].innerText = name))
    .catch((error) => console.error("Error", error));
}

let paginationArea = document.querySelector(".pagination");
let rightArrow = paginationArea.children[3];
let page = document.querySelector(".page");
let num = 1;

function forward() {
  if (num === 8) {
    page.innerText = 8;
  } else {
    num ++
    page.innerText = num
  }
 
}

rightArrow.addEventListener("click", forward);
