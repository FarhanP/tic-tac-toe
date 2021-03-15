const allCells=document.querySelectorAll('.box');
const winningCriteria=
[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [0,4,8]

]
let XTurn=true;
const X_class='X';
const O_class='O';
let winningMessage=document.querySelector('.winner');
let gameStatus=document.querySelector('.game-status');
let currentClass;
const restartButton=document.querySelector('.restart');


GameStart()


restartButton.addEventListener('click', GameStart)

function GameStart(){
  
  allCells.forEach((cell)=> 
  {
    cell.classList.remove(X_class);
    cell.classList.remove(O_class);
    cell.innerHTML='';
    gameStatus.innerHTML=''
    winningMessage.innerHTML='';
    XTurn=false;
    cell.style.removeProperty("pointer-events");
    cell.removeEventListener('click', clickHandle);
    cell.addEventListener('click', clickHandle, {once:true})
  });

  gameStatus.innerHTML="It's O's turn"
}


function clickHandle(e){
  const cell=e.target;
  // console.log('Event',e)

  gameStatus.innerHTML=` It's ${XTurn? "O's":"X's"} turn`
  //place mark
   currentClass=XTurn?X_class:O_class
  placeYourMark(cell, currentClass);

  //check for win
  if(checkWin(cell, currentClass)){
    gameStatus.innerHTML='';
    winningMessage.innerHTML=
    `${XTurn? 'X':'0' } wins`;
    endGame();
    
    
  }
  else{
    //check for draw
   
    isDraw()? winningMessage.innerHTML='Game Drawn': 0;
    isDraw()? gameStatus.innerHTML='':0;
  
  }

  

  

  //change turns
  swapTurn()
  
}

// After the game is won, making empty cells unclickable
function endGame(){
  [...allCells].forEach(cell=> 
    {
      if(!cell.classList.contains('.box O') || !cell.classList.contains('.box X')){
        cell.style.pointerEvents='none';
      }
    
    })
   
}

function isDraw(){
  return [...allCells].every(cell=>
    cell.classList.contains(X_class) || cell.classList.contains(O_class))
}


function placeYourMark(cell, currentClass){
  cell.classList.add(currentClass);
  cell.innerHTML=XTurn?'X':'O'

}

function swapTurn(){
  XTurn=!XTurn
  currentClass=!currentClass;
  
}

function checkWin(cell, currentClass){
  console.log('Cell', cell)
  return winningCriteria.some(criteria=>{
    return criteria.every(index =>{
      return allCells[index].classList.contains(currentClass)
     
    })
  })
}