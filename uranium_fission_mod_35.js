// Uranium-235 Fission Mod v34 - COMPLETE & WORKING
// Wrapped to ensure Sandboxels loads first

(function() {
    console.log('Uranium Fission Mod v34 - Loading...');
    
    // Wait for Sandboxels to be ready
    var loadInterval = setInterval(function() {
        if (typeof elements !== 'undefined' && typeof behaviors !== 'undefined' && typeof pixelMap !== 'undefined') {
            clearInterval(loadInterval);
            loadMod();
        }
    }, 100);
    
    function loadMod() {
        console.log('Sandboxels ready, loading elements...');
        
        var fissionCategory = "fission";
        
        if (!elements.categories) {
            elements.categories = [];
        }
        if (!elements.categories.includes(fissionCategory)) {
            elements.categories.push(fissionCategory);
        }
        
        console.log('Fission category registered:', elements.categories);
        console.log('Categories list:', elements.categories);
        
        // Modified Uranium-235
        elements.modified_uranium_235 = {
            color: ["#e0e0e0", "#d0d0d0", "#c8c8c8", "#b8b8b8"],
            behavior: behaviors.WALL,
            tick: function(pixel) {
                if (pixel.temp > 10000) pixel.temp = 10000;
                
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        var nx = pixel.x + dx;
                        var ny = pixel.y + dy;
                        
                        if (pixelMap[nx] && pixelMap[nx][ny]) {
                            var nearPixel = pixelMap[nx][ny];
                            
                            if (nearPixel && nearPixel.element === "neutron") {
                                deletePixel(nx, ny);
                                
                                for (var i = 0; i < 4; i++) {
                                    var angle = Math.random() * Math.PI * 2;
                                    var dist = 2 + Math.random() * 2;
                                    var spawnX = Math.round(pixel.x + Math.cos(angle) * dist);
                                    var spawnY = Math.round(pixel.y + Math.sin(angle) * dist);
                                    
                                    if (isEmpty(spawnX, spawnY)) {
                                        createPixel("neutron", spawnX, spawnY);
                                    }
                                }
                                
                                if (Math.random() < 0.3) {
                                    var prodX = pixel.x + (Math.random() < 0.5 ? 1 : -1);
                                    var prodY = pixel.y + (Math.random() < 0.5 ? 1 : -1);
                                    if (isEmpty(prodX, prodY)) {
                                        if (Math.random() < 0.4) {
                                            createPixel("xenon_135", prodX, prodY);
                                        } else if (Math.random() < 0.7) {
                                            createPixel("barium_141", prodX, prodY);
                                        }
                                    }
                                }
                                
                                pixel.temp += 800;
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
            tempHigh: 10590,
            stateHigh: "molten_modified_uranium_235",
            hidden: false
        };
        
        elements.molten_modified_uranium_235 = {
            color: ["#ff8c00", "#ffa500", "#ff7f00", "#ffaa00"],
            behavior: behaviors.MOLTEN,
            tick: function(pixel) {
                if (pixel.temp > 10000) pixel.temp = 10000;
            },
            category: fissionCategory,
            state: "liquid",
            density: 17300,
            conduct: 0.3,
            temp: 10600,
            tempLow: 10590,
            stateLow: "modified_uranium_235"
        };
        
        // Uranium-235
        elements.uranium_235 = {
            color: ["#c0c0c0", "#a8a8a8", "#b5b5b5", "#9d9d9d"],
            behavior: behaviors.WALL,
            tick: function(pixel) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        var nx = pixel.x + dx;
                        var ny = pixel.y + dy;
                        
                        if (pixelMap[nx] && pixelMap[nx][ny]) {
                            var nearPixel = pixelMap[nx][ny];
                            
                            if (nearPixel && nearPixel.element === "neutron") {
                                deletePixel(nx, ny);
                                
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
            hidden: false
        };
        
        elements.molten_uranium_235 = {
            color: ["#ff8c00", "#ffa500", "#ff7f00", "#ffaa00"],
            behavior: behaviors.MOLTEN,
            category: fissionCategory,
            state: "liquid",
            density: 17300,
            conduct: 0.3,
            temp: 3600,
            tempLow: 3500,
            stateLow: "uranium_235"
        };
        
        // Uranium-236
        elements.uranium_236 = {
            color: ["#a0a0a0", "#888888", "#959595"],
            behavior: behaviors.POWDER,
            category: fissionCategory,
            state: "solid",
            density: 19100,
            hardness: 0.5,
            temp: 100,
            tempHigh: 3500,
            stateHigh: "molten_uranium_236",
            hidden: false
        };
        
        elements.molten_uranium_236 = {
            color: ["#ff6600", "#ff7700"],
            behavior: behaviors.MOLTEN,
            category: fissionCategory,
            state: "liquid",
            density: 17300,
            temp: 3600,
            tempLow: 3500,
            stateLow: "uranium_236"
        };
        
        // Plutonium-239
        elements.plutonium_239 = {
            color: ["#4a4a4a", "#3a3a3a", "#5a5a5a"],
            behavior: behaviors.WALL,
            tick: function(pixel) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        var nx = pixel.x + dx;
                        var ny = pixel.y + dy;
                        
                        if (pixelMap[nx] && pixelMap[nx][ny]) {
                            var nearPixel = pixelMap[nx][ny];
                            
                            if (nearPixel && nearPixel.element === "neutron") {
                                deletePixel(nx, ny);
                                
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
            density: 19800,
            hardness: 0.6,
            conduct: 0.06,
            temp: 20,
            tempHigh: 640,
            hidden: false,
            stateHigh: "molten_plutonium_239"
        };
        
        elements.molten_plutonium_239 = {
            color: ["#ff6600", "#ff7700"],
            behavior: behaviors.MOLTEN,
            category: fissionCategory,
            state: "liquid",
            density: 16600,
            temp: 700,
            tempLow: 640,
            stateLow: "plutonium_239"
        };
        
        // Xenon-135
        elements.xenon_135 = {
            color: ["#6a5acd", "#4169e1", "#7b68ee"],
            behavior: behaviors.GAS,
            category: fissionCategory,
            state: "gas",
            density: 5.89,
            temp: 1000,
            hidden: false
        };
        
        // Barium-141
        elements.barium_141 = {
            color: ["#ff6347", "#ff4500"],
            behavior: behaviors.MOLTEN,
            category: fissionCategory,
            state: "liquid",
            density: 3300,
            temp: 1000,
            tempLow: 700,
            stateLow: "barium_141_solid"
        };
        
        elements.barium_141_solid = {
            color: ["#cd5c5c", "#dc143c"],
            behavior: behaviors.POWDER,
            category: fissionCategory,
            state: "solid",
            density: 3510,
            temp: 20,
            tempHigh: 700,
            stateHigh: "barium_141",
            hidden: false
        };
        
        // Moderator
        elements.moderator = {
            color: ["#d3d3d3", "#c8c8c8", "#dedede"],
            behavior: behaviors.SUPPORTPOWDER,
            tick: function(pixel) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        var nx = pixel.x + dx;
                        var ny = pixel.y + dy;
                        
                        if (pixelMap[nx] && pixelMap[nx][ny]) {
                            var p = pixelMap[nx][ny];
                            if (p && (p.element === "neutron" || p.element === "proton")) {
                                if (!p.slowed) {
                                    p.slowed = true;
                                }
                            }
                        }
                    }
                }
            },
            category: fissionCategory,
            state: "solid",
            density: 1850,
            hardness: 0.9,
            temp: 20,
            tempHigh: 3000,
            stateHigh: "molten_moderator",
            immobile: true,
            hidden: false
        };
        
        elements.molten_moderator = {
            color: ["#ff6600", "#ff7700"],
            behavior: behaviors.MOLTEN,
            category: fissionCategory,
            state: "liquid",
            density: 1700,
            temp: 3100,
            tempLow: 3000,
            stateLow: "moderator"
        };
        
        // Control Rod
        elements.control_rod = {
            color: ["#2f2f2f", "#1f1f1f"],
            behavior: behaviors.WALL,
            reactions: {
                "neutron": { "elem1": "control_rod", "elem2": null, "chance": 0.95 },
                "proton": { "elem1": "control_rod", "elem2": null, "chance": 0.95 }
            },
            category: fissionCategory,
            state: "solid",
            density: 10200,
            hardness: 0.8,
            temp: 20,
            tempHigh: 2750,
            stateHigh: "molten_control_rod",
            immobile: true,
            noMix: true
        };
        
        elements.molten_control_rod = {
            color: ["#ff6600", "#ff7700"],
            behavior: behaviors.MOLTEN,
            reactions: {
                "neutron": { "elem1": "molten_control_rod", "elem2": null, "chance": 0.85 },
                "proton": { "elem1": "molten_control_rod", "elem2": null, "chance": 0.85 }
            },
            category: fissionCategory,
            state: "liquid",
            density: 9500,
            temp: 2800,
            tempLow: 2750,
            stateLow: "control_rod"
        };
        
        // Xenon Absorber
        elements.xenon_absorber = {
            color: ["#4b0082", "#6a0dad"],
            behavior: behaviors.WALL,
            noMix: true,
            immobile: true,
            tick: function(pixel) {
                for (var dx = -4; dx <= 4; dx++) {
                    for (var dy = -4; dy <= 4; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        var kx = pixel.x + dx;
                        var ky = pixel.y + dy;
                        
                        if (!isEmpty(kx, ky, true) && pixelMap[kx] && pixelMap[kx][ky]) {
                            var kPixel = pixelMap[kx][ky];
                            
                            if (kPixel && kPixel.element === "xenon_135") {
                                var dirX = pixel.x - kx;
                                var dirY = pixel.y - ky;
                                
                                if (Math.abs(dirX) <= 1 && Math.abs(dirY) <= 1) {
                                    deletePixel(kx, ky);
                                    return;
                                } else {
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
            temp: 20,
            hidden: false
        };
        
        // Barium Absorber
        elements.barium_absorber = {
            color: ["#ff1493", "#ff69b4"],
            behavior: behaviors.WALL,
            noMix: true,
            immobile: true,
            tick: function(pixel) {
                for (var dx = -4; dx <= 4; dx++) {
                    for (var dy = -4; dy <= 4; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        var bx = pixel.x + dx;
                        var by = pixel.y + dy;
                        
                        if (!isEmpty(bx, by, true) && pixelMap[bx] && pixelMap[bx][by]) {
                            var bPixel = pixelMap[bx][by];
                            
                            if (bPixel && (bPixel.element === "barium_141" || bPixel.element === "barium_141_solid")) {
                                var dirX = pixel.x - bx;
                                var dirY = pixel.y - by;
                                
                                if (Math.abs(dirX) <= 1 && Math.abs(dirY) <= 1) {
                                    deletePixel(bx, by);
                                    return;
                                } else {
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
            temp: 20,
            hidden: false
        };
        
        // Hydrogen Absorber
        elements.hydrogen_absorber = {
            color: ["#00ced1", "#20b2aa"],
            behavior: behaviors.WALL,
            noMix: true,
            immobile: true,
            reactions: {
                "hydrogen": { "elem1": "hydrogen_absorber", "elem2": null, "chance": 0.9 }
            },
            category: fissionCategory,
            state: "solid",
            density: 8900,
            temp: 20,
            tempHigh: 1800,
            stateHigh: "molten_hydrogen_absorber"
        };
        
        elements.molten_hydrogen_absorber = {
            color: ["#ff6600", "#ff7700"],
            behavior: behaviors.MOLTEN,
            category: fissionCategory,
            state: "liquid",
            density: 8200,
            temp: 1850,
            tempLow: 1800,
            stateLow: "hydrogen_absorber"
        };
        
        // Neutron Emitter
        elements.neutron_emitter = {
            color: ["#ffff00", "#ffef00"],
            behavior: behaviors.WALL,
            noMix: true,
            immobile: true,
            conduct: 1,
            tick: function(pixel) {
                var shouldEmit = false;
                
                if (pixel.charge && pixel.charge > 0) {
                    shouldEmit = true;
                }
                
                if (!shouldEmit) {
                    for (var dx = -1; dx <= 1; dx++) {
                        for (var dy = -1; dy <= 1; dy++) {
                            if (dx === 0 && dy === 0) continue;
                            var cx = pixel.x + dx;
                            var cy = pixel.y + dy;
                            
                            if (!isEmpty(cx, cy, true) && pixelMap[cx] && pixelMap[cx][cy]) {
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
                    var receiverX = null;
                    var receiverY = null;
                    
                    for (var rx = -10; rx <= 10; rx++) {
                        for (var ry = -10; ry <= 10; ry++) {
                            if (rx === 0 && ry === 0) continue;
                            var checkX = pixel.x + rx;
                            var checkY = pixel.y + ry;
                            
                            if (!isEmpty(checkX, checkY, true) && pixelMap[checkX] && pixelMap[checkX][checkY]) {
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
                    
                    if (receiverX !== null) {
                        var dirX = receiverX > pixel.x ? 1 : (receiverX < pixel.x ? -1 : 0);
                        var dirY = receiverY > pixel.y ? 1 : (receiverY < pixel.y ? -1 : 0);
                        
                        var emitX = pixel.x + dirX;
                        var emitY = pixel.y + dirY;
                        
                        if (isEmpty(emitX, emitY)) {
                            createPixel("neutron", emitX, emitY);
                        }
                    } else {
                        var angle = Math.random() * Math.PI * 2;
                        var emitX = Math.round(pixel.x + Math.cos(angle) * 2);
                        var emitY = Math.round(pixel.y + Math.sin(angle) * 2);
                        
                        if (isEmpty(emitX, emitY)) {
                            createPixel("neutron", emitX, emitY);
                        }
                    }
                }
            },
            category: fissionCategory,
            state: "solid",
            density: 8000,
            temp: 20,
            hidden: false
        };
        
        // Neutron Receiver
        elements.neutron_receiver = {
            color: ["#ff00ff", "#ef00ef"],
            behavior: behaviors.WALL,
            noMix: true,
            immobile: true,
            conduct: 1,
            tick: function(pixel) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        var nx = pixel.x + dx;
                        var ny = pixel.y + dy;
                        
                        if (!isEmpty(nx, ny, true) && pixelMap[nx] && pixelMap[nx][ny]) {
                            var nearPixel = pixelMap[nx][ny];
                            if (nearPixel && nearPixel.element === "neutron") {
                                deletePixel(nx, ny);
                                pixel.charge = 100;
                                pixel.chargeCD = 4;
                                return;
                            }
                        }
                    }
                }
            },
            category: fissionCategory,
            state: "solid",
            density: 8000,
            temp: 20,
            hidden: false
        };
        
        // Zinc Compute Module
        elements.zinc_compute_module = {
            color: ["#b5b8b1", "#a8aba4"],
            behavior: behaviors.WALL,
            noMix: true,
            immobile: true,
            conduct: 0.8,
            tick: function(pixel) {
                if (pixel.charge && pixel.charge > 0) {
                    pixel.temp += 0.5;
                }
            },
            category: fissionCategory,
            state: "solid",
            density: 7140,
            temp: 20,
            tempHigh: 420,
            stateHigh: "molten_zinc_compute_module"
        };
        
        elements.molten_zinc_compute_module = {
            color: ["#c0c0c0", "#b0b0b0"],
            behavior: behaviors.MOLTEN,
            category: fissionCategory,
            state: "liquid",
            density: 6570,
            temp: 450,
            tempLow: 420,
            stateLow: "zinc_compute_module"
        };
        
        // Steam Turbine
        elements.steam_turbine = {
            color: ["#708090", "#778899"],
            behavior: behaviors.SUPPORTPOWDER,
            passable: true,
            noMix: true,
            immobile: true,
            conduct: 1,
            tick: function(pixel) {
                var steamCount = 0;
                
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        var sx = pixel.x + dx;
                        var sy = pixel.y + dy;
                        
                        if (pixelMap[sx] && pixelMap[sx][sy]) {
                            var nearPixel = pixelMap[sx][sy];
                            if (nearPixel && nearPixel.element === "steam") {
                                steamCount++;
                            }
                        }
                    }
                }
                
                if (steamCount > 0) {
                    pixel.charge = steamCount * 10;
                    pixel.chargeCD = 2;
                }
            },
            category: fissionCategory,
            state: "solid",
            density: 7850,
            temp: 20,
            hidden: false
        };
        
        // Modify neutron and proton behavior
        if (elements.neutron) {
            var originalNeutronTick = elements.neutron.tick;
            
            elements.neutron.tick = function(pixel) {
                if (pixel.slowed) {
                    if (!pixel.skipTicks) pixel.skipTicks = 0;
                    pixel.skipTicks++;
                    
                    if (pixel.skipTicks % 2 === 0) return;
                }
                
                if (originalNeutronTick) {
                    originalNeutronTick(pixel);
                }
            };
        }
        
        if (elements.proton) {
            var originalProtonTick = elements.proton.tick;
            
            elements.proton.tick = function(pixel) {
                if (pixel.slowed) {
                    if (!pixel.skipTicks) pixel.skipTicks = 0;
                    pixel.skipTicks++;
                    
                    if (pixel.skipTicks % 2 === 0) return;
                }
                
                if (originalProtonTick) {
                    originalProtonTick(pixel);
                }
            };
        }
        
        console.log('=================================');
        console.log('Uranium Fission Mod v34 LOADED!');
        console.log('24 Elements:');
        console.log('- Uranium: modified_uranium_235, uranium_235, uranium_236, plutonium_239');
        console.log('- Products: xenon_135, barium_141');
        console.log('- Control: moderator, control_rod');
        console.log('- Absorbers: xenon_absorber, barium_absorber, hydrogen_absorber');
        console.log('- Neutron: neutron_emitter, neutron_receiver');
        console.log('- Utilities: zinc_compute_module, steam_turbine');
        console.log('=================================');
    }
})();
