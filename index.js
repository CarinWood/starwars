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

fetchStarwars(6)
  .then((name) => console.log(name))
  .catch((error) => console.error("Error", error));
