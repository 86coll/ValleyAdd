import config from "../config"
import { prefix, formatNumber } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let yCheck = false
let timerStart = 0

registerWhen(register("chat", () => {
    yCheck = true
}).setCriteria("[NPC] Elle: I knew you could do it!"), () => config.kuudraDPS)

registerWhen(register("tick", () => {
    if(!yCheck) return
    playerY = Math.round(Player.getY())
    if(playerY < 69){
        timerStart = Date.now() / 1000
        yCheck = false
    }
}), () => config.kuudraDPS)

registerWhen(register("chat", () => {
    let timerStop = Date.now() / 1000
    let timer = timerStop - timerStart
    let dpsMath = (300000000 / timer)
    let dps = formatNumber(dpsMath)
    ChatLib.chat(`${prefix} &aParty DPS: &e${dps}`)
    if (config.sendDPS) ChatLib.command(`pc Party DPS: ${dps}`)
}).setCriteria("KUUDRA DOWN").setContains(), () => config.kuudraDPS)

register("worldLoad", () => {
    yCheck = false
})