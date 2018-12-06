(function ticTacToe() {
  const container = document.querySelector('.container');
  const fields = {};
  let lastPlayer = '0';

  const conditions = {
    0: [0, 1, 2],
    1: [3, 4, 5],
    2: [6, 7, 8],
    3: [0, 3, 6],
    4: [1, 4, 7],
    5: [2, 5, 8],
    6: [0, 4, 8],
    7: [2, 4, 6],
  };

  const createElement = (tag, parentElem, elemClass) => {
    const createdElem = document.createElement(tag);
    parentElem.appendChild(createdElem);
    createdElem.classList.add(elemClass);
    return createdElem;
  };

  const tikTakToe = createElement('div', container, 'tic-tac-toe');

  const createFields = () => {
    for (let i = 0; i < 9; i += 1) {
      fields[i] = {
        value : '',
      };
    }
  };

  const setBorders = (objCell, randeredCell) => {
    if (objCell < 6) {
      randeredCell.classList.add('border-bottom');
    }
    if (objCell === '0' || objCell === '1' || objCell === '3' || objCell === '4' || objCell === '6' || objCell === '7') {
      randeredCell.classList.add('border-right');
    }
  };

  const randerFields = (field) => {
    tikTakToe.innerHTML = '';
    for (cell in field) {
      const cellItem = createElement('div', tikTakToe, 'tic-tac-toe__cell');
      cellItem.setAttribute('data-cell', `${cell}`);
      cellItem.innerHTML = field[cell].value;
      setBorders(cell, cellItem);
    }
    const againButton = createElement('div', tikTakToe, 'tic-tac-toe__again-button');
    againButton.innerHTML = 'Try again';
    againButton.dataset.button = 'again';
  };

  const setCurrentSign = (event) => {
    if (lastPlayer === '0') {
      fields[event.target.dataset.cell].value = 'x';
      lastPlayer = 'x';
    } else {
      fields[event.target.dataset.cell].value = '0';
      lastPlayer = '0';
    }
    Object.freeze(fields[event.target.dataset.cell]);
  };

  const checkWin = (last) => {
    let status = false;
    for (conditon in conditions) {
      const cond = conditions[conditon];
      let counter = 0;
      for (coord of cond) {
        if (fields[coord].value === last) {
          counter++;
          console.log(counter);
          if(counter === 3) {
            status = true;
            setTimeout(function() { 
              alert(`win ${last}`);
              createFields();
              randerFields(fields);
            }, 200);
            lastPlayer = '0';
            
          }
        }
      }
    }
    if (status === false) {
      let i = 0;
      let count = 0;
      while (fields.hasOwnProperty(i)) {
        if (fields[i].value !== '') {
          count += 1;
        }
        i += 1;
        console.log('count', count);
        if (count === 9 && status === false) {
          alert('DROW');
          return true;
        }
      }
    }
  };

  const ticTacToeAddEventListener = (event) => {
    if (event.target.dataset.button === 'again') {
      createFields();
      randerFields(fields);
    }
    setCurrentSign(event);
    randerFields(fields);
    checkWin(lastPlayer);
  };
  createFields();
  randerFields(fields);
  tikTakToe.addEventListener('click', ticTacToeAddEventListener);
}());
