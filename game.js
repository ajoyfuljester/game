import {ALL_MOVES} from './cards.js'
import * as CONFIG from './config.js'
import animationsAndGraphics from './animations-and-graphics.js'

const HTML_CONTAINERS = {
    ally: CONFIG.HTML_CONTAINER_ALLIES,
    enemy: CONFIG.HTML_CONTAINER_ENEMIES,
    moves: CONFIG.HTML_CONTAINER_MOVES,
}

export {ENTITIES}

const EXPERIENCE_MAP = [3, 5, 10];
const MAX_ENEMIES = 8;

class Entity {
    constructor(options) {
        if (ENTITIES.length >= MAX_ENEMIES + 1) return
        options ??= {}
        this.maxHealth = options.maxHealth ?? 10;
        this.health = options.health ?? this.maxHealth;
        this.team = options.team ?? 'enemy';
        this.ondeath = options.ondeath ?? function () {
            this.HTMLElement.remove()
            ENTITIES.splice(ENTITIES.indexOf(this), 1)
            console.log(ENTITIES)
        }

        this.onhurt = options.onhurt ?? ((type) => {
            const animationElement = document.createElement('div')
            animationElement.classList.add('wrapper')

            animationElement.innerHTML = animationsAndGraphics.animations[type][getRandomKey(animationsAndGraphics.animations[type])].element
            HTMLElement.appendChild(animationElement)
            setTimeout(() => {
                animationElement.remove()
            }, animationsAndGraphics.animations.blades.blade1.durationInMiliseconds)
        });

        this.updateSelf = () => {
            this.healthbar.value = this.health
            while (this.experience >= EXPERIENCE_MAP[this.level]) {
                this.experience -= EXPERIENCE_MAP[this.level]
                this.level++
                this.onlevelUp()
            }
            if (this.experiencebar != undefined) {
                this.experiencebar.value = this.experience;
                this.experiencebar.max = EXPERIENCE_MAP[this.level]
            }
        }

        this.onkill = options.onkill ?? null
        this.onattack = options.onattack ?? function() {
            HTMLElement.animate(
                [{
                    translate: '10% 0'
                }, {
                    translate: '0'
                }
            ], {
                duration: 200
            })
        }
        this.experienceValue = options.experienceValue ?? 1;

        
        
        ENTITIES.push(this)
                
        const HTMLElement = document.createElement('div');
        HTMLElement.classList.add('entity');
        HTMLElement.classList.add(this.team);
        
        
        this.HTMLElement = HTMLElement;
        
        if (this.team == 'ally') {
            this.level = options.level ?? 0;
            this.experience = options.experience ?? 0;
            const experiencebar = document.createElement('progress')
            experiencebar.classList.add('experiencebar')
            experiencebar.max = EXPERIENCE_MAP[this.level]
            experiencebar.value = this.experience
            
            this.experiencebar = experiencebar
            
            HTMLElement.appendChild(experiencebar)

            this.onlevelUp = null
        }

        const healthbar = document.createElement('progress')
        healthbar.classList.add('healthbar')
        healthbar.max = this.maxHealth
        healthbar.value = this.health
        
        this.healthbar = healthbar
        
        HTMLElement.appendChild(healthbar)
        
        HTML_CONTAINERS[this.team].appendChild(this.HTMLElement)

        console.log(this)
    }
}

const ENTITIES = [];

const MOVE_COLORS = {
    heal: '#ff0',
    attack: '#f00',
    shield: '#0ff',
}

for (let move in ALL_MOVES) {
    const card = document.createElement('div');
    card.classList.add('move')
    card.innerHTML = move
    card.style.background = MOVE_COLORS[ALL_MOVES[move].type]
    card.onclick = ALL_MOVES[move].action
    
    
    
    HTML_CONTAINERS.moves.appendChild(card)
}

document.querySelector('button').onclick = () => {
    new Entity
}

export const PLAYER = new Entity({
    team: 'ally',

    ondeath: () => {
        gameOver('lose')
    },

    onkill: function(target) {
        this.experience += target.experienceValue
        this.updateSelf()
    },

    onattack: function(target) {
        this.HTMLElement.animate(
            [{
                translate: '15% 0'
            }, {
                translate: '0'
            }
        ], {
            duration: 100
        })

        document.querySelector('.ally svg #blade1').animate(
            [{
                transform: 'rotateZ(0deg)',
                transformOrigin: 'center',
            }, {
                transform: 'rotateZ(120deg)',
                transformOrigin: 'center',
            }
        ], {
            duration: 400,
            easing: 'ease-in-out'
        })
    }
})
PLAYER.experience = 0;
const PLAYER_IMAGE = document.createElement('div')
PLAYER_IMAGE.classList.add('wrapper')
PLAYER_IMAGE.innerHTML = animationsAndGraphics.graphics.mainCharacter
PLAYER.HTMLElement.appendChild(PLAYER_IMAGE)

function getRandomKey(object) {
    let keys = [];
    for (const key in object) {
        keys.push(key)
    }

    return keys[Math.floor(Math.random() * keys.length)]
}

const log = document.querySelector('#log')

function gameOver(outcome, score) {
    

    log.innerHTML = '<h1>You lost!<br>Better luck next time!</h1>'
}
