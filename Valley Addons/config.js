import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @SliderProperty,
    @NumberProperty,
} from '../Vigilance/index';

@Vigilant("Valley Addons", "§5Valley Addons",  {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General', 'Dungeons', 'F7/M7', 'Location Messages', 'Kuudra'];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {

    pictureOnScreenGui = new Gui()
    p3StartTimerGui = new Gui()
    goldorTickTimerGui = new Gui()
    dungeonWarpCooldownGui = new Gui()
    runSplitsGui = new Gui()
    campSplitsGui = new Gui()
    reaperDisplayGui = new Gui()
    relicSpawnTimerGui = new Gui()
    dragonSpawnTimerGui = new Gui()
    crystalSpawnTimerGui = new Gui()
    padTickTimerGui = new Gui()

    /*
    GENERAL
    */

    @SwitchProperty({
        name: "Auto Kick Valley",
        description: "Automatically kicks Vedzel when he joins the party",
        category: "General",
        subcategory: "General"
    })
    kickValley = false;

    @SwitchProperty({
        name: "Player Transfer Cooldown Notification",
        description: "Sends a message when you are able to swap lobbies again",
        category: "General",
        subcategory: "General"
    })
    ptc = false;

    @SwitchProperty({
        name: "Picture on Screen",
        description: "Puts a picture on your screen\nName it [pictureOnScreen.png] and put it in the [Valley Addons/assets] folder",
        category: "General",
        subcategory: "Picture on Screen"
    })
    pictureOnScreen = false

    @ButtonProperty({
        name: "Move Picture on Screen",
        description: "Moves the picture on your screen",
        category: "General",
        subcategory: "Picture on Screen",
        placeholder: "Move"
    })
    MovePictureOnScreenGui() {
        this.pictureOnScreenGui.open()
    }

    @SwitchProperty({
        name: "Cooldown Kick Message",
        description: "Sends a message to the party when you are cooldown kicked",
        category: "General",
        subcategory: "Cooldown Kick Message"
    })
    cdKick = false;

    @TextProperty({
        name: "Cooldown Kick Text",
        description: "Text used for Cooldown Kick Message",
        category: "General",
        subcategory: "Cooldown Kick Message",
        placeholder: "Cooldown Kicked!"
    })
    cdKickText = "Cooldown Kicked!";

    @SwitchProperty({
        name: "Compact Hoppity's Messages",
        description: "Turns the three lines when you find an egg into one to make it easier if you got a new or a dupe",
        category: "General",
        subcategory: "General"
    })
    compactHoppity = false;

    @SwitchProperty({
        name: "Reaper Display",
        description: "Shows time left on reaper armor ability",
        category: "General",
        subcategory: "Reaper Display"
    })
    reaperDisplay = false;

    @ButtonProperty({
        name: "Move Reaper Display",
        description: "Scroll to change scale, middle click to reset",
        category: "General",
        subcategory: "Reaper Display",
        placeholder: "Move"
    })
    MoveReaperDisplayGui() {
        this.reaperDisplayGui.open()
    };

    @SwitchProperty({
        name: "Auto Refill Pearls",
        description: "Automatically refills your stack of ender pearls when you have less than a specific threshold",
        category: "General",
        subcategory: "Auto Refill"
    })
    autoRefillPearls = false;

    @SliderProperty({
        name: "Auto Refill Pearls Threshold",
        description: "Refills pearls when stack size goes under this number",
        category: "General",
        subcategory: "Auto Refill",
        min: 1,
        max: 16
    })
    autoRefillPearlsThreshold = 8;

    @SwitchProperty({
        name: "Auto Refill Jerries",
        description: "Automatically refills your stack of inflatable jerries when you have less than a specific threshold",
        category: "General",
        subcategory: "Auto Refill"
    })
    autoRefillJerries = false;

    @SliderProperty({
        name: "Auto Refill Jerries Threshold",
        description: "Refills jerries when stack size goes under this number",
        category: "General",
        subcategory: "Auto Refill",
        min: 1,
        max: 64
    })
    autoRefillJerriesThreshold = 32;

    /*
    DUNGEONS
    */

    // general

    @SwitchProperty({
        name: "Dungeon Warp Cooldown",
        description: "Shows time before you can go into the next dungeon",
        category: "Dungeons",
        subcategory: "Dungeon Warp Cooldown"
    })
    dungeonWarpCooldown = false;

    @ButtonProperty({
        name: "Move Dungeon Warp Cooldown",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeons",
        subcategory: "Dungeon Warp Cooldown",
        placeholder: "Move"
    })
    MoveDungeonWarpCooldownGui() {
        this.dungeonWarpCooldownGui.open()
    };

    @SwitchProperty({
        name: "Run Splits",
        description: "Shows run splits with real time and server time \nCurrently only works for M7",
        category: "Dungeons",
        subcategory: "General"
    })
    runSplits = false;

    @ButtonProperty({
        name: "Move Run Splits",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeons",
        subcategory: "General",
        placeholder: "Move"
    })
    MoveRunSplitsGui() {
        this.runSplitsGui.open()
    };

    @SwitchProperty({
        name: "Score Milestones",
        description: "Sends a message with a timestamp once 270 and 300 score are reached (credit to bloom)",
        category: "Dungeons",
        subcategory: "General"
    })
    scoreMilestones = false;

    @SwitchProperty({
        name: "Blood Rush Splits",
        description: "Tells you how long it took to clear each room on blood rush if you are archer or mage",
        category: "Dungeons",
        subcategory: "General"
    })
    bloodRushSplits = false;

    @SwitchProperty({
        name: "Show On Every Class",
        description: "Shows Blood Rush Splits on every class instead of just Archer and Mage",
        category: "Dungeons",
        subcategory: "General"
    })
    showOnEveryClass = false;

    @SwitchProperty({
        name: "Explo Shot Message",
        description: "Shows explosive shot damage per enemy",
        category: "Dungeons",
        subcategory: "General"
    })
    exploShot = false;

    @SwitchProperty({
        name: "Auto Open Potion Bag",
        description: "Opens the potion bag when entering a dungeon",
        category: "Dungeons",
        subcategory: "General"
    })
    autoOpenPotionBag = false;
    
    @SwitchProperty({
        name: "Duplicate Class Warning",
        description: "Shows a title and plays a sound if there is a duplicate class",
        category: "Dungeons",
        subcategory: "General"
    })
    dupeClass = false

    @TextProperty({
        name: "Duplicate Class Warning Sound",
        description: "Sound used for Duplicate Class Warning",
        category: "Dungeons",
        subcategory: "General",
        placeholder: "note.pling"
    })
    dupeClassSound = "note.pling"

    @SwitchProperty({
        name: "Stonk Swap Ding",
        description: "Plays a sound when you do a successful stonk swap\nCredit to eatplastic",
        category: "Dungeons",
        subcategory: "General"
    })
    stonkSwap = false;

    @TextProperty({
        name: "Stonk Swap Ding Sound",
        description: "Sound used for Stonk Swap Ding",
        category: "Dungeons",
        subcategory: "General",
        placeholder: "random.orb"
    })
    stonkSwapSound = "random.orb";

    @TextProperty({
        name: "Stonk Swap Ding Pitch",
        description: "Pitch of Stonk Swap Ding Sound",
        category: "Dungeons",
        subcategory: "General",
        placeholder: "2"
    })
    stonkSwapSoundPitch = "2";

    @SwitchProperty({
        name: "Dungeon Item Highlight",
        description: "Highlights item secrets and shows when you're in range",
        category: "Dungeons",
        subcategory: "General"
    })
    itemHighlight = false;

    @SwitchProperty({
        name: "Hide Players After Leap",
        description: "Hides players after leaping",
        category: "Dungeons",
        subcategory: "General"
    })
    hidePlayersAfterLeap = false;

    @SwitchProperty({
        name: "Only Hide In Boss",
        description: "Only hides players after leap in boss",
        category: "Dungeons",
        subcategory: "General"
    })
    onlyHideInBoss = false;

    // blood camp

    @SwitchProperty({
        name: "Blood Camp Helper",
        description: "Shows watcher move time and time to kill remaining blood mobs \nShows alert when watcher dialogue appears and if Diamante Giant is detected \nFixes SBE Blood Opened split when blood is entered before the door is opened",
        category: "Dungeons",
        subcategory: "Blood Camp"
    })
    bloodCampHelper = false

    @SwitchProperty({
        name: "Show Blood Camp Splits On Screen",
        description: "Shows watcher move timer and remaining mobs killed timer as you are blood camping",
        category: "Dungeons",
        subcategory: "Blood Camp"
    })
    campSplits = false

    @SwitchProperty({
        name: "Hide Splits in Boss",
        description: "Hides the blood camp splits when you enter boss",
        category: "Dungeons",
        subcategory: "Blood Camp"
    })
    hideCampSplitsInBoss = false

    @ButtonProperty({
        name: "Move Blood Camp Splits",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeons",
        subcategory: "Blood Camp",
        placeholder: "Move"
    })
    MoveCampSplitsGui() {
        this.campSplitsGui.open()
    };

    // invincibility

    @SwitchProperty({
        name: "Bonzo and Phoenix Messages",
        description: "Announces when bonzo mask procs",
        category: "Dungeons",
        subcategory: "Invincibility"
    })
    maskPhoenixMsg = false;

    @TextProperty({
        name: "Bonzo Mask Text",
        description: "Text used for Bonzo Mask Message",
        category: "Dungeons",
        subcategory: "Invincibility",
        placeholder: "Bonzo's Mask Procced!"
    })
    maskText = "Bonzo's Mask Procced!";

    @TextProperty({
        name: "Phoenix Text",
        description: "Text used for Phoenix Message",
        category: "Dungeons",
        subcategory: "Invincibility",
        placeholder: "Phoenix Procced!"
    })
    phoenixText = "Phoenix Procced!"

    @SwitchProperty({
        name: "Disable During Pre 4",
        description: "Does not send the bonzo and phoenix messages if you are doing pre 4 as berserker",
        category: "Dungeons",
        subcategory: "Invincibility"
    })
    pre4Disable = false

    // party finder

    @SwitchProperty({
        name: "Show MP",
        description: "Shows a player's magical power when joining a party",
        category: "Dungeons",
        subcategory: "Party Finder"
    })
    showMP = false;

    @SwitchProperty({
        name: "Show PB",
        description: "Shows a player's M7 PB when joining a party",
        category: "Dungeons",
        subcategory: "Party Finder"
    })
    showPB = false;

    @SwitchProperty({
        name: "Show level",
        description: "Shows a player's skyblock level when joining a party",
        category: "Dungeons",
        subcategory: "Party Finder"
    })
    showLVL = false;

    /*
    F7/M7
    */

    // general

    @SwitchProperty({
        name: "Predev Timer",
        description: "Tells you how long it took to complete predev",
        category: "F7/M7",
        subcategory: "General"
    })
    predevTimer = false;

    @SwitchProperty({
        name: "Dragon Spawn Timer",
        description: "Dragon spawn timer that syncs with server lag",
        category: "F7/M7",
        subcategory: "General"
    })
    dragonSpawnTimer = false;
    
    @ButtonProperty({
        name: "Move Dragon Spawn Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "F7/M7",
        subcategory: "General",
        placeholder: "Move"
    })
    MoveDragonSpawnTimerGui() {
        this.dragonSpawnTimerGui.open()
    };

    @SelectorProperty({
        name: "Healer Debuff Team",
        description: "Changes whether dragon spawn timer shows arch or bers dragon if you are healer",
        category: "F7/M7",
        subcategory: "General",
        options: [
            "Arch Team",
            "Bers Team"
        ]
    })
    healerTeam = 0;

    @SwitchProperty({
        name: "Crystal Spawn Timer",
        description: "Shows when the second set of crystals will spawn",
        category: "F7/M7",
        subcategory: "General"
    })
    crystalSpawnTimer = false;

    @ButtonProperty({
        name: "Move Crystal Spawn Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "F7/M7",
        subcategory: "General",
        placeholder: "Move"
    })
    MoveCrystalSpawnTimerGui() {
        this.crystalSpawnTimerGui.open()
    };

    @SwitchProperty({
        name: "Crystal Place Timer",
        description: "Times how long it took to place the crystal after picking it up",
        category: "F7/M7",
        subcategory: "General"
    })
    crystalPlaceTimer = false;

    @SwitchProperty({
        name: "Pad Tick Timer",
        description: "Shows when the pad will cause the pillar to crush",
        category: "F7/M7",
        subcategory: "General"
    })
    padTickTimer = false;

    @ButtonProperty({
        name: "Move Pad Tick Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "F7/M7",
        subcategory: "General",
        placeholder: "Move"
    })
    MovePadTickTimerGui() {
        this.padTickTimerGui.open()
    };

    // phase 3

    @SwitchProperty({
        name: "P3 Start Timer",
        description: "Shows time until P3 starts from when Storm dies",
        category: "F7/M7",
        subcategory: "Phase 3"
    })
    p3StartTimer = false;

    @ButtonProperty({
        name: "Move P3 Start Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "F7/M7",
        subcategory: "Phase 3",
        placeholder: "Move"
    })
    MoveP3StartTimerGui() {
        this.p3StartTimerGui.open()
    };

    @SwitchProperty({
        name: "Terminal Timestamps",
        description: "Shows what time each terminal, device, or lever was completed",
        category: "F7/M7",
        subcategory: "Phase 3"
    })
    terminalTimestamps = false;

    @SwitchProperty({
        name: "Goldor Tick Timer",
        description: "Shows a timer for Goldor death ticks",
        category: "F7/M7",
        subcategory: "Phase 3"
    })
    goldorTickTimer = false;

    @ButtonProperty({
        name: "Move Goldor Tick Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "F7/M7",
        subcategory: "Phase 3",
        placeholder: "Move"
    })
    MoveGoldorTickTimerGui() {
        this.goldorTickTimerGui.open()
    };

    @SwitchProperty({
        name: "Hide Players In P3",
        description: "Hides players during the terminals phase",
        category: "F7/M7",
        subcategory: "Phase 3"
    })
    hidePlayersInP3 = false;

    @SwitchProperty({
        name: "Pre 4 Notifier",
        description: "Shows a title and plays a sound when pre 4 is completed",
        category: "F7/M7",
        subcategory: "Phase 3"
    })
    pre4Notifier = false;

    @TextProperty({
        name: "Pre 4 Notifier Sound",
        description: "Sound used for Pre 4 Notifier",
        category: "F7/M7",
        subcategory: "Phase 3",
        placeholder: "note.harp"
    })
    pre4NotifierSound = "note.harp";

    // relics

    @SwitchProperty({
        name: "Relic Spawn Timer",
        description: "Shows time until relics spawn, NOT accurate with server lag",
        category: "F7/M7",
        subcategory: "Relics"
    })
    relicSpawnTimer = false;

    @TextProperty({
        name: "Relic Spawn Timer Amount",
        description: "Since relic spawn is so rng, choose your own time... \nDefault is 42",
        category: "F7/M7",
        subcategory: "Relics",
        placeholder: "42"
    })
    relicSpawnTimerAmt = "42"

    @ButtonProperty({
        name: "Move Relic Spawn Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "F7/M7",
        subcategory: "Relics",
        placeholder: "Move"
    })
    MoveRelicSpawnTimerGui() {
        this.relicSpawnTimerGui.open()
    };

    @SwitchProperty({
        name: "Relic Timer",
        description: "Shows time it took to place your relic",
        category: "F7/M7",
        subcategory: "Relics"
    })
    relicTimer = false;

    @SwitchProperty({
        name: "Show Relic Pick Up Time",
        description: "Calculates how long it took to pick up the relic after it spawned",
        category: "F7/M7",
        subcategory: "Relics"
    })
    relicPickupTime = false;

    @SwitchProperty({
        name: "Show Every Relic",
        description: "Shows relic time for all five relics (might clog chat)",
        category: "F7/M7",
        subcategory: "Relics"
    })
    showEveryRelic = false

    @SwitchProperty({
        name: "Hide Players In P5",
        description: "Hides players during phase 5",
        category: "F7/M7",
        subcategory: "Relics"
    })
    hidePlayersInP5 = false;

    @SwitchProperty({
        name: "Block Wrong Relic Clicks",
        description: "Prevents you from placing your relic in the wrong cauldron and dying",
        category: "F7/M7",
        subcategory: "Relics"
    })
    blockRelicClicks = false;

    @SwitchProperty({
        name: "Highlight Correct Cauldron",
        description: "Highlights the corresponding cauldron to the relic you picked up",
        category: "F7/M7",
        subcategory: "Relics"
    })
    highlightCauldron = false;

    @SwitchProperty({
        name: "Show Highlight Through Blocks",
        description: "Shows the correct relic cauldron through blocks",
        category: "F7/M7",
        subcategory: "Relics"
    })
    cauldronPhase = false;

    // location messages

    @SwitchProperty({
        name: "Location Notifications",
        description: "Shows a title and plays a sound when a party member sends a location message",
        category: "Location Messages",
        subcategory: "General"
    })
    locationNotif = false;

    @TextProperty({
        name: "Location Notification Sound",
        description: "Sound used for Location Notification Sound",
        category: "Location Messages",
        subcategory: "General",
        placeholder: "note.harp"
    })
    locationSound = "note.harp";

    @TextProperty({
        name: "Location Notification Sound Times to Play",
        description: "Choose how many times the location notification sound plays",
        category: "Location Messages",
        subcategory: "General",
        placeholder: "1"
    })
    locationNotifRepeatAmount = "1";

    @SwitchProperty({
        name: "SS Nearby Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    ssCoord = false;

    @SwitchProperty({
        name: "Pre Enter 2 Nearby Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    pre2Coord = false;

    @SwitchProperty({
        name: "Pre Enter 3 Nearby Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    pre3Coord = false;

    @SwitchProperty({
        name: "Pre Enter 4 Nearby Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    pre4Coord = false;
    
    @SwitchProperty({
        name: "At Core Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    slingshotCoord = false;

    @SwitchProperty({
        name: "Inside Tunnel Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    tunnelCoord = false;

    @SwitchProperty({
        name: "At Mid Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    midCoord = false;

    // Kuudra

    @SwitchProperty({
        name: "Kuudra Party DPS",
        description: "Shows your party's DPS for the last phase of Kuudra",
        category: "Kuudra",
        subcategory: "Party DPS"
    })
    kuudraDPS = false

    @SwitchProperty({
        name: "Send DPS in Chat",
        description: "Sends your party's DPS in party chat",
        category: "Kuudra",
        subcategory: "Party DPS"
    })
    sendDPS = false

    constructor() {
        this.initialize(this);
        
        const lines = [
            "",
            "&5Welcome to Valley Addons!",
            "",
            "&fCommands:",
            "&7/mp &d[name]&7 - shows &d[name]&7's magical power.",
            "&7/pb &d[name]&7 - shows &d[name]&7's m7 pb.",
            "&7/level &d[name]&7 - shows &d[name]&7's skyblock level.",
            "&7/remind &d[msg]&7 - sets a reminder that shows &d[msg]&7 on your screen at the end of a dungeon or kuudra run",
            "&7/clearremind - clears any set reminders",
            "&7/ep - fills your stack of ender pearls",
            "&7/ij - fills your stack of inflatable jerries",
            "&7/refill - refills both ender pearls and inflatable jerries",
            "&7/coinflip &d[name]&7 - flips a coin to kick &d[name]&7 from the party",
            "&7/coinflip &d[name1]&7 &d[name2]&7 - flips a coin to kick either &d[name1]&7 or &d[name2]&7 from the party.",
            "&7/rotate &d[pitch] [yaw]&7 - rotates you to specified pitch and yaw",
            "",
            "&4NOTE: A LOT of the features do not work without Mort and Boss messages. Make sure to not have them disabled.",
            ""
        ]
        const commands = lines.join("\n")

        this.setCategoryDescription("General", commands)

        this.addDependency("Auto Refill Pearls Threshold", "Auto Refill Pearls")
        this.addDependency("Auto Refill Jerries Threshold", "Auto Refill Jerries")
        this.addDependency("Move Picture on Screen", "Picture on Screen")
        this.addDependency("Cooldown Kick Text", "Cooldown Kick Message")
        this.addDependency("Move Reaper Display", "Reaper Display")
        this.addDependency("Move Dungeon Warp Cooldown", "Dungeon Warp Cooldown")
        this.addDependency("Move Run Splits", "Run Splits")
        this.addDependency("Show On Every Class", "Blood Rush Splits")
        this.addDependency("Duplicate Class Warning Sound", "Duplicate Class Warning")
        this.addDependency("Show Blood Camp Splits On Screen", "Blood Camp Helper")
        this.addDependency("Hide Splits in Boss", "Blood Camp Helper")
        this.addDependency("Move Blood Camp Splits", "Blood Camp Helper")
        this.addDependency("Only Hide In Boss", "Hide Players After Leap")
        this.addDependency("Move P3 Start Timer", "P3 Start Timer")
        this.addDependency("Bonzo Mask Text", "Bonzo and Phoenix Messages")
        this.addDependency("Phoenix Text", "Bonzo and Phoenix Messages")
        this.addDependency("Disable During Pre 4", "Bonzo and Phoenix Messages")
        this.addDependency("Move Dragon Spawn Timer", "Dragon Spawn Timer")
        this.addDependency("Healer Debuff Team", "Dragon Spawn Timer")
        this.addDependency("Move Crystal Spawn Timer", "Crystal Spawn Timer")
        this.addDependency("Move Pad Tick Timer", "Pad Tick Timer")
        this.addDependency("Move P3 Start Timer", "P3 Start Timer")
        this.addDependency("Move Goldor Tick Timer", "Goldor Tick Timer")
        this.addDependency("Relic Spawn Timer Amount", "Relic Spawn Timer")
        this.addDependency("Move Relic Spawn Timer", "Relic Spawn Timer")
        this.addDependency("Show Relic Pick Up Time", "Relic Timer")
        this.addDependency("Location Notification Sound", "Location Notifications")
        this.addDependency("Location Notification Sound Times to Play", "Location Notifications")
        this.addDependency("Send DPS in Chat", "Kuudra Party DPS")
    }
}

export default new Settings()