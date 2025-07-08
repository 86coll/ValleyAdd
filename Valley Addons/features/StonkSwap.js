import config from "../config"

const C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange")
let slot = 0
register("packetSent", (packet, event) => {
  slot = packet.func_149614_c()
}).setFilteredClass(C09PacketHeldItemChange)

register("blockBreak", (block) => {
    if(!Player.getInventory()?.getItems()[slot]?.getRegistryName()?.includes("pickaxe")) {
      if(Player.getHeldItem()?.getRegistryName()?.includes("pickaxe")) {
        if(config.stonkSwap) {
          World.playSound(config.stonkSwapSound, 5, parseFloat(config.stonkSwapSoundPitch))
        }
      }
    }
})

let details = false
let swap
let holdingPick = false
let click

register("step", () => {
  if (!details) return
  if (Player.getHeldItem()?.getRegistryName()?.includes("pickaxe")) {
    if (!holdingPick) {
      swap = Date.now()
      holdingPick = true
      // ChatLib.chat("swap")
    }
  } else {
    holdingPick = false
  }
  
  if (swap && click) {
    let time = ((swap - click) / 1000).toFixed(3)
    if (time > 0 && time < 0.05) {
      ChatLib.chat(`&a${time}`)
    } else {
      ChatLib.chat(`&c${time}`)
    }
    swap = click = null
  }
}).setFps(60)

register("clicked", (x, y, btn, state) => {
  if (!details) return
  if (btn == 0 && state) {
    click = Date.now()
    // ChatLib.chat("click")
  }
})

register("command", () => {
  details = !details
  ChatLib.chat(`Stonk Swap Details: ${details}`)
}).setName("stonkswapdetails")