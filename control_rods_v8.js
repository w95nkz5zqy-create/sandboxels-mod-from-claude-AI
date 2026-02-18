// Control Rods - FIXED - Immobile version

if (typeof elements !== 'undefined') {
    
    // Control Rod - Immobile, absorbs neutrons AND protons
    elements.control_rod = {
        color: ["#4a4a4a", "#3a3a3a", "#5a5a5a"],
        behavior: behaviors.WALL,
        reactions: {
            "neutron": { "elem1": "control_rod", "elem2": null, "chance": 0.95 },
            "fast_neutron": { "elem1": "control_rod", "elem2": null, "chance": 0.95 },
            "slow_neutron": { "elem1": "control_rod", "elem2": null, "chance": 0.95 },
            "proton": { "elem1": "control_rod", "elem2": null, "chance": 0.95 }
        },
        category: "solids",
        state: "solid",
        density: 10200,
        hardness: 0.8,
        conduct: 0.5,
        temp: 20,
        tempHigh: 2750,
        stateHigh: "molten_control_rod",
        immobile: true,  // FIXED - Won't move!
        noMix: true
    };
    
    elements.molten_control_rod = {
        color: ["#ff6600", "#ff7700", "#ff5500"],
        behavior: behaviors.MOLTEN,
        reactions: {
            "neutron": { "elem1": "molten_control_rod", "elem2": null, "chance": 0.85 },
            "fast_neutron": { "elem1": "molten_control_rod", "elem2": null, "chance": 0.85 },
            "slow_neutron": { "elem1": "molten_control_rod", "elem2": null, "chance": 0.85 },
            "proton": { "elem1": "molten_control_rod", "elem2": null, "chance": 0.85 }
        },
        category: "solids",
        state: "liquid",
        density: 9500,
        conduct: 0.6,
        temp: 2800,
        tempLow: 2750,
        stateLow: "control_rod"
    };
    
    console.log('Control rods FIXED - immobile!');
}
