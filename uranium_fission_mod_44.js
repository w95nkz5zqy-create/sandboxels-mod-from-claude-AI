// Uranium Fission Mod v41 - Explosion-resistant elements

(function() {
    console.log('Uranium Fission Mod v41 - Loading...');
    
    var loadInterval = setInterval(function() {
        if (typeof elements !== 'undefined' && typeof behaviors !== 'undefined' && typeof pixelMap !== 'undefined') {
            clearInterval(loadInterval);
            loadMod();
        }
    }, 100);
    
    function loadMod() {
        console.log('Loading v41 with explosion-resistant elements...');
        
        var fissionCategory = "fission";
        
        if (!elements.categories) {
            elements.categories = [];
        }
        
        var fissionIndex = elements.categories.indexOf(fissionCategory);
        if (fissionIndex > -1) {
            elements.categories.splice(fissionIndex, 1);
        }
        elements.categories.push(fissionCategory);
        
        // Modified Uranium-235 - EXPLOSION RESISTANT, no fission products, 1600°C cap
        elements.modified_uranium_235 = {
            color: ["#e0e0e0", "#d0d0d0", "#c8c8c8"],
            behavior: behaviors.WALL,
            tick: function(pixel) {
                if (pixel.temp > 1600) pixel.temp = 1600; // Cap at 1600°C
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
                                // NO fission products created
                                pixel.temp += 800;
                                return;
                            }
                        }
                    }
                }
            },
            category: "fission",
            state: "solid",
            density: 19100,
            hardness: 0.9,
            temp: 20,
            tempHigh: 5000, // High enough to withstand explosions
            stateHigh: "molten_modified_uranium_235"
        };
        
        elements.molten_modified_uranium_235 = {
            color: ["#ff8c00", "#ffa500"],
            behavior: behaviors.MOLTEN,
            tick: function(pixel) { if (pixel.temp > 10000) pixel.temp = 10000; },
            category: "fission",
            state: "liquid",
            density: 17300,
            temp: 1600,
            tempLow: 1500,
            stateLow: "modified_uranium_235"
        };
        
        elements.uranium_235 = {
            color: ["#c0c0c0", "#a8a8a8"],
            behavior: behaviors.WALL,
            tick: function(pixel) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        var nx = pixel.x + dx, ny = pixel.y + dy;
                        if (pixelMap[nx] && pixelMap[nx][ny] && pixelMap[nx][ny].element === "neutron") {
                            deletePixel(nx, ny);
                            for (var i = 0; i < 3; i++) {
                                var angle = Math.random() * Math.PI * 2;
                                var dist = 2 + Math.random() * 2;
                                var spawnX = Math.round(pixel.x + Math.cos(angle) * dist);
                                var spawnY = Math.round(pixel.y + Math.sin(angle) * dist);
                                if (isEmpty(spawnX, spawnY)) createPixel("neutron", spawnX, spawnY);
                            }
                            pixel.temp += 300;
                            return;
                        }
                    }
                }
            },
            category: "fission",
            state: "solid",
            density: 19100,
            temp: 20,
            tempHigh: 3500,
            stateHigh: "molten_uranium_235"
        };
        
        elements.molten_uranium_235 = {
            color: ["#ff8c00"],
            behavior: behaviors.MOLTEN,
            category: "fission",
            state: "liquid",
            density: 17300,
            temp: 3600,
            tempLow: 3500,
            stateLow: "uranium_235"
        };
        
        elements.uranium_236 = {
            color: ["#a0a0a0"],
            behavior: behaviors.POWDER,
            category: "fission",
            state: "solid",
            density: 19100,
            temp: 100,
            tempHigh: 3500,
            stateHigh: "molten_uranium_236"
        };
        
        elements.molten_uranium_236 = {
            color: ["#ff6600"],
            behavior: behaviors.MOLTEN,
            category: "fission",
            state: "liquid",
            density: 17300,
            temp: 3600,
            tempLow: 3500,
            stateLow: "uranium_236"
        };
        
        elements.plutonium_239 = {
            color: ["#4a4a4a"],
            behavior: behaviors.WALL,
            tick: function(pixel) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        var nx = pixel.x + dx, ny = pixel.y + dy;
                        if (pixelMap[nx] && pixelMap[nx][ny] && pixelMap[nx][ny].element === "neutron") {
                            deletePixel(nx, ny);
                            for (var i = 0; i < 3; i++) {
                                var angle = Math.random() * Math.PI * 2;
                                var dist = 2 + Math.random() * 2;
                                var spawnX = Math.round(pixel.x + Math.cos(angle) * dist);
                                var spawnY = Math.round(pixel.y + Math.sin(angle) * dist);
                                if (isEmpty(spawnX, spawnY)) createPixel("neutron", spawnX, spawnY);
                            }
                            pixel.temp += 300;
                            return;
                        }
                    }
                }
            },
            category: "fission",
            state: "solid",
            density: 19800,
            temp: 20,
            tempHigh: 640,
            stateHigh: "molten_plutonium_239"
        };
        
        elements.molten_plutonium_239 = {
            color: ["#ff6600"],
            behavior: behaviors.MOLTEN,
            category: "fission",
            state: "liquid",
            density: 16600,
            temp: 700,
            tempLow: 640,
            stateLow: "plutonium_239"
        };
        
        
        // Xenon-135 - Absorbs 2 neutrons before disappearing
        elements.xenon_135 = {
            color: ["#6a5acd"],
            behavior: behaviors.GAS,
            tick: function(pixel) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        var nx = pixel.x + dx, ny = pixel.y + dy;
                        if (pixelMap[nx] && pixelMap[nx][ny] && pixelMap[nx][ny].element === "neutron") {
                            if (!pixel.neutronsAbsorbed) pixel.neutronsAbsorbed = 0;
                            deletePixel(nx, ny);
                            pixel.neutronsAbsorbed++;
                            if (pixel.neutronsAbsorbed >= 2) deletePixel(pixel.x, pixel.y);
                            return;
                        }
                    }
                }
            },
            category: "fission",
            state: "gas",
            density: 5.89,
            temp: 1000
        };
        
        // Moderator
        elements.moderator = {
            color: ["#d3d3d3"],
            behavior: [
                "XX|XX|XX",
                "XX|XX|XX",
                "XX|XX|XX"
            ],
            tick: function(pixel) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        var nx = pixel.x + dx, ny = pixel.y + dy;
                        if (pixelMap[nx] && pixelMap[nx][ny]) {
                            var p = pixelMap[nx][ny];
                            if (p && (p.element === "neutron" || p.element === "proton" || p.element === "hydrogen")) {
                                if (!p.slowed) p.slowed = true;
                            }
                        }
                    }
                }
            },
            category: "fission",
            state: "solid",
            density: 1850,
            temp: 20,
            tempHigh: 3000,
            stateHigh: "molten_moderator",
            immobile: true
        };
        
        elements.molten_moderator = {
            color: ["#ff6600"],
            behavior: behaviors.MOLTEN,
            category: "fission",
            state: "liquid",
            density: 1700,
            temp: 3100,
            tempLow: 3000,
            stateLow: "moderator"
        };
        
        // Control Rod - EXPLOSION RESISTANT
        elements.control_rod = {
            color: ["#2f2f2f"],
            behavior: behaviors.WALL,
            reactions: {
                "neutron": { "elem1": "control_rod", "elem2": null, "chance": 0.95 },
                "proton": { "elem1": "control_rod", "elem2": null, "chance": 0.95 }
            },
            category: "fission",
            state: "solid",
            density: 10200,
            hardness: 0.95,
            temp: 20,
            tempHigh: 5000, // Withstands explosions
            stateHigh: "molten_control_rod",
            immobile: true,
            noMix: true
        };
        
        elements.molten_control_rod = {
            color: ["#ff6600"],
            behavior: behaviors.MOLTEN,
            reactions: {
                "neutron": { "elem1": "molten_control_rod", "elem2": null, "chance": 0.85 },
                "proton": { "elem1": "molten_control_rod", "elem2": null, "chance": 0.85 }
            },
            category: "fission",
            state: "liquid",
            density: 9500,
            temp: 5100,
            tempLow: 5000,
            stateLow: "control_rod"
        };
        
        // Xenon Absorber - EXPLOSION RESISTANT
        elements.xenon_absorber = {
            color: ["#4b0082"],
            behavior: behaviors.WALL,
            noMix: true,
            immobile: true,
            hardness: 0.95,
            tick: function(pixel) {
                for (var dx = -4; dx <= 4; dx++) {
                    for (var dy = -4; dy <= 4; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        var kx = pixel.x + dx, ky = pixel.y + dy;
                        if (!isEmpty(kx, ky, true) && pixelMap[kx] && pixelMap[kx][ky]) {
                            var kPixel = pixelMap[kx][ky];
                            if (kPixel && kPixel.element === "xenon_135") {
                                var dirX = pixel.x - kx, dirY = pixel.y - ky;
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
            category: "fission",
            state: "solid",
            density: 8500,
            temp: 20,
            tempHigh: 5000 // Withstands explosions
        };
        
        // Hydrogen Absorber - EXPLOSION RESISTANT
        elements.hydrogen_absorber = {
            color: ["#00ced1"],
            behavior: behaviors.WALL,
            noMix: true,
            immobile: true,
            hardness: 0.95,
            reactions: {
                "hydrogen": { "elem1": "hydrogen_absorber", "elem2": null, "chance": 0.9 }
            },
            category: "fission",
            state: "solid",
            density: 8900,
            temp: 20,
            tempHigh: 5000, // Withstands explosions
            stateHigh: "molten_hydrogen_absorber"
        };
        
        elements.molten_hydrogen_absorber = {
            color: ["#ff6600"],
            behavior: behaviors.MOLTEN,
            category: "fission",
            state: "liquid",
            density: 8200,
            temp: 5100,
            tempLow: 5000,
            stateLow: "hydrogen_absorber"
        };
        
        elements.neutron_emitter = {
            color: ["#ffff00"],
            behavior: behaviors.WALL,
            noMix: true,
            immobile: true,
            conduct: 1,
            tick: function(pixel) {
                var shouldEmit = false;
                if (pixel.charge && pixel.charge > 0) shouldEmit = true;
                if (!shouldEmit) {
                    for (var dx = -1; dx <= 1; dx++) {
                        for (var dy = -1; dy <= 1; dy++) {
                            if (dx === 0 && dy === 0) continue;
                            var cx = pixel.x + dx, cy = pixel.y + dy;
                            if (!isEmpty(cx, cy, true) && pixelMap[cx] && pixelMap[cx][cy]) {
                                var nearPixel = pixelMap[cx][cy];
                                if (nearPixel && ((nearPixel.charge && nearPixel.charge > 0) || nearPixel.element === "electric" || nearPixel.element === "lightning")) {
                                    shouldEmit = true;
                                    break;
                                }
                            }
                        }
                        if (shouldEmit) break;
                    }
                }
                if (shouldEmit && Math.random() < 0.3) {
                    var angle = Math.random() * Math.PI * 2;
                    var emitX = Math.round(pixel.x + Math.cos(angle) * 2);
                    var emitY = Math.round(pixel.y + Math.sin(angle) * 2);
                    if (isEmpty(emitX, emitY)) createPixel("neutron", emitX, emitY);
                }
            },
            category: "fission",
            state: "solid",
            density: 8000,
            temp: 20
        };
        
        elements.neutron_receiver = {
            color: ["#ff00ff"],
            behavior: behaviors.WALL,
            noMix: true,
            immobile: true,
            conduct: 1,
            tick: function(pixel) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        var nx = pixel.x + dx, ny = pixel.y + dy;
                        if (!isEmpty(nx, ny, true) && pixelMap[nx] && pixelMap[nx][ny] && pixelMap[nx][ny].element === "neutron") {
                            deletePixel(nx, ny);
                            pixel.charge = 100;
                            pixel.chargeCD = 4;
                            return;
                        }
                    }
                }
            },
            category: "fission",
            state: "solid",
            density: 8000,
            temp: 20
        };
        
        elements.zinc_compute_module = {
            color: ["#b5b8b1"],
            behavior: behaviors.WALL,
            noMix: true,
            immobile: true,
            conduct: 0.8,
            tick: function(pixel) {
                if (pixel.charge && pixel.charge > 0) pixel.temp += 0.5;
            },
            category: "fission",
            state: "solid",
            density: 7140,
            temp: 20,
            tempHigh: 420,
            stateHigh: "molten_zinc_compute_module"
        };
        
        elements.molten_zinc_compute_module = {
            color: ["#c0c0c0"],
            behavior: behaviors.MOLTEN,
            category: "fission",
            state: "liquid",
            density: 6570,
            temp: 450,
            tempLow: 420,
            stateLow: "zinc_compute_module"
        };
        
        elements.steam_turbine = {
            color: ["#708090"],
            behavior: [
                "XX|XX|XX",
                "XX|XX|XX",
                "XX|XX|XX"
            ],
            conduct: 1,
            tick: function(pixel) {
                var steamCount = 0;
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        var sx = pixel.x + dx, sy = pixel.y + dy;
                        if (pixelMap[sx] && pixelMap[sx][sy] && pixelMap[sx][sy].element === "steam") {
                            steamCount++;
                        }
                    }
                }
                if (steamCount > 0) {
                    pixel.charge = steamCount * 10;
                    pixel.chargeCD = 2;
                }
            },
            category: "fission",
            state: "solid",
            density: 7850,
            temp: 20,
            immobile: true
        };
        
        elements.power = {
            color: ["#ffff00", "#ff0000"],
            behavior: behaviors.LIQUID,
            conduct: 1,
            tick: function(pixel) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        var px = pixel.x + dx, py = pixel.y + dy;
                        if (pixelMap[px] && pixelMap[px][py]) {
                            var target = pixelMap[px][py];
                            target.charge = 100;
                            target.chargeCD = 10;
                        }
                    }
                }
                pixel.charge = 100;
                pixel.chargeCD = 10;
            },
            category: "fission",
            state: "liquid",
            density: 1000,
            temp: 20
        };
        
        // Slow neutrons and protons
        if (elements.neutron) {
            var originalNeutronTick = elements.neutron.tick;
            elements.neutron.tick = function(pixel) {
                if (pixel.slowed) {
                    if (!pixel.skipTicks) pixel.skipTicks = 0;
                    pixel.skipTicks++;
                    if (pixel.skipTicks % 2 === 0) return;
                }
                if (originalNeutronTick) originalNeutronTick(pixel);
            };
            
            // Make neutrons ignore water
            if (!elements.neutron.ignore) elements.neutron.ignore = [];
            if (!elements.neutron.ignore.includes("water")) elements.neutron.ignore.push("water");
            if (!elements.neutron.ignore.includes("salt_water")) elements.neutron.ignore.push("salt_water");
            if (!elements.neutron.ignore.includes("dirty_water")) elements.neutron.ignore.push("dirty_water");
            if (!elements.neutron.ignore.includes("sugar_water")) elements.neutron.ignore.push("sugar_water");
        }
        
        if (elements.proton) {
            var originalProtonTick = elements.proton.tick;
            elements.proton.tick = function(pixel) {
                if (pixel.slowed) {
                    if (!pixel.skipTicks) pixel.skipTicks = 0;
                    pixel.skipTicks++;
                    if (pixel.skipTicks % 2 === 0) return;
                }
                if (originalProtonTick) originalProtonTick(pixel);
            };
        }
        
        console.log('====================================');
        console.log('FISSION MOD v44 LOADED!');
        console.log('Changes:');
        console.log('- Max temp capped at 1600°C');
        console.log('- NO barium production or elements');
        console.log('- Xenon-135 + xenon_absorber included');
        console.log('- Neutrons pass through water');
        console.log('- Explosion-resistant elements');
        console.log('====================================');
    }
})();
