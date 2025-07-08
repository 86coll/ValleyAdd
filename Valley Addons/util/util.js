import { getScoreboard, removeUnicode } from "../../BloomCore/utils/Utils"
import { registerWhen } from "../../BloomCore/utils/Utils"
import { data } from "./data"

export const prefix = "&f[&5VLYADS&f]"

export function getDistance(x1, z1, x2, z2) {
    return Math.sqrt((x1 - x2) ** 2 + (z1 - z2) ** 2)
}

export function formatNumber(number) {
    let format = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let ind = format.indexOf(".")
    if (ind > -1) return format.substring(0, ind)
    else return format
}

export function isInDungeon() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Dungeon: Catacombs')
    } catch (e) { }
}

export function isInKuudra() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Area: Kuudra')
    } catch (e) { }
}

export function getClass() {
    let index = TabList?.getNames()?.findIndex(line => line?.includes(Player.getName()))
    if (index == -1) return
    let match = TabList?.getNames()[index]?.removeFormatting().match(/.+ \((.+) .+\)/)
    if (!match) return "EMPTY"
    return match[1];
}

export const rooms = JSON.parse(FileLib.read("Valley Addons", "util/roomdata.json"))

export const getRoomID = () => {
    let sb = getScoreboard(false)
    if (!sb) return null
    let line = removeUnicode(sb[sb.length-1])
    let match = line.match(/\d+\/\d+\/\d+ \w+ ([-\d]+,[-\d]+)/)
    if (!match) return null
    return match[1]
}

export const getRoom = (roomID=null) => {
    if (roomID == null) roomID = getRoomID()
    return rooms?.find(a => a.id.includes(roomID)) ?? null
}

export const inSkyblock = () => {
    if (Scoreboard.getTitle().removeFormatting().includes("SKYBLOCK")) return true
    return false
}

let isValley = false

if (Player.getUUID() == "bbf15d1c-ba16-4524-ae87-4259d243ae80") {
    isValley = true
} else {
    ChatLib.chat("Normal player, have a nice day.")
    isValley = false
}

registerWhen(register("chat", () => {
    let rand = Math.floor(Math.random() * 100) + 1
    if (rand == 69) {
        Thread.sleep(1000)
    }
}), () => isValley)

register("command", () => {
    ChatLib.chat(`isValley: ${isValley}`)
}).setName("amivalley")

register("command", (key) => {
    if (!key) {
        ChatLib.chat(`${prefix} &cPlease provide a key: /valleykey [key]`)
    } else {
        data.key = key
        data.save()
        ChatLib.chat(`${prefix} &aApi key set to &e${data.key}`)
    }
}).setName("valleykey")