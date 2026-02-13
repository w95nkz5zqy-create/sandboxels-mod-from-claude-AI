// Neutron Types Mod v3 - Proper Neutron Behavior

(function() {
    if (typeof elements === 'undefined') {
        console.error('Elements not loaded');
        return;
    }
    
    console.log('Neutron Types mod v3 loading...');
    
    // Fast Neutron - yellow, flies through air like normal neutron
    elements.fast_neutron = {
        color: "#ffff00",
        behavior: [
            "XX|M2 AND CH:neutron%10|XX",
            "M2 AND CH:neutron%10|XX|M2 AND CH:neutron%10",
            "XX|M2 AND CH:neutron%10|XX",
        ],
        tick: function(pixel) {
            // Move fast through empty space
            if (Math.random() < 0.1) {
                var angle = Math.random() * Math.PI * 2;
                var nx = Math.round(pixel.x + Math.cos(angle) * 2);
                var ny = Math.round(pixel.y + Math.sin(angle) * 2);
                
                if (isEmpty(nx, ny)) {
                    movePixel(pixel, nx, ny);
                }
            }
        },
        reactions: {
            "uranium_235": { "elem1": "uranium_235", "elem2": "fast_neutron", "chance": 0.8 },
            "plutonium_239": { "elem1": "plutonium_239", "elem2": "fast_neutron", "chance": 0.85 }
        },
        category: "energy",
        state: "gas",
        density: 0,
        temp: 20
    };
    
    // Slow Neutron - orange, moves slower through space
    elements.slow_neutron = {
        color: "#ff9900",
        behavior: [
            "XX|M2 AND CH:neutron%50|XX",
            "M2 AND CH:neutron%50|XX|M2 AND CH:neutron%50",
            "XX|M2 AND CH:neutron%50|XX",
        ],
        tick: function(pixel) {
            // Move slower through empty space
            if (Math.random() < 0.05) {
                var angle = Math.random() * Math.PI * 2;
                var nx = Math.round(pixel.x + Math.cos(angle));
                var ny = Math.round(pixel.y + Math.sin(angle));
                
                if (isEmpty(nx, ny)) {
                    movePixel(pixel, nx, ny);
                }
            }
        },
        reactions: {
            "uranium_235": { "elem1": "uranium_235", "elem2": "slow_neutron", "chance": 0.95 },
            "plutonium_239": { "elem1": "plutonium_239", "elem2": "slow_neutron", "chance": 0.98 }
        },
        category: "energy",
        state: "gas",
        density: 0,
        temp: 20
    };
    
    // Moderator - light grey, slows neutrons
    elements.moderator = {
        color: ["#d3d3d3", "#c8c8c8", "#dedede", "#c0c0c0"],
        behavior: behaviors.WALL,
        reactions: {
            "neutron": { "elem1": "moderator", "elem2": "slow_neutron", "chance": 0.7 },
            "fast_neutron": { "elem1": "moderator", "elem2": "slow_neutron", "chance": 0.7 },
            "antineutron": { "elem1": "moderator", "elem2": "slow_neutron", "chance": 0.5 }
        },
        category: "solids",
        state: "solid",
        density: 1850,
        hardness: 0.6,
        temp: 20,
        tempHigh: 3000,
        stateHigh: "molten_moderator"
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
    
    console.log('Neutron Types loaded: fast_neutron, slow_neutron, moderator (light grey)');
})();
