const pornStarTiles = ['star1', 'star1', 'star2', 'star2', 'star3', 'star3', 'star4', 'star4', 'star5', 'star5', 'star6', 'star6', 'star7', 'star7', 'star8', 'star8'];
// const pornStarTiles__2 = ['star1', 'star1', 'star2', 'star2', 'star3', 'star3', 'star4', 'star4', 'star5', 'star5', 'star6', 'star6', 'star7', 'star7', 'star8', 'star8','star9', 'star9', 'star10', 'star10'];
// const pornStarTiles = [];
let cards = [];
let gameFinishScore 
let scoreboardArray = JSON.parse(localStorage.getItem('scoreboardArray'));
if (scoreboardArray === null){
    scoreboardArray = [];
}

/*
***************************************************timer stop/start****************************************
*/
const scoreboardElement = document.getElementById('scoreboard');
let sortedScoreboard  = scoreboardArray.sort((a, b) => a - b);
scoreboardElement.innerHTML = sortedScoreboard.map(function (item,index) {
    return (index + 1) + ':' + ' ' + item +'<br />';
}).join("");

const buttonStart = document.getElementById('button__start');
const buttonStop = document.getElementById('button__stop');
let gameTime = 0;
let timerIntervalTimer;

function Timer(buttonStart, buttonStop, info){
    this.gameTime = 0;
    this.buttonStart = buttonStart;
    this.buttonStop = buttonStop;
    this.info = info; 
    this.timeInterval = null;

    this.start = () => {
        this.buttonStart.removeEventListener('click', this.start);
        this.timeInterval = setInterval(() =>  {
            this.gameTime += 0.01;
            this.info.textContent = this.gameTime.toFixed(2);
        },10);
    };

    this.stop = () => {
        clearInterval(this.timeInterval);
        this.buttonStart.addEventListener('click', this.start);
    };

    this.getCurrentTime = () => {
        return this.gameTime;
    };

    this.setCurrentTime = (time) => {
        this.gameTime = time;
    };

    this.finish = () => {
        clearInterval(this.timeInterval);
    };

    this.start = this.start.bind(this);
}
const timer = new Timer( document.getElementById('button__start'), document.getElementById('button__stop'),  document.getElementById("info"));

buttonStart.addEventListener('click', timer.start);
buttonStart.addEventListener('click', memoryGame);
buttonStop.addEventListener('click', timer.stop);

/********************************************************************************************************/

function memoryGame() {
    buttonStart.removeEventListener('click', memoryGame);
    let activeCard = "";
    const activeCards = [];
    
    let gameResult = 0;

    const clickCard = function () {
            activeCard = this;
            if (activeCard === activeCards[0])
                return;
            activeCard.classList.remove("hidden");
            if (activeCards.length === 0) {
                activeCards[0] = activeCard;
            } else {
                cards.forEach(card => card.removeEventListener("click", clickCard));
                activeCards[1] = activeCard;

                setTimeout(function () {

                    if (activeCards[0].className === activeCards[1].className) {
                        activeCards.forEach(card => card.classList.add("victory"));
                        gameResult++;
                        cards = cards.filter(card => !card.classList.contains("victory"));console.log(gameFinishScore + "win");
                        if (gameResult === gameFinishScore){
                            win();
                        }
                    } else {
                        activeCards.forEach(card => card.classList.add("hidden"))
                    }
                    activeCard = "";
                    activeCards.length = 0;
                    cards.forEach(card => card.addEventListener("click", clickCard))
                }, 800)
        }

    };

    function refreshScoreboard(newFinishTime) {
        console.log(scoreboardArray);
        scoreboardArray.push(newFinishTime);
        let sortedScoreboard =  scoreboardArray.sort((a, b) => a - b);
        scoreboardElement.innerHTML = sortedScoreboard.map(function (item,index) {
            return (index + 1) + ':' + ' ' + item +'<br />';
        }).join("");
        localStorage.setItem('scoreboardArray', JSON.stringify(sortedScoreboard));
    }

    function win() {
        timer.finish();
        let finishTime = timer.getCurrentTime().toFixed(2);
        document.getElementById("info").textContent = 'YOUR TIME: ' + finishTime + 's';
        refreshScoreboard(finishTime);
        buttonStart.addEventListener('click', () => {location.reload();});
        buttonStart.textContent = 'Reload';
    }


    const init = function () {



        cards = [...document.querySelectorAll(".content div")];
        cards.forEach(card => {
            const position = Math.floor(Math.random() * pornStarTiles.length);
            card.classList.add(pornStarTiles[position]);
            pornStarTiles.splice(position, 1);
        });
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard)
        })
    };

    init();
}

/**********************************************Next lvl****************************************************/

let check__1 = document.getElementById("Poziom1");
let check__2 = document.getElementById("Poziom2");

let content__2 = document.getElementById("contentDiv");

function newCheck (){
    for(var i = 0; i < 4; i++){
    let nextDiv = document.createElement('div');
    content__2.appendChild(nextDiv);
    }
    pornStarTiles.push('star9', 'star9', 'star10', 'star10');
    console.log(pornStarTiles);
    gameFinishScore = cards.length / 2;
    console.log(gameFinishScore);
};

check__2 = document.getElementById("Poziom2").addEventListener("click", newCheck);








