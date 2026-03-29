export class bookning {
    constructor(house) {
        this.house = house;
        this.form = document.querySelector("#filterFormHouse");
        this.dateInput = document.querySelector("#date")
        this.daysInput = document.querySelector("#count-day")
        this.breakfast = document.querySelector("#break-fast")
        this.ghostWalk = document.querySelector("#ghost-walk")
        this.nightSession = document.querySelector("#night-session")
        this.couponInput = document.querySelector("#coupon")
        this.totalInput = document.querySelector("#total")
        this.bookBtn = document.querySelector("#bookBtn");

        this.feedbackDiv = document.createElement("div");
        this.form.after(this.feedbackDiv)

        this.form.addEventListener("input", () => this.updateTotal())
        this.form.addEventListener("submit", (event) => this.book(event))

        const today = new Date().toISOString().split("T")[0];// info om toIsoString() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
        this.dateInput.min = today;

        this.updateTotal()

    }
   
    updateTotal() {
        let days = Number(this.daysInput.value) || 1;
        let total = this.house.pricePerNight * days;
        if (this.breakfast.checked) total += 50 * days;
        if (this.ghostWalk.checked) total += 100 * days;
        if (this.nightSession.checked) total += 200 * days;
        if (this.couponInput.value === "ghost") { total= total*0.8}// för 20 rabatt
            this.totalInput.value = total;

    }

    book(event) {
        event.preventDefault();
        let addons = "";
        if (this.breakfast.checked) addons+= "Frukost, " 
         if (this.ghostWalk.checked) addons+= "Spökvandring, " 
          if (this.nightSession.checked) addons+= "Nattlig seans, " 
          if (addons=== "") {
            addons= "Inga";
          } else {
            addons= addons.slice(0,-2)
          }
        const feedback = `
        <h3>Bokningsbekräftelse</h3>
        <p> Hus: ${this.house.name} </p>
        <p> Datum: ${this.dateInput.value} </p>
          <p> Antal dagar: ${this.daysInput.value} </p>
          <p> Tillägg ${addons}</p>
          <p> Totalpris: ${this.totalInput.value} kr </p>
          <p> Tusen tack för din bookning!</p>
        
        `;
        this.feedbackDiv.classList.add("feedback")
        this.feedbackDiv.innerHTML = feedback
        }

}
