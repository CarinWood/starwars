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

function forward() {
  if (num === 8) {
    page.innerText = 8;
  } else {
    num++;
    page.innerText = num;
  }

  if (num === 2) {
    for (let i = 7; i <= 12; i++) {
      fetchStarwars(i)
        .then((name) => (characterList.children[i-7].innerText = name))
        .catch((error) => console.error("Error", error));
    
    }
  } else if (num === 3) {
    for (let i = 13; i <= 18; i++) {
        fetchStarwars(i)
        .then((name) => (characterList.children[i-13].innerText = name))
        .catch((error) => console.error("Error", error));
        
    }
  }
}

function back() {
  if (num === 1) {
    page.innerText = 1;
  } else {
    num--;
    page.innerText = num;
  }
}

rightArrow.addEventListener("click", forward);
leftArrow.addEventListener("click", back);
