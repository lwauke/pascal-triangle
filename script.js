(function(doc) {
    const output = doc.querySelector('.output');
    const btn = doc.querySelector('.generate');
    const input = doc.querySelector('.height-value');

    const fromNullable = x => x || 0;

    const compose = (f, g) => x => f(g(x));

    const last = arr => arr.slice(-1)[0];

    const sequentialArray = n => ([ ...Array(n).keys() ]);
    
    const pascalTriangle = (height, i = 0, prevTriangle = [[ 1 ]]) => {
        const lastRow = last(prevTriangle);

        const newRowLength = prevTriangle.length + 1;
     
        const newRow = sequentialArray(newRowLength).map((e, i) => fromNullable(lastRow[i - 1]) + fromNullable(lastRow[i]));
     
        const newTriangle = [ ...prevTriangle, newRow ];
     
        return i === height ? newTriangle : pascalTriangle(height, i + 1, newTriangle)
    }

    const safeTriangleGenerator = compose(pascalTriangle, parseInt);

    const generateHTML = (tag, className) => content => `<${tag} class="${className}">${content}</${tag}>`;

    const mapAndJoin = fn => arr => [].map.call(arr, fn).join('');

    const generateCell = generateHTML('span', 'cell');

    const generateRow = generateHTML('div', 'row');

    const matrixToCells = mapAndJoin(generateCell);

    const arrayToRows = mapAndJoin(generateRow);

    btn.addEventListener('click', () => {
        const triangle = safeTriangleGenerator(input.value);

        const cells = triangle.map(matrixToCells);
    
        output.innerHTML = arrayToRows(cells);
    });
})(document);
