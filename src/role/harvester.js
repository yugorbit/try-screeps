var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        creep.memory.working = true;

        if (creep.memory.working) {
            let source = creep.room.find(FIND_SOURCES);
            if (creep.harvest(source[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source[0], { visualizePathStyle: { stroke: '#ffaa00' } })
            } else {
                creep.drop(RESOURCE_ENERGY, creep.store[RESOURCE_ENERGY])
            }
        }
    }
};

module.exports = roleHarvester;
