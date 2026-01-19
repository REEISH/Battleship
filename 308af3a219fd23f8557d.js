import { game } from './modules/game.js';
import './styles.css';
const HTML = document;
const CHOOSESHIPS = HTML.getElementById('choose-ships');
const FORM = HTML.getElementById('form');
const BOARDS = HTML.getElementById('boards');

let match = new game();

let colorHitBoard = 0;
let filled1 = 0;
let filled2 = 0;
let matchON = true;
let init = false;
let comp = true;
let array = [];
let shipH1, hitH1, shipH2, hitH2;
let isDragDone = [false, false, false, false, false];
let isAdded = [false, false, false, false, false];
let wannaRotate = [false, false, false, false, false];
let shipClassComp = [
  'Carrier',
  'Battleship',
  'Cruiser',
  'Subamrine',
  'Destroyer',
];
let shipClassH1 = [
  'Carrier-1',
  'Battleship-1',
  'Cruiser-1',
  'Subamrine-1',
  'Destroyer-1',
];
let shipClassH2 = [
  'Carrier-2',
  'Battleship-2',
  'Cruiser-2',
  'Subamrine-2',
  'Destroyer-2',
];
let typeNum = [3, 2, 1, 1, 0];
let currPlayer = 1;
let hitArray1 = [];
let hitArray2 = [];
for (let i = 0; i < 10; i++) {
  let row1 = [];
  let row2 = [];
  for (let j = 0; j < 10; j++) {
    row1.push(0);
    row2.push(0);
  }
  hitArray1.push(row1);
  hitArray2.push(row2);
}

function getLength(shipClass, id) {
  if (id == shipClass[0]) return 5;
  else if (id == shipClass[1]) return 4;
  else if (id == shipClass[2]) return 3;
  else if (id == shipClass[3]) return 3;
  else if (id == shipClass[4]) return 2;
}

function getId(shipClass, id) {
  if (id == shipClass[0]) return 1;
  else if (id == shipClass[1]) return 2;
  else if (id == shipClass[2]) return 3;
  else if (id == shipClass[3]) return 4;
  else if (id == shipClass[4]) return 5;
}

function removeVisibility(id) {
  if (id == 'ship-board-1') {
    shipH1 = HTML.getElementById(id);
    console.log(shipH1);
    shipH1 = BOARDS.removeChild(shipH1);
  } else if (id == 'ship-board-2') {
    shipH2 = HTML.getElementById(id);
    console.log(shipH2);
    shipH2 = BOARDS.removeChild(shipH2);
  } else if (id == 'hit-board-1') {
    hitH1 = HTML.getElementById(id);
    hitH1 = BOARDS.removeChild(hitH1);
  } else if (id == 'hit-board-2') {
    hitH2 = HTML.getElementById(id);
    hitH2 = BOARDS.removeChild(hitH2);
  }
}

function makeVisibility(id) {
  if (id == 'ship-board-1') {
    BOARDS.appendChild(shipH1);
  } else if (id == 'ship-board-2') {
    BOARDS.appendChild(shipH2);
  } else if (id == 'hit-board-1') {
    BOARDS.appendChild(hitH1);
  } else if (id == 'hit-board-2') {
    BOARDS.appendChild(hitH2);
  }
}

function buttonUpdate(length, posX, posY, id, append, shipClass) {
  let height = 10 * length;
  let leftMargin = (posX - 1) * 10;
  let topMargin = (posY - 1) * 10;
  if (!isAdded[getId(shipClass, id) - 1]) {
    let A = HTML.createElement('div');
    A.setAttribute('class', 'ship-draggable');
    A.setAttribute('id', id);
    const shipBoard = HTML.getElementById(append);
    A.setAttribute('draggable', 'true');
    A.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
      A.style.opacity = '1';
    });
    A.addEventListener('dragend', (e) => {
      A.style.opacity = '1';
    });
    A.setAttribute(
      'style',
      'display: grid;cursor:grab;position:absolute;z-index:5;width: 10%;height:' +
        height +
        '%;margin-left:' +
        leftMargin +
        '%;margin-top:' +
        topMargin +
        '%;background-color: rgba(202, 214, 214, 1);grid-template-columns: repeat(1, 1fr);grid-template-rows: repeat(' +
        length +
        ' , 1fr);border: 0.1% solid black;',
    );
    shipBoard.appendChild(A);
    console.log(HTML.getElementById(id.toLowerCase()));
    isAdded[getId(shipClass, id) - 1] = true;
    HTML.getElementById(id.toLowerCase()).innerText = '↺';
  } else if (!wannaRotate[getId(shipClass, id) - 1]) {
    wannaRotate[getId(shipClass, id) - 1] = true;
    const A = HTML.getElementById(id);
    console.log(id, A);
    A.setAttribute(
      'style',
      'display: grid;cursor:grab;position:absolute;z-index:5;height: 10%;width:' +
        height +
        '%;margin-left:' +
        leftMargin +
        '%;margin-top:' +
        topMargin +
        '%;background-color: rgba(202, 214, 214, 1);grid-template-rows: repeat(1, 1fr);grid-template-columns: repeat(' +
        length +
        ' , 1fr);border: 0.1% solid black;',
    );
    HTML.getElementById(id.toLowerCase()).style.display = 'none';
  } else {
    if (typeNum[getId(shipClass, id) - 1] == 0) return;
    array.push({
      id: getId(id),
      x: posY,
      y: posX,
      type: typeNum[getId(shipClass, id) - 1],
      config: 0,
    });
  }
}

function createShipButton(shipType, len, id, shipClass) {
  let shipButton = HTML.createElement('button');
  shipButton.setAttribute('type', 'button');
  shipButton.setAttribute('class', 'ship-type');
  shipButton.setAttribute('id', shipType.toLowerCase());
  shipButton.innerText = shipType;
  shipButton.setAttribute(
    'style',
    'display: flex;width: 10%;height: 50%;font-weight: 700;border-radius: 2vh 2vh 2vh 2vh;font-size: 100%;justify-content: center;align-items: center;background-color: rgb(236, 240, 243);',
  );
  shipButton.addEventListener(
    'click',
    buttonUpdate.bind(this, len, 1, 1, shipType, id, shipClass),
  );
  return shipButton;
}

function addShipType(shipClass, id) {
  CHOOSESHIPS.innerHTML = '';
  let carrier = createShipButton(shipClass[0], 5, id, shipClass);
  let battleship = createShipButton(shipClass[1], 4, id, shipClass);
  let cruiser = createShipButton(shipClass[2], 3, id, shipClass);
  let submarine = createShipButton(shipClass[3], 3, id, shipClass);
  let destroyer = createShipButton(shipClass[4], 2, id, shipClass);
  CHOOSESHIPS.appendChild(carrier);
  CHOOSESHIPS.appendChild(battleship);
  CHOOSESHIPS.appendChild(cruiser);
  CHOOSESHIPS.appendChild(submarine);
  CHOOSESHIPS.appendChild(destroyer);
}

function createInterim() {
  let pass = HTML.createElement('div');
  pass.setAttribute('id', 'pass');
  pass.innerText = 'PASS';
  pass.setAttribute(
    'style',
    'display:flex;width:20%;height:20%;position:relative;align-items:center;justify-content:center;font-weight:700;background-color:rgba(20, 230, 226, 1);border-radius:1.5vh 1.5vh 1.5vh 1.5vh;',
  );
  pass.addEventListener('click', () => {
    if (!init) {
      addShipType(shipClassH2, 'ship-board-2');
      createBoards(shipClassH2, 'ship-board-2', 'hit-board-2');
      let pass = HTML.getElementById('pass');
      BOARDS.removeChild(pass);
      init = true;
    }
    if (init) {
      if (currPlayer == 1) {
        let pass = HTML.getElementById('pass');
        makeVisibility('ship-board-2');
        makeVisibility('hit-board-2');
        BOARDS.removeChild(pass);
        currPlayer = 2;
      } else if (currPlayer == 2) {
        let pass = HTML.getElementById('pass');
        makeVisibility('ship-board-1');
        makeVisibility('hit-board-1');
        BOARDS.removeChild(pass);
        currPlayer = 1;
      }
    }
  });
  return pass;
}

function createGridElement() {
  let gridElement = HTML.createElement('div');
  gridElement.setAttribute('class', 'grid-item');
  gridElement.setAttribute(
    'style',
    'display: flex;justify-content: center;align-items: center;text-align: center;box-sizing: border-box;border: 1px solid rgb(13, 0, 0);',
  );

  return gridElement;
}

function createBoardElement(id) {
  let board = HTML.createElement('div');
  board.setAttribute('id', id);
  board.setAttribute(
    'style',
    'overflow:hidden;position:relative;display: grid;width: 40%;height: 80%;background-color: rgb(19, 243, 239);grid-template-columns: repeat(10, 1fr);grid-template-rows: repeat(10, 1fr);border: 0.1% solid black;',
  );
  return board;
}

function gameEndLogic() {
  BOARDS.innerHTML = '';
  //FORM.style.visibility = 'visible';
  // setTimeout(() => {}, 5000);
  // CHOOSESHIPS.innerHTML = '';
  filled1 = filled2 = 0;
  init = false;
  comp = true;
  matchON = true;
  match = new game();
  array = [];
  for (let i = 0; i < 5; i++) {
    isAdded[i] = isDragDone[i] = wannaRotate[i] = false;
  }
  typeNum = [3, 2, 1, 1, 0];
  currPlayer = 1;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) hitArray1[i][j] = hitArray2[i][j] = 0;
  }
}

function visibleLogic(mark) {
  if (mark == 1) {
    removeVisibility('ship-board-1');
    removeVisibility('hit-board-1');
    makeVisibility('ship-board-2');
    makeVisibility('hit-board-2');
  } else if (mark == 2) {
    removeVisibility('ship-board-2');
    removeVisibility('hit-board-2');
    makeVisibility('ship-board-1');
    makeVisibility('hit-board-1');
  }
}

const PASS = createInterim();

function createBoards(shipClass, id1, id2) {
  let shipBoard = createBoardElement(id1);
  let hitBoard = createBoardElement(id2);
  for (let i = 0; i < 100; i++) {
    let shipGridElement = createGridElement();
    let hitGridElement = createGridElement();
    hitGridElement.addEventListener('click', () => {
      if (matchON == false) return;
      if (true) {
        console.log(i, currPlayer);
        if (comp) playAgainstComputer(i, id1);
        else {
          humanMatchup(currPlayer, i);
        }
      }
      if (currPlayer == 1) {
        console.log(hitArray1);
        if (hitArray1[Math.floor(i / 10)][i % 10] == 1) {
          if (colorHitBoard == 1) {
            hitGridElement.style.backgroundColor = 'red';
            colorHitBoard = 0;
          } else hitGridElement.style.backgroundColor = 'green';
          if (!comp) {
            console.log(shipH1, shipH2);
            setTimeout(() => {}, 2000);
            removeVisibility('ship-board-1');
            removeVisibility('hit-board-1');
            BOARDS.appendChild(PASS);
            //visibleLogic(1);
            //setTimeout(visibleLogic, 1000, 1);
          }
        }
      } else if (currPlayer == 2 && !comp) {
        console.log(hitArray2);
        if (hitArray2[Math.floor(i / 10)][i % 10] == 1) {
          if (colorHitBoard == 1) {
            hitGridElement.style.backgroundColor = 'red';
            colorHitBoard = 0;
          } else hitGridElement.style.backgroundColor = 'green';
          if (!comp) {
            console.log(shipH1, shipH2);
            // setTimeout(() => {}, 2000);
            removeVisibility('ship-board-2');
            removeVisibility('hit-board-2');
            BOARDS.appendChild(PASS);
            //visibleLogic(2);
            //setTimeout(visibleLogic, 1000, 2);
          }
        }
      }
    });
    hitGridElement.setAttribute('id', i.toString());
    shipBoard.appendChild(shipGridElement);
    hitBoard.appendChild(hitGridElement);
  }
  shipBoard.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  shipBoard.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const offsetX = e.clientX - shipBoard.getBoundingClientRect().left;
    const offsetY = e.clientY - shipBoard.getBoundingClientRect().top;
    const x = Math.floor((offsetX / shipBoard.clientWidth) * 10) * 10;
    const y = Math.floor((offsetY / shipBoard.clientHeight) * 10) * 10;
    console.log(x, y);
    const draggedElement = HTML.getElementById(data);
    console.log(data, draggedElement);
    let length = getLength(shipClass, draggedElement.id);
    if (isDragDone[getId(shipClass, draggedElement.id) - 1]) return;
    if (draggedElement) {
      if (!wannaRotate[getId(draggedElement.id) - 1] && y + 10 * length > 100) {
        draggedElement.style.left = x + '%';
        draggedElement.style.top = 100 - 10 * length + '%';
      } else if (
        wannaRotate[getId(shipClass, draggedElement.id) - 1] &&
        x + 10 * length > 100
      ) {
        draggedElement.style.left = 100 - 10 * length + '%';
        draggedElement.style.top = y + '%';
      } else {
        draggedElement.style.left = x + '%';
        draggedElement.style.top = y + '%';
      }
      isDragDone[getId(shipClass, draggedElement.id) - 1] = true;
      HTML.getElementById(draggedElement.id.toLowerCase()).style.display =
        'none';
      array.push({
        id: getId(shipClass, draggedElement.id),
        y: x / 10 + 1,
        x: y / 10 + 1,
        type: typeNum[getId(shipClass, draggedElement.id) - 1],
        config: wannaRotate[getId(shipClass, draggedElement.id) - 1] ? 0 : 1,
      });
      if (filled1 < 5) {
        filled1++;
        if (filled1 == 5) {
          if (!comp) {
            removeVisibility(id1);
            removeVisibility(id2);
            for (let i = 0; i < 5; i++) isDragDone[i] = isAdded[i] = false;
            BOARDS.appendChild(PASS);
            // addShipType(shipClassH2, 'ship-board-2');
            // createBoards(shipClassH2, 'ship-board-2', 'hit-board-2');
            console.log(array);
            match.player1.humanPlayerInsertShip(array);
            wannaRotate = [false, false, false, false, false];
            array = [];
          }
        }
      } else {
        filled2++;
        if (filled2 == 5) {
          removeVisibility(id1);
          removeVisibility(id2);
          makeVisibility('ship-board-1');
          makeVisibility('hit-board-1');
          if (!comp) {
            console.log(array);
            match.player2.humanPlayerInsertShip(array);
            typeNum[getId(shipClass, draggedElement.id) - 1] = 0;
          }
        }
      }
    }
  });
  BOARDS.appendChild(shipBoard);
  BOARDS.appendChild(hitBoard);
}

function playAgainstComputer(i, id1) {
  if (filled1 == 5) {
    if (init == false) {
      match.player2.computerPlayerInsertShip();
      match.player1.humanPlayerInsertShip(array);
      init = true;
    }
    if (hitArray1[Math.floor(i / 10)][i % 10] == 0) {
      hitArray1[Math.floor(i / 10)][i % 10] = 1;
      if (currPlayer == 1) {
        console.log(match.player1.gameboard, match.player2.gameboard);
        const move_P1 = match.move([Math.floor(i / 10) + 1, (i % 10) + 1]);
        console.log('HUMAN', move_P1);
        if (move_P1[1] > 0) {
          colorHitBoard = 1;
          CHOOSESHIPS.innerText = 'You Hit a SHIP!';
          console.log('You hit a Ship!');
          if (move_P1[1] == 2) {
            CHOOSESHIPS.innerText = 'You sunk a SHIP!';
            console.log('You sunk a ship!');
          }
        } else {
          CHOOSESHIPS.innerText = 'You Missed!';
        }
        setTimeout(() => {}, 2000);
        currPlayer = 2;
        const move_P2 = match.move([]);
        console.log('COMPUTER', move_P2);
        let element =
          HTML.getElementById(id1).children[
            (move_P2[0][0] - 1) * 10 + (move_P2[0][1] - 1)
          ];
        if (move_P2[1] > 0) {
          element.style.backgroundColor = 'red';
          element.style.zIndex = '10';
          console.log('Computer hit your ship!');
          CHOOSESHIPS.innerText =
            CHOOSESHIPS.innerText + '   UPDATE:Computer Hit your SHIP';
          if (move_P2[1] == 2) {
            console.log('Your SHIP has sunk!');
            console.log('Computer sunk a ship!');
          }
        } else if (move_P2[1] == 0) {
          CHOOSESHIPS.innerText =
            CHOOSESHIPS.innerText + '   UPDATE:Computer Missed!';
          element.style.backgroundColor = 'black';
        }
        currPlayer = 1;
        if (match.gameEnd()) {
          matchON = false;
          CHOOSESHIPS.innerText = match.whoWon();
          console.log(match.whoWon());
          gameEndLogic();
          return;
        }
      }
    } else {
      hitArray1[Math.floor(i / 10)][i % 10] = 2; // Already hit
    }
  }
}

function humanMatchup(player, i) {
  if (player == 1) {
    if (hitArray1[Math.floor(i / 10)][i % 10] == 0) {
      hitArray1[Math.floor(i / 10)][i % 10] = 1;
      if (currPlayer == 1) {
        console.log(match.player1.gameboard, match.player2.gameboard);
        const move_P1 = match.move([Math.floor(i / 10) + 1, (i % 10) + 1]);
        console.log('HUMAN', move_P1);
        let element =
          shipH2.children[(move_P1[0][0] - 1) * 10 + (move_P1[0][1] - 1)];
        if (move_P1[1] > 0) {
          element.style.backgroundColor = 'red';
          element.style.zIndex = '10';
          colorHitBoard = 1;
          CHOOSESHIPS.innerText = 'PLAYER-1 Hit a SHIP!';
          console.log('PLAYER-1 hit a Ship!');
          if (move_P1[1] == 2) {
            CHOOSESHIPS.innerText = 'PLAYER-1 sunk a SHIP!';
            console.log('PLAYER-1 sunk a ship!');
          }
        } else if (move_P1[1] == 0) {
          CHOOSESHIPS.innerText = 'PLAYER-1 Missed!';
          element.style.backgroundColor = 'black';
        }
      }
    } else {
      hitArray1[Math.floor(i / 10)][i % 10] = 2; // Already hit
    }
  } else if (player == 2) {
    if (hitArray2[Math.floor(i / 10)][i % 10] == 0) {
      hitArray2[Math.floor(i / 10)][i % 10] = 1;
      if (currPlayer == 2) {
        console.log(match.player1.gameboard, match.player2.gameboard);
        const move_P2 = match.move([Math.floor(i / 10) + 1, (i % 10) + 1]);
        console.log('HUMAN', move_P2);
        let element =
          shipH1.children[(move_P2[0][0] - 1) * 10 + (move_P2[0][1] - 1)];
        if (move_P2[1] > 0) {
          colorHitBoard = 1;
          element.style.backgroundColor = 'red';
          element.style.zIndex = '10';
          CHOOSESHIPS.innerText = 'PLAYER-2 Hit a SHIP!';
          console.log('PLAYER-2 hit a Ship!');
          if (move_P2[1] == 2) {
            CHOOSESHIPS.innerText = 'PLAYER-2 sunk a SHIP!';
            console.log('PLAYER-2 sunk a ship!');
          }
        } else if (move_P2[1] == 0) {
          CHOOSESHIPS.innerText = 'PLAYER-2 Missed!';
          element.style.backgroundColor = 'black';
        }
        if (match.gameEnd()) {
          matchON = false;
          CHOOSESHIPS.innerText = match.whoWon();
          console.log(match.whoWon());
          gameEndLogic();
          return;
        }
      }
    } else {
      hitArray2[Math.floor(i / 10)][i % 10] = 2; // Already hit
    }
  }
}

FORM.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(FORM);
  const formObject = Object.fromEntries(formData.entries());
  if (formObject.type === 'Computer') {
    match.gameInit(5, 30, 10, 'HUMAN', 'COMPUTER');
    comp = true;
    addShipType(shipClassComp, 'ship-board');
    createBoards(shipClassComp, 'ship-board', 'hit-board');
  } else if (formObject.type === 'Human') {
    match.gameInit(5, 30, 10, 'HUMAN', 'HUMAN');
    comp = false;
    addShipType(shipClassH1, 'ship-board-1');
    createBoards(shipClassH1, 'ship-board-1', 'hit-board-1');
  }
  FORM.style.visibility = 'hidden';
});
