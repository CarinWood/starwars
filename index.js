let spinner = document.querySelector(".spinner");
spinner.style.display = "none";
let characterList = document.querySelector(".characters");
let height = document.querySelector(".height");

const baseUrl = "https://swapi.dev/api/people/";

async function fetchCharacterDetails(num) {
  try {
    const response = await fetch(baseUrl + num + "/");
    const data = await response.json();
    console.log(data.name);
    height.innerText = "Height:" + data.height;
    console.log(data.mass);
    console.log(data.hair_color);
    console.log(data.skin_color);
    console.log(data.eye_color);
    console.log(data.birth_year);
    console.log(data.gender);
  } catch (error) {
    console.error("Error", error);
  }
}

async function fetchStarwars(num) {
  spinner.style.display = "block";
  characterList.style.display = "none";
  try {
    const response = await fetch(baseUrl + num);
    const data = await response.json();
    spinner.style.display = "none";
    characterList.style.display = "block";
    return data.name;
  } catch (error) {
    console.error("Error", error);
    spinner.style.display = "none";
    characterList.style.display = "block";
  }
}


let paginationArea = document.querySelector(".pagination");
let rightArrow = paginationArea.children[3];
let leftArrow = paginationArea.children[0];
let page = document.querySelector(".page");
let num = 1;

async function fetchDataAndUpdateDOM(startIndex, endIndex) {
  spinner.style.display = "block";
  characterList.style.display = "none";
  for (let i = startIndex; i <= endIndex; i++) {
    try {
      const name = await fetchStarwars(i);
      characterList.children[i - startIndex].innerText = name;
      characterList.children[i - startIndex].addEventListener(
        "click",
        async () => {
          await fetchCharacterDetails(i);
        }
      );
    } catch (error) {
      console.error("Error", error);
    }
  }
  spinner.style.display = "none";
  characterList.style.display = "block";
}

function forward() {
  if (num === 8) {
    page.innerText = 8;
    return;
  } else {
    num++;
    page.innerText = num;
  }

  const startIndex = (num - 1) * 6 + 1;
  const endIndex = num * 6;
  fetchDataAndUpdateDOM(startIndex, endIndex);
}

function setInitialData() {
  fetchDataAndUpdateDOM(1, 6);
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

setInitialData();
rightArrow.addEventListener("click", forward);
leftArrow.addEventListener("click", back);
