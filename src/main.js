
require('prototype.spawn')
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    //Startup harvesters Spawn

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvesters.length <= 3) {
        var newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName,
            { memory: { role: 'harvester' } });
    }

    //Startup upgraders Spawn
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if (upgraders.length < 2 && harvesters.length > 3) {
        var newName = 'Upgrader' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
            { memory: { role: 'upgrader' } });
    }

    //Startup upgraders Spawn
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if (builders.length < 3 && harvesters.length > 3) {
        var newName = 'Builder' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
            { memory: { role: 'builder' } });
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }

    //dead creeps
    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
}