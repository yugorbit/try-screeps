var roleRepair = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        if (!creep.memory.working && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.working = true;
        }

        if (creep.memory.working) {
            let structure = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            structure.sort((a, b) => a.hits - b.hits);
            if (structure.length > 0) {
                if (creep.repair(structure[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        } else {
            var energy = creep.room.find(FIND_DROPPED_RESOURCES);
            if (creep.pickup(energy[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(energy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleRepair;
