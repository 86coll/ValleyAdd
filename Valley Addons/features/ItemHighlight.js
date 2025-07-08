import RenderLib from "../../RenderLib/index"
import { registerWhen } from "../../BloomCore/utils/Utils"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import config from "../config"

let secrets = new Set(["Revive Stone", "Trap", "Decoy", "Inflatable Jerry", "Defuse Kit", "Dungeon Chest Key", "Treasure Talisman", "Architect's First Draft", "Spirit Leap", "Healing VIII Splash Potion", "Training Weights"])

const EntityItem = Java.type("net.minecraft.entity.item.EntityItem")
registerWhen(register("renderEntity", (entity, pos, partialTick, event) => {
  let d = entity.distanceTo(Player.getPlayer())
  if(d >= 20) return
  let itemDropped = new Item(entity.getEntity())
  let itemName = itemDropped?.getNBT()?.toObject()?.tag?.display?.Name?.removeFormatting()
  if(!itemName || itemName==undefined || !secrets.has(itemName)) return

  let x = entity.getX() - 0.1
  let y = entity.getY()
  let z = entity.getZ() - 0.2

  if (d < 3.5) {
    if (entity.getTicksExisted() < 11) {
      RenderLib.drawInnerEspBox(x, y, z, 0.3, 0.3, 1, 1, 0, 1, true)
    } else {
      RenderLib.drawInnerEspBox(x, y, z, 0.3, 0.3, 0, 1, 0, 1, true)
    }
  } else {
    RenderLib.drawInnerEspBox(x, y, z, 0.3, 0.3, 1, 0, 0, 1, true)
  }
  
  cancel(event)
}).setFilteredClass(EntityItem.class), () => Dungeon.inDungeon && config.itemHighlight)