import { prefix } from "../util/util"
import config from "../config"
import { registerWhen } from "../../BloomCore/utils/Utils"
import Dungeon from "../../BloomCore/dungeons/Dungeon"

/*
CREDIT TO BLOOM, CODE FROM ILLEGALMAP
*/

let announced270 = false
let announced300 = false

register("worldUnload", () => {
    announced270 = announced300 = false
})

registerWhen(register("tick", () => {
    if (!announced270 && Dungeon.score >= 270) {
        ChatLib.chat(`${prefix} &a270 Score Reached! &e(${Dungeon.time})`)
        announced270 = true
    }
    if (!announced300 && Dungeon.score >= 300) {
        ChatLib.chat(`${prefix} &a300 Score Reached! &e(${Dungeon.time})`)
        announced300 = true
    }
}), () => config.scoreMilestones)