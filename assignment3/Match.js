export class Match {
  #contestantA
  #contestantB
  #winner
  #element
  constructor(a, b) {
    this.#contestantA = a
    this.#contestantB = b
    this.#winner = null
    
  }
  createElement () {
    const divElement = document.createElement("div")
    this.#element= divElement
    
    divElement.innerHTML= `
    <p class="player"> ${this.#contestantA.name} (skill:${this.#contestantA.skillLevel ?? "?"})</p>
      <p class="player"> ${this.#contestantB.name}(skill: ${this.#contestantA.skillLevel ?? "?"})</p>

    `
    return divElement
  }
  get winner() {
    return this.#winner
  }
  get isPlayed() {
    return this.#winner !== null
  }

 compete () {

 }
}
