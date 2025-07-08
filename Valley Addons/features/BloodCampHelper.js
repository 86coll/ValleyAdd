import config from "../config"
import { prefix, getClass, getDistance } from "../util/util"
import { data } from "../util/data"
import { registerWhen } from "../../BloomCore/utils/Utils"

let dialogueSaid = false
let moveTime
let bloodStarted
let bloodCleared
let watcherX
let watcherZ
let playerClass
let inPosition = false
let text = new Text("&cFirst four mobs spawned!").setScale(2).setShadow(true)
let diamanteWarning = new Text("&bDiamante Giant Detected!").setScale(2).setShadow(true)
let inBoss = false
let alerted = false
let showText = false
let showAlert = false

const Zombie = Java.type("net.minecraft.entity.monster.EntityZombie")
const Giant = Java.type("net.minecraft.entity.monster.EntityGiantZombie")
const skullOwner = ["3f6d5cfc-cbd8-3ac7-8418-8d51f12c67a3", "83b07a68-a99e-3eeb-89d8-68965a4b9801"]

function isWatcher(e) {
    let nbt = new EntityLivingBase(e?.getEntity()).getItemInSlot(4)?.getNBT()?.toString()
    if (nbt) {
        for (let texture of skullOwner) {
            if (nbt.includes(texture)) {
                return true
            }
        }
    }
    return false
}

// BLOOD OPENED

register("chat", () => {
    bloodStarted = Date.now()
    playerClass = getClass()
    ChatLib.simulateChat("The BLOOD DOOR has been opened!")
}).setCriteria("[BOSS] The Watcher: Things feel a little more roomy now, eh?")

// DIALOGUE APPEARS

registerWhen(register("chat", () => {
    World.playSound("random.orb", 2, 0)
    showText = true
    setTimeout(() => {
        showText = false
    }, 2000)
    setTimeout(() => {
        dialogueSaid = true
    }, 500)
}).setCriteria("[BOSS] The Watcher: Let's see how you can handle this."), () => config.bloodCampHelper && playerClass == "Mage")

register("renderOverlay", () => {
    if (showText) {
        text.draw((Renderer.screen.getWidth() - text.getWidth()) / 2, (Renderer.screen.getHeight() - text.getHeight()) / 2 - 50);
    }
})

// LOOKING FOR MOVE

registerWhen(register("tick", () => {
    let entities = World.getAllEntitiesOfType(Zombie)
    entities.forEach(e => {
        if (isWatcher(e)) {
            // moved
            // assigns value to moveTime first if arrived late so it no longer looks for inPosition
            if (getDistance(e.getX(), e.getZ(), watcherX, watcherZ) > 1.5) {
                dialogueSaid = false
                moveTime = Date.now()
                if (inPosition) {
                    ChatLib.chat(`${prefix} &aWatcher moved at &e${((moveTime - bloodStarted) / 1000).toFixed(3)}s&a.`)
                } else {
                    ChatLib.chat(`${prefix} &aWatcher moved at some time before &e${((moveTime - bloodStarted) / 1000).toFixed(3)}s&a.`)
                }
            }
            // checking if in position
            // inPosition means it was successfully rendered before it moved
            if (!inPosition && !moveTime) {
                if (getDistance(e.getX(), e.getZ(), watcherX, watcherZ) < 1.5 && dialogueSaid) {
                    inPosition = true
                }
            }
        }
    })
}), () => dialogueSaid && playerClass == "Mage" && config.bloodCampHelper)

// CAMP FINISHED

registerWhen(register("chat", () => {
    bloodCleared = Date.now()
    ChatLib.chat(`${prefix} &aRemaining blood mobs took &e${((bloodCleared - moveTime) / 1000).toFixed(3)}s&a`)
}).setCriteria("[BOSS] The Watcher: You have proven yourself. You may pass."), () => config.bloodCampHelper && playerClass == "Mage")

register("worldLoad", () => {
    dialogueSaid = false
    inPosition = false
    alerted = false
    inBoss = false
    moveTime = null
    bloodStarted = null
    bloodCleared = null
})

// LOOKING FOR DIAMANTE

registerWhen(register("tick", () => {
    let entities = World.getAllEntitiesOfType(Giant)
    entities.forEach(e => {
        if (new EntityLivingBase(e?.getEntity()).getItemInSlot(3)?.getNBT()?.toString()?.includes("diamond_chestplate")) {
            alerted = true
            showAlert = true
            World.playSound("random.orb", 2, 0)
            setTimeout(() => {
                showAlert = false
            }, 2000)
        }
    })
}), () => !alerted && playerClass == "Mage")

register("renderOverlay", () => {
    if (showAlert) {
        diamanteWarning.draw((Renderer.screen.getWidth() - diamanteWarning.getWidth()) / 2, (Renderer.screen.getHeight() - diamanteWarning.getHeight()) / 2 - 100);
    }
})

// SPLITS

let splitMsg = new Text("&cWatcher Move: \n&4Remaining Mobs Killed: ").setShadow(true)

registerWhen(register("renderOverlay", () => {
    let split1, split2
    if (!moveTime) {
        split1 = ((Date.now() - bloodStarted) / 1000).toFixed(2)
        splitMsg.setString(`&cWatcher Move: &e${split1}s \n&4Remaining Mobs Killed: `)
        splitMsg.setScale(data.campSplits.scale)
        splitMsg.draw(data.campSplits.x, data.campSplits.y)
    } else if (!bloodCleared) {
        split2 = ((Date.now() - moveTime) / 1000).toFixed(2)
        if (inPosition) splitMsg.setString(`&cWatcher Move: &e${((moveTime - bloodStarted) / 1000).toFixed(2)}s \n&4Remaining Mobs Killed: &e${split2}s`)
        else splitMsg.setString(`&cWatcher Move: &e<${((moveTime - bloodStarted) / 1000).toFixed(2)}s \n&4Remaining Mobs Killed: &e>${split2}s`)
        splitMsg.setScale(data.campSplits.scale)
        splitMsg.draw(data.campSplits.x, data.campSplits.y)
    } else {
        if (inPosition) splitMsg.setString(`&cWatcher Move: &e${((moveTime - bloodStarted) / 1000).toFixed(2)}s \n&4Remaining Mobs Killed: &e${((bloodCleared - moveTime) / 1000).toFixed(2)}s`)
        else splitMsg.setString(`&cWatcher Move: &e<${((moveTime - bloodStarted) / 1000).toFixed(2)}s \n&4Remaining Mobs Killed: &e>${((bloodCleared - moveTime) / 1000).toFixed(2)}s`)
        splitMsg.setScale(data.campSplits.scale)
        splitMsg.draw(data.campSplits.x, data.campSplits.y)
    }
}), () => config.bloodCampHelper && config.campSplits && bloodStarted && !inBoss && playerClass == "Mage")

registerWhen(register("chat", () => {
    inBoss = true
}).setCriteria("[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!"), () => config.hideCampSplitsInBoss)

register("renderOverlay", () => {
    if (config.campSplitsGui.isOpen()) {
        splitMsg.setString("&cWatcher Move: \n&4Remaining Mobs Killed: ")
        splitMsg.setScale(data.campSplits.scale)
        splitMsg.draw(data.campSplits.x, data.campSplits.y)
    }
})

register("dragged", (dx, dy, x, y, bn) => {
    if (!config.campSplitsGui.isOpen() || bn == 2) return
    data.campSplits.x = x
    data.campSplits.y = y
    data.save()
})

register("scrolled", (x, y, dir) => {
    if (!config.campSplitsGui.isOpen()) return
    if (dir == 1) data.campSplits.scale += 0.05
    else data.campSplits.scale -= 0.05
    data.save()
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.campSplitsGui.isOpen() || bn != 2) return
    data.campSplits.x = 0
    data.campSplits.y = 0
    data.campSplits.scale = 1
    data.save()
})