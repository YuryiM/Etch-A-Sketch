// Buttons and sliders
let colorPicker = document.getElementById('color-pick');
let rainbowButton = document.getElementById('rainbow-mode-toggle');
let eraserButton = document.getElementById('eraser-toggle');
let clearButton = document.getElementById('clear-button');
let slider = document.getElementById('size-slider');

// Variables related to canvas
let sketchbox = document.getElementById('sketchbox');
let pixels = document.getElementsByClassName('pixel');

// State of tools
let brushOn = false;
let eraserOn = false;
let rainbowMode = false;

// Current color, excluding rainbow mode
let color = document.getElementById('color').value;
// List of rainbow mode colors to cycle through
const rainbowColors = ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'];
// Current rainbow mode color
let r = 0;
// Current rainbow color
let currentRainbowColor = rainbowColors[r];

// Color input
document.getElementById('color').addEventListener('input', () => {
    color = document.getElementById('color').value;
    colorPicker.style.backgroundColor = color;
    rainbowMode = false;
    eraserOn = false;
});

// Clears canvas
clearButton.addEventListener('mousedown', () => {
    clearButton.style.backgroundColor = '#0064c2';
    Array.prototype.forEach.call(pixels, (pixel) => {
        pixel.style.backgroundColor = 'white';
    });
});

clearButton.addEventListener('mouseup', () => clearButton.style.backgroundColor = '#0082fc');

// Turns on rainbow mode
rainbowButton.addEventListener('mousedown', () => {
    if(rainbowButton.value == 'OFF'){
        rainbowButton.style.backgroundColor = '#0064c2';
        rainbowButton.value = 'ON';
        rainbowMode = true;
    }
    else if (rainbowButton.value == 'ON'){
        rainbowButton.style.backgroundColor = '#0082fc';
        rainbowButton.value = 'OFF';
        rainbowMode = false;
    }
});

// Turns on eraser 
eraserButton.addEventListener('mousedown', () => {
    if(eraserButton.value == 'OFF'){
        eraserButton.style.backgroundColor = '#0064c2';
        eraserOn = true;
        eraserButton.value = 'ON';
    }
    else if (eraserButton.value == 'ON'){
        eraserButton.style.backgroundColor = '#0082fc';
        eraserOn = false;
        eraserButton.value = 'OFF';
        color = document.getElementById('color').value;;
    }
});

function generateGrid(){
    // Sets grid dimension based on slider val
    dimension = slider.value;
    for(i = 0; i < dimension; i++){
        // Creates row div
        let row = document.createElement('div');
        row.className = 'row';
        for(j = 0; j < dimension; j++){
            // Creates the individual pixel
            let pixel = document.createElement('div');
            pixel.className = 'pixel';
            row.appendChild(pixel);
            // When user mouses over pixel AND has their mouse down on canvas, set pixel to  black
            pixel.addEventListener('mouseover', () => {
                if(brushOn){
                    // Precedence: Eraser > Rainbow > User Color
                    if (eraserOn){
                        pixel.style.backgroundColor = '#FFFFFF';
                    }
                    else if(rainbowMode){
                        pixel.style.backgroundColor = currentRainbowColor;
                        // If on the last color in the array, loop back around
                        (r == rainbowColors.length-1) ? r = 0 : r++;
                        currentRainbowColor = rainbowColors[r];
                        }
                    
                    else {
                        pixel.style.backgroundColor = color;
                    }
                }
            });
        }
        sketchbox.appendChild(row);
    }
}

// Turns on brush if mouse held pressed
sketchbox.addEventListener('mousedown', () => brushOn = true );
// Turns off brush if mouse released
sketchbox.addEventListener('mouseup', () => brushOn = false );

function clearGrid(){
    // While sketchbox still has children, remove them
    while(sketchbox.firstChild){
        sketchbox.removeChild(sketchbox.lastChild);
    }
}

slider.addEventListener('input', () => {
    // Updates canvas size when slider changed
    document.getElementById('canvas-size').innerHTML = slider.value + ' x ' + slider.value;
    clearGrid();
    generateGrid();
}, false);

generateGrid();