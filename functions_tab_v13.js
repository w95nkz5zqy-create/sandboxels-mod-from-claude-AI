// Functions Tab - FINAL VERSION - Groups WORK!

(function() {
    console.log('=== FUNCTIONS TAB FINAL LOADING ===');
    
    var groups = [];
    var selectedPixel = null;
    var panel = null;
    
    setTimeout(function() {
        console.log('Initializing...');
        
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
            console.log('Button added to toolbar');
        } else {
            document.body.appendChild(btn);
            console.log('Button added to body');
        }
        
        // Create panel
        panel = document.createElement('div');
        panel.id = 'functions-panel';
        panel.style.cssText = 'display: none; position: fixed; top: 10%; left: 50%; transform: translateX(-50%); width: 700px; max-height: 80%; background: #2c3e50; border: 3px solid black; border-radius: 10px; z-index: 999999; padding: 20px; color: white; overflow-y: auto; font-family: Arial;';
        document.body.appendChild(panel);
        console.log('Panel created');
        
        btn.addEventListener('click', function() {
            console.log('Button clicked!');
            var isVisible = panel.style.display !== 'none';
            panel.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) {
                console.log('Opening panel, rendering...');
                render();
            }
        });
        
        function render() {
            console.log('=== RENDER START ===');
            console.log('Groups:', groups.length);
            
            panel.innerHTML = '';
            
            // Title
            var title = document.createElement('h2');
            title.textContent = 'Functions Control';
            title.style.cssText = 'margin: 0 0 20px 0; color: white;';
            panel.appendChild(title);
            
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
            input.id = 'group-name-input';
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
                console.log('Create clicked! Name:', name);
                
                if (name) {
                    groups.push({
                        name: name,
                        funcs: []
                    });
                    console.log('Group created! Total groups now:', groups.length);
                    input.value = '';
                    render();
                } else {
                    alert('Please enter a group name!');
                }
            });
            
            // Also create on Enter key
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    createBtn.click();
                }
            });
            
            inputRow.appendChild(input);
            inputRow.appendChild(createBtn);
            createDiv.appendChild(inputRow);
            panel.appendChild(createDiv);
            
            // Show groups
            if (groups.length === 0) {
                var empty = document.createElement('div');
                empty.textContent = 'No groups yet. Create one above!';
                empty.style.cssText = 'text-align: center; color: #95a5a6; padding: 40px; background: rgba(0,0,0,0.2); border-radius: 5px;';
                panel.appendChild(empty);
            } else {
                groups.forEach(function(group, index) {
                    console.log('Rendering group:', group.name);
                    var groupDiv = createGroupDiv(group, index);
                    panel.appendChild(groupDiv);
                });
            }
            
            console.log('=== RENDER END ===');
        }
        
        function createGroupDiv(group, index) {
            var groupDiv = document.createElement('div');
            groupDiv.style.cssText = 'background: #34495e; padding: 15px; margin: 10px 0; border-radius: 5px; border: 2px solid #000;';
            
            var header = document.createElement('div');
            header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;';
            
            var groupName = document.createElement('h3');
            groupName.textContent = group.name;
            groupName.style.cssText = 'margin: 0; color: white;';
            
            var addBtn = document.createElement('button');
            addBtn.textContent = '+ Function';
            addBtn.style.cssText = 'background: #3498db; color: white; padding: 8px 16px; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 5px;';
            addBtn.onclick = function() {
                showFunctionForm(group, groupDiv);
            };
            
            header.appendChild(groupName);
            header.appendChild(addBtn);
            groupDiv.appendChild(header);
            
            // Show functions
            group.funcs.forEach(function(func) {
                var funcDiv = document.createElement('div');
                funcDiv.style.cssText = 'background: #2c3e50; padding: 10px; margin: 5px 0; border-radius: 3px; border: 2px solid #000;';
                
                var funcName = document.createElement('div');
                funcName.textContent = func.name + ' (' + func.type + ')';
                funcName.style.cssText = 'font-weight: bold; margin-bottom: 8px;';
                funcDiv.appendChild(funcName);
                
                // Create control based on type
                if (func.control === 'toggle') {
                    var toggle = document.createElement('button');
                    toggle.textContent = func.active ? 'ON' : 'OFF';
                    toggle.style.cssText = 'width: 100%; padding: 10px; background: ' + (func.active ? '#27ae60' : '#e74c3c') + '; color: white; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 5px;';
                    toggle.onclick = function() {
                        func.active = !func.active;
                        console.log('Toggle:', func.name, func.active);
                        executeFunction(func);
                        render();
                    };
                    funcDiv.appendChild(toggle);
                    
                } else if (func.control === 'button') {
                    var btnContainer = document.createElement('div');
                    btnContainer.style.cssText = 'display: flex; gap: 5px; align-items: center;';
                    
                    var btn = document.createElement('button');
                    btn.textContent = 'ACTIVATE';
                    btn.style.cssText = 'flex: 1; padding: 10px; background: #3498db; color: white; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 5px;';
                    
                    var durationInput = document.createElement('input');
                    durationInput.type = 'number';
                    durationInput.value = '1';
                    durationInput.min = '0.1';
                    durationInput.step = '0.1';
                    durationInput.style.cssText = 'width: 60px; padding: 8px; background: #34495e; color: white; border: 2px solid black; border-radius: 3px;';
                    
                    var secLabel = document.createElement('span');
                    secLabel.textContent = 's';
                    secLabel.style.cssText = 'color: white;';
                    
                    btn.onclick = function() {
                        var duration = parseFloat(durationInput.value) * 1000 || 1000;
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
                    slider.value = func.value || 50;
                    slider.style.cssText = 'width: 100%; margin-bottom: 5px;';
                    
                    var valueLabel = document.createElement('div');
                    valueLabel.textContent = 'Value: ' + (func.value || 50);
                    valueLabel.style.cssText = 'text-align: center; color: white; font-weight: bold;';
                    
                    slider.oninput = function() {
                        func.value = parseInt(slider.value);
                        func.active = true;
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
        
        function showFunctionForm(group, groupDiv) {
            var existingForm = groupDiv.querySelector('.func-form');
            if (existingForm) {
                existingForm.remove();
                return;
            }
            
            var form = document.createElement('div');
            form.className = 'func-form';
            form.style.cssText = 'background: #1a252f; padding: 15px; margin: 10px 0; border: 2px solid #3498db; border-radius: 5px;';
            
            var formTitle = document.createElement('h4');
            formTitle.textContent = 'New Function';
            formTitle.style.cssText = 'margin: 0 0 10px 0; color: #3498db;';
            form.appendChild(formTitle);
            
            // Select pixel
            var selectBtn = document.createElement('button');
            selectBtn.textContent = 'Select Pixel';
            selectBtn.style.cssText = 'width: 100%; background: #e67e22; color: white; padding: 10px; border: 2px solid black; cursor: pointer; margin-bottom: 5px; border-radius: 5px; font-weight: bold;';
            
            var info = document.createElement('div');
            info.style.cssText = 'background: #0d1117; padding: 8px; margin-bottom: 10px; border-radius: 3px; color: #3498db; font-size: 13px;';
            info.textContent = 'No pixel selected';
            
            var selecting = false;
            selectBtn.onclick = function() {
                selecting = !selecting;
                selectBtn.style.background = selecting ? '#d35400' : '#e67e22';
                selectBtn.textContent = selecting ? 'Click canvas...' : 'Select Pixel';
            };
            
            var canvas = document.getElementById('game');
            var clickHandler = function(e) {
                if (!selecting) return;
                
                var rect = canvas.getBoundingClientRect();
                var x = Math.floor((e.clientX - rect.left) / pixelSize);
                var y = Math.floor((e.clientY - rect.top) / pixelSize);
                
                if (pixelMap[x] && pixelMap[x][y]) {
                    selectedPixel = {x: x, y: y, elem: pixelMap[x][y].element};
                    info.textContent = '✓ Selected: ' + selectedPixel.elem + ' at (' + x + ', ' + y + ')';
                    info.style.color = '#27ae60';
                    selecting = false;
                    selectBtn.style.background = '#e67e22';
                    selectBtn.textContent = 'Select Pixel';
                }
            };
            canvas.addEventListener('click', clickHandler);
            
            // Name
            var nameInput = document.createElement('input');
            nameInput.placeholder = 'Function name';
            nameInput.style.cssText = 'width: 100%; padding: 10px; background: #34495e; color: white; border: 2px solid black; margin-bottom: 10px; border-radius: 3px; box-sizing: border-box;';
            
            // Type
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
            `;
            
            // Control type
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
            
            // Extension distance (only for extend functions)
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
            extendInput.placeholder = 'How many pixels to extend';
            extendInput.style.cssText = 'width: 100%; padding: 10px; background: #34495e; color: white; border: 2px solid black; border-radius: 3px; box-sizing: border-box;';
            
            extendSettings.appendChild(extendLabel);
            extendSettings.appendChild(extendInput);
            
            // Show/hide extend settings based on function type
            typeSelect.onchange = function() {
                if (typeSelect.value.startsWith('extend_')) {
                    extendSettings.style.display = 'block';
                } else {
                    extendSettings.style.display = 'none';
                }
            };
            
            // Create button
            var createFuncBtn = document.createElement('button');
            createFuncBtn.textContent = 'Create Function';
            createFuncBtn.style.cssText = 'width: 100%; background: #27ae60; color: white; padding: 12px; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 5px;';
            createFuncBtn.onclick = function() {
                if (!nameInput.value || !selectedPixel) {
                    alert('Need name and pixel!');
                    return;
                }
                
                group.funcs.push({
                    name: nameInput.value,
                    type: typeSelect.value,
                    control: controlSelect.value,
                    pixel: JSON.parse(JSON.stringify(selectedPixel)),
                    active: false,
                    value: 50,
                    extendDistance: parseInt(extendInput.value) || 5,
                    extensions: []
                });
                
                canvas.removeEventListener('click', clickHandler);
                selectedPixel = null;
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
            console.log('Executing function:', func.name, 'Type:', func.type, 'Active:', func.active);
            
            var pixel = pixelMap[func.pixel.x] && pixelMap[func.pixel.x][func.pixel.y];
            if (!pixel) {
                console.log('Pixel not found at', func.pixel.x, func.pixel.y);
                return;
            }
            
            if (func.type === 'passable') {
                if (elements[pixel.element]) {
                    if (func.active) {
                        elements[pixel.element].passable = true;
                        console.log('Set passable=true for', pixel.element);
                    } else {
                        delete elements[pixel.element].passable;
                        console.log('Removed passable from', pixel.element);
                    }
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
                
                console.log('Trying to move', dir, 'from', pixel.x, pixel.y, 'to', newX, newY);
                
                if (isEmpty(newX, newY)) {
                    movePixel(pixel, newX, newY);
                    func.pixel.x = newX;
                    func.pixel.y = newY;
                    console.log('Moved successfully!');
                } else {
                    console.log('Target position blocked');
                }
            } else if (func.type.startsWith('extend_')) {
                var dir = func.type.split('_')[1];
                var dx = 0, dy = 0;
                
                if (dir === 'up') dy = -1;
                if (dir === 'down') dy = 1;
                if (dir === 'left') dx = -1;
                if (dir === 'right') dx = 1;
                
                // Always clear old extensions first
                if (func.extensions && func.extensions.length > 0) {
                    func.extensions.forEach(function(ext) {
                        if (pixelMap[ext.x] && pixelMap[ext.x][ext.y]) {
                            deletePixel(ext.x, ext.y);
                        }
                    });
                    func.extensions = [];
                }
                
                if (func.active) {
                    // Create new extensions
                    var distance = func.extendDistance || 5;
                    
                    // If slider control, multiply by slider value
                    if (func.control === 'slider') {
                        distance = Math.floor((func.extendDistance || 5) * (func.value / 50));
                    }
                    
                    console.log('Creating extensions, distance:', distance);
                    
                    for (var i = 1; i <= distance; i++) {
                        var extX = pixel.x + (dx * i);
                        var extY = pixel.y + (dy * i);
                        
                        if (isEmpty(extX, extY)) {
                            var extName = pixel.element + '_extension';
                            if (!elements[extName]) {
                                console.log('Creating new element type:', extName);
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
                            console.log('Created extension at', extX, extY);
                        } else {
                            console.log('Position blocked at', extX, extY);
                        }
                    }
                    console.log('Total extensions created:', func.extensions.length);
                }
            }
        }
        
        console.log('=== FUNCTIONS TAB FINAL LOADED ===');
    }, 1000);
})();
