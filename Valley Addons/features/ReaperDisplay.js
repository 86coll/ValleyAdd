import config from "../config"
import { data } from "../util/data"
import { registerWhen } from "../../BloomCore/utils/Utils"

let text = new Text("").setScale(1).setShadow(true).setAlign("CENTER").setColor(Renderer.RED)
let reaperUsed
let soundPlayed = false

register("soundPlay", () => {
    soundPlayed = true
}).setCriteria("mob.zombie.remedy")

registerWhen(register("tick", () => {
    const armor = Player.armor?.getChestplate()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id")
    let color = Player.armor?.getChestplate()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("display")?.getInteger("color")
    if (armor == "REAPER_CHESTPLATE" && color == 16711680) {
        reaperUsed = Date.now()
        soundPlayed = false
    }
}), () => soundPlayed && config.reaperDisplay)

registerWhen(register("renderOverlay", () => {
    const remaining = (6 - (Date.now() - reaperUsed ?? 0) / 1000).toFixed(2)
    if (remaining < 0) return

    text.setString(remaining)
    text.setScale(data.reaperDisplay.scale)
    text.draw(data.reaperDisplay.x, data.reaperDisplay.y)
}), () => config.reaperDisplay && reaperUsed)

register("renderOverlay", () => {
    if (config.reaperDisplayGui.isOpen()) {
        text.setString("6.00")
        text.setScale(data.reaperDisplay.scale)
        text.draw(data.reaperDisplay.x, data.reaperDisplay.y)
    }
})

register("dragged", (dx, dy, x, y, bn) => {
    if (!config.reaperDisplayGui.isOpen() || bn == 2) return
    data.reaperDisplay.x = x
    data.reaperDisplay.y = y
    data.save()
})

register("scrolled", (x, y, dir) => {
    if (!config.reaperDisplayGui.isOpen()) return
    if (dir == 1) data.reaperDisplay.scale += 0.05
    else data.reaperDisplay.scale -= 0.05
    data.save()
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.reaperDisplayGui.isOpen() || bn != 2) return
    data.reaperDisplay.x = Renderer.screen.getWidth() / 2
    data.reaperDisplay.y = Renderer.screen.getHeight() / 2 + 10
    data.reaperDisplay.scale = 1
    data.save()
})