import { prefix } from "../util/util"

export const inflatableJerriesCommand = register("command", () => {
    const jerryStack = Player.getInventory().getItems().find(a => a?.getName() == "§fInflatable Jerry")

    if (!jerryStack) {
        ChatLib.chat(`${prefix} &aGetting Jerries!`)
        ChatLib.command(`gfs inflatable_jerry 64`, false)
        return
    }

    const toGive = 64 - jerryStack.getStackSize()
    if (toGive == 0) {
        ChatLib.chat(`${prefix} &cJerry Stack Full!`)
        return
    }
    ChatLib.chat(`${prefix} &aGetting Jerries!`)
    ChatLib.command(`gfs inflatable_jerry ${toGive}`, false)
}).setName("ij")