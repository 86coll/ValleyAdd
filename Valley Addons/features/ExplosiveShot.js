import { prefix, formatNumber } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"
import config from "../config"

registerWhen(register("chat", (enemies, totalDamage) => {
    let dmg = Number(totalDamage.replaceAll(",", ""))
    let unitdmg = formatNumber(dmg / enemies)
    ChatLib.chat(`${prefix} &aExplosive shot did &e${unitdmg} &adamage per enemy.`)
}).setCriteria(/Your Explosive Shot hit (\d+) enemies for ([\d,\.]+) damage./), () => config.exploShot)