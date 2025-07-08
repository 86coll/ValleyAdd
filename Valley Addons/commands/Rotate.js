import { prefix } from "../util/util"

export const rotate = register("command", (pitch, yaw) => {
    if (Math.abs(yaw) > 180 || Math.abs(pitch) > 90) {
        ChatLib.chat(`${prefix} &cPitch and/or Yaw out of bounds.`)
        return
    }
    ChatLib.chat(`${prefix} &aRotating.`)
    Player.getPlayer().field_70177_z = yaw;
    Player.getPlayer().field_70125_A = pitch;
}).setName("rotate");