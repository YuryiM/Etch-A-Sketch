let slider = document.getElementById('size-slider');
slider.defaultValue = 16;

let sketchbox = document.getElementById('sketchbox')

function generateGrid(){
    // Default dimension 16x16
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
    while(sketchbox.firstChild){
        sketchbox.removeChild(sketchbox.lastChild);
    }
}

slider.addEventListener('input', () => {
    document.getElementById('canvas-size').innerHTML = slider.value + " x " + slider.value;
    clearGrid();
    generateGrid();
}, false);

generateGrid();