let slider = document.getElementById('size-slider');
slider.defaultValue = 16;

let sketchbox = document.getElementById('sketchbox');

let pixels = document.getElementsByClassName('pixel');

let brushOn = false;

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
                if(brushOn) pixel.style.backgroundColor = '#000000';
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

Array.prototype.forEach.call(pixels, (pixel)=> {

    console.log('HEY111');
    
}, false);



slider.addEventListener('input', () => {
    // Updates canvas size when slider changed
    document.getElementById('canvas-size').innerHTML = slider.value + " x " + slider.value;
    clearGrid();
    generateGrid();
}, false);

generateGrid();