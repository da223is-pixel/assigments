
const filterForm = document.querySelector("#filterForm");
const maxPrice = document.querySelector("#max-price");
const horrorLevel = document.querySelector("#horror-level");
const horrorTextp = document.querySelector("#horrorText");
const ghostType = document.querySelector("#ghost-type");
const wifi = document.querySelector("#wifi");

let houses;
let scareText;
let houseContain;

async function renderHouses() {
  try {
    houseContain = document.querySelector("#houseContain");
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
    function filterAtSameTime() { // för att alla filter ska fungera samtidigt.
      let level = Number(horrorLevel.value);//1-5 i rangeNr.
      let priceInput = Number(maxPrice.value);
      let ghostValue = ghostType.value;
      let wifiChecked = wifi.checked//wifi

      const filterAllhouses = houses
        .filter(h => h.scareLevel >= level)
        .filter(h => !priceInput || h.pricePerNight <= priceInput)
        .filter(h => ghostValue === "all" || h.ghostTypes.includes(ghostValue))
        .filter(h => !wifiChecked || h.hasWifi === true)

      render(filterAllhouses)

    }

    horrorLevel.addEventListener("input", () => {
      horrorTextp.textContent = scareText[horrorLevel.value - 1];
      filterAtSameTime();
    }
    )

    maxPrice.addEventListener("input", () => {
      filterAtSameTime();
      let priceValue = Number(maxPrice.value)
      let anyMatch = false;
      for (let h of houses) {
        if (h.pricePerNight <= priceValue) {
          anyMatch = true;
          break
        }
      }
      if (!anyMatch) {
        houseContain.innerHTML = `<p class='error'> Inga hus matchar det valda priset, försök igen!</p>`
      }
    })

    ghostType.addEventListener("change", filterAtSameTime)

    wifi.addEventListener("change", filterAtSameTime)

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
    <p>Spöken: ${house.ghostTypes}</p>
     <p>Skräcknivå: ${scareText[house.scareLevel - 1]}</p>

    <button><a href="house.html?id=${house.id}">Läs mer och boka </a></button>
    
    </article>`)
  const houseContain = document.querySelector("#houseContain");
  houseContain.innerHTML = houseHTML.join("");
}
renderHouses()











