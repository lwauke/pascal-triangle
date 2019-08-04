const output = document.querySelector('.output');
const btn = document.querySelector('.generate');
const input = document.querySelector('.height-value');

btn.addEventListener('click', () => {
    const triangle = pascalTriangle(parseInt(input.value));

    output.innerHTML = triangle
        .map(row => row.reduce((acc, cell) => `${acc}<span class="cell">${cell}</span>`,''))
        .reduce((acc, row) => `${acc}<div class="row">${row}</div>`, '')
})

var pascalTriangle = (height, i = 0, actualTriangle = [[ 1 ]]) => {
    const lastRow = actualTriangle.slice(-1)[0];
 
    const newRow = [ ...Array(actualTriangle.length + 1).keys() ].map((e, i) => ((lastRow[i - 1] || 0) + (lastRow[i] || 0)))
 
    const newTriangle = [ ...actualTriangle, newRow ];
 
    return i === height ? newTriangle : pascalTriangle(height, i + 1, newTriangle)
 }