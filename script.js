import {ALL_MOVES} from './cards.js'
import { HTML_CONTAINER_MOVES, HTML_CONTAINER_ENEMIES, HTML_CONTAINER_ALLIES} from './config.js'
import animations from './animations.js'


const HTML_CONTAINERS = {
    ally: HTML_CONTAINER_ALLIES,
    enemy: HTML_CONTAINER_ENEMIES,
    moves: HTML_CONTAINER_MOVES,
}

export {ENTITIES}

class Entity {
    constructor(options) {
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

        
        
        ENTITIES.push(this)
        console.log(ENTITIES)
        
        console.log(this)
        
        const HTMLElement = document.createElement('div');
        HTMLElement.classList.add('entity');
        HTMLElement.classList.add(this.team);
        
        const healthbar = document.createElement('progress')
        healthbar.max = this.maxHealth
        healthbar.value = this.health
        
        this.healthbar = healthbar
        
        HTMLElement.appendChild(healthbar)

        this.HTMLElement = HTMLElement;
        console.log(HTML_CONTAINER_ENEMIES)
        
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
    card.style.backgroundColor = MOVE_COLORS[ALL_MOVES[move].type]
    card.onclick = ALL_MOVES[move].action
    
    
    
    HTML_CONTAINERS.moves.appendChild(card)
}

document.querySelector('button').onclick = () => {
    new Entity
}

new Entity({team: 'ally'})

function getRandomKey(object) {
    let keys = [];
    for (const key in object) {
        keys.push(key)
    }

    return keys[Math.floor(Math.random() * keys.length)]
}