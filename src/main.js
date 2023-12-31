
require('prototype_structure_spawn');
require('prototype_structure_tower');

var roleHarvester = require('role_harvester');
var roleUpgrader = require('role_upgrader');
var roleBuilder = require('role_builder');
var roleMover = require('role_mover');
var roleRepair = require('role_repair');

module.exports.loop = function () {

    //dead creeps
    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
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
        if (creep.memory.role == 'mover') {
            roleMover.run(creep);
        }
        if (creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
    }

    var towers = _.filter(Game.structures, structure => structure.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.defend();
    }


    //spawn creeps
    for (let spawnName in Game.spawns) {
        // run spawn logic
        Game.spawns[spawnName].spawnRequireCreeps();
    }
}
