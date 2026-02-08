// Advanced Functions Tab Mod v2 for Sandboxels
// Click pixels to control them with custom functions

(function() {
    'use strict';
    
    var selectedPixels = [];
    var functionGroups = [];
    var currentGroupView = null;
    var navigationStack = [];
    var controlledPixels = new Map(); // Track pixels under function control
    
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
        
        // Main Functions Panel (starts hidden)
        var panel = document.createElement('div');
        panel.id = 'functions-main-panel';
        panel.style.cssText = `
            display: none;
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            width: 700px;
            max-height: 80%;
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
        
        var headerLeft = document.createElement('div');
        headerLeft.style.cssText = 'display: flex; align-items: center; gap: 10px;';
        
        var backBtn = document.createElement('button');
        backBtn.innerHTML = '←';
        backBtn.id = 'nav-back-btn';
        backBtn.style.cssText = `
            background: #7f8c8d;
            color: white;
            border: 2px solid #000;
            padding: 8px 14px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
            display: none;
        `;
        
        var title = document.createElement('div');
        title.id = 'panel-title';
        title.textContent = 'Functions';
        title.style.cssText = 'color: #fff; font-size: 20px; font-weight: bold;';
        
        var headerRight = document.createElement('div');
        headerRight.style.cssText = 'display: flex; gap: 8px;';
        
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
        
        headerLeft.appendChild(backBtn);
        headerLeft.appendChild(title);
        headerRight.appendChild(closeBtn);
        
        header.appendChild(headerLeft);
        header.appendChild(headerRight);
        
        // Content area
        var content = document.createElement('div');
        content.id = 'functions-content';
        content.style.cssText = `
            padding: 15px;
            max-height: 500px;
            overflow-y: auto;
        `;
        
        panel.appendChild(header);
        panel.appendChild(content);
        document.body.appendChild(panel);
        
        // Toggle main panel
        functionsBtn.onclick = function() {
            if (panel.style.display === 'none') {
                showGroupsView();
                panel.style.display = 'block';
            } else {
                panel.style.display = 'none';
            }
        };
        
        closeBtn.onclick = function() {
            panel.style.display = 'none';
            selectedPixels = [];
        };
        
        backBtn.onclick = function() {
            if (navigationStack.length > 0) {
                var previous = navigationStack.pop();
                if (previous.type === 'groups') {
                    showGroupsView();
                } else if (previous.type === 'group') {
                    showGroupView(previous.group);
                }
            }
        };
        
        // Show function groups list
        function showGroupsView() {
            content.innerHTML = '';
            title.textContent = 'Function Groups';
            backBtn.style.display = 'none';
            navigationStack = [];
            
            var addGroupBtn = document.createElement('button');
            addGroupBtn.textContent = '+ Add Function Group';
            addGroupBtn.style.cssText = `
                background: #27ae60;
                color: white;
                border: 2px solid #000;
                padding: 10px 20px;
                font-size: 14px;
                cursor: pointer;
                border-radius: 5px;
                font-weight: bold;
                width: 100%;
                margin-bottom: 15px;
            `;
            
            addGroupBtn.onclick = function() {
                var groupName = prompt('Enter Function Group Name:');
                if (groupName) {
                    var newGroup = {
                        name: groupName,
                        functions: []
                    };
                    functionGroups.push(newGroup);
                    showGroupsView();
                }
            };
            
            content.appendChild(addGroupBtn);
            
            // List existing groups
            functionGroups.forEach(function(group, index) {
                var groupBtn = document.createElement('button');
                groupBtn.textContent = group.name;
                groupBtn.style.cssText = `
                    background: #3498db;
                    color: white;
                    border: 2px solid #000;
                    padding: 12px 20px;
                    font-size: 14px;
                    cursor: pointer;
                    border-radius: 5px;
                    font-weight: bold;
                    width: 100%;
                    margin-bottom: 10px;
                    text-align: left;
                `;
                
                groupBtn.onclick = function() {
                    navigationStack.push({type: 'groups'});
                    showGroupView(group);
                };
                
                content.appendChild(groupBtn);
            });
        }
        
        // Show individual group view
        function showGroupView(group) {
            content.innerHTML = '';
            title.textContent = group.name;
            backBtn.style.display = 'block';
            currentGroupView = group;
            
            var selectPixelBtn = document.createElement('button');
            selectPixelBtn.textContent = '🖱️ Click Canvas to Select Pixel';
            selectPixelBtn.style.cssText = `
                background: #e67e22;
                color: white;
                border: 2px solid #000;
                padding: 10px 20px;
                font-size: 14px;
                cursor: pointer;
                border-radius: 5px;
                font-weight: bold;
                width: 100%;
                margin-bottom: 15px;
            `;
            
            var selectedInfo = document.createElement('div');
            selectedInfo.id = 'selected-pixel-info';
            selectedInfo.style.cssText = 'color: white; margin-bottom: 15px; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 5px;';
            selectedInfo.textContent = selectedPixels.length > 0 ? 
                `Selected: ${selectedPixels.length} pixel(s)` : 
                'No pixels selected';
            
            var addFunctionBtn = document.createElement('button');
            addFunctionBtn.textContent = '+ Add Function';
            addFunctionBtn.style.cssText = `
                background: #27ae60;
                color: white;
                border: 2px solid #000;
                padding: 10px 20px;
                font-size: 14px;
                cursor: pointer;
                border-radius: 5px;
                font-weight: bold;
                width: 100%;
                margin-bottom: 15px;
            `;
            
            addFunctionBtn.onclick = function() {
                if (selectedPixels.length === 0) {
                    alert('Please select a pixel first!');
                    return;
                }
                createFunctionInterface(group);
            };
            
            content.appendChild(selectPixelBtn);
            content.appendChild(selectedInfo);
            content.appendChild(addFunctionBtn);
            
            // List existing functions
            group.functions.forEach(function(func, index) {
                var funcDiv = createFunctionControl(func, group);
                content.appendChild(funcDiv);
            });
        }
        
        // Create function interface
        function createFunctionInterface(group) {
            var funcDiv = document.createElement('div');
            funcDiv.style.cssText = `
                margin: 10px 0;
                padding: 12px;
                background: rgba(44, 62, 80, 0.9);
                border: 2px solid #000;
                border-radius: 5px;
            `;
            
            var nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'Function Name';
            nameInput.style.cssText = 'width: 100%; padding: 8px; margin-bottom: 10px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px;';
            
            var typeSelect = document.createElement('select');
            typeSelect.style.cssText = 'width: 100%; padding: 8px; margin-bottom: 10px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px;';
            typeSelect.innerHTML = `
                <option value="">Select Function Type</option>
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
                <option value="heat">Set Temperature</option>
            `;
            
            var controlSelect = document.createElement('select');
            controlSelect.style.cssText = 'width: 100%; padding: 8px; margin-bottom: 10px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px;';
            controlSelect.innerHTML = `
                <option value="toggle">Toggle (ON/OFF)</option>
                <option value="button">Button (Timed)</option>
                <option value="slider">Slider (Value)</option>
            `;
            
            var saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save Function';
            saveBtn.style.cssText = 'width: 100%; padding: 10px; background: #27ae60; color: white; border: 2px solid #000; border-radius: 5px; cursor: pointer; font-weight: bold;';
            
            saveBtn.onclick = function() {
                if (!nameInput.value || !typeSelect.value) {
                    alert('Please fill in all fields!');
                    return;
                }
                
                var newFunc = {
                    name: nameInput.value,
                    type: typeSelect.value,
                    control: controlSelect.value,
                    pixels: [...selectedPixels],
                    active: false,
                    value: 50,
                    extensions: []
                };
                
                group.functions.push(newFunc);
                showGroupView(group);
            };
            
            funcDiv.appendChild(nameInput);
            funcDiv.appendChild(typeSelect);
            funcDiv.appendChild(controlSelect);
            funcDiv.appendChild(saveBtn);
            
            content.appendChild(funcDiv);
        }
        
        // Create function control UI
        function createFunctionControl(func, group) {
            var div = document.createElement('div');
            div.style.cssText = `
                margin: 10px 0;
                padding: 12px;
                background: rgba(52, 73, 94, 0.8);
                border: 2px solid #000;
                border-radius: 5px;
            `;
            
            var nameLabel = document.createElement('div');
            nameLabel.textContent = func.name + ' (' + func.type + ')';
            nameLabel.style.cssText = 'color: white; font-weight: bold; margin-bottom: 10px;';
            
            var controlDiv = document.createElement('div');
            
            if (func.control === 'toggle') {
                var toggleBtn = document.createElement('button');
                toggleBtn.textContent = func.active ? 'ON' : 'OFF';
                toggleBtn.style.cssText = `
                    width: 100%;
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
                    toggleBtn.textContent = func.active ? 'ON' : 'OFF';
                    toggleBtn.style.background = func.active ? '#27ae60' : '#e74c3c';
                    executeFunction(func);
                };
                
                controlDiv.appendChild(toggleBtn);
                
            } else if (func.control === 'button') {
                var btn = document.createElement('button');
                btn.textContent = 'Activate';
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
                slider.value = func.value || '50';
                slider.style.cssText = 'width: 100%;';
                
                var valueLabel = document.createElement('span');
                valueLabel.textContent = slider.value;
                valueLabel.style.cssText = 'color: white; font-weight: bold;';
                
                slider.oninput = function() {
                    func.value = parseInt(slider.value);
                    valueLabel.textContent = slider.value;
                    func.active = true;
                    executeFunction(func);
                };
                
                controlDiv.appendChild(slider);
                controlDiv.appendChild(valueLabel);
            }
            
            div.appendChild(nameLabel);
            div.appendChild(controlDiv);
            
            return div;
        }
        
        // Execute function on pixels
        function executeFunction(func) {
            func.pixels.forEach(function(pixelCoord) {
                var pixel = pixelMap[pixelCoord.x] && pixelMap[pixelCoord.x][pixelCoord.y];
                if (!pixel) return;
                
                if (func.type.startsWith('move_')) {
                    if (func.active) {
                        var dir = func.type.split('_')[1];
                        var dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
                        var dy = dir === 'up' ? -1 : dir === 'down' ? 1 : 0;
                        
                        var newX = pixel.x + dx;
                        var newY = pixel.y + dy;
                        
                        if (isEmpty(newX, newY)) {
                            movePixel(pixel, newX, newY);
                        }
                    }
                } else if (func.type.startsWith('extend_')) {
                    if (func.active) {
                        var dir = func.type.split('_')[1];
                        var dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
                        var dy = dir === 'up' ? -1 : dir === 'down' ? 1 : 0;
                        
                        var extX = pixel.x + dx;
                        var extY = pixel.y + dy;
                        
                        if (isEmpty(extX, extY)) {
                            var extensionName = pixel.element + '_extension';
                            
                            // Create extension element if it doesn't exist
                            if (!elements[extensionName]) {
                                elements[extensionName] = {
                                    color: elements[pixel.element].color,
                                    behavior: elements[pixel.element].behavior,
                                    category: elements[pixel.element].category,
                                    state: elements[pixel.element].state,
                                    temp: elements[pixel.element].temp
                                };
                            }
                            
                            createPixel(extensionName, extX, extY);
                            func.extensions.push({x: extX, y: extY});
                        }
                    } else {
                        // Remove extensions
                        func.extensions.forEach(function(ext) {
                            deletePixel(ext.x, ext.y);
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
                } else if (func.type === 'heat') {
                    if (pixel.temp !== undefined) {
                        pixel.temp = func.value * 50;
                    }
                }
            });
        }
        
        // Pixel selection via canvas click
        var canvas = document.getElementById('game');
        if (canvas) {
            canvas.addEventListener('click', function(e) {
                if (currentGroupView && panel.style.display === 'block') {
                    var rect = canvas.getBoundingClientRect();
                    var x = Math.floor((e.clientX - rect.left) / pixelSize);
                    var y = Math.floor((e.clientY - rect.top) / pixelSize);
                    
                    if (pixelMap[x] && pixelMap[x][y]) {
                        selectedPixels = [{x: x, y: y}];
                        var info = document.getElementById('selected-pixel-info');
                        if (info) {
                            info.textContent = `Selected: ${pixelMap[x][y].element} at (${x}, ${y})`;
                        }
                    }
                }
            });
        }
        
        console.log('Advanced Functions Tab v2 loaded!');
    }
    
    waitForSandboxels();
})();
