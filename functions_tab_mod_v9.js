// Functions Tab v9 - Better UI with proper styling

(function() {
    'use strict';
    
    var selectedPixels = [];
    var functionGroups = [];
    
    console.log('Functions Tab v9 starting...');
    
    setTimeout(function() {
        if (typeof elements === 'undefined') {
            console.error('Elements not loaded');
            return;
        }
        
        console.log('Initializing Functions Tab v9...');
        
        // Create button
        var btn = document.createElement('button');
        btn.textContent = 'Functions';
        btn.className = 'toolButton';
        btn.style.cssText = 'background: #9370DB; color: white; padding: 5px 10px; margin: 2px; border: 2px solid black; font-weight: bold; cursor: pointer; font-family: Arial;';
        
        var toolbar = document.querySelector('#toolbar');
        if (!toolbar) {
            var buttons = document.querySelectorAll('button');
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i].textContent === 'Heat' || buttons[i].textContent === 'Cool') {
                    toolbar = buttons[i].parentElement;
                    break;
                }
            }
        }
        
        if (toolbar) {
            toolbar.appendChild(btn);
            console.log('Functions button added');
        }
        
        // Create panel with better UI
        var panel = document.createElement('div');
        panel.style.cssText = `
            display: none;
            position: fixed;
            top: 8%;
            left: 50%;
            transform: translateX(-50%);
            width: 750px;
            max-height: 85%;
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            border: 3px solid #000;
            border-radius: 12px;
            box-shadow: 0 10px 50px rgba(0,0,0,0.8);
            z-index: 999999;
            overflow: hidden;
            font-family: Arial, sans-serif;
        `;
        document.body.appendChild(panel);
        
        // Header
        var header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #1a252f 0%, #2c3e50 100%);
            padding: 15px 20px;
            border-bottom: 3px solid #000;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        var title = document.createElement('h2');
        title.textContent = 'Functions Control Panel';
        title.style.cssText = 'margin: 0; color: white; font-size: 22px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);';
        
        var closeBtn = document.createElement('button');
        closeBtn.textContent = '✖';
        closeBtn.style.cssText = `
            background: #e74c3c;
            color: white;
            border: 2px solid #000;
            padding: 8px 14px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
            box-shadow: 0 3px 0 #c0392b;
        `;
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        panel.appendChild(header);
        
        // Content
        var content = document.createElement('div');
        content.style.cssText = 'padding: 20px; max-height: 600px; overflow-y: auto; overflow-x: hidden;';
        panel.appendChild(content);
        
        var isOpen = false;
        
        btn.onclick = function() {
            isOpen = !isOpen;
            panel.style.display = isOpen ? 'block' : 'none';
            if (isOpen) render();
        };
        
        closeBtn.onclick = function() {
            isOpen = false;
            panel.style.display = 'none';
        };
        
        function render() {
            content.innerHTML = '';
            
            // Create group section with styled input
            var createSection = document.createElement('div');
            createSection.style.cssText = `
                background: rgba(52, 73, 94, 0.8);
                padding: 18px;
                border-radius: 8px;
                border: 2px solid #000;
                margin-bottom: 20px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            `;
            
            var sectionTitle = document.createElement('div');
            sectionTitle.textContent = 'Create New Function Group';
            sectionTitle.style.cssText = 'color: white; font-weight: bold; font-size: 16px; margin-bottom: 12px;';
            
            var inputContainer = document.createElement('div');
            inputContainer.style.cssText = 'display: flex; gap: 10px;';
            
            var groupNameInput = document.createElement('input');
            groupNameInput.type = 'text';
            groupNameInput.placeholder = 'Enter group name (e.g., "Reactor Controls")';
            groupNameInput.style.cssText = `
                flex: 1;
                padding: 12px;
                background: #2c3e50;
                color: white;
                border: 2px solid #000;
                border-radius: 5px;
                font-size: 14px;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
            `;
            
            var createBtn = document.createElement('button');
            createBtn.textContent = '+ Create';
            createBtn.style.cssText = `
                background: #27ae60;
                color: white;
                padding: 12px 24px;
                border: 2px solid #000;
                cursor: pointer;
                font-weight: bold;
                border-radius: 5px;
                font-size: 14px;
                box-shadow: 0 3px 0 #1e8449;
                transition: transform 0.1s;
            `;
            
            createBtn.onmousedown = function() {
                createBtn.style.transform = 'translateY(2px)';
                createBtn.style.boxShadow = '0 1px 0 #1e8449';
            };
            
            createBtn.onmouseup = function() {
                createBtn.style.transform = 'translateY(0)';
                createBtn.style.boxShadow = '0 3px 0 #1e8449';
            };
            
            createBtn.onclick = function() {
                var name = groupNameInput.value.trim();
                if (name) {
                    functionGroups.push({
                        name: name,
                        functions: [],
                        collapsed: false
                    });
                    console.log('Group created:', name);
                    render();
                } else {
                    alert('Please enter a group name!');
                }
            };
            
            inputContainer.appendChild(groupNameInput);
            inputContainer.appendChild(createBtn);
            
            createSection.appendChild(sectionTitle);
            createSection.appendChild(inputContainer);
            content.appendChild(createSection);
            
            // Display groups
            if (functionGroups.length === 0) {
                var emptyMsg = document.createElement('div');
                emptyMsg.textContent = '📋 No function groups yet. Create one above to get started!';
                emptyMsg.style.cssText = `
                    color: #95a5a6;
                    text-align: center;
                    padding: 60px 20px;
                    font-size: 16px;
                    background: rgba(0,0,0,0.2);
                    border-radius: 8px;
                    border: 2px dashed #7f8c8d;
                `;
                content.appendChild(emptyMsg);
            } else {
                functionGroups.forEach(function(group, index) {
                    var groupDiv = createGroupElement(group, index);
                    content.appendChild(groupDiv);
                });
            }
        }
        
        function createGroupElement(group, index) {
            var groupDiv = document.createElement('div');
            groupDiv.style.cssText = `
                background: rgba(52, 73, 94, 0.8);
                padding: 15px;
                margin: 15px 0;
                border-radius: 8px;
                border: 2px solid #000;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            `;
            
            var groupHeader = document.createElement('div');
            groupHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;';
            
            var headerLeft = document.createElement('div');
            headerLeft.style.cssText = 'display: flex; align-items: center; gap: 10px;';
            
            var collapseBtn = document.createElement('button');
            collapseBtn.textContent = group.collapsed ? '▶' : '▼';
            collapseBtn.style.cssText = `
                background: #34495e;
                color: white;
                border: 2px solid #000;
                padding: 6px 10px;
                cursor: pointer;
                border-radius: 4px;
                font-weight: bold;
            `;
            collapseBtn.onclick = function() {
                group.collapsed = !group.collapsed;
                render();
            };
            
            var groupName = document.createElement('h3');
            groupName.textContent = group.name;
            groupName.style.cssText = 'margin: 0; color: white; font-size: 18px;';
            
            headerLeft.appendChild(collapseBtn);
            headerLeft.appendChild(groupName);
            
            var addFuncBtn = document.createElement('button');
            addFuncBtn.textContent = '+ Function';
            addFuncBtn.style.cssText = `
                background: #3498db;
                color: white;
                padding: 8px 16px;
                border: 2px solid #000;
                cursor: pointer;
                font-weight: bold;
                border-radius: 5px;
                box-shadow: 0 3px 0 #2980b9;
            `;
            addFuncBtn.onclick = function() {
                showFunctionForm(group, groupDiv);
            };
            
            groupHeader.appendChild(headerLeft);
            groupHeader.appendChild(addFuncBtn);
            groupDiv.appendChild(groupHeader);
            
            // Display functions if not collapsed
            if (!group.collapsed) {
                group.functions.forEach(function(func) {
                    var funcElement = createFunctionElement(func);
                    groupDiv.appendChild(funcElement);
                });
            }
            
            return groupDiv;
        }
        
        function showFunctionForm(group, groupDiv) {
            var existingForm = groupDiv.querySelector('.func-form');
            if (existingForm) {
                existingForm.remove();
                return;
            }
            
            var form = document.createElement('div');
            form.className = 'func-form';
            form.style.cssText = `
                background: #2c3e50;
                padding: 15px;
                margin: 10px 0;
                border: 2px solid #3498db;
                border-radius: 5px;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
            `;
            
            var formTitle = document.createElement('h4');
            formTitle.textContent = 'Create New Function';
            formTitle.style.cssText = 'margin: 0 0 12px 0; color: #3498db; font-size: 16px;';
            form.appendChild(formTitle);
            
            // Select pixel button
            var selectBtn = document.createElement('button');
            selectBtn.textContent = '🖱️ Select Pixel from Canvas';
            selectBtn.style.cssText = `
                width: 100%;
                background: #e67e22;
                color: white;
                padding: 10px;
                border: 2px solid #000;
                cursor: pointer;
                margin-bottom: 8px;
                border-radius: 5px;
                font-weight: bold;
                box-shadow: 0 3px 0 #d35400;
            `;
            
            var selectedInfo = document.createElement('div');
            selectedInfo.style.cssText = `
                background: #1a252f;
                padding: 10px;
                margin-bottom: 12px;
                border-radius: 4px;
                font-size: 13px;
                color: #3498db;
                border: 1px solid #34495e;
            `;
            selectedInfo.textContent = '⚠ No pixel selected yet';
            
            var isSelecting = false;
            selectBtn.onclick = function() {
                isSelecting = !isSelecting;
                selectBtn.style.background = isSelecting ? '#d35400' : '#e67e22';
                selectBtn.textContent = isSelecting ? '🖱️ Click a pixel on the canvas now...' : '🖱️ Select Pixel from Canvas';
            };
            
            var canvas = document.getElementById('game');
            var clickHandler = function(e) {
                if (!isSelecting) return;
                
                var rect = canvas.getBoundingClientRect();
                var x = Math.floor((e.clientX - rect.left) / pixelSize);
                var y = Math.floor((e.clientY - rect.top) / pixelSize);
                
                if (pixelMap[x] && pixelMap[x][y]) {
                    selectedPixels = [{x: x, y: y, element: pixelMap[x][y].element}];
                    selectedInfo.textContent = '✓ Selected: ' + pixelMap[x][y].element + ' at (' + x + ', ' + y + ')';
                    selectedInfo.style.color = '#27ae60';
                    isSelecting = false;
                    selectBtn.style.background = '#e67e22';
                    selectBtn.textContent = '🖱️ Select Pixel from Canvas';
                }
            };
            
            if (canvas) {
                canvas.addEventListener('click', clickHandler);
            }
            
            // Name input
            var nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'Function name (e.g., "Door Toggle")';
            nameInput.style.cssText = `
                width: 100%;
                padding: 10px;
                margin-bottom: 10px;
                background: #34495e;
                color: white;
                border: 2px solid #000;
                border-radius: 4px;
                box-sizing: border-box;
                font-size: 13px;
            `;
            
            // Type select
            var typeSelect = document.createElement('select');
            typeSelect.style.cssText = `
                width: 100%;
                padding: 10px;
                margin-bottom: 12px;
                background: #34495e;
                color: white;
                border: 2px solid #000;
                border-radius: 4px;
                font-size: 13px;
            `;
            typeSelect.innerHTML = `
                <option value="">-- Select Function Type --</option>
                <option value="passable">Toggle Passable</option>
                <option value="conductive">Toggle Conductive</option>
                <option value="move_up">Move Up</option>
                <option value="move_down">Move Down</option>
                <option value="move_left">Move Left</option>
                <option value="move_right">Move Right</option>
                <option value="extend_up">Extend Up</option>
                <option value="extend_down">Extend Down</option>
                <option value="extend_left">Extend Left</option>
                <option value="extend_right">Extend Right</option>
            `;
            
            // Buttons
            var btnRow = document.createElement('div');
            btnRow.style.cssText = 'display: flex; gap: 10px;';
            
            var createFuncBtn = document.createElement('button');
            createFuncBtn.textContent = '✓ Create Function';
            createFuncBtn.style.cssText = `
                flex: 1;
                background: #27ae60;
                color: white;
                padding: 12px;
                border: 2px solid #000;
                cursor: pointer;
                font-weight: bold;
                border-radius: 5px;
                box-shadow: 0 3px 0 #1e8449;
            `;
            createFuncBtn.onclick = function() {
                if (!nameInput.value || !typeSelect.value || selectedPixels.length === 0) {
                    alert('Please fill all fields and select a pixel!');
                    return;
                }
                
                group.functions.push({
                    name: nameInput.value,
                    type: typeSelect.value,
                    pixels: JSON.parse(JSON.stringify(selectedPixels)),
                    active: false,
                    extensions: []
                });
                
                canvas.removeEventListener('click', clickHandler);
                render();
            };
            
            var cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.style.cssText = `
                background: #95a5a6;
                color: white;
                padding: 12px 20px;
                border: 2px solid #000;
                cursor: pointer;
                font-weight: bold;
                border-radius: 5px;
                box-shadow: 0 3px 0 #7f8c8d;
            `;
            cancelBtn.onclick = function() {
                canvas.removeEventListener('click', clickHandler);
                form.remove();
            };
            
            btnRow.appendChild(createFuncBtn);
            btnRow.appendChild(cancelBtn);
            
            form.appendChild(selectBtn);
            form.appendChild(selectedInfo);
            form.appendChild(nameInput);
            form.appendChild(typeSelect);
            form.appendChild(btnRow);
            
            groupDiv.appendChild(form);
        }
        
        function createFunctionElement(func) {
            var funcDiv = document.createElement('div');
            funcDiv.style.cssText = `
                background: rgba(44, 62, 80, 0.9);
                padding: 12px;
                margin: 10px 0;
                border-radius: 5px;
                border: 2px solid #000;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            `;
            
            var funcName = document.createElement('div');
            funcName.textContent = func.name + ' (' + func.type.replace(/_/g, ' ') + ')';
            funcName.style.cssText = 'font-weight: bold; margin-bottom: 8px; color: white; font-size: 14px;';
            
            var toggleBtn = document.createElement('button');
            toggleBtn.textContent = func.active ? '✓ ON' : '✗ OFF';
            toggleBtn.style.cssText = `
                width: 100%;
                padding: 12px;
                background: ${func.active ? '#27ae60' : '#e74c3c'};
                color: white;
                border: 2px solid #000;
                cursor: pointer;
                font-weight: bold;
                border-radius: 5px;
                font-size: 14px;
                box-shadow: 0 3px 0 ${func.active ? '#1e8449' : '#c0392b'};
            `;
            
            toggleBtn.onclick = function() {
                func.active = !func.active;
                executeFunction(func);
                render();
            };
            
            funcDiv.appendChild(funcName);
            funcDiv.appendChild(toggleBtn);
            return funcDiv;
        }
        
        function executeFunction(func) {
            func.pixels.forEach(function(p) {
                var pixel = pixelMap[p.x] && pixelMap[p.x][p.y];
                if (!pixel) return;
                
                if (func.type === 'passable') {
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
                } else if (func.type.startsWith('move_') && func.active) {
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
                                    behavior: behaviors.WALL,
                                    category: elements[pixel.element].category,
                                    state: 'solid'
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
                }
            });
        }
        
        console.log('Functions Tab v9 loaded!');
    }, 1500);
})();
