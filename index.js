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
let next = "";
let previous = "";
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

async function fetchStarwars(url) {
  spinner.style.display = "block";
  characterList.style.display = "none";
  try {
    const response = await fetch(url);
    const data = await response.json();
    spinner.style.display = "none";
    characterList.style.display = "block";
    characterData = data.results;
    for (const character in characterData) {
      console.log(characterData[character].name);
    }

    next = data.next;
    previous = data.previous;
    for (let i = 0; i < 10; i++) {
      characterList.children[i].innerText = data.results[i].name;
    }
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

function forward() {
  if (num === 9) return;
  for (let i = 0; i < 10; i++) {
    characterList.children[i].classList.remove("dark");
  }
  num++;
  page.innerText = num;
  console.log(num);
  fetchStarwars(next);
}

function setInitialData() {
  fetchStarwars(baseUrl);
}

function back() {
  if (num === 1) return;
  for (let i = 0; i < 10; i++) {
    characterList.children[i].classList.remove("dark");
  }

  num--;
  page.innerText = num;

  fetchStarwars(previous);
}

setInitialData();
rightArrow.addEventListener("click", forward);
leftArrow.addEventListener("click", back);

let first = characterList.children[0].addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[0].classList.add("dark");
  fetchCharacterDetails(0);
 
});

let second = characterList.children[1].addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    characterList.children[i].classList.remove("dark");
  }
      fetchCharacterDetails(1);
});

let third = characterList.children[2].addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[2].classList.add("dark");
      fetchCharacterDetails(2);
});

let fourth = characterList.children[3].addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[3].classList.add("dark");
  
      fetchCharacterDetails(3);
});

let fifth = characterList.children[4].addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[4].classList.add("dark");
      fetchCharacterDetails(4);
});

let sixth = characterList.children[5].addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[5].classList.add("dark");
      fetchCharacterDetails(5);
});

let seventh = characterList.children[6].addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[6].classList.add("dark");
      fetchCharacterDetails(6);
});

let eigth = characterList.children[7].addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[7].classList.add("dark");
      fetchCharacterDetails(7);
});

let nineth = characterList.children[8].addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[8].classList.add("dark");
      fetchCharacterDetails(8);
});

let tenth = characterList.children[9].addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    characterList.children[i].classList.remove("dark");
  }
  characterList.children[9].classList.add("dark");
      fetchCharacterDetails(9);
});
