import { registerWhen } from "../../BloomCore/utils/Utils"

let spam = false

registerWhen(register("tick", () => {
    ChatLib.command(" ")
}), () => spam)

register("command", () => {
    spam = true
}).setName("limbo")

register("worldLoad", () => {
    spam = false
})