// Control Rods and Absorbers Mod for Sandboxels
// Compatible with Steam version on M4 Mac

var fissionCategory = "fission";

if (!elements.categories) {
    elements.categories = [];
}
if (!elements.categories.includes(fissionCategory)) {
    elements.categories.push(fissionCategory);
}

// Control Rods - absorb neutrons and protons
elements.control_rod = {
    color: ["#2c2c2c", "#383838", "#303030", "#3a3a3a"],
    behavior: behaviors.WALL,
    reactions: {
        "neutron": { "elem1": "control_rod", "elem2": null, "chance": 0.95 },
        "proton": { "elem1": "control_rod", "elem2": null, "chance": 0.95 }
    },
    category: fissionCategory,
    state: "solid",
    density: 10200,
    hardness: 0.8,
    conduct: 0.5,
    temp: 20,
    tempHigh: 2750,
    stateHigh: "molten_control_rod",
    hidden: false
};

elements.molten_control_rod = {
    color: ["#ff4500", "#ff5500", "#ff6000", "#ff5a00"],
    behavior: behaviors.MOLTEN,
    reactions: {
        "neutron": { "elem1": "molten_control_rod", "elem2": null, "chance": 0.85 },
        "proton": { "elem1": "molten_control_rod", "elem2": null, "chance": 0.85 }
    },
    category: fissionCategory,
    state: "liquid",
    density: 9500,
    conduct: 0.6,
    temp: 2800,
    tempLow: 2750,
    stateLow: "control_rod",
    hidden: false
};

// Hydrogen Absorber - sucks in hydrogen and funnels it into pipes  
elements.hydrogen_absorber = {
    color: ["#4169e1", "#4682b4", "#5f9ea0", "#6495ed"],
    behavior: behaviors.WALL,
    noMix: true,
    forceSave: true,
    immobile: true,
    tick: function(pixel) {
        // Actively suck in nearby hydrogen
        for (var dx = -3; dx <= 3; dx++) {
            for (var dy = -3; dy <= 3; dy++) {
                if (dx === 0 && dy === 0) continue;
                var hx = pixel.x + dx;
                var hy = pixel.y + dy;
                
                if (!isEmpty(hx, hy, true)) {
                    var hPixel = pixelMap[hx][hy];
                    
                    // Found hydrogen - pull it toward the absorber
                    if (hPixel && hPixel.element === "hydrogen") {
                        // Move hydrogen one step closer to absorber
                        var dirX = pixel.x - hx;
                        var dirY = pixel.y - hy;
                        var moveX = hx + (dirX !== 0 ? (dirX > 0 ? 1 : -1) : 0);
                        var moveY = hy + (dirY !== 0 ? (dirY > 0 ? 1 : -1) : 0);
                        
                        // If hydrogen is directly adjacent to absorber, funnel it to pipe
                        if (Math.abs(dirX) <= 1 && Math.abs(dirY) <= 1) {
                            // Look for adjacent pipe within 2 blocks
                            var pipeFound = false;
                            for (var pdx = -2; pdx <= 2; pdx++) {
                                for (var pdy = -2; pdy <= 2; pdy++) {
                                    if (pdx === 0 && pdy === 0) continue;
                                    var px = pixel.x + pdx;
                                    var py = pixel.y + pdy;
                                    
                                    if (!isEmpty(px, py, true)) {
                                        var pPixel = pixelMap[px][py];
                                        if (pPixel && pPixel.element === "pipe") {
                                            pipeFound = true;
                                            // Delete the hydrogen
                                            deletePixel(hx, hy);
                                            
                                            // Try to inject it near the pipe entrance
                                            var injected = false;
                                            for (var ipx = -1; ipx <= 1; ipx++) {
                                                for (var ipy = -1; ipy <= 1; ipy++) {
                                                    var injectX = px + ipx;
                                                    var injectY = py + ipy;
                                                    
                                                    // Create hydrogen right next to the pipe
                                                    if (isEmpty(injectX, injectY) && !injected) {
                                                        createPixel("hydrogen", injectX, injectY);
                                                        injected = true;
                                                        return;
                                                    }
                                                }
                                            }
                                            
                                            // If we couldn't inject near pipe, just absorb it
                                            return;
                                        }
                                    }
                                }
                            }
                            
                            // If no pipe found, just absorb the hydrogen
                            if (!pipeFound) {
                                deletePixel(hx, hy);
                                return;
                            }
                        } else {
                            // Pull hydrogen closer
                            if (isEmpty(moveX, moveY)) {
                                movePixel(hPixel, moveX, moveY);
                                return;
                            }
                        }
                    }
                }
            }
        }
    },
    category: fissionCategory,
    state: "solid",
    density: 8900,
    hardness: 0.7,
    conduct: 0.4,
    temp: 20,
    tempHigh: 1800,
    stateHigh: "molten_hydrogen_absorber",
    hidden: false
};

elements.molten_hydrogen_absorber = {
    color: ["#ff8c00", "#ffa500", "#ff7f00", "#ffaa00"],
    behavior: behaviors.MOLTEN,
    movable: false,
    reactions: {
        "hydrogen": { "elem1": "molten_hydrogen_absorber", "elem2": null, "chance": 0.7 }
    },
    category: fissionCategory,
    state: "liquid",
    density: 8200,
    conduct: 0.5,
    temp: 1850,
    tempLow: 1800,
    stateLow: "hydrogen_absorber",
    hidden: false
};
