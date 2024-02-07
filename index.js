let spinner = document.querySelector(".spinner");
spinner.style.display = "none";
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
let leftArrow = paginationArea.children[0];
let page = document.querySelector(".page");
let num = 1;

async function fetchDataAndUpdateDOM(startIndex, endIndex) {
  spinner.style.display = "block";
  for (let i = startIndex; i <= endIndex; i++) {
    try {
      const name = await fetchStarwars(i);
      characterList.children[i - startIndex].innerText = name;
    } catch (error) {
      console.error("Error", error);
    }
  }
  spinner.style.display = "none";
}

function forward() {
  if (num === 8) {
    page.innerText = 8;
  } else {
    num++;
    page.innerText = num;
  }

  const startIndex = (num - 1) * 6 + 1;
  const endIndex = num * 6;
  fetchDataAndUpdateDOM(startIndex, endIndex);
}

function back() {
  if (num === 1) {
    page.innerText = 1;
  } else {
    num--;
    page.innerText = num;
  }

  const startIndex = (num - 1) * 6 + 1;
  const endIndex = num * 6;
  fetchDataAndUpdateDOM(startIndex, endIndex);
}

rightArrow.addEventListener("click", forward);
leftArrow.addEventListener("click", back);
