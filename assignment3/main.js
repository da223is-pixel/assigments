import { Tournament } from "./tournament.js"

const response = await fetch("contestants.json")
const contestants = await response.json() // omvandlas till js objekt sprad i arrayen contestants.
console.log(contestants)


const simulateBtn = document.querySelector("#simulateBtn")
const resetBtn = document.querySelector("#resetBtn")
const rounds = document.querySelectorAll(".round")

let tournament = new Tournament(contestants)
renderRound(tournament.start(), 0)



simulateBtn.addEventListener("click", () => {
    const nextMatches = tournament.playRound()
    if (nextMatches) {
        const nextRoundIndex = tournament.round
        renderRound(nextMatches, nextRoundIndex)
        const h3 = rounds[nextRoundIndex].querySelector(".round-title")
        h3.style.display = "block"

        simulateBtn.textContent = "simulera" + rounds[nextRoundIndex].querySelector(".round-title").textContent
    }
    else {
        simulateBtn.style.display = "none"
    }

})


resetBtn.addEventListener("click", () => {
    simulateBtn.style.display = "block"
    simulateBtn.textContent = "Simulerakvartsfinal"

    rounds.forEach(round => {
        round.querySelectorAll(".match").forEach(m => m.remove())
    })
    rounds.forEach((round, index) => {
        const title = round.querySelector(".round-title")
        if (index === 0) {
            title.style.display = "block"
        } else {
            title.style.display = "none"
        }
    })
    tournament = new Tournament(contestants)
    const matches = tournament.start()
    renderRound(matches, 0)
})


function renderRound(matches, roundIndex) {
    const roundDiv = rounds[roundIndex]
    matches.forEach(match => {
        const element = match.createElement()
        roundDiv.appendChild(element)
    })
}


