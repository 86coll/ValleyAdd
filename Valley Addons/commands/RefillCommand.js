import { prefix } from "../util/util"

export const refillCommand = register("command", () => {
    const pearlStack = Player.getInventory().getItems().find(a => a?.getName() == "§fEnder Pearl")
    const jerryStack = Player.getInventory().getItems().find(a => a?.getName() == "§fInflatable Jerry")

    ChatLib.chat(`${prefix} &aRefilling Pearls and Jerries!`)

    let delay = 2000

    if (!pearlStack) {
        ChatLib.command(`gfs ender_pearl 16`, false)
    } else {
        const toGive = 16 - pearlStack.getStackSize()
        if (toGive == 0) {
            delay = 0
        } else {
            ChatLib.command(`gfs ender_pearl ${toGive}`, false)
        }
    }
    setTimeout(() => {
        if (!jerryStack) {
            ChatLib.command(`gfs inflatable_jerry 64`, false)
        } else {
            const toGive = 64 - jerryStack.getStackSize()
            ChatLib.command(`gfs inflatable_jerry ${toGive}`, false)
        }
    }, delay)
}).setName("refill").setAliases(["fillmevalley", "fmv"])