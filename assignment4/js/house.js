
import { bookning } from "./bookning.js"

const oneHouseContain = document.querySelector("#oneHouseContain");
const params = new URLSearchParams(window.location.search)// information om window.location.search är från https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

let houseId;
for (const [key, value] of params) {
    if (key === "id") {
        houseId = Number(value);
        break;// om idet är hittat
    }
}

async function showOnehouse() {
    try {
        const response = await fetch("./data/houses.json")
        if (!response.ok) throw new Error("Något gick fel, Kunde inte ladda huset.")
        const houses = await response.json()
        console.log(response)
        const house = houses.find(h => h.id === houseId);
           
        if (!house) {
            oneHouseContain.innerHTML = `
        <p class='error'> Huset kunde ej hittas.</p>
        <p class="backLink"><a href='index.html'> Tillbaka till alla hus.</a></p>
        `;
            return;
        }
        let scareText = ["Mysigt", "Lite läskigt", "Obehagligt", "Skräckinjagande", "Ren terror"];
        oneHouseContain.innerHTML = `
       <img src="images/${house.image}" alt="${house.name}">
       <p class="backLink"><a href='index.html'> Tillbaka till alla hus.</a></p>
    <h2>${house.name}</h2>
    <p>${house.location}</p>
    <p>${house.description}</p>
    <p>${house.pricePerNight}kr / natt</p>
     <p>Skräcknivå: ${scareText[house.scareLevel - 1]}</p>
     <p>Spöke: ${house.ghostTypes.join(", ")}</p>
      <p>Finns Wifi: ${house.hasWifi ? "Ja" : "Nej"}</p>
      <section><h3>Var ligger huset?</h3> <div id="map"></div> </section>

      <form id="filterFormHouse">

        <legend id="formTitle">Bookningformulär</legend>
        <fieldset>
            <label for="date">
                Datum:
                <input type="date" id="date" name="date" required>
            </label>

            <label for="count-day">
                Antal dagar:
                <input type="number" id="count-day" value="1" min="1" max="100" name="count-day" required>
            </label>
        </fieldset>

        <fieldset> <legend> Tillägg</legend>
            <label for="break-fast">
               Frukost (50 kr)
                <input type="checkbox" id="break-fast" name="break-fast">   
            </label>
        
            <label for="ghost-walk">
              Spökvandring (100 kr)
                <input type="checkbox" id="ghost-walk" name="ghost-walk">   
            </label>
       
           <label for="night-session">
              Nattlig seans (200 kr)
                <input type="checkbox" id="night-session" name="night-session">   
            </label>
        </fieldset>
          <fieldset>
           <label for="coupon">
              Kampanjkod:
                <input type="text" id="coupon" name="coupon">   
            </label>
        </fieldset>
         <fieldset>
           <label for="total">
            Total:
                <input type="number" id="total" name="total">   
            </label>
        </fieldset>
        <button type ="submit" id="bookBtn">Boka</button></form>

     `
     new bookning (house);
        const map = L .map("map").setView([house.coordinates.lat,house.coordinates.lng],14)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
            L.marker([house.coordinates.lat, house.coordinates.lng])
            .addTo(map)
    } catch (error) {
        oneHouseContain.innerHTML = `
        <p class='error'> Kunde inte ladda husen.</p>
      <p class="backLink"><a href='index.html'> Tillbaka till alla hus.</a></p>`;

    }

}
showOnehouse()
