import config from "../config"

register("chat", () => {
    if (config.cdKick) ChatLib.command("pc " + config.cdKickText);
}).setCriteria("You were kicked while joining that server!")