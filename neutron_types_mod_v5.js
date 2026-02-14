// Neutron Types Mod v5 - Fixed behavior, no transformations

(function() {
    if (typeof elements === 'undefined' || !elements.neutron) {
        console.error('Neutron element not found');
        return;
    }
    
    console.log('Neutron Types mod v5 loading...');
    console.log('Original neutron:', elements.neutron);
    
    // Fast Neutron - EXACT behavior of normal neutron, NO reactions that change it
    elements.fast_neutron = {
        color: "#ffff00",
        behavior: [
            "XX|M2%10|XX",
            "M2%10|XX|M2%10",
            "XX|M2%10|XX",
        ],
        category: "energy",
        state: "gas",
        density: 0,
        temp: 20,
        hidden: false
    };
    
    // Slow Neutron - Slower movement, NO reactions that change it
    elements.slow_neutron = {
        color: "#ff9900",
        behavior: [
            "XX|M2%50|XX",
            "M2%50|XX|M2%50",
            "XX|M2%50|XX",
        ],
        category: "energy",
        state: "gas",
        density: 0,
        temp: 20,
        hidden: false
    };
    
    // Moderator - light grey, ONLY converts fast/normal neutrons to slow neutrons
    elements.moderator = {
        color: ["#d3d3d3", "#c8c8c8", "#dedede", "#c0c0c0"],
        behavior: behaviors.WALL,
        reactions: {
            "neutron": { "elem1": "moderator", "elem2": "slow_neutron", "chance": 0.7 },
            "fast_neutron": { "elem1": "moderator", "elem2": "slow_neutron", "chance": 0.7 }
        },
        category: "solids",
        state: "solid",
        density: 1850,
        hardness: 0.6,
        temp: 20,
        tempHigh: 3000,
        stateHigh: "molten_moderator",
        hidden: false
    };
    
    elements.molten_moderator = {
        color: ["#ff6600", "#ff7700", "#ff5500"],
        behavior: behaviors.MOLTEN,
        category: "solids",
        state: "liquid",
        density: 1700,
        temp: 3100,
        tempLow: 3000,
        stateLow: "moderator",
        hidden: false
    };
    
    console.log('Neutron Types v5 loaded!');
    console.log('fast_neutron:', elements.fast_neutron);
    console.log('slow_neutron:', elements.slow_neutron);
})();
