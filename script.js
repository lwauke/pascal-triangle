(function(doc) {
  const output = doc.querySelector('.output');
  const btn = doc.querySelector('.generate');
  const input = doc.querySelector('.height-value');
  const msg = doc.querySelector('.msg');

  const limit = 800;
  const errMsg = `Can't calc: type a value smaller than ${limit} (work in progress: optimization)`;

  const showMessage = text => {
    msg.classList.remove('hidden');
    msg.textContent = text;
  }

  const hideMessage = () => msg.classList.add('hidden')

  const last = arr => arr.slice(-1)[0];
  
  function pascalTriangle(height, prevTriangle = [[ 1 ]]) {
    this.cache = this.cache || {};    

    const lastRow = last(prevTriangle);

    const newRowLength = prevTriangle.length + 1;

    let newTriangle;
    
    if(this.cache[newRowLength] !== undefined) {
      newTriangle = this.cache[newRowLength];
    } else {
      const shiftLeft = [0, ...lastRow];
      const shiftRight = [...lastRow, 0];
    
      const newRow = shiftLeft.map((n, i) => n + shiftRight[i]);
    
      newTriangle = [ ...prevTriangle, newRow ];
  
      this.cache[newRowLength] =  newTriangle;
    }
  
    return newRowLength === height ? newTriangle : pascalTriangle(height, newTriangle)
  }

  btn.addEventListener('click', () => {
    const rows = parseInt(input.value);

    if(rows > limit) {
      output.innerHTML = '';
      return showMessage(errMsg);
    }

    hideMessage();

    const triangle = pascalTriangle(rows);

    output.innerHTML = triangle
      .map(
        row =>
          row.reduce(
            (acc, cell) => `${acc}<span class="cell">${cell}</span>`,''
          )
      )
      .reduce(
        (acc, row) => `${acc}<div class="row">${row}</div>`, ''
      );
  })
})(document);
