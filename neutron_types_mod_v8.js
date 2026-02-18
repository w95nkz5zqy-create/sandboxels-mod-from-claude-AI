// Neutron Types - CORRECT - Fly in straight lines and bounce like light!

(function() {
    console.log('CORRECT Neutron Types loading...');
    
    setTimeout(function() {
        if (typeof elements === 'undefined') {
            console.error('Elements not loaded');
            return;
        }
        
        console.log('Creating CORRECT neutron types...');
        
        // Fast Neutron - Yellow, flies in straight lines, bounces like light (same as normal neutron)
        elements.fast_neutron = {
            color: "#ffff00",
            behavior: [
                "XX|CR:neutron|XX",
                "CR:neutron|XX|CR:neutron",
                "XX|CR:neutron|XX"
            ],
            category: "energy",
            state: "gas",
            density: 0,
            temp: 20
        };
        
        // Slow Neutron - Orange, flies slower in straight lines, bounces like light
        elements.slow_neutron = {
            color: "#ff9900",
            behavior: [
                "XX|CR:neutron%50|XX",
                "CR:neutron%50|XX|CR:neutron%50",
                "XX|CR:neutron%50|XX"
            ],
            category: "energy",
            state: "gas",
            density: 0,
            temp: 20
        };
        
        // Moderator - Light grey, converts neutrons to slow neutrons
        elements.moderator = {
            color: ["#d3d3d3", "#c8c8c8", "#dedede", "#c0c0c0"],
            behavior: behaviors.WALL,
            reactions: {
                "neutron": { "elem1": "moderator", "elem2": "slow_neutron" },
                "fast_neutron": { "elem1": "moderator", "elem2": "slow_neutron" }
            },
            category: "solids",
            state: "solid",
            density: 1850,
            hardness: 0.6,
            temp: 20,
            tempHigh: 3000,
            stateHigh: "molten_moderator",
            immobile: true
        };
        
        elements.molten_moderator = {
            color: ["#ff6600", "#ff7700", "#ff5500"],
            behavior: behaviors.MOLTEN,
            category: "solids",
            state: "liquid",
            density: 1700,
            temp: 3100,
            tempLow: 3000,
            stateLow: "moderator"
        };
        
        console.log('CORRECT Neutron Types loaded!');
        console.log('fast_neutron: flies straight, bounces like light (CR:neutron)');
        console.log('slow_neutron: flies straight slower, bounces like light (CR:neutron%50)');
    }, 500);
})();
