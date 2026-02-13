// Neutron Types Mod for Sandboxels
// Adds fast neutrons, slow neutrons, and light grey moderators

// Fast Neutron - behaves like normal neutron (already exists, just making sure it works)
if (elements.neutron) {
    // Fast neutron is just the normal neutron
    elements.fast_neutron = {
        color: ["#ffff00", "#ffef00", "#ffe700"],
        behavior: elements.neutron.behavior,
        reactions: elements.neutron.reactions,
        category: "energy",
        state: "gas",
        density: 0,
        temp: 20,
        hidden: false
    };
}

// Slow Neutron - moves slower
elements.slow_neutron = {
    color: ["#ff9900", "#ff8800", "#ffaa00"],
    behavior: [
        "XX|M2%50|XX",
        "M2%50|XX|M2%50",
        "XX|M2%50|XX",
    ],
    reactions: {
        "uranium": { "elem1": null, "elem2": "neutron", "chance": 0.01 },
        "uranium_235": { "elem1": "uranium_235", "elem2": "neutron", "chance": 0.9 },
        "plutonium_239": { "elem1": "plutonium_239", "elem2": "neutron", "chance": 0.9 }
    },
    category: "energy",
    state: "gas",
    density: 0,
    temp: 20,
    hidden: false
};

// Moderator - light grey, slows down neutrons
elements.moderator = {
    color: ["#d3d3d3", "#c8c8c8", "#dedede", "#c0c0c0"],
    behavior: behaviors.WALL,
    reactions: {
        "neutron": { "elem1": "moderator", "elem2": "slow_neutron", "chance": 0.8 },
        "fast_neutron": { "elem1": "moderator", "elem2": "slow_neutron", "chance": 0.8 }
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

console.log("Neutron Types mod loaded - fast_neutron, slow_neutron, and light grey moderator added!");
