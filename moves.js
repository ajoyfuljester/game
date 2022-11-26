import {ENTITIES, PLAYER} from './game.js'
import animations from './animations.js';

export {
    attack,
    upateEntities
}

function attack(targets, damage, type = 'blades') {
    
    for (const target of targets) {
        target.health -= damage;
        target.onhurt(type)
        console.log(target)
    }
    upateEntities(targets)
}

function upateEntities(targets) {
    for (const target of targets) {
        target.updateSelf()
        if (target.health <= 0) {
            PLAYER.onkill(target)
            target.ondeath()
        }
    }
}