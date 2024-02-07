let spinner = document.querySelector(".spinner");
spinner.style.display = "none";
let characterList = document.querySelector(".characters");
let charName = document.querySelector(".charName");
let height = document.querySelector(".height");
let mass = document.querySelector(".mass");
let hairColor = document.querySelector(".hair");
let skinColor = document.querySelector(".skin");
let eyeColor = document.querySelector(".eye");
let birthYear = document.querySelector(".birth");
let gender = document.querySelector(".gender");
const baseUrl = "https://swapi.dev/api/people/";

async function fetchCharacterDetails(num) {
  try {
    const response = await fetch(baseUrl + num + "/");
    const data = await response.json();
    charName.innerText = "Name: " + data.name;
    height.innerText = "Height:" + data.height;
    mass.innerText = "Mass: " + data.mass;
    hairColor.innerText = "Hair color: " + data.hair_color;
    skinColor.innerText = "Skin color: " + data.skin_color;
    eyeColor.innerText = "Eye color: " + data.eye_color;
    birthYear.innerText = "Birth year: " + data.birth_year;
    gender.innerText = "Gender: " + data.gender;
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
