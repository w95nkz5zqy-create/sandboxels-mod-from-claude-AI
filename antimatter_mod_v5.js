// Antimatter Mod for Sandboxels
// All antimatter annihilates with ALL regular matter on contact

// Create antimatter categories
var antimatterCategories = [
    "antimatter_land",
    "antimatter_liquids", 
    "antimatter_gases",
    "antimatter_solids",
    "antimatter_energy",
    "antimatter_fission"
];

if (!elements.categories) {
    elements.categories = [];
}

antimatterCategories.forEach(function(cat) {
    if (!elements.categories.includes(cat)) {
        elements.categories.push(cat);
    }
});

// Antimatter explosion element (hidden)
elements.antimatter_explosion = {
    color: ["#ffffff", "#ffff00", "#ff00ff", "#00ffff"],
    behavior: [
        "XX|EX:10|XX",
        "EX:10|XX|EX:10",
        "XX|EX:10|XX",
    ],
    category: "energy",
    state: "gas",
    density: 0,
    temp: 5000,
    hidden: true,
    excludeRandom: true
};

// Helper function - antimatter annihilates with ANY regular matter
function annihilateAll(pixel1, pixel2) {
    // Check if pixel2 exists and is NOT antimatter (doesn't start with "anti")
    if (pixel2 && pixel2.element && !pixel2.element.startsWith("anti") && pixel2.element !== "antimatter_explosion") {
        // Store positions before deletion
        var x1 = pixel1.x;
        var y1 = pixel1.y;
        var x2 = pixel2.x;
        var y2 = pixel2.y;
        
        // Delete both pixels
        deletePixel(x1, y1);
        deletePixel(x2, y2);
        
        // Create antimatter explosions at both locations
        if (isEmpty(x1, y1)) {
            createPixel("antimatter_explosion", x1, y1);
        }
        if (isEmpty(x2, y2)) {
            createPixel("antimatter_explosion", x2, y2);
        }
        
        // Create energy particles around the annihilation
        for (var i = 0; i < 8; i++) {
            var angle = Math.random() * Math.PI * 2;
            var dist = 1 + Math.random() * 3;
            var ex = Math.round(x1 + Math.cos(angle) * dist);
            var ey = Math.round(y1 + Math.sin(angle) * dist);
            
            if (isEmpty(ex, ey)) {
                if (Math.random() < 0.5) {
                    createPixel("energy", ex, ey);
                } else {
                    createPixel("antimatter_explosion", ex, ey);
                }
            }
        }
        return true;
    }
    return false;
}

// Add tick function to check for matter contact
function antimatterTick(pixel) {
    // Check all adjacent pixels for regular matter
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            var nx = pixel.x + dx;
            var ny = pixel.y + dy;
            
            if (pixelMap[nx] && pixelMap[nx][ny]) {
                var nearPixel = pixelMap[nx][ny];
                if (nearPixel && nearPixel.element && !nearPixel.element.startsWith("anti")) {
                    annihilateAll(pixel, nearPixel);
                    return;
                }
            }
        }
    }
}

// ANTIMATTER LAND CATEGORY
elements.anti_sand = {
    color: ["#3f3f1f", "#2f2f0f", "#4f4f2f"],
    behavior: behaviors.POWDER,
    tick: antimatterTick,
    category: "antimatter_land",
    state: "solid",
    density: 1602,
    temp: 20
};

elements.anti_dirt = {
    color: ["#2a0a0a", "#1a0000", "#3a1a1a"],
    behavior: behaviors.POWDER,
    tick: antimatterTick,
    category: "antimatter_land",
    state: "solid",
    density: 1200,
    temp: 20
};

elements.anti_mud = {
    color: ["#1a3a1a", "#0a2a0a", "#2a4a2a"],
    behavior: behaviors.LIQUID,
    tick: antimatterTick,
    category: "antimatter_land",
    state: "liquid",
    density: 1800,
    temp: 20
};

elements.anti_rock = {
    color: ["#2a2a2a", "#1a1a1a", "#3a3a3a"],
    behavior: behaviors.WALL,
    tick: antimatterTick,
    category: "antimatter_land",
    state: "solid",
    density: 2700,
    temp: 20
};

elements.anti_gravel = {
    color: ["#2a2a2a", "#1a1a1a", "#3a3a3a"],
    behavior: behaviors.POWDER,
    tick: antimatterTick,
    category: "antimatter_land",
    state: "solid",
    density: 1800,
    temp: 20
};

elements.anti_clay = {
    color: ["#3a1a1a", "#2a0a0a", "#4a2a2a"],
    behavior: behaviors.POWDER,
    tick: antimatterTick,
    category: "antimatter_land",
    state: "solid",
    density: 2000,
    temp: 20
};

elements.anti_stone = {
    color: ["#2a2a2a", "#1a1a1a", "#3a3a3a"],
    behavior: behaviors.WALL,
    tick: antimatterTick,
    category: "antimatter_land",
    state: "solid",
    density: 2500,
    temp: 20
};

elements.anti_wet_sand = {
    color: ["#2a2a0a", "#1a1a00", "#3a3a1a"],
    behavior: behaviors.POWDER,
    tick: antimatterTick,
    category: "antimatter_land",
    state: "solid",
    density: 1800,
    temp: 20
};

// ANTIMATTER LIQUIDS CATEGORY
elements.anti_water = {
    color: ["#3f0000", "#2f0000", "#4f0000"],
    behavior: behaviors.LIQUID,
    tick: antimatterTick,
    category: "antimatter_liquids",
    state: "liquid",
    density: 1000,
    temp: 20,
    tempHigh: 100,
    stateHigh: "anti_steam",
    tempLow: 0,
    stateLow: "anti_ice"
};

elements.anti_salt_water = {
    color: ["#3f0f0f", "#2f0000", "#4f1f1f"],
    behavior: behaviors.LIQUID,
    tick: antimatterTick,
    category: "antimatter_liquids",
    state: "liquid",
    density: 1025,
    temp: 20
};

elements.anti_oil = {
    color: ["#1a1a00", "#0a0a00", "#2a2a00"],
    behavior: behaviors.LIQUID,
    tick: antimatterTick,
    category: "antimatter_liquids",
    state: "liquid",
    density: 900,
    temp: 20
};

elements.anti_lava = {
    color: ["#003f3f", "#002f2f", "#004f4f"],
    behavior: behaviors.LIQUID,
    tick: antimatterTick,
    category: "antimatter_liquids",
    state: "liquid",
    density: 3100,
    temp: 1200
};

// ANTIMATTER GASES CATEGORY
elements.anti_steam = {
    color: ["#3f0000", "#2f0000", "#4f0000"],
    behavior: behaviors.GAS,
    tick: antimatterTick,
    category: "antimatter_gases",
    state: "gas",
    density: 0.6,
    temp: 100,
    tempLow: 100,
    stateLow: "anti_water"
};

elements.antihydrogen = {
    color: ["#3f0f3f", "#2f002f", "#4f1f4f"],
    behavior: behaviors.GAS,
    tick: antimatterTick,
    category: "antimatter_gases",
    state: "gas",
    density: 0.09,
    temp: 20
};

elements.anti_oxygen = {
    color: ["#00003f", "#00002f", "#00004f"],
    behavior: behaviors.GAS,
    tick: antimatterTick,
    category: "antimatter_gases",
    state: "gas",
    density: 1.43,
    temp: 20
};

elements.anti_nitrogen = {
    color: ["#3f003f", "#2f002f", "#4f004f"],
    behavior: behaviors.GAS,
    tick: antimatterTick,
    category: "antimatter_gases",
    state: "gas",
    density: 1.25,
    temp: 20
};

elements.anti_carbon_dioxide = {
    color: ["#1a1a1a", "#0a0a0a", "#2a2a2a"],
    behavior: behaviors.GAS,
    tick: antimatterTick,
    category: "antimatter_gases",
    state: "gas",
    density: 1.98,
    temp: 20
};

elements.antihelium = {
    color: ["#1f1f3f", "#0f0f2f", "#2f2f4f"],
    behavior: behaviors.GAS,
    tick: antimatterTick,
    category: "antimatter_gases",
    state: "gas",
    density: 0.18,
    temp: 20
};

elements.anti_krypton_92 = {
    color: ["#0f0f1a", "#00000a", "#1f1f2a"],
    behavior: behaviors.GAS,
    tick: antimatterTick,
    category: "antimatter_gases",
    state: "gas",
    density: 3.75,
    temp: 20,
    radioactive: true
};

// ANTIMATTER SOLIDS CATEGORY
elements.anti_ice = {
    color: ["#3f0000", "#2f0000", "#4f0000"],
    behavior: behaviors.WALL,
    tick: antimatterTick,
    category: "antimatter_solids",
    state: "solid",
    density: 917,
    temp: -10,
    tempHigh: 0,
    stateHigh: "anti_water"
};

elements.anti_iron = {
    color: ["#1a3a3a", "#0a2a2a", "#2a4a4a"],
    behavior: behaviors.WALL,
    tick: antimatterTick,
    category: "antimatter_solids",
    state: "solid",
    density: 7874,
    conduct: 0.8,
    temp: 20
};

elements.anti_copper = {
    color: ["#1a2a0a", "#0a1a00", "#2a3a1a"],
    behavior: behaviors.WALL,
    tick: antimatterTick,
    category: "antimatter_solids",
    state: "solid",
    density: 8960,
    conduct: 0.9,
    temp: 20
};

elements.anti_gold = {
    color: ["#1a1a3f", "#0a0a2f", "#2a2a4f"],
    behavior: behaviors.WALL,
    tick: antimatterTick,
    category: "antimatter_solids",
    state: "solid",
    density: 19320,
    conduct: 0.7,
    temp: 20
};

elements.anti_silver = {
    color: ["#1a1a1a", "#0a0a0a", "#2a2a2a"],
    behavior: behaviors.WALL,
    tick: antimatterTick,
    category: "antimatter_solids",
    state: "solid",
    density: 10490,
    conduct: 1,
    temp: 20
};

elements.anti_steel = {
    color: ["#1a2a2a", "#0a1a1a", "#2a3a3a"],
    behavior: behaviors.WALL,
    tick: antimatterTick,
    category: "antimatter_solids",
    state: "solid",
    density: 7850,
    conduct: 0.5,
    hardness: 0.9,
    temp: 20
};

elements.anti_glass = {
    color: ["#0f0f0f", "#050505", "#1f1f1f"],
    behavior: behaviors.WALL,
    tick: antimatterTick,
    category: "antimatter_solids",
    state: "solid",
    density: 2500,
    temp: 20
};

elements.anti_wood = {
    color: ["#1a0a3a", "#0a002a", "#2a1a4a"],
    behavior: behaviors.WALL,
    tick: antimatterTick,
    category: "antimatter_solids",
    state: "solid",
    density: 700,
    temp: 20
};

elements.anti_concrete = {
    color: ["#1a1a1a", "#0a0a0a", "#2a2a2a"],
    behavior: behaviors.WALL,
    tick: antimatterTick,
    category: "antimatter_solids",
    state: "solid",
    density: 2400,
    hardness: 0.8,
    temp: 20
};

elements.anti_aluminum = {
    color: ["#2a1a1a", "#1a0a0a", "#3a2a2a"],
    behavior: behaviors.WALL,
    tick: antimatterTick,
    category: "antimatter_solids",
    state: "solid",
    density: 2700,
    conduct: 0.9,
    temp: 20
};

// ANTIMATTER ENERGY CATEGORY
elements.antineutron = {
    color: ["#3f003f", "#2f002f", "#4f004f"],
    behavior: [
        "XX|M2%10|XX",
        "M2%10|XX|M2%10",
        "XX|M2%10|XX",
    ],
    tick: antimatterTick,
    category: "antimatter_energy",
    state: "gas",
    density: 0,
    temp: 20
};

elements.antiproton = {
    color: ["#00003f", "#00002f", "#00004f"],
    behavior: behaviors.GAS,
    tick: antimatterTick,
    category: "antimatter_energy",
    state: "gas",
    density: 0,
    temp: 20
};

elements.positron = {
    color: ["#ff00ff", "#ef00ef", "#ff10ff"],
    behavior: behaviors.GAS,
    tick: antimatterTick,
    category: "antimatter_energy",
    state: "gas",
    density: 0,
    temp: 20
};

// ANTIMATTER FISSION CATEGORY
elements.anti_uranium_235 = {
    color: ["#3f3f3f", "#2f2f2f", "#4f4f4f"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        // First check for regular matter annihilation
        antimatterTick(pixel);
        
        // Then check for antineutrons for fission
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    var nearPixel = pixelMap[nx][ny];
                    
                    if (nearPixel && nearPixel.element === "antineutron") {
                        deletePixel(nx, ny);
                        
                        for (var i = 0; i < 3; i++) {
                            var angle = Math.random() * Math.PI * 2;
                            var dist = 2 + Math.random() * 2;
                            var spawnX = Math.round(pixel.x + Math.cos(angle) * dist);
                            var spawnY = Math.round(pixel.y + Math.sin(angle) * dist);
                            
                            if (isEmpty(spawnX, spawnY)) {
                                createPixel("antineutron", spawnX, spawnY);
                            }
                        }
                        
                        pixel.temp += 300;
                        return;
                    }
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 19100,
    hardness: 0.6,
    conduct: 0.27,
    temp: 20,
    tempHigh: 3500,
    stateHigh: "anti_molten_uranium_235"
};

elements.anti_molten_uranium_235 = {
    color: ["#006f00", "#005f00", "#007f00"],
    behavior: behaviors.MOLTEN,
    tick: antimatterTick,
    category: "antimatter_fission",
    state: "liquid",
    density: 17300,
    conduct: 0.3,
    temp: 3600,
    tempLow: 3500,
    stateLow: "anti_uranium_235"
};

elements.anti_plutonium_239 = {
    color: ["#2a2a2a", "#1a1a1a", "#3a3a3a"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        antimatterTick(pixel);
        
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    var nearPixel = pixelMap[nx][ny];
                    
                    if (nearPixel && nearPixel.element === "antineutron") {
                        deletePixel(nx, ny);
                        
                        for (var i = 0; i < 3; i++) {
                            var angle = Math.random() * Math.PI * 2;
                            var dist = 2 + Math.random() * 2;
                            var spawnX = Math.round(pixel.x + Math.cos(angle) * dist);
                            var spawnY = Math.round(pixel.y + Math.sin(angle) * dist);
                            
                            if (isEmpty(spawnX, spawnY)) {
                                createPixel("antineutron", spawnX, spawnY);
                            }
                        }
                        
                        pixel.temp += 300;
                        return;
                    }
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 19800,
    hardness: 0.6,
    conduct: 0.06,
    temp: 20,
    tempHigh: 640,
    stateHigh: "anti_molten_plutonium_239",
    radioactive: true
};

elements.anti_molten_plutonium_239 = {
    color: ["#005f00", "#004f00", "#006f00"],
    behavior: behaviors.MOLTEN,
    tick: antimatterTick,
    category: "antimatter_fission",
    state: "liquid",
    density: 16600,
    conduct: 0.1,
    temp: 700,
    tempLow: 640,
    stateLow: "anti_plutonium_239",
    radioactive: true
};

elements.anti_control_rod = {
    color: ["#1f1f1f", "#0f0f0f", "#2f2f2f"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        antimatterTick(pixel);
        
        // Absorb antineutrons and antiprotons
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    var nearPixel = pixelMap[nx][ny];
                    if (nearPixel && (nearPixel.element === "antineutron" || nearPixel.element === "antiproton")) {
                        if (Math.random() < 0.95) {
                            deletePixel(nx, ny);
                            return;
                        }
                    }
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 10200,
    hardness: 0.8,
    conduct: 0.5,
    temp: 20,
    tempHigh: 2750,
    stateHigh: "anti_molten_control_rod"
};

elements.anti_molten_control_rod = {
    color: ["#005f00", "#004f00", "#006f00"],
    behavior: behaviors.MOLTEN,
    tick: antimatterTick,
    category: "antimatter_fission",
    state: "liquid",
    density: 9500,
    conduct: 0.6,
    temp: 2800,
    tempLow: 2750,
    stateLow: "anti_control_rod"
};

elements.anti_barium_141 = {
    color: ["#1f0f0f", "#0f0000", "#2f1f1f"],
    behavior: behaviors.MOLTEN,
    tick: antimatterTick,
    category: "antimatter_fission",
    state: "liquid",
    density: 3300,
    temp: 1000,
    tempLow: 700,
    stateLow: "anti_barium_141_solid",
    radioactive: true
};

elements.anti_barium_141_solid = {
    color: ["#1a0f0a", "#0a0000", "#2a1f1a"],
    behavior: behaviors.POWDER,
    tick: antimatterTick,
    category: "antimatter_fission",
    state: "solid",
    density: 3510,
    temp: 20,
    tempHigh: 700,
    stateHigh: "anti_barium_141",
    radioactive: true
};

console.log("Antimatter mod v4 loaded - all antimatter annihilates with all regular matter!");
