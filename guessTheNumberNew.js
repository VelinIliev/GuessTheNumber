let dom = {
    btnPlay: document.querySelector("#btnPlay"),
    btnGuess: document.querySelector("#btnGuess"),
    btnReset: document.querySelector("#btnReset"),
    playGround: document.querySelector(".playGround"),
    results: document.querySelector(".results"),
    userNumberInput: document.querySelector("#userNumber"),
    selectLevelTab: document.querySelector("#selectLevel"),
    guessTheNumberText: document.querySelector(".guessTheNumberText"),
    selectLevelText: document.querySelector(".selectLevelText"),
    countTries: document.querySelector("#countTries"),
};

// помощни функции 
let methods = {
    generateRandomNumber(start, end) {
        variables.randomNumber = Math.round(Math.random() * ( end - start ) + start );
    },
    displayLevel(input){
        dom.selectLevelText.innerHTML = `Playing level: ${input}`;
    },
    calculateTries(input) {
        for ( let i = input; i > 1; i = i / 2) {
            variables.tries++;
        }
    },
    displayTries() {
        dom.countTries.innerHTML = `you have ${variables.tries-variables.count} tries left from ${variables.tries}`;
    },
    displayGuessStatus(input) {
        let div = document.createElement("DIV");
        document.querySelector(".results").appendChild(div)
        div.innerHTML = `${variables.userNumber} - ${input}`;
    },
    userNumberIsWrong () {        
        if (variables.userNumber > variables.randomNumber) {
            methods.displayGuessStatus("High");
        } else if (variables.userNumber < variables.randomNumber){
            methods.displayGuessStatus("Low");
        }
    },
    displayFinished(status) {
        dom.playGround.style.display="none";
        if (status === "win") {
            dom.selectLevelText.innerHTML = `You WIN! You guess the number ${variables.randomNumber} from ${variables.count} tries. <BR>`;
        } else if (status === "loose") {
            dom.selectLevelText.innerHTML = `You loose! My number was: ${variables.randomNumber} <BR>`;
        }
        methods.createButton();
    },
    createButton() { 
        let button = document.createElement("BUTTON");
        let text = document.createTextNode("Start new game");
        button.appendChild(text);
        document.querySelector(".selectLevelText").appendChild(button)
        let newBtnReset = document.querySelector(".selectLevelText>button");
        newBtnReset.addEventListener('click', gamePlay.reload);
        newBtnReset.focus();
    }
};
// Global variables
let variables = {
    randomNumber: undefined,
    level: undefined,
    count: 0,
    userNumber: undefined,
    tries: 0,
};

// вместо if: 
//  const levelDict {
//     level1: {
// range: [1,10],
// name: "Easy",
//     level2: [1,50]
// }

// Event handlers 
let gamePlay = {
    selectLevel() {  
        variables.level = dom.selectLevelTab.value;
        if (variables.level === "Easy") {
            variables.level = 10;
            methods.calculateTries(variables.level);
            methods.displayLevel("Easy");
            methods.generateRandomNumber(1, variables.level);
        } else if (variables.level === "Medium") {
            variables.level = 50;
            methods.calculateTries(variables.level);
            methods.displayLevel("Medium");
            methods.generateRandomNumber(1, variables.level);
        } else if (variables.level === "Advanced") {
            variables.level = 100;
            methods.calculateTries(variables.level);
            methods.displayLevel("Advanced");
            methods.generateRandomNumber(1, variables.level);
        }
        console.log(`generated number: ${variables.randomNumber}`);
        dom.playGround.style.visibility="visible";
        dom.guessTheNumberText.innerHTML = `Guess the number I came up with, from 1 to ${variables.level}`;
        methods.displayTries();

    },
    guessTheNumber() {  
        variables.userNumber = dom.userNumberInput.value;
        console.log(`user number: ${variables.userNumber}`);
        
        dom.results.style.visibility="visible";
        methods.displayTries();
        if (variables.userNumber < 1 || variables.userNumber > variables.level) {
            alert (`The number isn't in range 1 - ${variables.level}!`);
            dom.userNumberInput.value = "";
            // variables.count = variables.count - 1;
        } else if ( variables.userNumber != variables.randomNumber) {
            methods.userNumberIsWrong ();
            variables.count = variables.count + 1;
            if (variables.count === variables.tries ){
                methods.displayFinished("loose");
            }
        } else if (variables.userNumber == variables.randomNumber) {
            variables.count = variables.count + 1;
            methods.displayGuessStatus("WIN!");
            methods.displayFinished("win");
        }
        dom.userNumberInput.value="";
        dom.userNumberInput.focus();
    },
    reload() {
        window.location.reload();
    },
}
// da se vkara wyw funkciq
dom.results.style.visibility="hidden";
dom.playGround.style.visibility="hidden";

// Event handlers
dom.selectLevelTab.focus();
dom.btnPlay.addEventListener('click', gamePlay.selectLevel);
dom.btnGuess.addEventListener('click',gamePlay.guessTheNumber);
dom.userNumberInput.addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        gamePlay.guessTheNumber()
        dom.userNumberInput.value="";
    }
});
dom.btnReset.addEventListener('click', gamePlay.reload);