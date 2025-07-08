import Dungeon from "../../BloomCore/dungeons/Dungeon"
import config from "../config"
import { prefix } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"
import { data } from "../util/data"

let runStart = [0, 0]
let br = [0, 0]
let camp = [0, 0]
let enter = [0, 0]
let maxor = [0, 0]
let storm = [0, 0]
let terms = [0, 0]
let goldor = [0, 0]
let necron = [0, 0]
let drags = [0, 0]
let ticks = 0
let firstTick = false
let msgSent = false

const tickCounter = register("packetReceived", () => {
    if (!firstTick && runStart[0]) {
        ticks = Math.round(((Date.now() - runStart[0]) / 1000) * 20)
        firstTick = true
    }
    ticks++
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")).unregister()

register("chat", () => {
    tickCounter.register()
    runStart[0] = Date.now()
    runStart[1] = 0
}).setCriteria("[NPC] Mort: Here, I found this map when I first entered the dungeon.")

register("chat", () => {
    br[0] = Date.now()
    br[1] = ticks
    lines[0] = `&a${formatNumber((br[0] - runStart[0]) / 1000)} &8(&7${formatNumber(br[1] / 20)}&8)`
}).setCriteria("The BLOOD DOOR has been opened!")

register("chat", () => {
    camp[0] = Date.now()
    camp[1] = ticks
    lines[1] = `&a${formatNumber((camp[0] - br[0]) / 1000)} &8(&7${formatNumber((camp[1] - br[1]) / 20)}&8)`
}).setCriteria("[BOSS] The Watcher: You have proven yourself. You may pass.")

register("chat", () => {
    enter[0] = Date.now()
    enter[1] = ticks
    lines[2] = `&a${formatNumber((enter[0] - camp[0]) / 1000)} &8(&7${formatNumber((enter[1] - camp[1]) / 20)}&8)`
    lines[3] = `&a${formatNumber((enter[0] - runStart[0]) / 1000)} &8(&7${formatNumber(enter[1] / 20)}&8)`
}).setCriteria("[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!")

register("chat", () => {
    maxor[0] = Date.now()
    maxor[1] = ticks
    lines[4] = `&a${formatNumber((maxor[0] - enter[0]) / 1000)} &8(&7${formatNumber((maxor[1] - enter[1]) / 20)}&8)`
}).setCriteria("[BOSS] Storm: Pathetic Maxor, just like expected.")

register("chat", () => {
    storm[0] = Date.now()
    storm[1] = ticks
    lines[5] = `&a${formatNumber((storm[0] - maxor[0]) / 1000)} &8(&7${formatNumber((storm[1] - maxor[1]) / 20)}&8)`
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?")

register("chat", () => {
    terms[0] = Date.now()
    terms[1] = ticks
    lines[6] = `&a${formatNumber((terms[0] - storm[0]) / 1000)} &8(&7${formatNumber((terms[1] - storm[1]) / 20)}&8)`
}).setCriteria("The Core entrance is opening!")

register("chat", () => {
    goldor[0] = Date.now()
    goldor[1] = ticks
    lines[7] = `&a${formatNumber((goldor[0] - terms[0]) / 1000)} &8(&7${formatNumber((goldor[1] - terms[1]) / 20)}&8)`
}).setCriteria("[BOSS] Necron: You went further than any human before, congratulations.")

register("chat", () => {
    necron[0] = Date.now()
    necron[1] = ticks
    lines[8] = `&a${formatNumber((necron[0] - goldor[0]) / 1000)} &8(&7${formatNumber((necron[1] - goldor[1]) / 20)}&8)`
}).setCriteria("[BOSS] Necron: All this, for nothing...")

register("chat", () => {
    drags[0] = Date.now()
    drags[1] = ticks
    lines[9] = `&a${formatNumber((drags[0] - necron[0]) / 1000)} &8(&7${formatNumber((drags[1] - necron[1]) / 20)}&8)`

    let timeLoss = (((drags[0] - runStart[0]) / 1000) - (drags[1] / 20)).toFixed(2)

    if (!msgSent) {
        ChatLib.chat(`${prefix} &aApproximately &e${timeLoss}s &alost to lag.`)
        msgSent = true
    }
    
    tickCounter.unregister()
}).setCriteria("Team Score").setContains()

register("worldLoad", () => {
    runStart = [0, 0]
    br = [0, 0]
    camp = [0, 0]
    enter = [0, 0]
    maxor = [0, 0]
    storm = [0, 0]
    terms = [0, 0]
    goldor =[0, 0]
    necron = [0, 0]
    drags = [0, 0]
    ticks = 0
    msgSent = false
    tickCounter.unregister()
})

let names = `&4Blood Open
&cBlood Clear
&dPortal
&9Boss Entry
&5Maxor
&3Storm
&eTerminals
&6Goldor
&cNecron
&4Dragons
`

let lines = [
    `&a${formatNumber((br[0] - runStart[0]) / 1000)} &8(&7${formatNumber(br[1] / 20)}&8)`,
    `&a${formatNumber((camp[0] - br[0]) / 1000)} &8(&7${formatNumber((camp[1] - br[1]) / 20)}&8)`,
    `&a${formatNumber((enter[0] - camp[0]) / 1000)} &8(&7${formatNumber((enter[1] - camp[1]) / 20)}&8)`,
    `&a${formatNumber((enter[0] - runStart[0]) / 1000)} &8(&7${formatNumber(enter[1] / 20)}&8)`,
    `&a${formatNumber((maxor[0] - enter[0]) / 1000)} &8(&7${formatNumber((maxor[1] - enter[1]) / 20)}&8)`,
    `&a${formatNumber((storm[0] - maxor[0]) / 1000)} &8(&7${formatNumber((storm[1] - maxor[1]) / 20)}&8)`,
    `&a${formatNumber((terms[0] - storm[0]) / 1000)} &8(&7${formatNumber((terms[1] - storm[1]) / 20)}&8)`,
    `&a${formatNumber((goldor[0] - terms[0]) / 1000)} &8(&7${formatNumber((goldor[1] - terms[1]) / 20)}&8)`,
    `&a${formatNumber((necron[0] - goldor[0]) / 1000)} &8(&7${formatNumber((necron[1] - goldor[1]) / 20)}&8)`,
    `&a${formatNumber((drags[0] - necron[0]) / 1000)} &8(&7${formatNumber((drags[1] - necron[1]) / 20)}&8)`
]

function resetLines() {
    lines = [
        `&a${formatNumber((br[0] - runStart[0]) / 1000)} &8(&7${formatNumber(br[1] / 20)}&8)`,
        `&a${formatNumber((camp[0] - br[0]) / 1000)} &8(&7${formatNumber((camp[1] - br[1]) / 20)}&8)`,
        `&a${formatNumber((enter[0] - camp[0]) / 1000)} &8(&7${formatNumber((enter[1] - camp[1]) / 20)}&8)`,
        `&a${formatNumber((enter[0] - runStart[0]) / 1000)} &8(&7${formatNumber(enter[1] / 20)}&8)`,
        `&a${formatNumber((maxor[0] - enter[0]) / 1000)} &8(&7${formatNumber((maxor[1] - enter[1]) / 20)}&8)`,
        `&a${formatNumber((storm[0] - maxor[0]) / 1000)} &8(&7${formatNumber((storm[1] - maxor[1]) / 20)}&8)`,
        `&a${formatNumber((terms[0] - storm[0]) / 1000)} &8(&7${formatNumber((terms[1] - storm[1]) / 20)}&8)`,
        `&a${formatNumber((goldor[0] - terms[0]) / 1000)} &8(&7${formatNumber((goldor[1] - terms[1]) / 20)}&8)`,
        `&a${formatNumber((necron[0] - goldor[0]) / 1000)} &8(&7${formatNumber((necron[1] - goldor[1]) / 20)}&8)`,
        `&a${formatNumber((drags[0] - necron[0]) / 1000)} &8(&7${formatNumber((drags[1] - necron[1]) / 20)}&8)`
    ]
}

let splitMsg = new Text("").setShadow(true)
let namesMsg = new Text("").setShadow(true)

registerWhen(register("renderOverlay", () => {
    if (runStart[0] == 0) {
        resetLines()
    } else if (br[0] == 0) {
        lines[0] = `&a${formatNumber((Date.now() - runStart[0]) / 1000)} &8(&7${formatNumber(ticks / 20)}&8)`
        lines[3] = `&a${formatNumber((Date.now() - runStart[0]) / 1000)} &8(&7${formatNumber(ticks / 20)}&8)`
    } else if (camp[0] == 0) {
        lines[1] = `&a${formatNumber((Date.now() - br[0]) / 1000)} &8(&7${formatNumber((ticks - br[1]) / 20)}&8)`
        lines[3] = `&a${formatNumber((Date.now() - runStart[0]) / 1000)} &8(&7${formatNumber(ticks / 20)}&8)`
    } else if (enter[0] == 0) {
        lines[2] = `&a${formatNumber((Date.now() - camp[0]) / 1000)} &8(&7${formatNumber((ticks - camp[1]) / 20)}&8)`
        lines[3] = `&a${formatNumber((Date.now() - runStart[0]) / 1000)} &8(&7${formatNumber(ticks / 20)}&8)`
    } else if (maxor[0] == 0) {
        lines[4] = `&a${formatNumber((Date.now() - enter[0]) / 1000)} &8(&7${formatNumber((ticks - enter[1]) / 20)}&8)`
    } else if (storm[0] == 0) {
        lines[5] = `&a${formatNumber((Date.now() - maxor[0]) / 1000)} &8(&7${formatNumber((ticks - maxor[1]) / 20)}&8)`
    } else if (terms[0] == 0) {
        lines[6] = `&a${formatNumber((Date.now() - storm[0]) / 1000)} &8(&7${formatNumber((ticks - storm[1]) / 20)}&8)`
    } else if (goldor[0] == 0) {
        lines[7] = `&a${formatNumber((Date.now() - terms[0]) / 1000)} &8(&7${formatNumber((ticks - terms[1]) / 20)}&8)`
    } else if (necron[0] == 0) {
        lines[8] = `&a${formatNumber((Date.now() - goldor[0]) / 1000)} &8(&7${formatNumber((ticks - goldor[1]) / 20)}&8)`
    } else if (drags[0] == 0) {
        lines[9] = `&a${formatNumber((Date.now() - necron[0]) / 1000)} &8(&7${formatNumber((ticks - necron[1]) / 20)}&8)`
    }

    let msg = ""
    lines.forEach(line => {
        msg += line + "\n"
    })
    splitMsg.setString(msg)
    splitMsg.setScale(data.runSplits.scale)
    splitMsg.draw(data.runSplits.x + (80 * data.runSplits.scale), data.runSplits.y)

    namesMsg.setString(names)
    namesMsg.setScale(data.runSplits.scale)
    namesMsg.draw(data.runSplits.x, data.runSplits.y)


}), () => config.runSplits && Dungeon.floor == "M7")

register("renderOverlay", () => {
    if (config.runSplitsGui.isOpen()) {
        let msg = ""
        lines.forEach(line => {
            msg += line + "\n"
        })
        splitMsg.setString(msg)
        splitMsg.setScale(data.runSplits.scale)
        splitMsg.draw(data.runSplits.x + (80 * data.runSplits.scale), data.runSplits.y)

        namesMsg.setString(names)
        namesMsg.setScale(data.runSplits.scale)
        namesMsg.draw(data.runSplits.x, data.runSplits.y)
    }
})

register("dragged", (dx, dy, x, y, bn) => {
    if (!config.runSplitsGui.isOpen() || bn == 2) return
    data.runSplits.x = x
    data.runSplits.y = y
    data.save()
})

register("scrolled", (x, y, dir) => {
    if (!config.runSplitsGui.isOpen()) return
    if (dir == 1) data.runSplits.scale += 0.05
    else data.runSplits.scale -= 0.05
    data.save()
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.runSplitsGui.isOpen() || bn != 2) return
    data.runSplits.x = 0
    data.runSplits.y = 0
    data.runSplits.scale = 1
    data.save()
})

function formatNumber(num) {
    let mins = Math.floor(num / 60)
    if (mins >= 1) {
        let secs = num % 60
        return `${mins}m ${(Math.round(secs * 100) / 100).toFixed(2)}s`
    } else return `${(Math.round(num * 100) / 100).toFixed(2)}s`
}