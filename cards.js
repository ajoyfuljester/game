export const ALL_MOVES = {
    Attack_2: {
        action: () => {attack(PLAYER, [ENTITIES[1]], 2)},
        type: 'attack',
    },

    Heal_1: {
        action: () => {attack(PLAYER, [ENTITIES[0]], -1)},
        type: 'heal',
    },

    Attack_all_1: {
        action: () => {attack(PLAYER, ENTITIES.slice(1), 1)},
        type: 'attack',
    },
}

import {ENTITIES, PLAYER} from './game.js'

import {attack, upateEntities} from './moves.js'