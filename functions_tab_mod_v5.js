// Functions Tab Mod v4 for Sandboxels
// Fixed version with full UI

(function() {
    'use strict';
    
    var selectedPixels = [];
    var functionGroups = [];
    var deleteMode = false;
    
    function waitForSandboxels() {
        if (typeof elements === 'undefined' || typeof pixelMap === 'undefined') {
            setTimeout(waitForSandboxels, 100);
            return;
        }
        init();
    }
    
    function init() {
        console.log('Functions Tab v4 initializing...');
        
        // Create Functions button
        var functionsBtn = document.createElement('button');
        functionsBtn.id = 'functions-tab-btn';
        functionsBtn.textContent = 'Functions';
        functionsBtn.className = 'toolButton';
        functionsBtn.style.cssText = 'background-color: #9370DB; color: white; padding: 5px 10px; margin: 2px; border: 2px solid #000; font-weight: bold; cursor: pointer; font-family: Arial, sans-serif;';
        
        // Find toolbar
        var toolbar = document.querySelector('#toolbar');
        if (!toolbar) {
            // Try finding by class
            var existingButtons = document.querySelectorAll('button');
            for (var i = 0; i < existingButtons.length; i++) {
                if (existingButtons[i].textContent === 'Heat' || existingButtons[i].textContent === 'Cool') {
                    toolbar = existingButtons[i].parentElement;
                    break;
                }
            }
        }
        
        if (toolbar) {
            toolbar.appendChild(functionsBtn);
            console.log('Functions button added to toolbar');
        } else {
            console.error('Could not find toolbar!');
            document.body.appendChild(functionsBtn);
        }
        
        // Main panel
        var panel = document.createElement('div');
        panel.id = 'functions-panel';
        panel.style.cssText = `
            display: none;
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            width: 800px;
            max-height: 80%;
            background: #2c3e50;
            border: 3px solid #000;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.8);
            z-index: 999999;
            overflow: hidden;
            font-family: Arial, sans-serif;
        `;
        
        // Header
        var header = document.createElement('div');
        header.style.cssText = `
            background: #1a252f;
            padding: 12px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #000;
        `;
        
        var title = document.createElement('div');
        title.textContent = 'Functions Control Panel';
        title.style.cssText = 'color: #fff; font-size: 18px; font-weight: bold;';
        
        var headerButtons = document.createElement('div');
        headerButtons.style.cssText = 'display: flex; gap: 8px;';
        
        var addGroupBtn = document.createElement('button');
        addGroupBtn.innerHTML = '+ Group';
        addGroupBtn.style.cssText = `
            background: #27ae60;
            color: white;
            border: 2px solid #000;
            padding: 6px 12px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = 'X';
        closeBtn.style.cssText = `
            background: #e74c3c;
            color: white;
            border: 2px solid #000;
            padding: 6px 12px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        headerButtons.appendChild(addGroupBtn);
        headerButtons.appendChild(closeBtn);
        header.appendChild(title);
        header.appendChild(headerButtons);
        
        // Selection bar
        var selectionBar = document.createElement('div');
        selectionBar.style.cssText = `
            background: rgba(0,0,0,0.3);
            padding: 10px;
            border-bottom: 2px solid #000;
        `;
        
        var selectBtn = document.createElement('button');
        selectBtn.textContent = 'Click Canvas to Select Pixel';
        selectBtn.style.cssText = `
            background: #e67e22;
            color: white;
            border: 2px solid #000;
            padding: 8px 16px;
            font-size: 13px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
            margin-right: 10px;
        `;
        
        var selectedInfo = document.createElement('span');
        selectedInfo.id = 'selected-info';
        selectedInfo.style.cssText = 'color: white; font-weight: bold;';
        selectedInfo.textContent = 'No pixel selected';
        
        selectionBar.appendChild(selectBtn);
        selectionBar.appendChild(selectedInfo);
        
        // Content
        var content = document.createElement('div');
        content.id = 'functions-content';
        content.style.cssText = `
            padding: 15px;
            max-height: 500px;
            overflow-y: auto;
            background: #34495e;
        `;
        
        panel.appendChild(header);
        panel.appendChild(selectionBar);
        panel.appendChild(content);
        document.body.appendChild(panel);
        
        // Selection mode
        var selectionMode = false;
        
        selectBtn.onclick = function() {
            selectionMode = !selectionMode;
            selectBtn.style.background = selectionMode ? '#d35400' : '#e67e22';
            selectBtn.textContent = selectionMode ? 'Selection Mode: ON (click canvas)' : 'Click Canvas to Select Pixel';
        };
        
        // Canvas click
        var canvas = document.getElementById('game');
        if (canvas) {
            canvas.addEventListener('click', function(e) {
                if (selectionMode && panel.style.display === 'block') {
                    var rect = canvas.getBoundingClientRect();
                    var x = Math.floor((e.clientX - rect.left) / pixelSize);
                    var y = Math.floor((e.clientY - rect.top) / pixelSize);
                    
                    if (pixelMap[x] && pixelMap[x][y]) {
                        selectedPixels = [{x: x, y: y, element: pixelMap[x][y].element}];
                        selectedInfo.textContent = 'Selected: ' + pixelMap[x][y].element + ' at (' + x + ', ' + y + ')';
                        selectionMode = false;
                        selectBtn.style.background = '#e67e22';
                        selectBtn.textContent = 'Click Canvas to Select Pixel';
                    }
                }
            });
        }
        
        // Toggle panel
        functionsBtn.onclick = function() {
            var isVisible = panel.style.display !== 'none';
            panel.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) {
                renderContent();
            }
        };
        
        closeBtn.onclick = function() {
            panel.style.display = 'none';
        };
        
        // Add group
        addGroupBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            var groupName = window.prompt('Function Group Name:');
            if (groupName && groupName.trim()) {
                functionGroups.push({
                    name: groupName.trim(),
                    collapsed: false,
                    functions: []
                });
                renderContent();
            }
        };
        
        // Render content
        function renderContent() {
            content.innerHTML = '';
            
            if (functionGroups.length === 0) {
                var msg = document.createElement('div');
                msg.textContent = 'No function groups. Click "+ Group" to create one.';
                msg.style.cssText = 'color: #95a5a6; text-align: center; padding: 40px;';
                content.appendChild(msg);
                return;
            }
            
            functionGroups.forEach(function(group, index) {
                content.appendChild(createGroupElement(group, index));
            });
        }
        
        // Create group element
        function createGroupElement(group, groupIndex) {
            var groupDiv = document.createElement('div');
            groupDiv.style.cssText = `
                margin: 10px 0;
                padding: 12px;
                background: rgba(52, 73, 94, 0.8);
                border: 2px solid #000;
                border-radius: 8px;
            `;
            
            // Header
            var groupHeader = document.createElement('div');
            groupHeader.style.cssText = 'display: flex; align-items: center; gap: 10px; margin-bottom: 10px;';
            
            var collapseBtn = document.createElement('button');
            collapseBtn.textContent = group.collapsed ? '▶' : '▼';
            collapseBtn.style.cssText = 'background: #34495e; color: white; border: 2px solid #000; padding: 4px 10px; cursor: pointer; border-radius: 3px;';
            collapseBtn.onclick = function() {
                group.collapsed = !group.collapsed;
                renderContent();
            };
            
            var groupName = document.createElement('div');
            groupName.textContent = group.name;
            groupName.style.cssText = 'flex: 1; color: white; font-weight: bold; font-size: 16px;';
            
            var addFuncBtn = document.createElement('button');
            addFuncBtn.textContent = '+ Function';
            addFuncBtn.style.cssText = 'background: #3498db; color: white; border: 2px solid #000; padding: 6px 12px; cursor: pointer; border-radius: 5px; font-weight: bold;';
            addFuncBtn.onclick = function() {
                if (selectedPixels.length === 0) {
                    alert('Please select a pixel first!');
                    return;
                }
                showFunctionForm(group, groupDiv);
            };
            
            groupHeader.appendChild(collapseBtn);
            groupHeader.appendChild(groupName);
            groupHeader.appendChild(addFuncBtn);
            groupDiv.appendChild(groupHeader);
            
            // Functions
            if (!group.collapsed) {
                group.functions.forEach(function(func) {
                    groupDiv.appendChild(createFunctionElement(func));
                });
            }
            
            return groupDiv;
        }
        
        // Show function creation form
        function showFunctionForm(group, groupDiv) {
            // Check if form already exists
            var existingForm = groupDiv.querySelector('.function-form');
            if (existingForm) {
                existingForm.remove();
                return;
            }
            
            var form = document.createElement('div');
            form.className = 'function-form';
            form.style.cssText = `
                margin: 10px 0;
                padding: 12px;
                background: #2c3e50;
                border: 2px solid #3498db;
                border-radius: 5px;
            `;
            
            // Select pixel button for this function
            var funcSelectBtn = document.createElement('button');
            funcSelectBtn.textContent = '🖱️ Select Pixel for this Function';
            funcSelectBtn.style.cssText = `
                width: 100%;
                padding: 8px;
                margin-bottom: 10px;
                background: #e67e22;
                color: white;
                border: 2px solid #000;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            `;
            
            var funcSelectedInfo = document.createElement('div');
            funcSelectedInfo.style.cssText = 'color: #3498db; margin-bottom: 10px; font-weight: bold; font-size: 12px;';
            funcSelectedInfo.textContent = selectedPixels.length > 0 ? 
                'Selected: ' + selectedPixels[0].element + ' at (' + selectedPixels[0].x + ', ' + selectedPixels[0].y + ')' : 
                'Click button above, then click a pixel on canvas';
            
            var funcSelectionMode = false;
            
            funcSelectBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                funcSelectionMode = !funcSelectionMode;
                funcSelectBtn.style.background = funcSelectionMode ? '#d35400' : '#e67e22';
                funcSelectBtn.textContent = funcSelectionMode ? '🖱️ Click canvas now...' : '🖱️ Select Pixel for this Function';
                
                if (funcSelectionMode) {
                    var tempClickHandler = function(clickEvent) {
                        var rect = canvas.getBoundingClientRect();
                        var x = Math.floor((clickEvent.clientX - rect.left) / pixelSize);
                        var y = Math.floor((clickEvent.clientY - rect.top) / pixelSize);
                        
                        if (pixelMap[x] && pixelMap[x][y]) {
                            selectedPixels = [{x: x, y: y, element: pixelMap[x][y].element}];
                            funcSelectedInfo.textContent = 'Selected: ' + pixelMap[x][y].element + ' at (' + x + ', ' + y + ')';
                            funcSelectionMode = false;
                            funcSelectBtn.style.background = '#e67e22';
                            funcSelectBtn.textContent = '🖱️ Select Pixel for this Function';
                            canvas.removeEventListener('click', tempClickHandler);
                        }
                    };
                    canvas.addEventListener('click', tempClickHandler);
                }
            };
            
            // Name
            var nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'Function Name';
            nameInput.style.cssText = 'width: 100%; padding: 8px; margin-bottom: 10px; background: #34495e; color: white; border: 2px solid #000; border-radius: 3px;';
            
            // Type
            var typeSelect = document.createElement('select');
            typeSelect.style.cssText = 'width: 100%; padding: 8px; margin-bottom: 10px; background: #34495e; color: white; border: 2px solid #000; border-radius: 3px;';
            typeSelect.innerHTML = `
                <option value="">-- Select Function Type --</option>
                <option value="move_up">Move Up</option>
                <option value="move_down">Move Down</option>
                <option value="move_left">Move Left</option>
                <option value="move_right">Move Right</option>
                <option value="extend_up">Extend Up</option>
                <option value="extend_down">Extend Down</option>
                <option value="extend_left">Extend Left</option>
                <option value="extend_right">Extend Right</option>
                <option value="contract_up">Contract Up</option>
                <option value="contract_down">Contract Down</option>
                <option value="contract_left">Contract Left</option>
                <option value="contract_right">Contract Right</option>
                <option value="passable">Toggle Passable</option>
                <option value="conductive">Toggle Conductive</option>
                <option value="temperature">Set Temperature</option>
            `;
            
            // Control
            var controlSelect = document.createElement('select');
            controlSelect.style.cssText = 'width: 100%; padding: 8px; margin-bottom: 10px; background: #34495e; color: white; border: 2px solid #000; border-radius: 3px;';
            controlSelect.innerHTML = `
                <option value="">-- Select Control Type --</option>
                <option value="toggle">Toggle (ON/OFF)</option>
                <option value="button">Button (Timed)</option>
                <option value="slider">Slider (0-100)</option>
            `;
            
            // Buttons
            var btnRow = document.createElement('div');
            btnRow.style.cssText = 'display: flex; gap: 8px;';
            
            var saveBtn = document.createElement('button');
            saveBtn.textContent = 'Create Function';
            saveBtn.style.cssText = 'flex: 1; padding: 10px; background: #27ae60; color: white; border: 2px solid #000; border-radius: 5px; cursor: pointer; font-weight: bold;';
            saveBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (!nameInput.value || !typeSelect.value || !controlSelect.value) {
                    alert('Please fill in all fields!');
                    return;
                }
                
                if (selectedPixels.length === 0) {
                    alert('Please select a pixel first!');
                    return;
                }
                
                group.functions.push({
                    name: nameInput.value,
                    type: typeSelect.value,
                    control: controlSelect.value,
                    pixels: JSON.parse(JSON.stringify(selectedPixels)),
                    active: false,
                    value: 50,
                    extensions: []
                });
                
                renderContent();
            };
            
            var cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.style.cssText = 'padding: 10px 20px; background: #95a5a6; color: white; border: 2px solid #000; border-radius: 5px; cursor: pointer; font-weight: bold;';
            cancelBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                form.remove();
            };
            
            btnRow.appendChild(saveBtn);
            btnRow.appendChild(cancelBtn);
            
            form.appendChild(funcSelectBtn);
            form.appendChild(funcSelectedInfo);
            form.appendChild(nameInput);
            form.appendChild(typeSelect);
            form.appendChild(controlSelect);
            form.appendChild(btnRow);
            
            groupDiv.appendChild(form);
        }
        
        // Create function element
        function createFunctionElement(func) {
            var div = document.createElement('div');
            div.style.cssText = `
                margin: 8px 0;
                padding: 10px;
                background: rgba(44, 62, 80, 0.9);
                border: 2px solid #000;
                border-radius: 5px;
            `;
            
            var nameDiv = document.createElement('div');
            nameDiv.textContent = func.name + ' (' + func.type.replace(/_/g, ' ') + ')';
            nameDiv.style.cssText = 'color: white; font-weight: bold; margin-bottom: 8px;';
            
            var controlDiv = document.createElement('div');
            
            if (func.control === 'toggle') {
                var btn = document.createElement('button');
                btn.textContent = func.active ? 'ON' : 'OFF';
                btn.style.cssText = 'width: 100%; padding: 10px; background: ' + (func.active ? '#27ae60' : '#e74c3c') + '; color: white; border: 2px solid #000; border-radius: 5px; cursor: pointer; font-weight: bold;';
                btn.onclick = function() {
                    func.active = !func.active;
                    executeFunction(func);
                    renderContent();
                };
                controlDiv.appendChild(btn);
                
            } else if (func.control === 'button') {
                var btn = document.createElement('button');
                btn.textContent = 'ACTIVATE';
                btn.style.cssText = 'width: 100%; padding: 10px; background: #3498db; color: white; border: 2px solid #000; border-radius: 5px; cursor: pointer; font-weight: bold;';
                btn.onclick = function() {
                    func.active = true;
                    executeFunction(func);
                    setTimeout(function() {
                        func.active = false;
                        executeFunction(func);
                    }, 1000);
                };
                controlDiv.appendChild(btn);
                
            } else if (func.control === 'slider') {
                var slider = document.createElement('input');
                slider.type = 'range';
                slider.min = '0';
                slider.max = '100';
                slider.value = func.value;
                slider.style.cssText = 'width: 100%;';
                
                var valueLabel = document.createElement('div');
                valueLabel.textContent = 'Value: ' + func.value;
                valueLabel.style.cssText = 'color: white; text-align: center; margin-top: 5px;';
                
                slider.oninput = function() {
                    func.value = parseInt(slider.value);
                    valueLabel.textContent = 'Value: ' + func.value;
                    func.active = true;
                    executeFunction(func);
                };
                
                controlDiv.appendChild(slider);
                controlDiv.appendChild(valueLabel);
            }
            
            div.appendChild(nameDiv);
            div.appendChild(controlDiv);
            return div;
        }
        
        // Execute function
        function executeFunction(func) {
            func.pixels.forEach(function(pixelCoord) {
                var pixel = pixelMap[pixelCoord.x] && pixelMap[pixelCoord.x][pixelCoord.y];
                if (!pixel) return;
                
                if (func.type.startsWith('move_') && func.active) {
                    var dir = func.type.split('_')[1];
                    var dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
                    var dy = dir === 'up' ? -1 : dir === 'down' ? 1 : 0;
                    if (isEmpty(pixel.x + dx, pixel.y + dy)) {
                        movePixel(pixel, pixel.x + dx, pixel.y + dy);
                        pixelCoord.x = pixel.x + dx;
                        pixelCoord.y = pixel.y + dy;
                    }
                    
                } else if (func.type.startsWith('extend_')) {
                    var dir = func.type.split('_')[1];
                    var dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
                    var dy = dir === 'up' ? -1 : dir === 'down' ? 1 : 0;
                    
                    if (func.active) {
                        for (var i = 1; i <= func.value; i++) {
                            var extX = pixel.x + (dx * i);
                            var extY = pixel.y + (dy * i);
                            
                            if (isEmpty(extX, extY)) {
                                var extName = pixel.element + '_extension';
                                if (!elements[extName]) {
                                    elements[extName] = {
                                        color: elements[pixel.element].color,
                                        behavior: elements[pixel.element].behavior || behaviors.WALL,
                                        category: elements[pixel.element].category,
                                        state: 'solid',
                                        temp: 20
                                    };
                                }
                                createPixel(extName, extX, extY);
                                func.extensions.push({x: extX, y: extY});
                            }
                        }
                    } else {
                        func.extensions.forEach(function(ext) {
                            if (pixelMap[ext.x] && pixelMap[ext.x][ext.y]) {
                                deletePixel(ext.x, ext.y);
                            }
                        });
                        func.extensions = [];
                    }
                    
                } else if (func.type === 'passable') {
                    if (elements[pixel.element]) {
                        if (func.active) {
                            elements[pixel.element].passable = true;
                        } else {
                            delete elements[pixel.element].passable;
                        }
                    }
                    
                } else if (func.type === 'conductive') {
                    if (elements[pixel.element]) {
                        elements[pixel.element].conduct = func.active ? 1 : 0;
                    }
                    
                } else if (func.type === 'temperature') {
                    pixel.temp = func.value * 10;
                }
            });
        }
        
        console.log('Functions Tab v4 loaded successfully!');
    }
    
    waitForSandboxels();
})();
