let slider = document.getElementById('size-slider');
slider.defaultValue = 16;

let sketchbox = document.getElementById('sketchbox')

function generateGrid(){
    // Sets grid dimension
    dimension = slider.value;
    for(i = 0; i < dimension; i++){
        let row = document.createElement('div');
        row.className = 'row';
        for(j = 0; j < dimension; j++){
            let pixel = document.createElement('div');
            pixel.className = 'pixel';
            row.appendChild(pixel);
        }
        sketchbox.appendChild(row);
    }
}

function clearGrid(){
    // While sketchbox still has children, remove them
    while(sketchbox.firstChild){
        sketchbox.removeChild(sketchbox.lastChild);
    }
}

slider.addEventListener('input', () => {
    // Updates canvas size
    document.getElementById('canvas-size').innerHTML = slider.value + " x " + slider.value;
    clearGrid();
    generateGrid();
}, false);

generateGrid();