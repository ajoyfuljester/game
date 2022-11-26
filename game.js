import {ALL_MOVES} from './cards.js'
import * as CONFIG from './config.js'
import animations from './animations.js'

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
            console.log(ENTITIES, this.onhurt)
            const animationElement = document.createElement('div')
            animationElement.classList.add('wrapper')

            animationElement.innerHTML = animations[type][getRandomKey(animations[type])].element
            HTMLElement.appendChild(animationElement)
            setTimeout(() => {
                animationElement.remove()
            }, animations.blades.blade1.durationInMiliseconds)
        });

        this.updateSelf = () => {
            this.healthbar.value = this.health
            while (this.experience >= EXPERIENCE_MAP[this.level]) {
                this.experience -= EXPERIENCE_MAP[this.level]
                this.level++
                this.onlevelUp()
            }
            this.experiencebar.value = this.experience;
            this.experiencebar.max = EXPERIENCE_MAP[this.level]
        }

        this.onkill = options.onkill ?? null
        this.experienceValue = options.experienceValue ?? 1;

        
        
        ENTITIES.push(this)
        console.log(ENTITIES)
        
        console.log(this)
        
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

        console.log(this.team)
        
        HTML_CONTAINERS[this.team].appendChild(this.HTMLElement)
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
    }
})
PLAYER.experience = 0;

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
