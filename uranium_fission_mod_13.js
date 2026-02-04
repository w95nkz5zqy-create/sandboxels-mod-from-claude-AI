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
        "neutron": { "elem1": "uranium_235", "elem2": "neutron", "chance": 0.8, "temp1": 800 }
    },
    category: fissionCategory,
    state: "solid",
    density: 19100,
    hardness: 0.6,
    conduct: 0.27,
    temp: 20,
    tempHigh: 3500,
    stateHigh: "molten_uranium_235",
    tempLow: -273.15,
    hidden: false
};

elements.molten_uranium_235 = {
    color: ["#ff8c00", "#ffa500", "#ff7f00", "#ffaa00"],
    behavior: behaviors.MOLTEN,
    reactions: {
        "neutron": { "elem1": "molten_uranium_235", "elem2": "neutron", "chance": 0.9, "temp1": 1000 }
    },
    category: fissionCategory,
    state: "liquid",
    density: 17300,
    conduct: 0.3,
    temp: 3600,
    tempLow: 3500,
    stateLow: "uranium_235",
    hidden: false
};

elements.uranium_236 = {
    color: "#a8b5a8",
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        if (Math.random() < 0.15) {
            // Fission occurs - create 3 neutrons and fission products
            
            // Release 3 neutrons in random directions
            for (var i = 0; i < 3; i++) {
                var angle = Math.random() * Math.PI * 2;
                var speed = 2 + Math.random() * 2;
                var nx = Math.round(pixel.x + Math.cos(angle) * speed);
                var ny = Math.round(pixel.y + Math.sin(angle) * speed);
                
                if (!isEmpty(nx, ny, true)) {
                    createPixel("neutron", nx, ny);
                }
            }
            
            // Create fission products nearby - barium-141 (molten) or krypton-92 (gas)
            // Don't change the uranium itself, just spawn products around it
            var spawnX = pixel.x + (Math.random() < 0.5 ? 1 : -1);
            var spawnY = pixel.y + (Math.random() < 0.5 ? 1 : -1);
            
            if (isEmpty(spawnX, spawnY)) {
                if (Math.random() < 0.5) {
                    createPixel("barium_141", spawnX, spawnY);
                } else {
                    createPixel("krypton_92", spawnX, spawnY);
                }
            }
            
            // Release energy and heat
            pixel.temp += 2000;
            
            // Heat surrounding pixels much more
            for (var dx = -2; dx <= 2; dx++) {
                for (var dy = -2; dy <= 2; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    var nx = pixel.x + dx;
                    var ny = pixel.y + dy;
                    if (!isEmpty(nx, ny, true)) {
                        var nearPixel = pixelMap[nx][ny];
                        if (nearPixel && nearPixel.temp !== undefined) {
                            nearPixel.temp += 400;
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
    tempHigh: 3500,
    stateHigh: "molten_uranium_236",
    radioactive: true,
    hidden: false
};

elements.molten_uranium_236 = {
    color: ["#ff6600", "#ff8800", "#ff7700", "#ff9900"],
    behavior: behaviors.MOLTEN,
    tick: function(pixel) {
        if (Math.random() < 0.2) {
            // Fission occurs - create 3 neutrons and fission products
            
            // Release 3 neutrons
            for (var i = 0; i < 3; i++) {
                var angle = Math.random() * Math.PI * 2;
                var speed = 2 + Math.random() * 2;
                var nx = Math.round(pixel.x + Math.cos(angle) * speed);
                var ny = Math.round(pixel.y + Math.sin(angle) * speed);
                
                if (!isEmpty(nx, ny, true)) {
                    createPixel("neutron", nx, ny);
                }
            }
            
            // Create fission products nearby without changing the uranium
            var spawnX = pixel.x + (Math.random() < 0.5 ? 1 : -1);
            var spawnY = pixel.y + (Math.random() < 0.5 ? 1 : -1);
            
            if (isEmpty(spawnX, spawnY)) {
                if (Math.random() < 0.5) {
                    createPixel("barium_141", spawnX, spawnY);
                } else {
                    createPixel("krypton_92", spawnX, spawnY);
                }
            }
            
            pixel.temp += 2500;
            
            // Heat surrounding pixels much more
            for (var dx = -2; dx <= 2; dx++) {
                for (var dy = -2; dy <= 2; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    var nx = pixel.x + dx;
                    var ny = pixel.y + dy;
                    if (!isEmpty(nx, ny, true)) {
                        var nearPixel = pixelMap[nx][ny];
                        if (nearPixel && nearPixel.temp !== undefined) {
                            nearPixel.temp += 500;
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
    temp: 3600,
    tempLow: 3500,
    stateLow: "uranium_236",
    radioactive: true,
    hidden: false
};

// Fission Products
elements.barium_141 = {
    color: ["#90ee90", "#98fb98", "#8fbc8f", "#9acd32"],
    behavior: behaviors.MOLTEN,
    category: fissionCategory,
    state: "liquid",
    density: 3300,
    temp: 1000,
    tempLow: 700,
    stateLow: "barium_141_solid",
    radioactive: true,
    hidden: false
};

elements.barium_141_solid = {
    color: ["#6b8e23", "#808000", "#556b2f", "#6b8e23"],
    behavior: behaviors.POWDER,
    category: fissionCategory,
    state: "solid",
    density: 3510,
    temp: 20,
    tempHigh: 700,
    stateHigh: "barium_141",
    radioactive: true,
    hidden: false
};

elements.krypton_92 = {
    color: ["#e6e6fa", "#d8bfd8", "#dda0dd", "#da70d6"],
    behavior: behaviors.GAS,
    category: fissionCategory,
    state: "gas",
    density: 3.75,
    temp: 20,
    radioactive: true,
    hidden: false
};

// Plutonium-239
elements.plutonium_239 = {
    color: ["#a9a9a9", "#8b8b83", "#989898", "#7f7f7f"],
    behavior: behaviors.WALL,
    reactions: {
        "neutron": { "elem1": "plutonium_239", "elem2": "neutron", "chance": 0.85, "temp1": 900 }
    },
    category: fissionCategory,
    state: "solid",
    density: 19800,
    hardness: 0.6,
    conduct: 0.06,
    temp: 20,
    tempHigh: 640,
    stateHigh: "molten_plutonium_239",
    radioactive: true,
    hidden: false
};

elements.molten_plutonium_239 = {
    color: ["#ff4500", "#ff6347", "#ff5500", "#ff4000"],
    behavior: behaviors.MOLTEN,
    reactions: {
        "neutron": { "elem1": "molten_plutonium_239", "elem2": "neutron", "chance": 0.95, "temp1": 1100 }
    },
    category: fissionCategory,
    state: "liquid",
    density: 16600,
    conduct: 0.1,
    temp: 700,
    tempLow: 640,
    stateLow: "plutonium_239",
    radioactive: true,
    hidden: false
};

// Krypton Absorber
elements.krypton_absorber = {
    color: ["#9370db", "#8a2be2", "#9932cc", "#8b008b"],
    behavior: behaviors.WALL,
    noMix: true,
    immobile: true,
    tick: function(pixel) {
        // Suck in krypton-92 within range
        for (var dx = -4; dx <= 4; dx++) {
            for (var dy = -4; dy <= 4; dy++) {
                if (dx === 0 && dy === 0) continue;
                var kx = pixel.x + dx;
                var ky = pixel.y + dy;
                
                if (!isEmpty(kx, ky, true)) {
                    var kPixel = pixelMap[kx][ky];
                    
                    if (kPixel && kPixel.element === "krypton_92") {
                        // Pull krypton toward absorber
                        var dirX = pixel.x - kx;
                        var dirY = pixel.y - ky;
                        
                        // If adjacent, absorb it
                        if (Math.abs(dirX) <= 1 && Math.abs(dirY) <= 1) {
                            deletePixel(kx, ky);
                            return;
                        } else {
                            // Pull closer
                            var moveX = kx + (dirX !== 0 ? (dirX > 0 ? 1 : -1) : 0);
                            var moveY = ky + (dirY !== 0 ? (dirY > 0 ? 1 : -1) : 0);
                            
                            if (isEmpty(moveX, moveY)) {
                                movePixel(kPixel, moveX, moveY);
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
    density: 8500,
    hardness: 0.7,
    conduct: 0.3,
    temp: 20,
    hidden: false
};

// Barium Absorber
elements.barium_absorber = {
    color: ["#ff1493", "#ff69b4", "#db7093", "#c71585"],
    behavior: behaviors.WALL,
    noMix: true,
    immobile: true,
    tick: function(pixel) {
        // Suck in barium-141 (both molten and solid) within range
        for (var dx = -4; dx <= 4; dx++) {
            for (var dy = -4; dy <= 4; dy++) {
                if (dx === 0 && dy === 0) continue;
                var bx = pixel.x + dx;
                var by = pixel.y + dy;
                
                if (!isEmpty(bx, by, true)) {
                    var bPixel = pixelMap[bx][by];
                    
                    if (bPixel && (bPixel.element === "barium_141" || bPixel.element === "barium_141_solid")) {
                        // Pull barium toward absorber
                        var dirX = pixel.x - bx;
                        var dirY = pixel.y - by;
                        
                        // If adjacent, absorb it
                        if (Math.abs(dirX) <= 1 && Math.abs(dirY) <= 1) {
                            deletePixel(bx, by);
                            return;
                        } else {
                            // Pull closer
                            var moveX = bx + (dirX !== 0 ? (dirX > 0 ? 1 : -1) : 0);
                            var moveY = by + (dirY !== 0 ? (dirY > 0 ? 1 : -1) : 0);
                            
                            if (isEmpty(moveX, moveY)) {
                                movePixel(bPixel, moveX, moveY);
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
    density: 9000,
    hardness: 0.7,
    conduct: 0.4,
    temp: 20,
    hidden: false
};

// Neutron Emitter - emits neutrons when powered by electricity
elements.neutron_emitter = {
    color: ["#ffff00", "#ffef00", "#ffe700", "#fff700"],
    behavior: behaviors.WALL,
    noMix: true,
    immobile: true,
    conduct: 1,
    tick: function(pixel) {
        // Check if this pixel has electrical charge
        if (pixel.charge && pixel.charge > 0) {
            // Emit neutron when charged (throttle emission rate)
            if (Math.random() < 0.2) {
                // Look for receiver to determine direction
                var foundReceiver = false;
                
                for (var rdx = -3; rdx <= 3; rdx++) {
                    for (var rdy = -3; rdy <= 3; rdy++) {
                        if (rdx === 0 && rdy === 0) continue;
                        var rx = pixel.x + rdx;
                        var ry = pixel.y + rdy;
                        
                        if (!isEmpty(rx, ry, true)) {
                            var rPixel = pixelMap[rx][ry];
                            if (rPixel && rPixel.element === "neutron_receiver") {
                                // Emit neutron toward receiver
                                var dirX = rdx > 0 ? 1 : (rdx < 0 ? -1 : 0);
                                var dirY = rdy > 0 ? 1 : (rdy < 0 ? -1 : 0);
                                
                                var emitX = pixel.x + dirX;
                                var emitY = pixel.y + dirY;
                                
                                if (isEmpty(emitX, emitY)) {
                                    createPixel("neutron", emitX, emitY);
                                    foundReceiver = true;
                                    return;
                                }
                            }
                        }
                    }
                    if (foundReceiver) break;
                }
                
                // If no receiver found, emit to the right
                if (!foundReceiver) {
                    if (isEmpty(pixel.x + 1, pixel.y)) {
                        createPixel("neutron", pixel.x + 1, pixel.y);
                    }
                }
            }
        }
    },
    category: fissionCategory,
    state: "solid",
    density: 8000,
    hardness: 0.8,
    temp: 20,
    hidden: false
};

// Neutron Receiver - marks direction for neutron emitter
elements.neutron_receiver = {
    color: ["#00ff00", "#00ef00", "#00e700", "#00f700"],
    behavior: behaviors.WALL,
    noMix: true,
    immobile: true,
    category: fissionCategory,
    state: "solid",
    density: 8000,
    hardness: 0.8,
    conduct: 1,
    temp: 20,
    hidden: false
};
