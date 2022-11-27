export default {
    animations: {
        blades: {
            blade1: {
                element: `<svg viewBox="0 0 200 322" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>
                
                #blade {
                    animation: blade 300ms forwards;
                    transform-origin: center;
                }
                
                @keyframes blade {
                    100% {
                        scale: 0;
                        transform: rotateZ(180deg);
                    }
                }
                
                </style>
                <g id="image-blade">
                <rect id="nothing" width="200" height="322"/>
                <g id="blade">
                <path id="blade2" d="M110.4 151.4L100.4 87V161.4H174.8L110.4 151.4Z" fill="#EEEEEE"/>
                <path id="blade1" d="M90.4 151.4L100.4 87V161.4H26L90.4 151.4Z" fill="white"/>
                <path id="blade3" d="M110.4 171.4L100.4 235.8V161.4H174.8L110.4 171.4Z" fill="white"/>
                <path id="blade4" d="M90.4 171.4L100.4 235.8V161.4H26L90.4 171.4Z" fill="#EEEEEE"/>
                </g>
                </g>
                `,
                durationInMiliseconds: 300,
            },
        },
    },

    graphics: {
        mainCharacter: `<svg viewBox="0 0 200 322" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect id="nothing" width="200" height="322"/>
        <path id="blade2" d="M184.87 112L100 259L15.1295 112L184.87 112Z" fill="#550055" stroke="white" stroke-width="4"/>
        <path id="blade1" d="M15.1295 210L100 63L184.87 210H15.1295Z" fill="#550055" stroke="white" stroke-width="4"/>
        <circle id="main" cx="100" cy="161" r="30" fill="#770077"/>
        </svg>
        
        `,
    }
}