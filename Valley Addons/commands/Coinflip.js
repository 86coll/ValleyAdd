import { prefix } from "../util/util"

export const coinflip = register("command", ...args => {
    if (!args) {
        let num = Math.random()
        ChatLib.command("pc Flipping a coin!")
        setTimeout(() => {
            if (num > 0.5) {
                ChatLib.chat(`${prefix} &aHeads!`)
                ChatLib.command("pc Heads!")
            } else {
                ChatLib.chat(`${prefix} &cTails!`)
                ChatLib.command("pc Tails!")
            }
        }, 2000)
    } else if (args.length == 1) {
        let num = Math.random()
        ChatLib.command(`pc Flipping a coin to kick ${args[0]}!`)
        setTimeout(() => {
            if (num > 0.5) {
                ChatLib.chat(`${prefix} &aHeads! Goodbye &e${args[0]}!`)
                ChatLib.chat(`pc Heads! Goodbye ${args[0]}!`)
                setTimeout(() => {
                    ChatLib.command(`p kick ${args[0]}`)
                }, 500)
            } else {
                ChatLib.chat(`${prefix} &cTails! Darnnn`)
                ChatLib.command("pc Tails! Darnnn")
            }
        }, 2000)
    } else if (args.length == 2) {
        let num = Math.random()
        ChatLib.command(`pc Flipping a coin to kick ${args[0]} or ${args[1]}!`)
        setTimeout(() => {
            if (num > 0.5) {
                ChatLib.chat(`${prefix} &aHeads! Goodbye &e${args[0]}!`)
                ChatLib.command(`pc Heads! Goodbye ${args[0]}!`)
                setTimeout(() => {
                    ChatLib.command(`p kick ${args[0]}`)
                }, 500)
            } else {
                ChatLib.chat(`${prefix} &cTails! Goodbye &e${args[1]}!`)
                ChatLib.command(`pc Tails! Goodbye ${args[1]}!`)
                setTimeout(() => {
                    ChatLib.command(`p kick ${args[1]}`)
                }, 500)
            }
        }, 2000)
    } else {
        ChatLib.chat(`${prefix} &cWrong amount of arguments!`)
    }
}).setName("coinflip")