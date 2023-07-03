var roleList = ['harvester', 'upgrader', 'builder'];

const minHarvesterCount = 3;
const minBuilderCount = 3;
const minUpgraderCount = 3;

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
        if (numberOfCreeps['builder'] < minBuilderCount && numberOfCreeps['harvester'] >= minHarvesterCount) {
            this.createBuilder();
        }
        if (numberOfCreeps['upgrader'] < minUpgraderCount && numberOfCreeps['harvester'] >= minHarvesterCount) {
            this.createUpgrader();
        }
    }
}

StructureSpawn.prototype.createHarvester = function () {

    let energy = this.room.energyAvailable;

    //初期設定
    let body = [];
    body.push(WORK);
    body.push(CARRY);
    body.push(MOVE);

    let numberOfParts = Math.floor((energy - 200) / 300);
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
        body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(MOVE);
    }

    console.log(body)

    return this.spawnCreep(body, 'harvester_' + Game.time,
        { memory: { role: 'harvester' } });
}

StructureSpawn.prototype.createBuilder = function () {

    let energy = this.room.energyAvailable;

    //初期設定
    let body = [];
    body.push(WORK);
    body.push(CARRY);
    body.push(MOVE);

    let numberOfParts = Math.floor((energy - 200) / 300);
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
        body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(MOVE);
    }

    return this.spawnCreep(body, 'builder_' + Game.time,
        { memory: { role: 'builder' } });
}

StructureSpawn.prototype.createUpgrader = function () {

    let energy = this.room.energyAvailable;

    //初期設定
    let body = [];
    body.push(WORK);
    body.push(CARRY);
    body.push(MOVE);

    let numberOfParts = Math.floor((energy - 200) / 300);
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
        body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(MOVE);
    }

    return this.spawnCreep(body, 'upgrader_' + Game.time,
        { memory: { role: 'upgrader' } });

}
