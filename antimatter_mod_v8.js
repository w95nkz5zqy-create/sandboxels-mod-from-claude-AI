// Antimatter Mod v8 - Updated with ALL new fission elements
// All antimatter annihilates with regular matter on contact

var antimatterCategories = [
    "antimatter_land",
    "antimatter_liquids", 
    "antimatter_gases",
    "antimatter_solids",
    "antimatter_energy",
    "antimatter_fission",
    "antimatter_machines"
];

if (!elements.categories) {
    elements.categories = [];
}

antimatterCategories.forEach(function(cat) {
    if (!elements.categories.includes(cat)) {
        elements.categories.push(cat);
    }
});

// Helper function - antimatter annihilates with ANY regular matter
function annihilateAll(pixel1, pixel2) {
    if (pixel2 && pixel2.element && !pixel2.element.startsWith("anti")) {
        var x1 = pixel1.x;
        var y1 = pixel1.y;
        var x2 = pixel2.x;
        var y2 = pixel2.y;
        
        deletePixel(x1, y1);
        deletePixel(x2, y2);
        
        if (isEmpty(x1, y1)) {
            createPixel("fire", x1, y1);
        }
        if (isEmpty(x2, y2)) {
            createPixel("fire", x2, y2);
        }
        
        for (var i = 0; i < 4; i++) {
            var angle = Math.random() * Math.PI * 2;
            var dist = 1 + Math.random() * 2;
            var spawnX = Math.round(x1 + Math.cos(angle) * dist);
            var spawnY = Math.round(y1 + Math.sin(angle) * dist);
            
            if (isEmpty(spawnX, spawnY)) {
                createPixel("fire", spawnX, spawnY);
            }
        }
    }
}

// Antimatter behavior - checks all 8 directions
var antimatterBehavior = [
    "XX AND ANN(neutron,proton,electron,fire,plasma,radiation,laser,light,ray,gamma_ray) AND ANN%0.1|DL%0.5 AND ANN(neutron,proton,electron,fire,plasma,radiation,laser,light,ray,gamma_ray) AND ANN%0.1|XX AND ANN(neutron,proton,electron,fire,plasma,radiation,laser,light,ray,gamma_ray) AND ANN%0.1",
    "DL%0.5 AND ANN(neutron,proton,electron,fire,plasma,radiation,laser,light,ray,gamma_ray) AND ANN%0.1|XX AND ANN%100|DL%0.5 AND ANN(neutron,proton,electron,fire,plasma,radiation,laser,light,ray,gamma_ray) AND ANN%0.1",
    "XX AND ANN(neutron,proton,electron,fire,plasma,radiation,laser,light,ray,gamma_ray) AND ANN%0.1|DL%0.5 AND ANN(neutron,proton,electron,fire,plasma,radiation,laser,light,ray,gamma_ray) AND ANN%0.1|XX AND ANN(neutron,proton,electron,fire,plasma,radiation,laser,light,ray,gamma_ray) AND ANN%0.1"
];

// ========== FISSION ANTIMATTER ELEMENTS ==========

// Anti-Modified-Uranium-235
elements.anti_modified_uranium_235 = {
    color: ["#1f1f1f", "#2f2f2f", "#373737"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 19100,
    temp: -20
};

// Anti-Uranium-235
elements.anti_uranium_235 = {
    color: ["#3f3f3f", "#575757", "#4a4a4a"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 19100,
    temp: -20
};

// Anti-Uranium-236
elements.anti_uranium_236 = {
    color: ["#5f5f5f", "#777777"],
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 19100,
    temp: -100
};

// Anti-Plutonium-239
elements.anti_plutonium_239 = {
    color: ["#b5b5b5", "#c5c5c5"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 19800,
    temp: -20
};

// Anti-Xenon-135
elements.anti_xenon_135 = {
    color: ["#95a532", "#be9a1e"],
    behavior: antimatterBehavior,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "gas",
    density: 5.89,
    temp: -1000
};

// Anti-Barium-141
elements.anti_barium_141 = {
    color: ["#00a9b8", "#00bbff"],
    behavior: behaviors.MOLTEN,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "liquid",
    density: 3300,
    temp: -1000,
    tempHigh: -700,
    stateHigh: "anti_barium_141_solid"
};

elements.anti_barium_141_solid = {
    color: ["#323aa3", "#2db8e4"],
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 3510,
    temp: -20,
    tempLow: -700,
    stateLow: "anti_barium_141"
};

// Anti-Moderator
elements.anti_moderator = {
    color: ["#2c2c2c", "#373737"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 1850,
    temp: -20,
    immobile: true
};

// Anti-Control-Rod
elements.anti_control_rod = {
    color: ["#d0d0d0", "#e0e0e0"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 10200,
    temp: -20,
    immobile: true,
    noMix: true
};

// Anti-Xenon-Absorber
elements.anti_xenon_absorber = {
    color: ["#b4f77d", "#95f232"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 8500,
    temp: -20,
    immobile: true
};

// Anti-Barium-Absorber
elements.anti_barium_absorber = {
    color: ["#00b6ec", "#0096b4"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 9000,
    temp: -20,
    immobile: true
};

// Anti-Hydrogen-Absorber
elements.anti_hydrogen_absorber = {
    color: ["#ff312e", "#df4f4d"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 8900,
    temp: -20,
    immobile: true
};

// Anti-Neutron-Emitter
elements.anti_neutron_emitter = {
    color: ["#0000ff", "#0010ff"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 8000,
    temp: -20,
    immobile: true
};

// Anti-Neutron-Receiver
elements.anti_neutron_receiver = {
    color: ["#00ff00", "#00ef00"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 8000,
    temp: -20,
    immobile: true
};

// Anti-Zinc-Compute-Module
elements.anti_zinc_compute_module = {
    color: ["#4a474e", "#57545b"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 7140,
    temp: -20,
    immobile: true
};

// Anti-Steam-Turbine
elements.anti_steam_turbine = {
    color: ["#8f706f", "#776688"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "solid",
    density: 7850,
    temp: -20,
    immobile: true
};

// Anti-Power
elements.anti_power = {
    color: ["#0000ff", "#ff00ff"],
    behavior: behaviors.LIQUID,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                    // Anti-power drains charge instead of adding it
                    var target = pixelMap[nx][ny];
                    if (target) {
                        target.charge = 0;
                        target.chargeCD = 0;
                    }
                }
            }
        }
    },
    category: "antimatter_fission",
    state: "liquid",
    density: 1000,
    temp: -20
};

// ========== EXISTING ANTIMATTER ELEMENTS (from v7) ==========

// Anti-Water
elements.anti_water = {
    color: ["#ff8000", "#ff9900", "#ffaa00"],
    behavior: antimatterBehavior,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_liquids",
    state: "liquid",
    density: 1000,
    temp: -20
};

// Anti-Stone
elements.anti_stone = {
    color: ["#4d4d00", "#666600", "#737300"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_land",
    state: "solid",
    density: 2500,
    temp: -20
};

// Anti-Sand
elements.anti_sand = {
    color: ["#0066cc", "#0077dd", "#0088ee"],
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_land",
    state: "solid",
    density: 1600,
    temp: -20
};

// Anti-Glass
elements.anti_glass = {
    color: ["#cc0066", "#dd0077", "#ee0088"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_solids",
    state: "solid",
    density: 2500,
    temp: -20
};

// Anti-Metal
elements.anti_metal = {
    color: ["#668800", "#779900", "#88aa00"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_solids",
    state: "solid",
    density: 7800,
    temp: -20
};

// Anti-Wood
elements.anti_wood = {
    color: ["#3300ff", "#4400ff", "#5500ff"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_land",
    state: "solid",
    density: 600,
    temp: -20
};

// Anti-Steam
elements.anti_steam = {
    color: ["#804000", "#904000", "#a04000"],
    behavior: antimatterBehavior,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_gases",
    state: "gas",
    density: 0.6,
    temp: -100
};

// Anti-Ice
elements.anti_ice = {
    color: ["#ff4000", "#ff5500", "#ff6600"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_solids",
    state: "solid",
    density: 920,
    temp: -20
};

// Anti-Fire
elements.anti_fire = {
    color: ["#00ffff", "#00eeee", "#00dddd"],
    behavior: antimatterBehavior,
    tick: function(pixel) {
        annihilateAll(pixel, pixel);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    annihilateAll(pixel, pixelMap[nx][ny]);
                }
            }
        }
    },
    category: "antimatter_energy",
    state: "gas",
    density: 0.1,
    temp: -500
};

console.log('========================================');
console.log('ANTIMATTER MOD v8 LOADED!');
console.log('Added antimatter versions of ALL fission elements:');
console.log('- Uranium variants (modified, 235, 236)');
console.log('- Plutonium-239');
console.log('- Xenon-135 & Barium-141');
console.log('- Moderator, Control Rod, Steam Turbine');
console.log('- All Absorbers (xenon, barium, hydrogen)');
console.log('- Neutron Emitter & Receiver');
console.log('- Zinc Compute Module');
console.log('- Power (drains charge instead of adding)');
console.log('========================================');
