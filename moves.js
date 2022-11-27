import {ENTITIES, PLAYER} from './game.js'
import animations from './animations-and-graphics.js';

export {
    attack,
    upateEntities
}

function attack(origin, targets, damage, type = 'blades') {
    origin.onattack()
    console.log(origin)
    for (const target of targets) {
        target.health -= damage;
        target.onhurt(type)
    }
    upateEntities(origin, targets)
}

function upateEntities(origin, targets) {
    for (const target of targets) {
        target.updateSelf()
        if (target.health <= 0) {
            origin.onkill(target)
            target.ondeath()
        }
    }
}