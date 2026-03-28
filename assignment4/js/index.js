
const filterForm = document.querySelector("#filterForm");

let houses;
let scareText;
let houseContain;

async function renderHouses() {
  try {
    const response = await fetch("./data/houses.json")
    houses = await response.json()
    scareText = ["Mysigt", "Lite läskigt", "Obehagligt", "Skräckinjagande", "Ren terror"]
    render(houses)
    horrorTextp.textContent = scareText[0];
    
    for (let house of houses) {

      for (let i = 0; i < house.ghostTypes.length; i++) {// för dropdown, med ghosttyper.
        let ghost = house.ghostTypes[i];
        let exists = false;
        for (let j = 0; j < ghostType.options.length; j++) {
          if (ghostType.options[j].value === ghost) {
            exists = true
            break;
          }
        }
        if (!exists) {
          let ghostOption = document.createElement("option")
          ghostOption.value = ghost;
          ghostOption.textContent = ghost;
          ghostType.append(ghostOption)
        }

      }
    }

  } catch (error) {
    houseContain = document.querySelector("#houseContain");
    houseContain.innerHTML = `<p class='error'> Kunde inte ladda husen.</p>`
  }
}

function render(array) {
  const houseHTML = array.map(house =>
    `<article> 
    <img src="images/${house.image}" alt="${house.name}">
    <h2>${house.name}</h2>
    <p>${house.location}</p>
    <p>${house.pricePerNight}kr / natt</p>
     <p>Skräcknivå: ${scareText[house.scareLevel - 1]}</p>

    <a href="house.html?id=${house.id}">Läs mer och boka </a>
    
    </article>`)
  const houseContain = document.querySelector("#houseContain");
  houseContain.innerHTML = houseHTML.join("");
}
renderHouses()

const maxPrice = document.querySelector("#max-price");
const horrorLevel = document.querySelector("#horror-level");
const horrorTextp = document.querySelector("#horrorText");
const ghostType = document.querySelector("#ghost-type");
const wifi = document.querySelector("#wifi");



horrorLevel.addEventListener("input", () => {
  let level = Number(horrorLevel.value);//1-5 i rangeNr.
  horrorTextp.textContent = `${scareText[level - 1]}`;
  let houseScare = houses.filter(h => h.scareLevel >= level);
  render(houseScare)
})

maxPrice.addEventListener("input", () => {
  let priceInput = Number(maxPrice.value);
  let filterPrice = houses.filter(h => h.pricePerNight == priceInput)
  if (filterPrice.length === 0) {// om inget i arrayen som filter gör matchar vosa felmedelande.
    houseContain = document.querySelector("#houseContain");
    houseContain.innerHTML = `<p class='error'> Inga hus matchar det valda priset, försök igen!</p>`
  }
  else {
    render(filterPrice)
  }
});


ghostType.addEventListener("change", () => {
  let ghostValue = ghostType.value;
  let ghostFilter = houses.filter(h => h.ghostTypes.includes(ghostValue))

  render(ghostFilter)
})

wifi.addEventListener("change", () => {
  if (wifi.checked) {
    let wifiFilter = houses.filter(h => h.hasWifi)
    render(wifiFilter)
  }
  else {
    render(houses) // alla hus när det wifi är  ej vald.
  }
})






