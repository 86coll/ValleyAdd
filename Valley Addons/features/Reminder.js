import { prefix } from "../util/util"

let setReminder = false
let reminder = ""
let showText = false
let text = new Text("")

register("command", (...args) => {
    for (let i = 0; i < args.length; ++i) {
        reminder += args[i] + " ";
    }
    setReminder = true;
    text = new Text(reminder).setShadow(true).setScale(4).setColor(Renderer.DARK_PURPLE);
    ChatLib.chat(`${prefix} &aReminder set!`)
}).setName("remind")

register("command", () => {
    setReminder = false;
    reminder = "";
    ChatLib.chat(`${prefix} &aReminder cleared!`)
}).setName("clearremind")

register("chat", () => {
    if (setReminder) {
        showText = true;
        setTimeout(() => {
            showText = false;
        }, 4000)
    }
    reminder = "";
    setReminder = false;
}).setCriteria("Team Score").setContains()

register("chat", () => {
    if (setReminder) {
        showText = true;
        setTimeout(() => {
            showText = false;
        }, 4000)
    }
    reminder = "";
    setReminder = false;
}).setCriteria("Tokens Earned").setContains()

register("renderOverlay", () => {
    if (showText) {
        text.draw((Renderer.screen.getWidth() - text.getWidth()) / 2, (Renderer.screen.getHeight() - text.getHeight()) / 2 - 50);
    }
})