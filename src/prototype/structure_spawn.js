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

    if (this.room.energyAvailable == this.room.energyCapacityAvailable) {
        if (numberOfCreeps['harvester'] < minHarvesterCount) {
            this.createHarvester();
        }
        if (numberOfCreeps['mover'] < minMoverCount) {
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
