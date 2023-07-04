var roleList = ['harvester', 'upgrader', 'builder', 'mover', 'repair'];

const minHarvesterCount = 3;
const minMoverCount = 2;
const minBuilderCount = 3;
const minUpgraderCount = 4;
const minRepairCount = 2;

StructureSpawn.prototype.spawnRequireCreeps = function () {
    let room = this.room;
    let creepsInRoom = room.find(FIND_MY_CREEPS);
    let numberOfCreeps = {};

    for (let role of roleList) {
        numberOfCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
    }

    let resource = this.room.find(FIND_SOURCES);
    let terrain = new Room.Terrain(this.room.name);
    room.memory.resourceLimitHarvester = []
    room.memory.totalLimitHarvester = 0;

    resource.forEach((element, index) => {
        let resourcePosX = element.pos.x;
        let resourcePosY = element.pos.y;
        let countAvailableResourcePos = 0;
        for (let x = resourcePosX - 1; x <= resourcePosX + 1; x++) {
            for (let y = resourcePosY - 1; y <= resourcePosY + 1; y++) {
                if (terrain.get(x, y) != TERRAIN_MASK_WALL) {
                    countAvailableResourcePos++;
                    room.memory.totalLimitHarvester++;
                }
            }
        }
        room.memory.resourceLimitHarvester[index] = countAvailableResourcePos;
    });

    if (this.room.energyAvailable > 200) {

        if (numberOfCreeps['harvester'] < room.memory.totalLimitHarvester) {
            this.createHarvester();
        }
        if (numberOfCreeps['mover'] < room.memory.totalLimitHarvester) {
            this.createMover();
        }
        if (numberOfCreeps['builder'] < minBuilderCount && numberOfCreeps['harvester'] >= minHarvesterCount) {
            this.createBuilder();
        }
        if (numberOfCreeps['upgrader'] < minUpgraderCount && numberOfCreeps['harvester'] >= minHarvesterCount) {
            this.createUpgrader();
        }
        if (numberOfCreeps['repair'] < minRepairCount && numberOfCreeps['harvester'] >= minHarvesterCount) {
            this.createRepair();
        }
    }
}

StructureSpawn.prototype.createHarvester = function () {

    let energy = this.room.energyAvailable;

    //初期設定
    let body = [];
    let numberOfParts = Math.floor(energy / 200);
    numberOfParts = Math.min(Math.floor(50 / 3), numberOfParts);
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
    }

    console.log('[Spawn] Harvester');

    array.forEach(element => {

    });

    let memory = {
        role: 'harvester',
        resourceIndex: 
    }


    return this.spawnCreep(body, 'harvester_' + Game.time,
        { memory: { role: 'harvester' } });
}

StructureSpawn.prototype.createBuilder = function () {

    let energy = this.room.energyAvailable;

    //初期設定
    let body = [];
    let numberOfParts = Math.floor(energy / 200);
    numberOfParts = Math.min(Math.floor(50 / 3), numberOfParts);
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
    }

    console.log('[Spawn] Builder');

    return this.spawnCreep(body, 'builder_' + Game.time,
        { memory: { role: 'builder', building: false } });
}

StructureSpawn.prototype.createUpgrader = function () {

    let energy = this.room.energyAvailable;

    //初期設定
    let body = [];
    let numberOfParts = Math.floor(energy / 200);
    numberOfParts = Math.min(Math.floor(50 / 3), numberOfParts);
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
    }

    console.log('[Spawn] Upgrader');

    return this.spawnCreep(body, 'upgrader_' + Game.time,
        { memory: { role: 'upgrader' } });

}

StructureSpawn.prototype.createMover = function () {

    let energy = this.room.energyAvailable;

    //初期設定
    let body = [];
    let numberOfParts = Math.floor(energy / 200);
    numberOfParts = Math.min(Math.floor(50 / 3), numberOfParts);
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
    }

    console.log('[Spawn] Mover');

    return this.spawnCreep(body, 'mover_' + Game.time,
        { memory: { role: 'mover', working: false } });

}

StructureSpawn.prototype.createRepair = function () {

    let energy = this.room.energyAvailable;

    //初期設定
    let body = [];
    let numberOfParts = Math.floor(energy / 200);
    numberOfParts = Math.min(Math.floor(50 / 3), numberOfParts);
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
    }

    console.log('[Spawn] Repair');

    return this.spawnCreep(body, 'repair_' + Game.time,
        { memory: { role: 'repair', working: false } });

}
