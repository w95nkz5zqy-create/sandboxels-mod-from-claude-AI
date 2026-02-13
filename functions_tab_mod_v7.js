// Functions Tab v7 - Fixed Group Creation

(function() {
    'use strict';
    
    var selectedPixels = [];
    var functionGroups = [];
    
    console.log('Functions Tab v7 starting...');
    
    // Wait for Sandboxels to load
    var checkInterval = setInterval(function() {
        if (typeof elements !== 'undefined' && typeof pixelMap !== 'undefined') {
            clearInterval(checkInterval);
            init();
        }
    }, 100);
    
    function init() {
        console.log('Initializing Functions Tab...');
        
        // Create button
        var btn = document.createElement('button');
        btn.textContent = 'Functions';
        btn.style.cssText = 'background: #9370DB; color: white; padding: 5px 10px; margin: 2px; border: 2px solid black; font-weight: bold; cursor: pointer;';
        
        // Add to toolbar
        setTimeout(function() {
            var toolbar = document.querySelector('#toolbar');
            if (!toolbar) {
                var buttons = document.querySelectorAll('button');
                if (buttons.length > 0) {
                    toolbar = buttons[0].parentElement;
                }
            }
            if (toolbar) {
                toolbar.appendChild(btn);
                console.log('Functions button added');
            }
        }, 1000);
        
        // Create panel
        var panel = document.createElement('div');
        panel.style.cssText = 'display: none; position: fixed; top: 10%; left: 50%; transform: translateX(-50%); width: 700px; max-height: 80%; background: #2c3e50; border: 3px solid black; border-radius: 10px; z-index: 999999; overflow: auto; padding: 20px; color: white; font-family: Arial;';
        document.body.appendChild(panel);
        
        btn.onclick = function() {
            if (panel.style.display === 'none') {
                panel.style.display = 'block';
                render();
            } else {
                panel.style.display = 'none';
            }
        };
        
        function render() {
            panel.innerHTML = '';
            
            var title = document.createElement('h2');
            title.textContent = 'Functions Control';
            title.style.cssText = 'margin: 0 0 15px 0;';
            panel.appendChild(title);
            
            // Add group button
            var addGroupBtn = document.createElement('button');
            addGroupBtn.textContent = '+ Add Function Group';
            addGroupBtn.style.cssText = 'background: #27ae60; color: white; padding: 10px 20px; border: 2px solid black; cursor: pointer; width: 100%; font-weight: bold; font-size: 14px; margin-bottom: 15px; border-radius: 5px;';
            
            addGroupBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Add group clicked');
                
                var groupName = window.prompt('Enter function group name:');
                console.log('Group name entered:', groupName);
                
                if (groupName && groupName.trim() !== '') {
                    functionGroups.push({
                        name: groupName.trim(),
                        functions: []
                    });
                    console.log('Group added. Total groups:', functionGroups.length);
                    render();
                }
            }, true);
            
            panel.appendChild(addGroupBtn);
            
            // Display groups
            if (functionGroups.length === 0) {
                var emptyMsg = document.createElement('div');
                emptyMsg.textContent = 'No function groups yet. Click the button above to create one.';
                emptyMsg.style.cssText = 'color: #95a5a6; text-align: center; padding: 40px; font-size: 14px;';
                panel.appendChild(emptyMsg);
            } else {
                functionGroups.forEach(function(group, index) {
                    var groupDiv = createGroupElement(group, index);
                    panel.appendChild(groupDiv);
                });
            }
        }
        
        function createGroupElement(group, index) {
            var groupDiv = document.createElement('div');
            groupDiv.style.cssText = 'background: #34495e; padding: 15px; margin: 10px 0; border-radius: 8px; border: 2px solid #000;';
            
            var groupHeader = document.createElement('div');
            groupHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;';
            
            var groupName = document.createElement('h3');
            groupName.textContent = group.name;
            groupName.style.cssText = 'margin: 0; color: white;';
            
            var addFuncBtn = document.createElement('button');
            addFuncBtn.textContent = '+ Add Function';
            addFuncBtn.style.cssText = 'background: #3498db; color: white; padding: 8px 16px; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 5px;';
            
            addFuncBtn.onclick = function() {
                showFunctionForm(group, groupDiv);
            };
            
            groupHeader.appendChild(groupName);
            groupHeader.appendChild(addFuncBtn);
            groupDiv.appendChild(groupHeader);
            
            // Display functions
            group.functions.forEach(function(func) {
                var funcElement = createFunctionElement(func);
                groupDiv.appendChild(funcElement);
            });
            
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
            form.style.cssText = 'background: #2c3e50; padding: 15px; margin: 10px 0; border: 2px solid #3498db; border-radius: 5px;';
            
            var formTitle = document.createElement('h4');
            formTitle.textContent = 'Create New Function';
            formTitle.style.cssText = 'margin: 0 0 10px 0;';
            form.appendChild(formTitle);
            
            // Select pixel section
            var selectBtn = document.createElement('button');
            selectBtn.textContent = '🖱️ Select Pixel from Canvas';
            selectBtn.style.cssText = 'background: #e67e22; color: white; padding: 8px; border: 2px solid black; cursor: pointer; width: 100%; margin-bottom: 5px; border-radius: 5px; font-weight: bold;';
            
            var selectedInfo = document.createElement('div');
            selectedInfo.style.cssText = 'background: #1a252f; padding: 8px; margin-bottom: 10px; border-radius: 3px; font-size: 12px; color: #3498db;';
            selectedInfo.textContent = 'No pixel selected';
            
            var isSelecting = false;
            selectBtn.onclick = function() {
                isSelecting = true;
                selectBtn.style.background = '#d35400';
                selectBtn.textContent = '🖱️ Now click a pixel on the canvas...';
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
            nameInput.placeholder = 'Function name (e.g., "Door Control")';
            nameInput.style.cssText = 'width: 100%; padding: 8px; margin-bottom: 10px; background: #34495e; color: white; border: 2px solid black; border-radius: 3px; box-sizing: border-box;';
            
            // Type select
            var typeSelect = document.createElement('select');
            typeSelect.style.cssText = 'width: 100%; padding: 8px; margin-bottom: 10px; background: #34495e; color: white; border: 2px solid black; border-radius: 3px;';
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
            var btnContainer = document.createElement('div');
            btnContainer.style.cssText = 'display: flex; gap: 10px;';
            
            var createBtn = document.createElement('button');
            createBtn.textContent = 'Create Function';
            createBtn.style.cssText = 'flex: 1; background: #27ae60; color: white; padding: 10px; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 5px;';
            
            createBtn.onclick = function() {
                if (!nameInput.value || !typeSelect.value) {
                    alert('Please enter a name and select a type!');
                    return;
                }
                
                if (selectedPixels.length === 0) {
                    alert('Please select a pixel first!');
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
            cancelBtn.style.cssText = 'background: #95a5a6; color: white; padding: 10px 20px; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 5px;';
            cancelBtn.onclick = function() {
                canvas.removeEventListener('click', clickHandler);
                form.remove();
            };
            
            btnContainer.appendChild(createBtn);
            btnContainer.appendChild(cancelBtn);
            
            form.appendChild(selectBtn);
            form.appendChild(selectedInfo);
            form.appendChild(nameInput);
            form.appendChild(typeSelect);
            form.appendChild(btnContainer);
            
            groupDiv.appendChild(form);
        }
        
        function createFunctionElement(func) {
            var funcDiv = document.createElement('div');
            funcDiv.style.cssText = 'background: #2c3e50; padding: 12px; margin: 8px 0; border-radius: 5px; border: 2px solid #000;';
            
            var funcName = document.createElement('div');
            funcName.textContent = func.name + ' (' + func.type.replace(/_/g, ' ') + ')';
            funcName.style.cssText = 'font-weight: bold; margin-bottom: 8px; font-size: 14px;';
            
            var toggleBtn = document.createElement('button');
            toggleBtn.textContent = func.active ? 'ON' : 'OFF';
            toggleBtn.style.cssText = 'width: 100%; padding: 10px; background: ' + (func.active ? '#27ae60' : '#e74c3c') + '; color: white; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 5px;';
            
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
            func.pixels.forEach(function(pixelData) {
                var pixel = pixelMap[pixelData.x] && pixelMap[pixelData.x][pixelData.y];
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
        
        console.log('Functions Tab v7 loaded successfully!');
    }
})();
