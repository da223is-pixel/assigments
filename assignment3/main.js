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
    tournament.matches.forEach(match => match.compete())
    const nextMatches = tournament.playRound()

    if (nextMatches) {
        renderRound(nextMatches, tournament.round)
    }

})


resetBtn.addEventListener("click", () => {
    rounds.forEach(round => {
        round.innerHTML = ""
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
