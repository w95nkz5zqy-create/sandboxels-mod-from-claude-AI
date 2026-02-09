// Advanced Functions Tab Mod v3 for Sandboxels
// Everything in one integrated panel

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
        // Create Functions button
        var functionsBtn = document.createElement('button');
        functionsBtn.id = 'functions-tab-btn';
        functionsBtn.textContent = 'Functions';
        functionsBtn.style.cssText = 'background-color: #9370DB; color: white; padding: 5px 10px; margin: 2px; border: 2px solid #000; font-weight: bold; cursor: pointer;';
        
        var toolbar = document.getElementById('toolbar');
        if (!toolbar) {
            var buttons = document.querySelectorAll('.toolButton, button');
            if (buttons.length > 0) {
                toolbar = buttons[0].parentElement;
            }
        }
        if (toolbar) {
            toolbar.appendChild(functionsBtn);
        }
        
        // Main Functions Panel
        var panel = document.createElement('div');
        panel.id = 'functions-panel';
        panel.style.cssText = `
            display: none;
            position: fixed;
            top: 5%;
            left: 50%;
            transform: translateX(-50%);
            width: 850px;
            max-height: 90%;
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            border: 3px solid #000;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            z-index: 100000;
            overflow: hidden;
        `;
        
        // Header
        var header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #1a252f 0%, #2c3e50 100%);
            padding: 12px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #000;
        `;
        
        var title = document.createElement('div');
        title.textContent = 'Functions Control Panel';
        title.style.cssText = 'color: #fff; font-size: 20px; font-weight: bold;';
        
        var headerButtons = document.createElement('div');
        headerButtons.style.cssText = 'display: flex; gap: 8px;';
        
        var addGroupBtn = document.createElement('button');
        addGroupBtn.innerHTML = '➕';
        addGroupBtn.title = 'Add Function Group';
        addGroupBtn.style.cssText = `
            background: #27ae60;
            color: white;
            border: 2px solid #000;
            padding: 8px 16px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        var deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.title = 'Delete Mode';
        deleteBtn.style.cssText = `
            background: #e74c3c;
            color: white;
            border: 2px solid #000;
            padding: 8px 16px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✖';
        closeBtn.style.cssText = `
            background: #95a5a6;
            color: white;
            border: 2px solid #000;
            padding: 8px 14px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        headerButtons.appendChild(addGroupBtn);
        headerButtons.appendChild(deleteBtn);
        headerButtons.appendChild(closeBtn);
        header.appendChild(title);
        header.appendChild(headerButtons);
        
        // Pixel Selection Bar
        var selectionBar = document.createElement('div');
        selectionBar.style.cssText = `
            background: rgba(0,0,0,0.4);
            padding: 10px 15px;
            border-bottom: 2px solid #000;
            display: flex;
            gap: 10px;
            align-items: center;
        `;
        
        var selectBtn = document.createElement('button');
        selectBtn.textContent = '🖱️ Click to Select Pixel';
        selectBtn.id = 'select-pixel-mode-btn';
        selectBtn.style.cssText = `
            background: #e67e22;
            color: white;
            border: 2px solid #000;
            padding: 8px 16px;
            font-size: 13px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        var selectedInfo = document.createElement('div');
        selectedInfo.id = 'selected-info';
        selectedInfo.style.cssText = 'flex: 1; color: white; font-weight: bold; font-size: 13px;';
        selectedInfo.textContent = 'No pixel selected';
        
        var clearSelectionBtn = document.createElement('button');
        clearSelectionBtn.textContent = 'Clear';
        clearSelectionBtn.style.cssText = `
            background: #95a5a6;
            color: white;
            border: 2px solid #000;
            padding: 6px 12px;
            font-size: 12px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        selectionBar.appendChild(selectBtn);
        selectionBar.appendChild(selectedInfo);
        selectionBar.appendChild(clearSelectionBtn);
        
        // Content area
        var content = document.createElement('div');
        content.id = 'functions-content';
        content.style.cssText = `
            padding: 15px;
            max-height: 600px;
            overflow-y: auto;
        `;
        
        // Delete confirm area
        var deleteConfirmArea = document.createElement('div');
        deleteConfirmArea.id = 'delete-confirm-area';
        deleteConfirmArea.style.cssText = 'display: none; padding: 10px; background: #e74c3c; text-align: center; border-bottom: 2px solid #000;';
        
        var deleteConfirmBtn = document.createElement('button');
        deleteConfirmBtn.textContent = 'Delete Selected Groups';
        deleteConfirmBtn.style.cssText = `
            background: #c0392b;
            color: white;
            border: 2px solid #000;
            padding: 8px 20px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        deleteConfirmArea.appendChild(deleteConfirmBtn);
        
        panel.appendChild(header);
        panel.appendChild(deleteConfirmArea);
        panel.appendChild(selectionBar);
        panel.appendChild(content);
        document.body.appendChild(panel);
        
        // Selection mode
        var selectionMode = false;
        
        selectBtn.onclick = function() {
            selectionMode = !selectionMode;
            selectBtn.style.background = selectionMode ? '#d35400' : '#e67e22';
            selectBtn.textContent = selectionMode ? '🖱️ Selection Mode: ON' : '🖱️ Click to Select Pixel';
        };
        
        clearSelectionBtn.onclick = function() {
            selectedPixels = [];
            selectedInfo.textContent = 'No pixel selected';
            selectionMode = false;
            selectBtn.style.background = '#e67e22';
            selectBtn.textContent = '🖱️ Click to Select Pixel';
        };
        
        // Canvas click handler
        var canvas = document.getElementById('game');
        if (canvas) {
            canvas.addEventListener('click', function(e) {
                if (selectionMode && panel.style.display === 'block') {
                    var rect = canvas.getBoundingClientRect();
                    var x = Math.floor((e.clientX - rect.left) / pixelSize);
                    var y = Math.floor((e.clientY - rect.top) / pixelSize);
                    
                    if (pixelMap[x] && pixelMap[x][y]) {
                        selectedPixels = [{x: x, y: y, element: pixelMap[x][y].element}];
                        selectedInfo.textContent = `Selected: ${pixelMap[x][y].element} at (${x}, ${y})`;
                        selectionMode = false;
                        selectBtn.style.background = '#e67e22';
                        selectBtn.textContent = '🖱️ Click to Select Pixel';
                    }
                }
            });
        }
        
        // Toggle panel
        functionsBtn.onclick = function() {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            if (panel.style.display === 'block') {
                renderContent();
            }
        };
        
        closeBtn.onclick = function() {
            panel.style.display = 'none';
        };
        
        // Delete mode
        deleteBtn.onclick = function() {
            deleteMode = !deleteMode;
            deleteBtn.style.background = deleteMode ? '#c0392b' : '#e74c3c';
            deleteConfirmArea.style.display = deleteMode ? 'block' : 'none';
            
            var checkboxes = document.querySelectorAll('.group-delete-checkbox');
            checkboxes.forEach(function(cb) {
                cb.style.display = deleteMode ? 'inline-block' : 'none';
            });
        };
        
        deleteConfirmBtn.onclick = function() {
            var checkboxes = document.querySelectorAll('.group-delete-checkbox:checked');
            var toDelete = [];
            
            checkboxes.forEach(function(cb) {
                var groupIndex = parseInt(cb.dataset.groupIndex);
                toDelete.push(groupIndex);
            });
            
            toDelete.sort(function(a, b) { return b - a; });
            toDelete.forEach(function(index) {
                functionGroups.splice(index, 1);
            });
            
            deleteMode = false;
            deleteBtn.style.background = '#e74c3c';
            deleteConfirmArea.style.display = 'none';
            renderContent();
        };
        
        // Add group
        addGroupBtn.onclick = function() {
            var groupName = prompt('Enter Function Group Name:');
            if (groupName) {
                functionGroups.push({
                    name: groupName,
                    collapsed: false,
                    functions: []
                });
                renderContent();
            }
        };
        
        // Render all content
        function renderContent() {
            content.innerHTML = '';
            
            if (functionGroups.length === 0) {
                var emptyMsg = document.createElement('div');
                emptyMsg.textContent = 'No function groups. Click ➕ to create one.';
                emptyMsg.style.cssText = 'color: #95a5a6; text-align: center; padding: 40px; font-size: 16px;';
                content.appendChild(emptyMsg);
                return;
            }
            
            functionGroups.forEach(function(group, groupIndex) {
                var groupDiv = createFunctionGroup(group, groupIndex);
                content.appendChild(groupDiv);
            });
        }
        
        // Create function group
        function createFunctionGroup(group, groupIndex) {
            var groupDiv = document.createElement('div');
            groupDiv.className = 'function-group';
            groupDiv.style.cssText = `
                margin: 10px 0;
                padding: 12px;
                background: rgba(52, 73, 94, 0.8);
                border: 2px solid #000;
                border-radius: 8px;
            `;
            
            // Group header
            var groupHeader = document.createElement('div');
            groupHeader.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 12px;';
            
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'group-delete-checkbox';
            checkbox.dataset.groupIndex = groupIndex;
            checkbox.style.cssText = 'display: none; width: 20px; height: 20px;';
            
            var collapseBtn = document.createElement('button');
            collapseBtn.textContent = group.collapsed ? '▶' : '▼';
            collapseBtn.style.cssText = `
                background: #34495e;
                color: white;
                border: 2px solid #000;
                padding: 4px 8px;
                cursor: pointer;
                border-radius: 3px;
                font-weight: bold;
            `;
            
            var groupName = document.createElement('div');
            groupName.textContent = group.name;
            groupName.style.cssText = 'flex: 1; color: white; font-weight: bold; font-size: 16px;';
            
            var addFuncBtn = document.createElement('button');
            addFuncBtn.textContent = '+ Function';
            addFuncBtn.style.cssText = `
                background: #3498db;
                color: white;
                border: 2px solid #000;
                padding: 6px 12px;
                font-size: 12px;
                cursor: pointer;
                border-radius: 5px;
                font-weight: bold;
            `;
            
            groupHeader.appendChild(checkbox);
            groupHeader.appendChild(collapseBtn);
            groupHeader.appendChild(groupName);
            groupHeader.appendChild(addFuncBtn);
            
            groupDiv.appendChild(groupHeader);
            
            // Collapse toggle
            collapseBtn.onclick = function() {
                group.collapsed = !group.collapsed;
                renderContent();
            };
            
            // Add function
            addFuncBtn.onclick = function() {
                if (selectedPixels.length === 0) {
                    alert('Please select a pixel first!');
                    return;
                }
                
                var funcName = prompt('Function Name:');
                if (!funcName) return;
                
                var funcType = prompt('Function Type:\n1=Move Up, 2=Move Down, 3=Move Left, 4=Move Right\n5=Extend Up, 6=Extend Down, 7=Extend Left, 8=Extend Right\n9=Contract Up, 10=Contract Down, 11=Contract Left, 12=Contract Right\n13=Passable, 14=Conductive, 15=Temperature');
                
                var typeMap = {
                    '1': 'move_up', '2': 'move_down', '3': 'move_left', '4': 'move_right',
                    '5': 'extend_up', '6': 'extend_down', '7': 'extend_left', '8': 'extend_right',
                    '9': 'contract_up', '10': 'contract_down', '11': 'contract_left', '12': 'contract_right',
                    '13': 'passable', '14': 'conductive', '15': 'temperature'
                };
                
                if (!typeMap[funcType]) {
                    alert('Invalid type!');
                    return;
                }
                
                var controlType = prompt('Control Type:\n1=Toggle, 2=Button, 3=Slider');
                var controlMap = {'1': 'toggle', '2': 'button', '3': 'slider'};
                
                if (!controlMap[controlType]) {
                    alert('Invalid control!');
                    return;
                }
                
                group.functions.push({
                    name: funcName,
                    type: typeMap[funcType],
                    control: controlMap[controlType],
                    pixels: JSON.parse(JSON.stringify(selectedPixels)),
                    active: false,
                    value: 50,
                    extensions: []
                });
                
                renderContent();
            };
            
            // Functions list
            if (!group.collapsed && group.functions.length > 0) {
                group.functions.forEach(function(func, funcIndex) {
                    var funcDiv = createFunctionControl(func, group, funcIndex);
                    groupDiv.appendChild(funcDiv);
                });
            }
            
            return groupDiv;
        }
        
        // Create function control
        function createFunctionControl(func, group, funcIndex) {
            var div = document.createElement('div');
            div.style.cssText = `
                margin: 8px 0;
                padding: 10px;
                background: rgba(44, 62, 80, 0.9);
                border: 2px solid #000;
                border-radius: 5px;
            `;
            
            var infoRow = document.createElement('div');
            infoRow.style.cssText = 'display: flex; justify-content: space-between; margin-bottom: 8px;';
            
            var nameLabel = document.createElement('div');
            nameLabel.textContent = func.name;
            nameLabel.style.cssText = 'color: white; font-weight: bold; font-size: 14px;';
            
            var typeLabel = document.createElement('div');
            typeLabel.textContent = func.type.replace(/_/g, ' ');
            typeLabel.style.cssText = 'color: #95a5a6; font-size: 12px;';
            
            infoRow.appendChild(nameLabel);
            infoRow.appendChild(typeLabel);
            
            var controlRow = document.createElement('div');
            controlRow.style.cssText = 'display: flex; gap: 8px; align-items: center;';
            
            if (func.control === 'toggle') {
                var toggleBtn = document.createElement('button');
                toggleBtn.textContent = func.active ? 'ON' : 'OFF';
                toggleBtn.style.cssText = `
                    flex: 1;
                    padding: 10px;
                    background: ${func.active ? '#27ae60' : '#e74c3c'};
                    color: white;
                    border: 2px solid #000;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                `;
                
                toggleBtn.onclick = function() {
                    func.active = !func.active;
                    executeFunction(func);
                    renderContent();
                };
                
                controlRow.appendChild(toggleBtn);
                
            } else if (func.control === 'button') {
                var btn = document.createElement('button');
                btn.textContent = 'ACTIVATE';
                btn.style.cssText = `
                    flex: 1;
                    padding: 10px;
                    background: #3498db;
                    color: white;
                    border: 2px solid #000;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                `;
                
                var durationInput = document.createElement('input');
                durationInput.type = 'number';
                durationInput.value = '1';
                durationInput.min = '0.1';
                durationInput.step = '0.1';
                durationInput.placeholder = 'sec';
                durationInput.style.cssText = 'width: 60px; padding: 6px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px;';
                
                btn.onclick = function() {
                    var duration = parseFloat(durationInput.value) * 1000 || 1000;
                    func.active = true;
                    executeFunction(func);
                    btn.disabled = true;
                    btn.style.background = '#7f8c8d';
                    
                    setTimeout(function() {
                        func.active = false;
                        executeFunction(func);
                        btn.disabled = false;
                        btn.style.background = '#3498db';
                    }, duration);
                };
                
                controlRow.appendChild(btn);
                controlRow.appendChild(durationInput);
                
            } else if (func.control === 'slider') {
                var slider = document.createElement('input');
                slider.type = 'range';
                slider.min = '0';
                slider.max = '100';
                slider.value = func.value;
                slider.style.cssText = 'flex: 1;';
                
                var valueLabel = document.createElement('span');
                valueLabel.textContent = func.value;
                valueLabel.style.cssText = 'color: white; font-weight: bold; min-width: 35px; text-align: right;';
                
                slider.oninput = function() {
                    func.value = parseInt(slider.value);
                    valueLabel.textContent = func.value;
                    func.active = true;
                    executeFunction(func);
                };
                
                controlRow.appendChild(slider);
                controlRow.appendChild(valueLabel);
            }
            
            div.appendChild(infoRow);
            div.appendChild(controlRow);
            
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
                    }
                    
                } else if (func.type.startsWith('extend_')) {
                    var dir = func.type.split('_')[1];
                    var dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
                    var dy = dir === 'up' ? -1 : dir === 'down' ? 1 : 0;
                    
                    if (func.active) {
                        var extX = pixel.x + dx;
                        var extY = pixel.y + dy;
                        
                        if (isEmpty(extX, extY)) {
                            var extName = pixel.element + '_extension';
                            
                            if (!elements[extName]) {
                                elements[extName] = {
                                    color: elements[pixel.element].color,
                                    behavior: elements[pixel.element].behavior || behaviors.WALL,
                                    category: elements[pixel.element].category,
                                    state: elements[pixel.element].state,
                                    temp: 20,
                                    conduct: elements[pixel.element].conduct,
                                    hardness: elements[pixel.element].hardness
                                };
                            }
                            
                            createPixel(extName, extX, extY);
                            func.extensions.push({x: extX, y: extY});
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
                        if (func.active) {
                            elements[pixel.element].conduct = 1;
                        } else {
                            elements[pixel.element].conduct = 0;
                        }
                    }
                    
                } else if (func.type === 'temperature') {
                    pixel.temp = func.value * 50;
                }
            });
        }
        
        console.log('Advanced Functions Tab v3 loaded!');
    }
    
    waitForSandboxels();
})();
