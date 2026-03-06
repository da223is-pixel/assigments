import { Match } from "./Match.js"

export class Tournament {

    constructor(contestants) {

        this.contestants = contestants //så alla deltagare sparas.
        this.round=0
        this.matches = [] //lista för aktuella matcher i repektiva rundor
    }

    start() {
        this.round=0
        this.matches = this.createRound(this.contestants)
        return this.matches
    }
    createRound(players) {
        const matches= []
        for(let i=0; i<players.length;i += 2) {
           const match= new Match(players[i], players[i+1]) 
           matches.push(match)
        }
        return matches

    }
    playRound() {
        this.matches.forEach(match=>match.compete()) // bestämms vinnare för var och en match.
        const winners = this.matches.map(match=> match.winner) // smalas bara vinnarna i en ny lista 
        if (winners.length===1) {
         ("Vinnare:" + winners[0].name)
         return null
        } 
        this.round++
        this.matches= this.createRound(winners) 
        return this.matches
    }
   
}