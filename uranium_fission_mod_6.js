// Uranium-235 Fission Mod for Sandboxels
// Compatible with Steam version on M4 Mac

var fissionCategory = "fission";

if (!elements.categories) {
    elements.categories = [];
}
if (!elements.categories.includes(fissionCategory)) {
    elements.categories.push(fissionCategory);
}

elements.uranium_235 = {
    color: ["#c0c0c0", "#a8a8a8", "#b5b5b5", "#9d9d9d"],
    behavior: behaviors.WALL,
    reactions: {
        "neutron": { "elem1": "uranium_235", "elem2": ["neutron", "neutron", "energy"], "chance": 0.8, "temp1": 200 }
    },
    category: fissionCategory,
    state: "solid",
    density: 19100,
    hardness: 0.6,
    conduct: 0.27,
    temp: 20,
    tempHigh: 1405,
    stateHigh: "molten_uranium_235",
    tempLow: -273.15,
    burn: 1,
    burnTime: 500,
    burnInto: "rad_steam",
    hidden: false
};

elements.molten_uranium_235 = {
    color: ["#ff8c00", "#ffa500", "#ff7f00", "#ffaa00"],
    behavior: behaviors.MOLTEN,
    reactions: {
        "neutron": { "elem1": "molten_uranium_235", "elem2": ["neutron", "neutron", "energy"], "chance": 0.9, "temp1": 250 }
    },
    category: fissionCategory,
    state: "liquid",
    density: 17300,
    conduct: 0.3,
    temp: 1500,
    tempLow: 1405,
    stateLow: "uranium_235",
    burn: 1,
    burnTime: 300,
    burnInto: "rad_steam",
    hidden: false
};

elements.uranium_236 = {
    color: "#a8b5a8",
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        if (Math.random() < 0.15) {
            // Fission occurs - release neutrons and energy without creating fragments
            
            // Release neutrons in random directions
            for (var i = 0; i < 3; i++) {
                var angle = Math.random() * Math.PI * 2;
                var speed = 2 + Math.random() * 2;
                var nx = Math.round(pixel.x + Math.cos(angle) * speed);
                var ny = Math.round(pixel.y + Math.sin(angle) * speed);
                
                if (!isEmpty(nx, ny, true)) {
                    createPixel("neutron", nx, ny);
                }
            }
            
            // Release energy and heat
            pixel.temp += 800;
            
            // Heat surrounding pixels
            for (var dx = -2; dx <= 2; dx++) {
                for (var dy = -2; dy <= 2; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    var nx = pixel.x + dx;
                    var ny = pixel.y + dy;
                    if (!isEmpty(nx, ny, true)) {
                        var nearPixel = pixelMap[nx][ny];
                        if (nearPixel && nearPixel.temp !== undefined) {
                            nearPixel.temp += 100;
                        }
                    }
                }
            }
            
            // Create explosion effect
            if (Math.random() < 0.3) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        var nx = pixel.x + dx;
                        var ny = pixel.y + dy;
                        if (!isEmpty(nx, ny, true) && Math.random() < 0.4) {
                            createPixel("energy", nx, ny);
                        }
                    }
                }
            }
        }
    },
    category: fissionCategory,
    state: "solid",
    density: 19100,
    hardness: 0.5,
    conduct: 0.25,
    temp: 100,
    tempHigh: 1405,
    stateHigh: "molten_uranium_236",
    radioactive: true,
    burn: 1,
    burnTime: 200,
    burnInto: "rad_steam",
    hidden: false
};

elements.molten_uranium_236 = {
    color: ["#ff6600", "#ff8800", "#ff7700", "#ff9900"],
    behavior: behaviors.MOLTEN,
    tick: function(pixel) {
        if (Math.random() < 0.2) {
            // Fission occurs - release neutrons and energy without creating fragments
            
            for (var i = 0; i < 3; i++) {
                var angle = Math.random() * Math.PI * 2;
                var speed = 2 + Math.random() * 2;
                var nx = Math.round(pixel.x + Math.cos(angle) * speed);
                var ny = Math.round(pixel.y + Math.sin(angle) * speed);
                
                if (!isEmpty(nx, ny, true)) {
                    createPixel("neutron", nx, ny);
                }
            }
            
            pixel.temp += 900;
            
            // Heat surrounding pixels
            for (var dx = -2; dx <= 2; dx++) {
                for (var dy = -2; dy <= 2; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    var nx = pixel.x + dx;
                    var ny = pixel.y + dy;
                    if (!isEmpty(nx, ny, true)) {
                        var nearPixel = pixelMap[nx][ny];
                        if (nearPixel && nearPixel.temp !== undefined) {
                            nearPixel.temp += 150;
                        }
                    }
                }
            }
            
            if (Math.random() < 0.4) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        var nx = pixel.x + dx;
                        var ny = pixel.y + dy;
                        if (!isEmpty(nx, ny, true) && Math.random() < 0.5) {
                            createPixel("energy", nx, ny);
                        }
                    }
                }
            }
        }
    },
    category: fissionCategory,
    state: "liquid",
    density: 17300,
    conduct: 0.28,
    temp: 1500,
    tempLow: 1405,
    stateLow: "uranium_236",
    radioactive: true,
    burn: 1,
    burnTime: 150,
    burnInto: "rad_steam",
    hidden: false
};

elements.rad_steam = {
    color: "#9fff9f",
    behavior: behaviors.GAS,
    category: fissionCategory,
    state: "gas",
    density: 0.6,
    temp: 150,
    tempLow: 100,
    stateLow: "dirty_water",
    radioactive: true,
    hidden: false
};
