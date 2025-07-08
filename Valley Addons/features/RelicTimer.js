import config from "../config"
import { prefix, getDistance } from "../util/util"
import { data } from "../util/data"
import { registerWhen } from "../../BloomCore/utils/Utils"

let p5Started
let pickedRelic
let relic
let spawned
let scanning = false
let r, g, p, o, b
let times = {}

registerWhen(register("chat", () => {
    p5Started = Date.now()
    scanning = true
}).setCriteria("[BOSS] Necron: All this, for nothing..."), () => config.relicTimer)

registerWhen(register("chat", (name, relicPicked) => {
    if (name != Player.getName()) return
    pickedRelic = Date.now()
    relic = relicPicked
    rcListener.register()
    lcListener.register()
}).setCriteria(/(\w+) picked the Corrupted (\w+) Relic!/), () => config.relicTimer)

const rcListener = register('playerInteract', (action, pos) => {
    if (action.toString() != "RIGHT_CLICK_BLOCK") return
    const blockClicked = World.getBlockAt(pos.getX(), pos.getY(), pos.getZ()).type.getRegistryName()
    if ((blockClicked != 'minecraft:cauldron' && blockClicked != 'minecraft:anvil') || (!Player.getHeldItem()?.getName()?.includes('Relic') && !Player.getHeldItem()?.getName()?.includes('SkyBlock Menu'))) return
    relicMessage()
}).unregister()

const lcListener = register('hitBlock', (block) => {
    const blockClicked = block.type.getRegistryName()
    if ((blockClicked != 'minecraft:cauldron' && blockClicked != 'minecraft:anvil') || (!Player.getHeldItem()?.getName()?.includes('Relic') && !Player.getHeldItem()?.getName()?.includes('SkyBlock Menu'))) return
    relicMessage()
}).unregister()

function relicMessage() {
    let placeTime = (Date.now() - pickedRelic) / 1000
    let sinceP5 = (Date.now() - p5Started) / 1000
    let relicColor
    switch(relic) {
        case "Red": 
            relicColor = "&c"
            break
        case "Orange": 
            relicColor = "&6"
            break
        case "Green": 
            relicColor = "&a"
            break
        case "Blue": 
            relicColor = "&b"
            break
        case "Purple": 
            relicColor = "&5"
            break
    }

    let msg = `${prefix} ${relicColor}${relic} Relic &aplaced in &e${placeTime}s&a.`
    if (!data.relicTimer[relic] || placeTime < data.relicTimer[relic]) {
        data.relicTimer[relic] = placeTime
        data.save()
        msg += " &d&l(PB)"
    } else {
        msg += ` &8(&7${data.relicTimer[relic]}&8)`
    }

    new Message(new TextComponent(msg).setHover("show_text", `&dPersonal Best: &a${data.relicTimer[relic]}s`)).chat()
    ChatLib.chat(`${prefix} &aRelic placed &e${sinceP5}s &ainto P5.`)
    let spawnTime = ((spawned - p5Started) / 1000).toFixed(3)
    ChatLib.chat(`${prefix} &aRelic took &e${spawnTime}s &ato spawn.`)
    if (config.relicPickupTime) {
        let pickupTime = ((pickedRelic - spawned) / 1000).toFixed(3)
        ChatLib.chat(`${prefix} &aRelic took &e${pickupTime}s &ato pick up.`)
    }
    rcListener.unregister()
    lcListener.unregister()
}

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")

registerWhen(register("tick", () => {
    let entities = World.getAllEntitiesOfType(ArmorStand)
    entities.forEach(e => {
        if (new EntityLivingBase(e?.getEntity()).getItemInSlot(4)?.getNBT()?.toString()?.includes("Relic")) {
            spawned = Date.now()
            scanning = false
        }
    })
}), () => scanning)

registerWhen(register("tick", () => {
    let entities = World.getAllEntitiesOfType(ArmorStand)
    entities.forEach(e => {
        if (new EntityLivingBase(e?.getEntity()).getItemInSlot(4)?.getNBT()?.toString()?.includes("Relic")) {
            let x = e.getX()
            let z = e.getZ()
            if (!r && getDistance(x, z, 52, 43) < 1) {
                // red
                r = ((Date.now() - p5Started) / 1000).toFixed(3)
                times["&cRed"] = r
            }
            if (!g && getDistance(x, z, 50, 45) < 1) {
                // green
                g = ((Date.now() - p5Started) / 1000).toFixed(3)
                times["&aGreen"] = g
            }
            if (!p && getDistance(x, z, 55, 42) < 1) {
                // purple
                p = ((Date.now() - p5Started) / 1000).toFixed(3)
                times["&5Purple"] = p
            }
            if (!o && getDistance(x, z, 58, 43) < 1) {
                // orange
                o = ((Date.now() - p5Started) / 1000).toFixed(3)
                times["&6Orange"] = o
            }
            if (!b && getDistance(x, z, 60, 45) < 1) {
                // blue
                b = ((Date.now() - p5Started) / 1000).toFixed(3)
                times["&bBlue"] = b
            }
        }
    })
    if (r && g && p && o && b) {
        for (let t in times) {
            ChatLib.chat(`${prefix} ${t} &aRelic placed in &e${times[t]}s&a.`)
        }
        p5Started = null
    }
}), () => config.showEveryRelic && p5Started)

register("worldLoad", () => {
    p5Started = null
    r = g = p = o = b = null
    times = {}
})