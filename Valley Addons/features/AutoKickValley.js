import config from "../config"
import { prefix } from "../util/util"
import { getMojangInfo } from "../../BloomCore/utils/APIWrappers"

let toggled = true

register("chat", (name) => {
    if (!toggled) return
    getMojangInfo(name).then(mojangInfo => {
        let uuid = mojangInfo.id
        if (uuid == "bbf15d1cba164524ae874259d243ae80") {
            ChatLib.chat(`${prefix} &4FIXING THE PROBLEM.`)
            ChatLib.command(`p kick ${name}`)
        }
    })
}).setCriteria(/Party Finder > (\w+) joined the dungeon group! .+/).setContains()

register("chat", (name) => {
    if (!toggled) return
    getMojangInfo(name).then(mojangInfo => {
        let uuid = mojangInfo.id
        if (uuid == "bbf15d1cba164524ae874259d243ae80") {
            ChatLib.chat(`${prefix} &4FIXING THE PROBLEM.`)
            ChatLib.command(`p kick ${name}`)
        }
    })
}).setCriteria(/.+? (\w+) joined the party./).setContains()

register("command", () => {
    toggled = !toggled
    ChatLib.chat(`${prefix} &aAuto kick sigmy: ${toggled}`)
}).setName("togglesigmy").setAliases(["soweredoingthisagain", "yesimamasochist", "iwantbadruns", "braceforimpact"])