// Functions Tab v16 - Fixed shock, sliders start at 0, nested groups, working extend

(function() {
    console.log('=== FUNCTIONS TAB v16 LOADING ===');
    
    var groups = [];
    var selectedPixels = [];
    var panel = null;
    var selectionMode = false;
    var doneButton = null;
    
    // Save/Load hooks
    setTimeout(function() {
        var saveInterval = setInterval(function() {
            if (groups.length > 0) {
                try {
                    localStorage.setItem('sandboxels_functions', JSON.stringify(groups));
                } catch (e) {}
            }
        }, 5000);
        
        try {
            var saved = localStorage.getItem('sandboxels_functions');
            if (saved) {
                groups = JSON.parse(saved);
                console.log('Loaded', groups.length, 'groups from localStorage');
            }
        } catch (e) {}
    }, 1000);
    
    setTimeout(function() {
        // Create Functions button
        var btn = document.createElement('button');
        btn.id = 'functions-btn';
        btn.textContent = 'Functions';
        btn.style.cssText = 'background: #9370DB; color: white; padding: 5px 10px; margin: 2px; border: 2px solid black; font-weight: bold; cursor: pointer; font-family: Arial;';
        
        var toolbar = document.querySelector('#toolbar');
        if (!toolbar) {
            var btns = document.querySelectorAll('button');
            if (btns.length > 0) toolbar = btns[0].parentElement;
        }
        
        if (toolbar) {
            toolbar.appendChild(btn);
        } else {
            document.body.appendChild(btn);
        }
        
        // Create "Done" button
        doneButton = document.createElement('button');
        doneButton.textContent = 'Done Selecting';
        doneButton.style.cssText = 'display: none; position: fixed; top: 10px; right: 10px; z-index: 1000000; background: #27ae60; color: white; padding: 10px 20px; border: 3px solid black; font-weight: bold; cursor: pointer; font-size: 16px; border-radius: 5px;';
        document.body.appendChild(doneButton);
        
        // Create panel
        panel = document.createElement('div');
        panel.id = 'functions-panel';
        panel.style.cssText = 'display: none; position: fixed; top: 10%; left: 50%; transform: translateX(-50%); width: 700px; max-height: 80%; background: #2c3e50; border: 3px solid black; border-radius: 10px; z-index: 999999; padding: 20px; color: white; overflow-y: auto; font-family: Arial;';
        document.body.appendChild(panel);
        
        btn.addEventListener('click', function() {
            var isVisible = panel.style.display !== 'none';
            panel.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) {
                render();
            }
        });
        
        function render() {
            panel.innerHTML = '';
            
            // Title
            var title = document.createElement('h2');
            title.textContent = 'Functions Control';
            title.style.cssText = 'margin: 0 0 20px 0; color: white;';
            panel.appendChild(title);
            
            // Close button
            var closeBtn = document.createElement('button');
            closeBtn.textContent = '✕';
            closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: #e74c3c; color: white; border: 2px solid black; padding: 5px 10px; cursor: pointer; font-weight: bold; border-radius: 3px;';
            closeBtn.onclick = function() {
                panel.style.display = 'none';
            };
            panel.appendChild(closeBtn);
            
            // Create group section
            var createDiv = document.createElement('div');
            createDiv.style.cssText = 'background: #34495e; padding: 15px; border-radius: 5px; margin-bottom: 20px;';
            
            var label = document.createElement('div');
            label.textContent = 'Create New Group:';
            label.style.cssText = 'margin-bottom: 10px; font-weight: bold;';
            createDiv.appendChild(label);
            
            var inputRow = document.createElement('div');
            inputRow.style.cssText = 'display: flex; gap: 10px;';
            
            var input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Enter group name...';
            input.style.cssText = 'flex: 1; padding: 10px; background: #2c3e50; color: white; border: 2px solid black; border-radius: 3px; font-size: 14px;';
            
            var createBtn = document.createElement('button');
            createBtn.textContent = 'Create';
            createBtn.style.cssText = 'padding: 10px 20px; background: #27ae60; color: white; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 5px; font-size: 14px;';
            
            createBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                var name = input.value.trim();
                
                if (name) {
                    groups.push({
                        name: name,
                        funcs: [],
                        subGroups: [],
                        expanded: true
                    });
                    input.value = '';
                    render();
                }
            });
            
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    createBtn.click();
                }
            });
            
            inputRow.appendChild(input);
            inputRow.appendChild(createBtn);
            createDiv.appendChild(inputRow);
            panel.appendChild(createDiv);
            
            // Groups
            groups.forEach(function(group, idx) {
                panel.appendChild(createGroup(group, idx, null, 0));
            });
        }
        
        function createGroup(group, groupIdx, parentGroup, depth) {
            var groupDiv = document.createElement('div');
            var indent = depth * 20;
            groupDiv.style.cssText = 'background: #34495e; padding: 15px; border-radius: 5px; margin-bottom: 15px; margin-left: ' + indent + 'px;';
            
            var header = document.createElement('div');
            header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;';
            
            var headerLeft = document.createElement('div');
            headerLeft.style.cssText = 'cursor: pointer; font-weight: bold; font-size: 16px; color: white;';
            var funcCount = group.funcs.length;
            var subGroupCount = (group.subGroups || []).length;
            headerLeft.textContent = (group.expanded ? '▼ ' : '▶ ') + group.name + ' (' + funcCount + ' functions, ' + subGroupCount + ' groups)';
            headerLeft.onclick = function() {
                group.expanded = !group.expanded;
                render();
            };
            
            var deleteGroupBtn = document.createElement('button');
            deleteGroupBtn.textContent = '🗑️ Delete';
            deleteGroupBtn.style.cssText = 'background: #e74c3c; color: white; padding: 5px 10px; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 3px; font-size: 12px;';
            deleteGroupBtn.onclick = function(e) {
                e.stopPropagation();
                if (confirm('Delete group "' + group.name + '"?')) {
                    if (parentGroup) {
                        parentGroup.subGroups.splice(groupIdx, 1);
                    } else {
                        groups.splice(groupIdx, 1);
                    }
                    render();
                }
            };
            
            header.appendChild(headerLeft);
            header.appendChild(deleteGroupBtn);
            groupDiv.appendChild(header);
            
            if (!group.expanded) return groupDiv;
            
            // Button row
            var btnRow = document.createElement('div');
            btnRow.style.cssText = 'display: flex; gap: 10px; margin-bottom: 10px;';
            
            var addFuncBtn = document.createElement('button');
            addFuncBtn.textContent = '+ Add Function';
            addFuncBtn.style.cssText = 'flex: 1; background: #3498db; color: white; padding: 8px 15px; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 3px;';
            addFuncBtn.onclick = function() {
                showFunctionForm(group, groupDiv);
            };
            
            var addGroupBtn = document.createElement('button');
            addGroupBtn.textContent = '+ Add Sub-Group';
            addGroupBtn.style.cssText = 'flex: 1; background: #9b59b6; color: white; padding: 8px 15px; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 3px;';
            addGroupBtn.onclick = function() {
                showSubGroupForm(group, groupDiv);
            };
            
            btnRow.appendChild(addFuncBtn);
            btnRow.appendChild(addGroupBtn);
            groupDiv.appendChild(btnRow);
            
            // Sub-groups
            if (!group.subGroups) group.subGroups = [];
            group.subGroups.forEach(function(subGroup, subIdx) {
                groupDiv.appendChild(createGroup(subGroup, subIdx, group, depth + 1));
            });
            
            // Functions
            group.funcs.forEach(function(func, funcIdx) {
                var funcDiv = document.createElement('div');
                funcDiv.style.cssText = 'background: #2c3e50; padding: 10px; border-radius: 5px; margin-bottom: 10px; border: 2px solid #1a252f;';
                
                var funcHeader = document.createElement('div');
                funcHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;';
                
                var funcInfo = document.createElement('div');
                funcInfo.style.cssText = 'font-weight: bold; color: #ecf0f1;';
                funcInfo.textContent = func.name + ' (' + func.type + ') - ' + (func.pixels ? func.pixels.length : 0) + ' pixels';
                
                var deleteFuncBtn = document.createElement('button');
                deleteFuncBtn.textContent = '🗑️';
                deleteFuncBtn.style.cssText = 'background: #e74c3c; color: white; padding: 3px 8px; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 3px; font-size: 12px;';
                deleteFuncBtn.onclick = function() {
                    if (confirm('Delete function "' + func.name + '"?')) {
                        group.funcs.splice(funcIdx, 1);
                        render();
                    }
                };
                
                funcHeader.appendChild(funcInfo);
                funcHeader.appendChild(deleteFuncBtn);
                funcDiv.appendChild(funcHeader);
                
                // Control UI
                if (func.control === 'toggle') {
                    var toggleBtn = document.createElement('button');
                    toggleBtn.textContent = func.active ? 'ON' : 'OFF';
                    toggleBtn.style.cssText = 'width: 100%; padding: 15px; border: 2px solid black; cursor: pointer; font-weight: bold; font-size: 16px; border-radius: 5px;';
                    toggleBtn.style.background = func.active ? '#27ae60' : '#e74c3c';
                    toggleBtn.style.color = 'white';
                    
                    toggleBtn.onclick = function() {
                        func.active = !func.active;
                        executeFunction(func);
                        render();
                    };
                    
                    funcDiv.appendChild(toggleBtn);
                    
                } else if (func.control === 'button') {
                    var btnContainer = document.createElement('div');
                    btnContainer.style.cssText = 'display: flex; gap: 10px; align-items: center;';
                    
                    var btn = document.createElement('button');
                    btn.textContent = 'ACTIVATE';
                    btn.style.cssText = 'flex: 1; padding: 15px; background: #3498db; color: white; border: 2px solid black; cursor: pointer; font-weight: bold; font-size: 16px; border-radius: 5px;';
                    
                    var durationInput = document.createElement('input');
                    durationInput.type = 'number';
                    durationInput.value = func.duration || 1;
                    durationInput.min = '0.1';
                    durationInput.step = '0.1';
                    durationInput.style.cssText = 'width: 60px; padding: 10px; background: #34495e; color: white; border: 2px solid black; border-radius: 3px;';
                    
                    var secLabel = document.createElement('span');
                    secLabel.textContent = 's';
                    secLabel.style.color = 'white';
                    
                    durationInput.oninput = function() {
                        func.duration = parseFloat(durationInput.value);
                    };
                    
                    btn.onclick = function() {
                        var duration = (func.duration || 1) * 1000;
                        func.active = true;
                        executeFunction(func);
                        btn.disabled = true;
                        btn.style.background = '#95a5a6';
                        
                        setTimeout(function() {
                            func.active = false;
                            executeFunction(func);
                            btn.disabled = false;
                            btn.style.background = '#3498db';
                        }, duration);
                    };
                    
                    btnContainer.appendChild(btn);
                    btnContainer.appendChild(durationInput);
                    btnContainer.appendChild(secLabel);
                    funcDiv.appendChild(btnContainer);
                    
                } else if (func.control === 'slider') {
                    var sliderContainer = document.createElement('div');
                    
                    var slider = document.createElement('input');
                    slider.type = 'range';
                    slider.min = '0';
                    slider.max = '100';
                    slider.value = func.value !== undefined ? func.value : 0;
                    slider.style.cssText = 'width: 100%; margin-bottom: 5px;';
                    
                    var valueLabel = document.createElement('div');
                    valueLabel.textContent = 'Value: ' + (func.value !== undefined ? func.value : 0);
                    valueLabel.style.cssText = 'text-align: center; color: white; font-weight: bold;';
                    
                    slider.oninput = function() {
                        func.value = parseInt(slider.value);
                        func.active = func.value > 0;
                        valueLabel.textContent = 'Value: ' + func.value;
                        executeFunction(func);
                    };
                    
                    sliderContainer.appendChild(slider);
                    sliderContainer.appendChild(valueLabel);
                    funcDiv.appendChild(sliderContainer);
                }
                
                groupDiv.appendChild(funcDiv);
            });
            
            return groupDiv;
        }
        
        function showSubGroupForm(parentGroup, groupDiv) {
            var existingForm = groupDiv.querySelector('.subgroup-form');
            if (existingForm) {
                existingForm.remove();
                return;
            }
            
            var form = document.createElement('div');
            form.className = 'subgroup-form';
            form.style.cssText = 'background: #1a252f; padding: 15px; border-radius: 5px; margin-bottom: 10px;';
            
            var input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Sub-group name...';
            input.style.cssText = 'width: 100%; padding: 10px; background: #2c3e50; color: white; border: 2px solid black; border-radius: 3px; margin-bottom: 10px;';
            
            var createBtn = document.createElement('button');
            createBtn.textContent = 'Create Sub-Group';
            createBtn.style.cssText = 'width: 100%; padding: 10px; background: #9b59b6; color: white; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 3px;';
            
            createBtn.onclick = function() {
                var name = input.value.trim();
                if (name) {
                    if (!parentGroup.subGroups) parentGroup.subGroups = [];
                    parentGroup.subGroups.push({
                        name: name,
                        funcs: [],
                        subGroups: [],
                        expanded: true
                    });
                    render();
                }
            };
            
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    createBtn.click();
                }
            });
            
            form.appendChild(input);
            form.appendChild(createBtn);
            groupDiv.appendChild(form);
        }
        
        function showFunctionForm(group, groupDiv) {
            var existingForm = groupDiv.querySelector('.func-form');
            if (existingForm) {
                existingForm.remove();
                return;
            }
            
            var form = document.createElement('div');
            form.className = 'func-form';
            form.style.cssText = 'background: #1a252f; padding: 15px; border-radius: 5px; margin-bottom: 10px; border: 2px solid #0d161f;';
            
            var selectBtn = document.createElement('button');
            selectBtn.textContent = 'Select Pixels';
            selectBtn.style.cssText = 'width: 100%; padding: 10px; background: #e67e22; color: white; border: 2px solid black; margin-bottom: 10px; cursor: pointer; font-weight: bold; border-radius: 3px;';
            
            var info = document.createElement('div');
            info.textContent = 'No pixels selected';
            info.style.cssText = 'margin-bottom: 10px; padding: 8px; background: #2c3e50; border: 2px solid black; border-radius: 3px; color: #95a5a6;';
            
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
                
                if (selectedPixels.length > 0) {
                    info.textContent = '✓ Selected ' + selectedPixels.length + ' pixel(s)';
                    info.style.color = '#27ae60';
                } else {
                    info.textContent = 'No pixels selected';
                    info.style.color = '#95a5a6';
                }
            };
            
            var canvas = document.getElementById('game');
            var clickHandler = function(e) {
                if (!selectionMode) return;
                
                var rect = canvas.getBoundingClientRect();
                var x = Math.floor((e.clientX - rect.left) / pixelSize);
                var y = Math.floor((e.clientY - rect.top) / pixelSize);
                
                if (pixelMap[x] && pixelMap[x][y]) {
                    selectedPixels.push({x: x, y: y, element: pixelMap[x][y].element});
                }
            };
            canvas.addEventListener('click', clickHandler);
            
            var nameInput = document.createElement('input');
            nameInput.placeholder = 'Function name';
            nameInput.style.cssText = 'width: 100%; padding: 10px; background: #34495e; color: white; border: 2px solid black; margin-bottom: 10px; border-radius: 3px; box-sizing: border-box;';
            
            var typeSelect = document.createElement('select');
            typeSelect.style.cssText = 'width: 100%; padding: 10px; background: #34495e; color: white; border: 2px solid black; margin-bottom: 10px; border-radius: 3px;';
            typeSelect.innerHTML = `
                <option value="passable">Toggle Passable</option>
                <option value="move_up">Move Up</option>
                <option value="move_down">Move Down</option>
                <option value="move_left">Move Left</option>
                <option value="move_right">Move Right</option>
                <option value="extend_up">Extend Up</option>
                <option value="extend_down">Extend Down</option>
                <option value="extend_left">Extend Left</option>
                <option value="extend_right">Extend Right</option>
                <option value="shock">Shock (Charge)</option>
            `;
            
            var controlLabel = document.createElement('div');
            controlLabel.textContent = 'Control Type:';
            controlLabel.style.cssText = 'margin-bottom: 5px; font-weight: bold; font-size: 13px;';
            
            var controlSelect = document.createElement('select');
            controlSelect.style.cssText = 'width: 100%; padding: 10px; background: #34495e; color: white; border: 2px solid black; margin-bottom: 10px; border-radius: 3px;';
            controlSelect.innerHTML = `
                <option value="toggle">Toggle (ON/OFF)</option>
                <option value="button">Button (Timed)</option>
                <option value="slider">Slider (Value)</option>
            `;
            
            var extendSettings = document.createElement('div');
            extendSettings.style.cssText = 'display: none; margin-bottom: 10px;';
            
            var extendLabel = document.createElement('div');
            extendLabel.textContent = 'Extension Distance (pixels):';
            extendLabel.style.cssText = 'margin-bottom: 5px; font-size: 13px; color: #3498db;';
            
            var extendInput = document.createElement('input');
            extendInput.type = 'number';
            extendInput.min = '1';
            extendInput.max = '50';
            extendInput.value = '5';
            extendInput.style.cssText = 'width: 100%; padding: 10px; background: #34495e; color: white; border: 2px solid black; border-radius: 3px; box-sizing: border-box;';
            
            extendSettings.appendChild(extendLabel);
            extendSettings.appendChild(extendInput);
            
            typeSelect.onchange = function() {
                extendSettings.style.display = typeSelect.value.startsWith('extend_') ? 'block' : 'none';
            };
            
            var createFuncBtn = document.createElement('button');
            createFuncBtn.textContent = 'Create Function';
            createFuncBtn.style.cssText = 'width: 100%; padding: 12px; background: #27ae60; color: white; border: 2px solid black; cursor: pointer; font-weight: bold; margin-top: 10px; border-radius: 5px; font-size: 14px;';
            
            createFuncBtn.onclick = function() {
                if (selectedPixels.length === 0) {
                    alert('Please select at least one pixel!');
                    return;
                }
                
                if (!nameInput.value) {
                    alert('Please enter a function name!');
                    return;
                }
                
                group.funcs.push({
                    name: nameInput.value,
                    type: typeSelect.value,
                    control: controlSelect.value,
                    pixels: JSON.parse(JSON.stringify(selectedPixels)),
                    active: false,
                    value: 0,
                    extendDistance: parseInt(extendInput.value) || 5,
                    extensions: []
                });
                
                selectedPixels = [];
                render();
            };
            
            form.appendChild(selectBtn);
            form.appendChild(info);
            form.appendChild(nameInput);
            form.appendChild(typeSelect);
            form.appendChild(extendSettings);
            form.appendChild(controlLabel);
            form.appendChild(controlSelect);
            form.appendChild(createFuncBtn);
            
            groupDiv.appendChild(form);
        }
        
        function executeFunction(func) {
            if (!func.pixels || func.pixels.length === 0) return;
            
            func.pixels.forEach(function(pixelData) {
                var pixel = pixelMap[pixelData.x] && pixelMap[pixelData.x][pixelData.y];
                if (!pixel) return;
                
                if (func.type === 'passable') {
                    pixel.passable = func.active;
                    
                } else if (func.type === 'shock') {
                    // FIXED: Only shock when active
                    if (func.active) {
                        pixel.charge = 100;
                        pixel.chargeCD = 10;
                    } else {
                        // Turn off shock
                        pixel.charge = 0;
                        pixel.chargeCD = 0;
                    }
                    
                } else if (func.type.startsWith('move_')) {
                    if (!func.active) return;
                    
                    var dir = func.type.split('_')[1];
                    var dx = 0, dy = 0;
                    
                    if (dir === 'up') dy = -1;
                    if (dir === 'down') dy = 1;
                    if (dir === 'left') dx = -1;
                    if (dir === 'right') dx = 1;
                    
                    var newX = pixel.x + dx;
                    var newY = pixel.y + dy;
                    
                    if (isEmpty(newX, newY)) {
                        movePixel(pixel, newX, newY);
                        pixelData.x = newX;
                        pixelData.y = newY;
                    }
                    
                } else if (func.type.startsWith('extend_')) {
                    var dir = func.type.split('_')[1];
                    var dx = 0, dy = 0;
                    
                    if (dir === 'up') dy = -1;
                    if (dir === 'down') dy = 1;
                    if (dir === 'left') dx = -1;
                    if (dir === 'right') dx = 1;
                    
                    // FIXED: Clear extensions every time
                    if (!func.extensions) func.extensions = [];
                    
                    // Delete old extensions
                    for (var i = func.extensions.length - 1; i >= 0; i--) {
                        var ext = func.extensions[i];
                        if (pixelMap[ext.x] && pixelMap[ext.x][ext.y]) {
                            deletePixel(ext.x, ext.y);
                        }
                    }
                    func.extensions = [];
                    
                    if (func.active) {
                        // Calculate distance based on control type
                        var distance = func.extendDistance || 5;
                        
                        if (func.control === 'slider') {
                            // Slider 0-100 maps to 0-extendDistance
                            distance = Math.floor((func.extendDistance || 5) * (func.value / 100));
                        }
                        
                        // Create extensions
                        for (var i = 1; i <= distance; i++) {
                            var extX = pixel.x + (dx * i);
                            var extY = pixel.y + (dy * i);
                            
                            if (isEmpty(extX, extY)) {
                                var extName = pixel.element + '_extension';
                                if (!elements[extName]) {
                                    elements[extName] = {
                                        color: elements[pixel.element].color,
                                        behavior: behaviors.WALL,
                                        category: elements[pixel.element].category,
                                        state: 'solid',
                                        density: elements[pixel.element].density || 1000,
                                        temp: 20
                                    };
                                }
                                createPixel(extName, extX, extY);
                                func.extensions.push({x: extX, y: extY});
                            }
                        }
                    }
                }
            });
        }
        
        console.log('=== FUNCTIONS TAB v16 LOADED ===');
        console.log('Features: Fixed shock stop, sliders start at 0, nested groups, working extend');
    }, 500);
})();
