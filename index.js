let spinner = document.querySelector(".spinner");
let spinner3 = document.querySelector(".spinny-3");
spinner.style.display = "none";
spinner3.style.display = "none";
let container2 = document.querySelector(".char-attributes");
let characterList = document.querySelector(".characters");
let charName = document.querySelector(".charName");
let height = document.querySelector(".height");
let mass = document.querySelector(".mass");
let hairColor = document.querySelector(".hair");
let skinColor = document.querySelector(".skin");
let eyeColor = document.querySelector(".eye");
let birthYear = document.querySelector(".birth");
let gender = document.querySelector(".gender");
let planetName = document.querySelector(".planet-name");
let rotation = document.querySelector(".rotation");
let orbitalPeriod = document.querySelector(".orbital");
let diameter = document.querySelector(".diameter");
let climate = document.querySelector(".climate");
let gravity = document.querySelector(".gravity");
let terrain = document.querySelector(".terrain");
let characterData = {};
const baseUrl = "https://swapi.dev/api/people/";

async function fetchCharacterDetails(num) {
  charName.innerText = "";
  height.innerText = "";
  mass.innerText = "";
  hairColor.innerText = "";
  skinColor.innerText = "";
  eyeColor.innerText = "";
  birthYear.innerText = "";
  gender.innerText = "";
  document.querySelector(".spinny-spin").style.visibility = "visible";

  setTimeout(() => {
    getPlanetInfo(characterData[num].homeworld);
    document.querySelector(".spinny-spin").style.visibility = "hidden";
    charName.innerText = "Name: " + characterData[num].name;
    height.innerText = "Height:" + characterData[num].height;
    mass.innerText = "Mass: " + characterData[num].mass;
    hairColor.innerText = "Hair color: " + characterData[num].hair_color;
    skinColor.innerText = "Skin color: " + characterData[num].skin_color;
    eyeColor.innerText = "Eye color: " + characterData[num].eye_color;
    birthYear.innerText = "Birth year: " + characterData[num].birth_year;
    gender.innerText = "Gender: " + characterData[num].gender;
  }, 400);
}

async function getPlanetInfo(planet) {
  spinner3.style.display = "block";
  planetName.innerText = "";
  rotation.innerText = "";
  orbitalPeriod.innerText = "";
  diameter.innerText = "";
  climate.innerText = "";
  gravity.innerText = "";
  terrain.innerText = "";
  try {
    const res = await fetch(planet);
    const data = await res.json();
    planetName.innerText = data.name;
    rotation.innerText = "Rotation Period: " + data.rotation_period + " h";
    orbitalPeriod.innerText =
      "Orbital Period: " + data.orbital_period + " days";
    diameter.innerText = "Diameter: " + data.diameter + " km";
    climate.innerText = "Climate: " + data.climate;
    gravity.innerText = "Gravity: " + data.gravity;
    terrain.innerText = "Terrain : " + data.terrain;
    spinner3.style.display = "none";
  } catch (error) {
    console.log("Error", error);
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
    characterData[num] = data;
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
    } catch (error) {
      console.error("Error", error);
    }
  }
  spinner.style.display = "none";
  characterList.style.display = "block";
}

function forward() {
  for (let i = 0; i < 6; i++) {
    characterList.children[i].classList.remove("dark");
  }
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
  for (let i = 0; i < 6; i++) {
    characterList.children[i].classList.remove("dark");
  }
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

let first = characterList.children[0].addEventListener("click", () => {
  for (let i = 0; i < 6; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[0].classList.add("dark");
  switch (num) {
    case 1:
      fetchCharacterDetails(1);
      break;
    case 2:
      fetchCharacterDetails(7);
      break;
    case 3:
      fetchCharacterDetails(13);
      break;
    case 4:
      fetchCharacterDetails(19);
      break;
    case 5:
      fetchCharacterDetails(25);
      break;
    case 6:
      fetchCharacterDetails(31);
      break;
    case 7:
      fetchCharacterDetails(37);
      break;
    case 8:
      fetchCharacterDetails(43);
      break;
    default:
      "";
  }
});

let second = characterList.children[1].addEventListener("click", () => {
  for (let i = 0; i < 6; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[1].classList.add("dark");
  switch (num) {
    case 1:
      fetchCharacterDetails(2);
      break;
    case 2:
      fetchCharacterDetails(8);
      break;
    case 3:
      fetchCharacterDetails(14);
      break;
    case 4:
      fetchCharacterDetails(20);
      break;
    case 5:
      fetchCharacterDetails(26);
      break;
    case 6:
      fetchCharacterDetails(32);
      break;
    case 7:
      fetchCharacterDetails(38);
      break;
    case 8:
      fetchCharacterDetails(44);
      break;
  }
});

let third = characterList.children[2].addEventListener("click", () => {
  for (let i = 0; i < 6; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[2].classList.add("dark");
  switch (num) {
    case 1:
      fetchCharacterDetails(3);
      break;
    case 2:
      fetchCharacterDetails(9);
      break;
    case 3:
      fetchCharacterDetails(15);
      break;
    case 4:
      fetchCharacterDetails(21);
      break;
    case 5:
      fetchCharacterDetails(27);
      break;
    case 6:
      fetchCharacterDetails(33);
      break;
    case 7:
      fetchCharacterDetails(39);
      break;
    case 8:
      fetchCharacterDetails(45);
      break;
  }
});

let fourth = characterList.children[3].addEventListener("click", () => {
  for (let i = 0; i < 6; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[3].classList.add("dark");
  switch (num) {
    case 1:
      fetchCharacterDetails(4);
      break;
    case 2:
      fetchCharacterDetails(10);
      break;
    case 3:
      fetchCharacterDetails(16);
      break;
    case 4:
      fetchCharacterDetails(22);
      break;
    case 5:
      fetchCharacterDetails(28);
      break;
    case 6:
      fetchCharacterDetails(34);
      break;
    case 7:
      fetchCharacterDetails(40);
      break;
    case 8:
      fetchCharacterDetails(46);
      break;
  }
});

let fifth = characterList.children[4].addEventListener("click", () => {
  for (let i = 0; i < 6; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[4].classList.add("dark");
  switch (num) {
    case 1:
      fetchCharacterDetails(5);
      break;
    case 2:
      fetchCharacterDetails(11);
      break;
    case 3:
      fetchCharacterDetails(17);
      break;
    case 4:
      fetchCharacterDetails(23);
      break;
    case 5:
      fetchCharacterDetails(29);
      break;
    case 6:
      fetchCharacterDetails(35);
      break;
    case 7:
      fetchCharacterDetails(41);
      break;
    case 8:
      fetchCharacterDetails(47);
      break;
  }
});

let sixth = characterList.children[5].addEventListener("click", () => {
  for (let i = 0; i < 6; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[5].classList.add("dark");
  switch (num) {
    case 1:
      fetchCharacterDetails(6);
      break;
    case 2:
      fetchCharacterDetails(12);
      break;
    case 3:
      fetchCharacterDetails(18);
      break;
    case 4:
      fetchCharacterDetails(24);
      break;
    case 5:
      fetchCharacterDetails(30);
      break;
    case 6:
      fetchCharacterDetails(36);
      break;
    case 7:
      fetchCharacterDetails(42);
      break;
    case 8:
      fetchCharacterDetails(48);
      break;
  }
});
