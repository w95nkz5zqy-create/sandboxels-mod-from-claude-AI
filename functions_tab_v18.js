// Functions Tab v17 - WORKING VERSION

console.log('Functions Tab v17 - Starting load...');

setTimeout(function() {
    try {
        console.log('Functions Tab v17 - Initializing...');
        
        var groups = [];
        var selectedPixels = [];
        var panel = null;
        var selectionMode = false;
        var doneButton = null;
        
        // Load saved functions
        try {
            var saved = localStorage.getItem('sandboxels_functions');
            if (saved) {
                groups = JSON.parse(saved);
                console.log('Loaded', groups.length, 'groups');
            }
        } catch (e) {
            console.error('Load error:', e);
        }
        
        // Auto-save
        setInterval(function() {
            if (groups.length > 0) {
                try {
                    localStorage.setItem('sandboxels_functions', JSON.stringify(groups));
                } catch (e) {}
            }
        }, 5000);
        
        // Create button
        var btn = document.createElement('button');
        btn.textContent = 'Functions';
        btn.style.cssText = 'background: #9370DB; color: white; padding: 5px 10px; margin: 2px; border: 2px solid black; font-weight: bold; cursor: pointer;';
        
        var toolbar = document.querySelector('#toolbar');
        if (!toolbar) {
            var btns = document.querySelectorAll('button');
            if (btns.length > 0) toolbar = btns[0].parentElement;
        }
        
        if (toolbar) {
            toolbar.appendChild(btn);
            console.log('Button added');
        } else {
            document.body.appendChild(btn);
        }
        
        // Done button
        doneButton = document.createElement('button');
        doneButton.textContent = 'Done Selecting';
        doneButton.style.cssText = 'display: none; position: fixed; top: 10px; right: 10px; z-index: 1000000; background: #27ae60; color: white; padding: 10px 20px; border: 3px solid black; font-weight: bold; cursor: pointer; font-size: 16px; border-radius: 5px;';
        document.body.appendChild(doneButton);
        
        // Panel
        panel = document.createElement('div');
        panel.style.cssText = 'display: none; position: fixed; top: 10%; left: 50%; transform: translateX(-50%); width: 700px; max-height: 80%; background: #2c3e50; border: 3px solid black; border-radius: 10px; z-index: 999999; padding: 20px; color: white; overflow-y: auto;';
        document.body.appendChild(panel);
        
        btn.onclick = function() {
            var isVisible = panel.style.display !== 'none';
            panel.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) render();
        };
        
        function render() {
            try {
                panel.innerHTML = '';
                
                var title = document.createElement('h2');
                title.textContent = 'Functions Control';
                title.style.margin = '0 0 20px 0';
                panel.appendChild(title);
                
                var closeBtn = document.createElement('button');
                closeBtn.textContent = 'X';
                closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: #e74c3c; color: white; border: none; padding: 5px 10px; cursor: pointer;';
                closeBtn.onclick = function() { panel.style.display = 'none'; };
                panel.appendChild(closeBtn);
                
                // Create group
                var createDiv = document.createElement('div');
                createDiv.style.cssText = 'background: #34495e; padding: 15px; border-radius: 5px; margin-bottom: 20px;';
                
                var input = document.createElement('input');
                input.placeholder = 'Group name...';
                input.style.cssText = 'padding: 10px; background: #2c3e50; color: white; border: 2px solid black; margin-right: 10px;';
                
                var createBtn = document.createElement('button');
                createBtn.textContent = 'Create Group';
                createBtn.style.cssText = 'padding: 10px 20px; background: #27ae60; color: white; border: none; cursor: pointer;';
                createBtn.onclick = function() {
                    if (input.value.trim()) {
                        groups.push({
                            name: input.value.trim(),
                            funcs: [],
                            subGroups: [],
                            expanded: true
                        });
                        input.value = '';
                        render();
                    }
                };
                
                createDiv.appendChild(input);
                createDiv.appendChild(createBtn);
                panel.appendChild(createDiv);
                
                // Render groups
                groups.forEach(function(g, i) {
                    panel.appendChild(makeGroup(g, i, null, 0));
                });
                
            } catch (e) {
                console.error('Render error:', e);
            }
        }
        
        function makeGroup(group, idx, parent, depth) {
            var div = document.createElement('div');
            div.style.cssText = 'background: #34495e; padding: 15px; margin-bottom: 15px; margin-left: ' + (depth * 20) + 'px; border-radius: 5px;';
            
            var header = document.createElement('div');
            header.style.cssText = 'display: flex; justify-content: space-between; margin-bottom: 10px;';
            
            var title = document.createElement('div');
            title.textContent = (group.expanded ? '▼ ' : '▶ ') + group.name;
            title.style.cssText = 'cursor: pointer; font-weight: bold;';
            title.onclick = function() {
                group.expanded = !group.expanded;
                render();
            };
            
            var delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.style.cssText = 'background: #e74c3c; color: white; border: none; padding: 5px 10px; cursor: pointer;';
            delBtn.onclick = function() {
                if (confirm('Delete ' + group.name + '?')) {
                    if (parent) {
                        parent.subGroups.splice(idx, 1);
                    } else {
                        groups.splice(idx, 1);
                    }
                    render();
                }
            };
            
            header.appendChild(title);
            header.appendChild(delBtn);
            div.appendChild(header);
            
            if (!group.expanded) return div;
            
            // Buttons
            var addFunc = document.createElement('button');
            addFunc.textContent = '+ Function';
            addFunc.style.cssText = 'background: #3498db; color: white; border: none; padding: 8px; cursor: pointer; margin-right: 10px;';
            addFunc.onclick = function() { showFuncForm(group, div); };
            
            var addSub = document.createElement('button');
            addSub.textContent = '+ Sub-Group';
            addSub.style.cssText = 'background: #9b59b6; color: white; border: none; padding: 8px; cursor: pointer;';
            addSub.onclick = function() { showSubForm(group, div); };
            
            div.appendChild(addFunc);
            div.appendChild(addSub);
            
            // Sub-groups
            if (group.subGroups) {
                group.subGroups.forEach(function(sg, si) {
                    div.appendChild(makeGroup(sg, si, group, depth + 1));
                });
            }
            
            // Functions
            if (group.funcs) {
                group.funcs.forEach(function(f, fi) {
                    div.appendChild(makeFunc(f, fi, group));
                });
            }
            
            return div;
        }
        
        function makeFunc(func, idx, group) {
            var div = document.createElement('div');
            div.style.cssText = 'background: #2c3e50; padding: 10px; margin-top: 10px; border-radius: 5px;';
            
            var header = document.createElement('div');
            header.style.cssText = 'display: flex; justify-content: space-between; margin-bottom: 10px;';
            
            var title = document.createElement('div');
            title.textContent = func.name + ' (' + func.type + ')';
            
            var delBtn = document.createElement('button');
            delBtn.textContent = 'X';
            delBtn.style.cssText = 'background: #e74c3c; color: white; border: none; padding: 3px 8px; cursor: pointer;';
            delBtn.onclick = function() {
                group.funcs.splice(idx, 1);
                render();
            };
            
            header.appendChild(title);
            header.appendChild(delBtn);
            div.appendChild(header);
            
            // Controls
            if (func.control === 'toggle') {
                var btn = document.createElement('button');
                btn.textContent = func.active ? 'ON' : 'OFF';
                btn.style.cssText = 'width: 100%; padding: 15px; background: ' + (func.active ? '#27ae60' : '#e74c3c') + '; color: white; border: none; cursor: pointer; font-weight: bold;';
                btn.onclick = function() {
                    func.active = !func.active;
                    exec(func);
                    render();
                };
                div.appendChild(btn);
                
            } else if (func.control === 'button') {
                var btn = document.createElement('button');
                btn.textContent = 'ACTIVATE';
                btn.style.cssText = 'width: 100%; padding: 15px; background: #3498db; color: white; border: none; cursor: pointer; font-weight: bold;';
                btn.onclick = function() {
                    func.active = true;
                    exec(func);
                    btn.disabled = true;
                    setTimeout(function() {
                        func.active = false;
                        exec(func);
                        btn.disabled = false;
                    }, (func.duration || 1) * 1000);
                };
                div.appendChild(btn);
                
            } else if (func.control === 'slider') {
                var slider = document.createElement('input');
                slider.type = 'range';
                slider.min = 0;
                slider.max = 100;
                slider.value = func.value || 0;
                slider.style.width = '100%';
                
                var label = document.createElement('div');
                label.textContent = 'Value: ' + (func.value || 0);
                label.style.textAlign = 'center';
                
                slider.oninput = function() {
                    func.value = parseInt(slider.value);
                    func.active = func.value > 0;
                    label.textContent = 'Value: ' + func.value;
                    exec(func);
                };
                
                div.appendChild(slider);
                div.appendChild(label);
            }
            
            return div;
        }
        
        function showSubForm(parent, parentDiv) {
            var input = document.createElement('input');
            input.placeholder = 'Sub-group name...';
            input.style.cssText = 'padding: 10px; background: #2c3e50; color: white; border: 2px solid black; margin: 10px 0;';
            
            var btn = document.createElement('button');
            btn.textContent = 'Create';
            btn.style.cssText = 'padding: 10px; background: #9b59b6; color: white; border: none; cursor: pointer;';
            btn.onclick = function() {
                if (input.value.trim()) {
                    if (!parent.subGroups) parent.subGroups = [];
                    parent.subGroups.push({
                        name: input.value.trim(),
                        funcs: [],
                        subGroups: [],
                        expanded: true
                    });
                    render();
                }
            };
            
            parentDiv.appendChild(input);
            parentDiv.appendChild(btn);
        }
        
        function showFuncForm(group, groupDiv) {
            var form = document.createElement('div');
            form.style.cssText = 'background: #1a252f; padding: 15px; margin-top: 10px; border-radius: 5px;';
            
            var selectBtn = document.createElement('button');
            selectBtn.textContent = 'Select Pixels';
            selectBtn.style.cssText = 'width: 100%; padding: 10px; background: #e67e22; color: white; border: none; cursor: pointer; margin-bottom: 10px;';
            
            var info = document.createElement('div');
            info.textContent = 'No pixels selected';
            info.style.cssText = 'padding: 8px; background: #2c3e50; margin-bottom: 10px;';
            
            selectBtn.onclick = function() {
                selectedPixels = [];
                selectionMode = true;
                panel.style.display = 'none';
                doneButton.style.display = 'block';
            };
            
            doneButton.onclick = function() {
                selectionMode = false;
                doneButton.style.display = 'none';
                panel.style.display = 'block';
                info.textContent = selectedPixels.length + ' pixel(s) selected';
            };
            
            var canvas = document.getElementById('game');
            canvas.addEventListener('click', function(e) {
                if (!selectionMode) return;
                var rect = canvas.getBoundingClientRect();
                var x = Math.floor((e.clientX - rect.left) / pixelSize);
                var y = Math.floor((e.clientY - rect.top) / pixelSize);
                if (pixelMap[x] && pixelMap[x][y]) {
                    selectedPixels.push({x: x, y: y, element: pixelMap[x][y].element});
                }
            });
            
            var nameInput = document.createElement('input');
            nameInput.placeholder = 'Function name';
            nameInput.style.cssText = 'width: 100%; padding: 10px; background: #34495e; color: white; border: none; margin-bottom: 10px;';
            
            var typeSelect = document.createElement('select');
            typeSelect.style.cssText = 'width: 100%; padding: 10px; background: #34495e; color: white; border: none; margin-bottom: 10px;';
            typeSelect.innerHTML = '<option value="passable">Passable</option><option value="shock">Shock</option><option value="extend_up">Extend Up</option><option value="extend_down">Extend Down</option><option value="extend_left">Extend Left</option><option value="extend_right">Extend Right</option>';
            
            var controlSelect = document.createElement('select');
            controlSelect.style.cssText = 'width: 100%; padding: 10px; background: #34495e; color: white; border: none; margin-bottom: 10px;';
            controlSelect.innerHTML = '<option value="toggle">Toggle</option><option value="button">Button</option><option value="slider">Slider</option>';
            
            var createBtn = document.createElement('button');
            createBtn.textContent = 'Create Function';
            createBtn.style.cssText = 'width: 100%; padding: 12px; background: #27ae60; color: white; border: none; cursor: pointer; font-weight: bold;';
            createBtn.onclick = function() {
                if (selectedPixels.length === 0 || !nameInput.value) {
                    alert('Need pixels and name!');
                    return;
                }
                
                group.funcs.push({
                    name: nameInput.value,
                    type: typeSelect.value,
                    control: controlSelect.value,
                    pixels: JSON.parse(JSON.stringify(selectedPixels)),
                    active: false,
                    value: 0,
                    extensions: []
                });
                
                selectedPixels = [];
                render();
            };
            
            form.appendChild(selectBtn);
            form.appendChild(info);
            form.appendChild(nameInput);
            form.appendChild(typeSelect);
            form.appendChild(controlSelect);
            form.appendChild(createBtn);
            
            groupDiv.appendChild(form);
        }
        
        function exec(func) {
            if (!func.pixels) return;
            
            func.pixels.forEach(function(pd) {
                var p = pixelMap[pd.x] && pixelMap[pd.x][pd.y];
                if (!p) return;
                
                if (func.type === 'passable') {
                    p.passable = func.active;
                    
                } else if (func.type === 'shock') {
                    if (func.active) {
                        p.charge = 100;
                        p.chargeCD = 10;
                    } else {
                        p.charge = 0;
                        p.chargeCD = 0;
                    }
                    
                } else if (func.type.startsWith('extend_')) {
                    var dir = func.type.split('_')[1];
                    var dx = 0, dy = 0;
                    if (dir === 'up') dy = -1;
                    if (dir === 'down') dy = 1;
                    if (dir === 'left') dx = -1;
                    if (dir === 'right') dx = 1;
                    
                    // Initialize extensions array if needed
                    if (!func.extensions) func.extensions = [];
                    
                    // ALWAYS clear old extensions first
                    var oldExtensions = func.extensions.slice(); // Copy array
                    func.extensions = [];
                    
                    oldExtensions.forEach(function(e) {
                        if (pixelMap[e.x] && pixelMap[e.x][e.y]) {
                            var elem = pixelMap[e.x][e.y].element;
                            // Only delete if it's an extension element
                            if (elem && elem.endsWith('_ext')) {
                                deletePixel(e.x, e.y);
                            }
                        }
                    });
                    
                    if (func.active && func.value > 0) {
                        // Calculate distance based on slider value (0-100 maps to 0-10 pixels)
                        var maxDist = 10;
                        var dist = func.control === 'slider' ? Math.floor(maxDist * (func.value / 100)) : 5;
                        
                        console.log('Extending:', dist, 'pixels in direction:', dir);
                        
                        for (var i = 1; i <= dist; i++) {
                            var ex = p.x + (dx * i);
                            var ey = p.y + (dy * i);
                            
                            console.log('Trying to create extension at:', ex, ey, 'isEmpty:', isEmpty(ex, ey));
                            
                            if (isEmpty(ex, ey)) {
                                var extName = p.element + '_ext';
                                
                                // Create extension element type if doesn't exist
                                if (!elements[extName]) {
                                    console.log('Creating new extension element:', extName);
                                    elements[extName] = {
                                        color: elements[p.element].color || '#888888',
                                        behavior: behaviors.WALL,
                                        category: 'special',
                                        state: 'solid',
                                        density: elements[p.element].density || 1000,
                                        temp: 20
                                    };
                                }
                                
                                createPixel(extName, ex, ey);
                                func.extensions.push({x: ex, y: ey});
                                console.log('Created extension at:', ex, ey);
                            } else {
                                console.log('Position blocked at:', ex, ey);
                            }
                        }
                        
                        console.log('Total extensions created:', func.extensions.length);
                    }
                }
            });
        }
        
        console.log('Functions Tab v17 LOADED!');
        
    } catch (e) {
        console.error('Functions Tab v17 ERROR:', e);
    }
}, 1000);
