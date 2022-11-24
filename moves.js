import {ENTITIES} from './script.js'
import animations from './animations.js';

export {
    attack,
    upateEntities
}

function attack(target, damage, type = 'blades') {
    target.health -= damage;
    target.onhurt(type)
    upateEntities()
}

function upateEntities() {
    for (const entity of ENTITIES) {
        entity.healthbar.value = entity.health
        if (entity.health <= 0) {
            entity.ondeath()
        }
    }
}