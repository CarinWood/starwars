const baseUrl = 'https://swapi.dev/api/'

async function fetchStarwars() {
    try {
        const response = await fetch(baseUrl + "people/1")
        const data = await response.json()
        console.log(data)
    }
    catch (error){
        console.error("Error", error)
    }
  
}

fetchStarwars()