export class Match {
  #contestantA
  #contestantB
  #winner
  #element
  constructor(a, b) {
    this.#contestantA = a
    this.#contestantB = b
    this.#winner = null
    this.#element = null

  }
  createElement() {
    const divElement = document.createElement("div")
    divElement.classList.add("match")


    divElement.innerHTML = `
    <p class="player"> ${this.#contestantA.name} ${this.#contestantA.skillLevel ?? "?"}</p>
    <p>${this.#contestantA.catchphrase ?? "..."}</p>

      <p class="player"> ${this.#contestantB.name} ${this.#contestantB.skillLevel ?? "?"}</p>
      <p>${this.#contestantB.catchphrase ?? "..."}</p>
    `
    this.#element = divElement
    return divElement
  }
  get contestantA() {
    return this.#contestantA
  }
  get contestantB() {
    return this.#contestantB
  }
  get winner() {
    return this.#winner
  }
  get isPlayed() {
    return this.#winner !== null
  }

  compete() {
    if (this.#winner) return
    const skillA = this.#contestantA.skillLevel ?? 6 // när värdet saknas blir6.
    const skillB = this.#contestantB.skillLevel ?? 6
    const chanceA = skillA / (skillA + skillB)
    const randomNum = Math.random()

    if (randomNum < chanceA) {
      this.#winner = this.#contestantA
    }
    else {
      this.#winner = this.#contestantB
    } // vinnaren bestämms 
    const contestants = this.#element.querySelectorAll(".player")
    if (this.#winner === this.#contestantA) {
      contestants[0].classList.add("winner")
      contestants[1].classList.add("loser") // css klaser läggs till.
    }
    else {
      contestants[1].classList.add("winner")
      contestants[0].classList.add("loser")
    }
  }
}

