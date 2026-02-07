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
    tick: function(pixel) {
        // Check adjacent pixels for neutrons (more aggressively)
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    var nearPixel = pixelMap[nx][ny];
                    
                    if (nearPixel && nearPixel.element === "neutron") {
                        // Delete neutron
                        deletePixel(nx, ny);
                        
                        // Create 3 new neutrons
                        for (var i = 0; i < 3; i++) {
                            var angle = Math.random() * Math.PI * 2;
                            var dist = 2 + Math.random() * 2;
                            var spawnX = Math.round(pixel.x + Math.cos(angle) * dist);
                            var spawnY = Math.round(pixel.y + Math.sin(angle) * dist);
                            
                            if (isEmpty(spawnX, spawnY)) {
                                createPixel("neutron", spawnX, spawnY);
                            }
                        }
                        
                        pixel.temp += 300;
                        return;
                    }
                }
            }
        }
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
        "neutron": { 
            "elem1": "molten_uranium_235", 
            "elem2": null, 
            "chance": 1.0, 
            "temp1": 1000,
            "func": function(pixel1, pixel2) {
                // Create 3 neutrons instantly
                for (var i = 0; i < 3; i++) {
                    var angle = Math.random() * Math.PI * 2;
                    var speed = 2 + Math.random() * 2;
                    var nx = Math.round(pixel1.x + Math.cos(angle) * speed);
                    var ny = Math.round(pixel1.y + Math.sin(angle) * speed);
                    
                    if (isEmpty(nx, ny)) {
                        createPixel("neutron", nx, ny);
                    }
                }
                
                // Create fission products
                var spawnX = pixel1.x + (Math.random() < 0.5 ? 1 : -1);
                var spawnY = pixel1.y + (Math.random() < 0.5 ? 1 : -1);
                
                if (isEmpty(spawnX, spawnY) && Math.random() < 0.3) {
                    if (Math.random() < 0.5) {
                        createPixel("barium_141", spawnX, spawnY);
                    } else {
                        createPixel("krypton_92", spawnX, spawnY);
                    }
                }
                
                pixel1.temp += 1000;
            }
        }
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
        "neutron": { 
            "elem1": "plutonium_239", 
            "elem2": null, 
            "chance": 1.0, 
            "temp1": 900,
            "func": function(pixel1, pixel2) {
                // Create 3 neutrons instantly
                for (var i = 0; i < 3; i++) {
                    var angle = Math.random() * Math.PI * 2;
                    var speed = 2 + Math.random() * 2;
                    var nx = Math.round(pixel1.x + Math.cos(angle) * speed);
                    var ny = Math.round(pixel1.y + Math.sin(angle) * speed);
                    
                    if (isEmpty(nx, ny)) {
                        createPixel("neutron", nx, ny);
                    }
                }
                
                pixel1.temp += 900;
            }
        }
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
        "neutron": { 
            "elem1": "molten_plutonium_239", 
            "elem2": null, 
            "chance": 1.0, 
            "temp1": 1100,
            "func": function(pixel1, pixel2) {
                // Create 3 neutrons instantly
                for (var i = 0; i < 3; i++) {
                    var angle = Math.random() * Math.PI * 2;
                    var speed = 2 + Math.random() * 2;
                    var nx = Math.round(pixel1.x + Math.cos(angle) * speed);
                    var ny = Math.round(pixel1.y + Math.sin(angle) * speed);
                    
                    if (isEmpty(nx, ny)) {
                        createPixel("neutron", nx, ny);
                    }
                }
                
                pixel1.temp += 1100;
            }
        }
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
    insulate: false,
    colorOn: "#ffff00",
    tick: function(pixel) {
        // Simple check: if pixel has charge OR is touching something with charge, emit
        var shouldEmit = false;
        
        // Check self for charge
        if (pixel.charge && pixel.charge > 0) {
            shouldEmit = true;
        }
        
        // Check adjacent pixels for charge or electric elements
        if (!shouldEmit) {
            for (var dx = -1; dx <= 1; dx++) {
                for (var dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    var cx = pixel.x + dx;
                    var cy = pixel.y + dy;
                    
                    if (!isEmpty(cx, cy, true)) {
                        var nearPixel = pixelMap[cx][cy];
                        if (nearPixel && ((nearPixel.charge && nearPixel.charge > 0) || 
                                         nearPixel.element === "electric" ||
                                         nearPixel.element === "lightning")) {
                            shouldEmit = true;
                            break;
                        }
                    }
                }
                if (shouldEmit) break;
            }
        }
        
        if (shouldEmit && Math.random() < 0.3) {
            // Look for receiver
            var receiverX = null;
            var receiverY = null;
            
            // Search in all directions for receiver
            for (var rx = -5; rx <= 5; rx++) {
                for (var ry = -5; ry <= 5; ry++) {
                    if (rx === 0 && ry === 0) continue;
                    var checkX = pixel.x + rx;
                    var checkY = pixel.y + ry;
                    
                    if (!isEmpty(checkX, checkY, true)) {
                        var checkPixel = pixelMap[checkX][checkY];
                        if (checkPixel && checkPixel.element === "neutron_receiver") {
                            receiverX = checkX;
                            receiverY = checkY;
                            break;
                        }
                    }
                }
                if (receiverX !== null) break;
            }
            
            // Emit neutron
            if (receiverX !== null) {
                // Emit toward receiver
                var dirX = receiverX > pixel.x ? 1 : (receiverX < pixel.x ? -1 : 0);
                var dirY = receiverY > pixel.y ? 1 : (receiverY < pixel.y ? -1 : 0);
                
                var emitX = pixel.x + dirX;
                var emitY = pixel.y + dirY;
                
                if (isEmpty(emitX, emitY)) {
                    createPixel("neutron", emitX, emitY);
                }
            } else {
                // No receiver, emit to the right
                if (isEmpty(pixel.x + 1, pixel.y)) {
                    createPixel("neutron", pixel.x + 1, pixel.y);
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

// Make E-Superheater immobile
if (elements.e_superheater) {
    elements.e_superheater.immobile = true;
    elements.e_superheater.movable = false;
}
