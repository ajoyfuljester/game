export const ALL_MOVES = {
    Attack_2: {
        action: () => {attack(ENTITIES[1], 2)},
        type: 'attack',
    },

    Heal_1: {
        action: () => {attack(ENTITIES[0], -1)},
        type: 'heal',
    }
}

import {ENTITIES} from './script.js'

import {attack, upateEntities} from './moves.js'