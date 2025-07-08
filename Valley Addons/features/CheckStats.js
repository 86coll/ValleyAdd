import request from "../../requestV2"
import { prefix } from "../util/util"
import { data } from "../util/data"
import config from "../config"

export const mpCommand = register("command", ...args => {
    if (!args[0]) {
        getMP(Player.getName());
    } else {
        getMP(args[0]);
    }
}).setName("mp")

export const pbCommand = register("command", ...args => {
    if (!args[0]) {
        getPB(Player.getName());
    } else {
        getPB(args[0]);
    }
}).setName("pb")

export const lvlCommand = register("command", ...args => {
    if (!args[0]) {
        getLevel(Player.getName());
    } else {
        getLevel(args[0]);
    }
}).setName("level").setAliases(["lvl"])

register("chat", (user) => {
    if (config.showMP) getMP(user)
    if (config.showPB) getPB(user)
    if (config.showLVL) getLevel(user)
}).setCriteria(/Party Finder > (\w+) joined the dungeon group! .+/)

register("chat", (user) => {
    if (config.showMP) getMP(user)
    if (config.showLVL) getLevel(user)
}).setCriteria(/Party Finder > (\w+) joined the group! .+/)

function getMP(name) {
    let key = data.key
    request(`https://api.mojang.com/users/profiles/minecraft/${name}`).then((data) => {
        let fixedName = JSON.parse(data).name;
        let uuid = JSON.parse(data).id
        request(`https://api.hypixel.net/skyblock/profiles?key=${key}&uuid=${uuid}`).then((profileData) => {
            let text = JSON.parse(profileData);
            let selectedProfileIndex = -1;
            for (let i = 0; i < text.profiles.length; ++i) {
                if (text.profiles[i].selected == true) {
                    selectedProfileIndex = i;
                    break;
                }
            }
            if (selectedProfileIndex == -1) {
                return ChatLib.chat(prefix + " &cFailed to get Skyblock Profile!");
            }

            let mp = text.profiles[selectedProfileIndex].members[uuid].accessory_bag_storage.highest_magical_power;

            ChatLib.chat(`${prefix} &e${fixedName}&a's magical power is &e${mp}&a!`)
        })
    })
}

function getPB(name) {
    let key = data.key
    let pb
    request(`https://api.mojang.com/users/profiles/minecraft/${name}`).then((data) => {
        let fixedName = JSON.parse(data).name;
        let uuid = JSON.parse(data).id
        request(`https://api.hypixel.net/skyblock/profiles?key=${key}&uuid=${uuid}`).then((profileData) => {
            let text = JSON.parse(profileData);
            let selectedProfileIndex = -1;
            for (let i = 0; i < text.profiles.length; ++i) {
                if (text.profiles[i].selected == true) {
                    selectedProfileIndex = i;
                    break;
                }
            }
            if (selectedProfileIndex == -1) {
                return ChatLib.chat(prefix + " &cFailed to get Skyblock Profile!");
            }

            pb = parseInt(text.profiles[selectedProfileIndex].members[uuid].dungeons.dungeon_types.master_catacombs.fastest_time_s_plus[7]);
            if (!pb) {
                ChatLib.chat(`${prefix} &e${fixedName} &chas not played M7 on this profile!`)
            } else {
                let minutes = Math.floor(pb / 60000)
                let seconds = (pb % 60000) / 1000.0
            
                let formatSeconds
                if (seconds < 10) {
                    formatSeconds = "0" + seconds
                } else {
                    formatSeconds = seconds
                }
            
                let formattedPB = minutes + ":" + formatSeconds
    
                ChatLib.chat(`${prefix} &e${fixedName}&a's pb is &e${formattedPB}&a!`)
            }
        })
    })
}

function getLevel(name) {
    let key = data.key
    request(`https://api.mojang.com/users/profiles/minecraft/${name}`).then((data) => {
        let fixedName = JSON.parse(data).name;
        let uuid = JSON.parse(data).id
        request(`https://api.hypixel.net/skyblock/profiles?key=${key}&uuid=${uuid}`).then((profileData) => {
            let text = JSON.parse(profileData);
            let selectedProfileIndex = -1;
            for (let i = 0; i < text.profiles.length; ++i) {
                if (text.profiles[i].selected == true) {
                    selectedProfileIndex = i;
                    break;
                }
            }
            if (selectedProfileIndex == -1) {
                return ChatLib.chat(prefix + " &cFailed to get Skyblock Profile!");
            }

            let exp = text.profiles[selectedProfileIndex].members[uuid].leveling.experience;
            let level = exp / 100
            
            let colorCode
            if (level < 40) colorCode = "&7"
            else if (level < 80) colorCode = "&f"
            else if (level < 120) colorCode = "&e"
            else if (level < 160) colorCode = "&a"
            else if (level < 200) colorCode = "&2"
            else if (level < 240) colorCode = "&b"
            else if (level < 280) colorCode = "&3"
            else if (level < 320) colorCode = "&9"
            else if (level < 360) colorCode = "&d"
            else if (level < 400) colorCode = "&5"
            else if (level < 440) colorCode = "&6"
            else if (level < 480) colorCode = "&c"
            else colorCode = "&4"
            
            ChatLib.chat(`${prefix} &e${fixedName}&a's Skyblock Level is ${colorCode}${level}&a!`)
        })
    })
}