import { Checkmark, ClearTypes, componentToRealCoords, defaultMapSize, getCheckmarks, getCore, getHighestBlock, getRoomPosition, getRoomShape, halfRoomSize, mapCellSize, MapColorToRoomType, RoomColors, RoomNameColorKeys, roomsJson, RoomTypes, RoomTypesStrings, setPixels } from "./MapUtils"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { chunkLoaded, Color, colorShift, rotateCoords } from "../../BloomCore/utils/Utils"
import { RoomMap } from "./MapUtils"


const offsets = [[-halfRoomSize, -halfRoomSize], [halfRoomSize, -halfRoomSize], [halfRoomSize, halfRoomSize], [-halfRoomSize, halfRoomSize]]

export default class Room {
    constructor(components=[], roofHeight=null) {

        this.name = null
        this.type = RoomTypes.UNKNOWN
        this.secrets = 0
        this.cores = []
        this.roomID = null
        this.clearType = null
        this.crypts = 0

        this.shape = "1x1"
        this.rotation = null
        this.corner = null

        this.roofHeight = roofHeight

        this.highlighted = false
        
        this.checkmark = Checkmark.NONE
        this.explored = false
        this.hasMimic = false

        // Rendering stuff
        this.width = 0
        this.height = 0
        this.center = [0, 0] // RoomTypes name is drawn here
        this.checkmarkCenter = [0, 0]

        this.parent = null
        this.children = []
        this.doors = []

        this.components = []
        this.realComponents = []
        components.forEach(c => this.addComponent(c))

        this.doors = []
        this.findRotation()
        this.updateRenderVariables()
    }

    updateRenderVariables() {
        // Room name shit
        const name = this.center
        let [nameX, nameY] = getRoomPosition(...name)
        this.roomNameX = nameX
        this.roomNameY = nameY

        // Checkmark Shit
        this.checkmarkImage = getCheckmarks().get(this.checkmark)
        const cm = this.checkmarkCenter
        if (!cm) return
        
        let [cmX, cmY] = getRoomPosition(...cm)
        this.checkmarkX = cmX
        this.checkmarkY = cmY
        this.checkmarkWidth = 1
        this.checkmarkHeight = 1

        // Secrets Number
        const com = this.components[0]
        if (!com) return
        let [sx, sy] = getRoomPosition(...com)
        this.secretX = sx-mapCellSize*1.3
        this.secretY = sy-mapCellSize*1.3
    }

    scanAndLoad() {
        this.checkmark = Checkmark.NONE
        for (let c of this.realComponents) {
            let [x, z] = c
            if (!this.roofHeight) this.roofHeight = getHighestBlock(x, z)
            let core = getCore(x, z)
            if (!this.loadRoomFromCore(core)) continue

            this.updateRenderVariables()
            return
        }
    }

    loadFromData(roomData) {
        this.name = roomData.name
        this.type = RoomTypesStrings.get(roomData.type) ?? RoomTypes.NORMAL
        this.secrets = roomData.secrets
        this.cores = roomData.cores
        this.roomID = roomData.roomID
        this.clear = roomData.clear == "mob" ? ClearTypes.MOB : ClearTypes.MINIBOSS
        this.crypts = roomData.crypts ?? 0
        this.updateRenderVariables()
    }

    loadFromRoomId(roomID) {
        const roomData = RoomMap.get(roomID)
        if (!roomData) return false
        this.loadFromData(roomData)
        return true
    }

    loadRoomFromCore(core) {
        for (let roomData of roomsJson) {
            if (!roomData.cores.includes(core)) continue
            this.loadFromData(roomData)

            return true
        }
        return false
    }

    findRotation() {
        if (!this.roofHeight) return

        if (this.type == RoomTypes.FAIRY) {
            this.rotation = 0
            let [x, z] = this.realComponents[0]
            this.corner = [x-halfRoomSize+0.5, this.roofHeight, z-halfRoomSize+0.5]
            return
        }

        for (let c of this.realComponents) {
            let [x, z] = c
            for (let i = 0; i < offsets.length; i++) {
                let [dx, dz] = offsets[i]
                let [nx, nz] = [x+dx, z+dz]
                if (!chunkLoaded(nx, this.roofHeight, nz)) return
                
                let block = World.getBlockAt(nx, this.roofHeight, nz)
                if (block.type.getID() !== 159 || block.getMetadata() !== 11) continue
                this.rotation = i*90
                this.corner = [nx+0.5, this.roofHeight, nz+0.5]
                return
            }
        }
    }

    updateDimensions() {
        let minX = Math.min(...this.components.map(a => a[0]))
        let minZ = Math.min(...this.components.map(a => a[1]))
        this.width = Math.max(...this.components.map(a => a[0])) - minX
        this.height = Math.max(...this.components.map(a => a[1])) - minZ
        this.center = [
            minX + (this.width)/2,
            minZ + (this.height)/2
        ]
        this.checkmarkCenter = this.center
        if (this.shape !== "L") return
        
        if (this.components.filter(a => a[1] == minZ).length == 2) this.center[1] -= this.height/2
        else this.center[1] += this.height/2
    }

    /**
     * 
     * @param {[Number, Number]} component 
     */
    hasComponent([x, z]) {
        for (let c of this.components) {
            if (c[0] == x && c[1] == z) return true
        }
        return false
    }

    addComponent([x, z]) {
        if (this.hasComponent([x, z])) return this
        this.components.push([x, z])

        // Sort components so the top left on the map is always first
        this.components.sort((a, b) => a[1]-b[1]).sort((a, b) => a[0]-b[0])
        this.realComponents = this.components.map(a => componentToRealCoords(a, false))
        this.shape = getRoomShape(this.components)
        this.updateDimensions()

        this.corner = null
        this.rotation = null

        this.findRotation()
        this.updateRenderVariables()

        return this
    }
    
    addComponents(components) {
        components.forEach(c => this.addComponent(c))
        return this
    }

    merge(room) {
        
        room.components.forEach(c => this.addComponent(c))

        // If the merging room is already loaded then load it
        for (let core of room.cores) {
            if (this.loadRoomFromCore(core)) break
        }

        // If not loaded
        if (this.type == RoomTypes.UNKNOWN) this.scanAndLoad()

    }

    loadFromRoomMapColor(color) {
        this.type = MapColorToRoomType.get(color) ?? RoomTypes.NORMAL

        if (this.type == RoomTypes.BLOOD) this.loadFromData(roomsJson.find(a => a.name == "Blood"))
        if (this.type == RoomTypes.ENTRANCE) this.loadFromData(roomsJson.find(a => a.name == "Entrance"))
    }

    getColor() {
        let color = RoomColors.get(this.type)
        // Gray room on the map.
        if (this.type == RoomTypes.UNKNOWN && !this.roofHeight) return new Color(65/255, 65/255, 65/255, 1)

        if (this.highlighted) color = colorShift(color, Color.YELLOW, 0.2)
        if (!this.explored && Dungeon.time) color = color.darker().darker()
        // Give the room a red tint if it has the mimic
        if (this.hasMimic) color = colorShift(color, Color.RED, 0.2)
        return color
    }

    renderName() {
    }

    renderCheckmark() {
    }

    renderSecrets() {
    }

    /**
     * 
     * @returns {Room[]}
     */
    getAdjacentRooms() {
        let adjacent = []
        for (let door of this.doors) {
            if (door.childRoom == this) adjacent.push(door.parentRoom)
            else if (door.parentRoom == this) adjacent.push(door.childRoom)
        }
        return adjacent
    }
    /**
     * Checks whether the entire room is within render distance
     * @returns {Boolean}
     */
    isWithinRender() {
        for (let c of this.realComponents) {
            let [x, z] = c
            for (let i = 0; i < offsets.length; i++) {
                let [dx, dz] = offsets[i]
                let [nx, nz] = [x+dx, z+dz]
                if (!chunkLoaded(nx, this.roofHeight, nz)) return false
            }
        }
        return true
    }

    /**
     * Gets the name of this room with formatting codes.
     * @param {Boolean} formatted 
     */
    getName(formatted=true) {
        let color = formatted ? (RoomNameColorKeys.get(this.type) ?? "&f") : ""
        return `${color}${this.name}`
    }

    getRoomScore() {
        if (this.roomID == null) return Infinity
        const roomData = RoomMap.get(this.roomID)
        if ("roomScore" in roomData) return roomData.roomScore
        if ("secretScore" in roomData && "clearScore" in roomData) return roomData.secretScore/2 + roomData.clearScore/2
    }

    /**
     * Converts coordinates from the real world into relative, rotated room coordinates
     * @param {[Number, Number, Number]} coord 
     * @returns 
     */
    getRoomCoord(coord, ints=false) {
        if (this.rotation == null || !this.corner) return

        const cornerCoord = ints ? this.corner.map(Math.floor) : this.corner
        const roomCoord = rotateCoords(coord.map((v, i) => v - cornerCoord[i]), this.rotation)

        if (ints) return roomCoord.map(Math.floor)
        
        return roomCoord
    }
    
    
    /**
     * Converts relative room coords and inversely rotates and translates them to real world coordinates
     * @param {[Number, Number, Number]} coord 
     * @returns 
     */
    getRealCoord(coord, ints=false) {
        if (this.rotation == null || !this.corner) return
    
        const rotated = rotateCoords(coord, 360 - this.rotation)
        const roomCorner = ints ? this.corner.map(Math.floor) : this.corner
        const realCoord = rotated.map((v, i) => v + roomCorner[i])
    
        if (ints) return realCoord.map(Math.floor)
    
        return realCoord

    }

    toString() {
        return `Room[&ename=&6${this.getName(true)}&f, &7components=${JSON.stringify(this.components)}&f, &2explored=${this.explored}&f]`
    }
}