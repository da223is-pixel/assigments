const response= await fetch("./data/houses.json")
const houses= await response.json()
console.log(response)