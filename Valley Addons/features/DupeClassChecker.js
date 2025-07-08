import config from "../config"
import { prefix } from "../util/util"
import { registerWhen, getScoreboard, removeUnicode } from "../../BloomCore/utils/Utils"

let text = new Text('DUPLICATE CLASS DETECTED').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.DARK_RED)
let classes = []
let dupeClass = false

registerWhen(register("chat", () => {
    classes = []
    let sb = getScoreboard(false)
    if (!sb) return
    for (let i = 0; i < sb.length; ++i) {
        let line = removeUnicode(sb[i])
        let match = line.match(/\[\S\] \w+ .+/)
        if (match) {
            let c = match[0].substring(1, 2)
            if (classes.indexOf(c) < 0) {
                classes.push(c)
            } else {
                ChatLib.chat(`${prefix} &cDuplicate Class Detected`)
                World.playSound(config.dupeClassSound, 2, 1)
                dupeClass = true
                return
            }
        }
    }
    dupeClass = false
}).setCriteria(/Starting in \d seconds./), () => config.dupeClass)

registerWhen(register("renderOverlay", () => {
    text.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2)
}), () => dupeClass)

register("chat", () => {
    dupeClass = false
}).setCriteria("[NPC] Mort: Here, I found this map when I first entered the dungeon.")

register("worldLoad", () => {
    dupeClass = false
})