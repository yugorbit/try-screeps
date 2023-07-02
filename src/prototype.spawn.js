var roleList = ['harvester', 'upgrader', 'builder'];

var prototypeSpawn = {
    run: function (energy) {
        let numberOfParts = Math.floor(energy / 200);
        numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));

        let numberOfCreeps = {};
        for (let role of listOfRoles) {
            numberOfCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
        }



        if (numberOfCreeps['harvester'] < 2) {
            this.createHarvester();
        }
    },

    createHarvester: function () {
        let body = [];
        for (let i = 0; i < numOfParts; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < numOfParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numOfParts; i++) {
            body.push(MOVE);
        }
        Game.spawns['Spawn1'].spawnCreep(body, undefined,
            { memory: { role: role } });
    }
}

module.exports = prototypeSpawn;