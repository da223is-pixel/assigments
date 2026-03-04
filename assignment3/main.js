const response= await fetch ("contestants.json")
const contestants = await response.json() // omvandlas till js objekt sprad i arrayen contestants.
console.log(contestants)

import { Match } from "./Match"
