let light = true;
let placement = 0;
let inUse = false;
let timerNum = 60;
let locked = false;

// game background change
let gameBG = document.querySelector('.gameBG');

let startMenu = document.querySelector('.startMenu'); // start menu
let gameInterface = document.querySelector('.gameInterface'); // game interface 
let endScreen = document.querySelector('.endScreen'); //Ending screen win or lose
let gameIMG = document.querySelector('#eeurr'); // monster image and flashing bg images
let roomPosition = document.querySelector('.monster'); // monsters position
let endMessage = document.querySelector('.endMessage'); // end screen message
let monsterEnd = document.querySelector('.monsterEnd'); //jumpscare
let flashlight = document.querySelector('.flashlight');
let endContent = document.querySelector('.endContent');
let countdown = document.querySelector('.timer');
let spam = document.querySelector('.spam');

// When start button is clicked, remove start menu and show game interface
function start() {

  console.log('START')

  inUse = true;

  startMenu.style.display = 'none';
  gameInterface.style.display = 'flex';

  gameCycle() //game starts
  monsterCycle() //Monster starts
  timer() //timer

}

// Changes the colour of the flashlight from green to red and vice versa
// Also sets "light" variable to true or false (on or off)
function flashButton() {

  if (locked == false) {
    locked = true;

    if (light == true) {

      console.log('Flashlight Off')
      flashlight.className = 'flashlight red_light';

      gameIMG.style.display = 'none'; // Displays the background

      light = false
    }

    else if (light == false) {

      console.log('Flashlight On')
      flashlight.className = 'flashlight green_light';

      checkPlacement()
      gameIMG.style.display = 'flex';

      light = true

    }

    setTimeout(function() {
      locked = false;
    }, 1500)

  }

  // stops the button from being spammed
  else if (locked == true) {
    //wiggle animation
    
    spam.style.opacity = '1';
    flashlight.style.animation = 'shake 0.5s infinite';
    
    setTimeout(function() {
      spam.style.opacity = '0';
      flashlight.style.animation = 'none';
    }, 700)
  }

}

// This checks what position is the monster on
// detects whether if you are dead or not
function checkPlacement() {

  // If placement = 9, display win screen
  if (placement == 9) {

    inUse = false;

    // monster appears and animation
    monsterEnd.src = 'template/img/MonsterFiles/9.png';
    monsterEnd.style.animation = 'shake 0.5s infinite';
    monsterEnd.style.display = 'flex';

    // Ending screen appears
    endMessage.innerHTML = 'You Survived...';
    gameInterface.style.display = 'none';
    endScreen.style.display = 'flex';
    endContent.style.display = 'flex';
    
  }

  // If placement = 10, display death screen
  if (placement >= 10) {

    inUse = false;

    // monster appears and animation
    monsterEnd.style.display = 'flex';
    monsterEnd.style.animation = 'glitch 0.3s infinite';

    // End screen appears
    endContent.style.display = 'none';
    gameInterface.style.display = 'none';
    endScreen.style.display = 'flex';
    

    // after 3 seconds, the play again buttons show up and the jumpscare disappears
    setTimeout(function() {

      endMessage.innerHTML = 'He Got You...';
      monsterEnd.style.display = 'none';
      endContent.style.display = 'flex';

    }, 2000);
  }

}

// Game cycle
function gameCycle() {
  
  // Make an if statement that if when broken it stops the recursipn so that it doesnt keep goiing
  if (inUse) {

    // This changes the image of the monsters position
    roomPosition.src = 'template/img/MonsterFiles/' + placement + '.png';
    
  }

  else {
    clearTimeout(gameTimeout)
  }
  
  gameTimeout = setTimeout(gameCycle, 100)
}

// Monster Cycle 
// 50/50 chance to move
function monsterCycle() {

  if (inUse) {

    if (light == false) {

      console.log('Moving')

      // Gets a number from 0 to 1
      let randomNum = Math.floor(Math.random() * 2);

      // If the number is 0, the placement increases by 1
      if (randomNum == 0) {
        placement++
        console.log('Its in place ' + placement)
      }

    }

    else if (light == true) {
      console.log('Not Moving')
    }

    
  
  }

  else {
    clearTimeout(monsterTimeout)
  }

  monsterTimeout = setTimeout(monsterCycle, 2000)
}

// Timer
function timer() {

  if (inUse) {

    countdown.innerHTML = '<h2>' + timerNum + '</h2>';

    timerNum--

    if (timerNum == 0) {
      placement = 10;
      checkPlacement()
    }
    
  }

  else {
    clearTimeout(timerTimeout)
  }
  
  
  timerTimeout = setTimeout(timer, 1000)
}

// reset button
function reset() {
  window.location.reload();
}



// FIX 
// FIX WIN SCREEN JUMPSCARING YOU EVEN THOUGH YOU WON LMAOOOOOOOOOOOO
// Add the wanted not needed designs (blend mode, flicker animations, etc)