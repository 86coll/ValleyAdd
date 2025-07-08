import config from "../config"
import { getClass } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let inPre4 = false

registerWhen(register("chat", () => {
    if (getClass() === "Berserk") inPre4 = true
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?"), () => config.pre4Disable)

registerWhen(register("chat", () => {
    inPre4 = false
}).setCriteria(/.+ completed a device! .+/), () => inPre4)

registerWhen(register("chat", () => {
    ChatLib.command("pc " + config.maskText);
}).setCriteria(/Your (⚚)? Bonzo's Mask saved your life!/), () => config.maskPhoenixMsg && !inPre4)

registerWhen(register("chat", () => {
    ChatLib.command("pc " + config.phoenixText);
}).setCriteria("Your Phoenix Pet saved you from certain death!"), () => config.maskPhoenixMsg && !inPre4)

register("worldLoad", () => {
    inPre4 = false
})