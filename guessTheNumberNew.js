let variables = {
    randomNumber: undefined,
    level: undefined,
    count: 0,
    userNumber: undefined
}
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
}
let methods = {
    reload() {
        window.location.reload();
    },
    generateRandomNumber(start, end) {
        variables.randomNumber = Math.round(Math.random() * ( end - start ) + start );
    },
    displayLevel(input){
        dom.selectLevelText.innerHTML = `Playing level: ${input}`;
    },
    displayTries() {
        dom.countTries.innerHTML = `you have ${5-variables.count} tries left from 5`;
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
        newBtnReset.addEventListener('click', methods.reload)
    }
}
dom.results.style.visibility="hidden";
dom.playGround.style.visibility="hidden";

function selectLevel() {  
    variables.level = dom.selectLevelTab.value;
    if (variables.level === "Easy") {
        variables.level = 10;
        methods.displayLevel("Easy");
        methods.generateRandomNumber(1, variables.level);
    } else if (variables.level === "Medium") {
        variables.level = 50;
        methods.displayLevel("Medium");
        methods.generateRandomNumber(1, variables.level);
    } else if (variables.level === "Advanced") {
        variables.level = 100;
        methods.displayLevel("Advanced");
        methods.generateRandomNumber(1, variables.level);
    }
    console.log(`generated number: ${variables.randomNumber}`);
    dom.playGround.style.visibility="visible";
    dom.guessTheNumberText.innerHTML = `Guess the number I came up with, from 1 to ${variables.level}`;
    methods.displayTries();
};
btnPlay.addEventListener('click',selectLevel);

function guessTheNumber() {  
    variables.userNumber = dom.userNumberInput.value;
    console.log(`user number: ${variables.userNumber}`);
    variables.count = variables.count + 1;
    dom.results.style.visibility="visible";
    methods.displayTries()
    if (variables.userNumber < 1 || variables.userNumber > variables.level) {
        alert (`The number isn't in range 1 - ${variables.level}!`);
        dom.userNumberInput.value = "";
        variables.count = variables.count - 1;
    } else if ( variables.userNumber != variables.randomNumber) {
        methods.userNumberIsWrong ();
        if (variables.count === 5 ){
            methods.displayFinished("loose");
        }
    } else if (variables.userNumber == variables.randomNumber) {
        methods.displayGuessStatus("WIN!")
        methods.displayFinished("win")
    }
}
dom.btnGuess.addEventListener('click',guessTheNumber);
dom.userNumberInput.addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        guessTheNumber()
        dom.userNumberInput.value="";
    }
});
dom.btnReset.addEventListener('click', methods.reload);