// Creates elements to be used later

let slider = document.getElementById('size-slider');

let sketchbox = document.getElementById('sketchbox');

let pixels = document.getElementsByClassName('pixel');

let colorPicker = document.getElementById('color-pick');

let eraser = document.getElementById('eraser-toggle');

let rainbowButton = document.getElementById('rainbow-mode-toggle');

let brushOn = false;

let rainbowMode = false;

let color = document.getElementById('color').value;

let rainbowRed, rainbowGreen, rainbowBlue = 0;

const rainbowColors = ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'];

let r = 0;

let currentRainbowColor = rainbowColors[r];

document.getElementById('color').addEventListener('input', () => {
    color = document.getElementById('color').value;
    colorPicker.style.backgroundColor = color;
    rainbowMode = false;
});

// Clears canvas
document.getElementById('clear-button').addEventListener('click', () => {
    Array.prototype.forEach.call(pixels, (pixel) => {
        pixel.style.backgroundColor = 'white';
    });
});

// Turns on rainbow mode
rainbowButton.addEventListener('mousedown', () => {
    if(rainbowButton.value == 'OFF'){
        rainbowButton.value = 'ON';
        rainbowMode = true;
    }
    else if (rainbowButton.value == 'ON'){
        rainbowButton.value = 'OFF';
        rainbowMode = false;
    }
});

// Turns on eraser 
eraser.addEventListener('mousedown', () => {
    if(eraser.value == 'OFF'){
        eraser.value = 'ON';
        color = '#FFFFFF';
    }
    else if (eraser.value == 'ON'){
        eraser.value = 'OFF';
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
                    if(rainbowMode){
                        pixel.style.backgroundColor = currentRainbowColor;
                        if(r == rainbowColors.length-1) r = 0;
                        else r++;
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
sketchbox.addEventListener('mousedown', () => {
    brushOn = true;
});

sketchbox.addEventListener('mouseup', () => {
    brushOn = false;
});

function clearGrid(){
    // While sketchbox still has children, remove them
    while(sketchbox.firstChild){
        sketchbox.removeChild(sketchbox.lastChild);
    }
}

slider.addEventListener('input', () => {
    // Updates canvas size when slider changed
    document.getElementById('canvas-size').innerHTML = slider.value + " x " + slider.value;
    clearGrid();
    generateGrid();
}, false);

generateGrid();