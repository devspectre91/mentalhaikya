let buttons = document.querySelectorAll("li");
// localStorage.setItem("total", 0);
// localStorage.setItem("score", 0);
let score = localStorage.getItem("score") || 0;
let total = localStorage.getItem("total") || 0;
console.log(score, total);

let gameVariable = "";
buttons.forEach(e => {
    e.addEventListener("click", handleClick);
})
document.body.addEventListener("keyup", handleEnter);
document.querySelector(".progress").addEventListener("click", handleResult);
document.querySelector(".restart").addEventListener("click", handleReload);
function handleClick(event) {

    let i = 3;
    var colors = ['indianred', 'gold', 'teal'];
    event.target.style.backgroundColor = ' rgb(137, 204, 243)';
    event.target.children[0].innerText = `Starting in 4s ...`;
    game = event.target.children[0].dataset.name;
    var starter = setInterval(() => {
        event.target.children[0].innerText = `Starting in ${i}s ...`;
        event.target.style.backgroundColor = colors[i - 1];

        i = i - 1;
        console.log(i);
    }, 1000);
    setTimeout(() => {
        clearInterval(starter);
        document.querySelector("ul").style.display = "none";
        document.querySelector("h2").style.display = "none";
        document.querySelector(".board").style.display = "block";

        let keypad = document.querySelector(".keyboard");
        for (let i = 0; i < keypad.children.length; i++) {
            keypad.children[i].addEventListener("click", handleKeys);
        }

        startGame(game);
    }, 4000);


}
function handleReload() {
    window.location.reload();
}
function handleResult() {
    document.querySelector("h2").innerText = `Your current progress is:`
    document.querySelector("ul").style.display = "none";
    document.querySelector(".board").style.display = "none";
    document.querySelector(".result").style.display = "block";
    let totalScore = document.querySelector(".total-attempts");
    totalScore.innerText = `You attempted a total of ${total} questions!`
    let correctOnes = document.querySelector(".correct-answers");
    correctOnes.innerText = `You got ${score} questions right!`
}
function resetStyles() {
    document.querySelector("h2").style.display = "none";
    let inputElm = document.querySelector("input");
    inputElm.value = "";
}
function startGame(str) {
    if (str == "squares") {
        gameVariable = "squares";
        resetStyles();
        startSquare();
    }
    else if (str == "multiply") {
        gameVariable = "multiply";
        resetStyles();
        startMultiply();
    }
    else if (str == "addition") {
        gameVariable = "addition";
        resetStyles();
        startAddition();
    }
}
function startSquare() {
    let randomNumber = squares[Math.floor(Math.random() * 24)];

    document.querySelector(".display").innerHTML = randomNumber.value + `<sup>2</sup> =`;

    correctValue = randomNumber.square;
    console.log(correctValue)
}
function startMultiply() {
    let random1 = Math.floor(Math.random() * 20);
    let random2 = Math.floor(Math.random() * 20);



    document.querySelector(".display").innerHTML = `${random1} * ${random2} =`;

    correctValue = random1 * random2;

}
function startAddition() {
    let random1 = Math.floor(Math.random() * 20);
    let random2 = Math.floor(Math.random() * 20);



    document.querySelector(".display").innerHTML = `${random1} + ${random2} =`;

    correctValue = random1 + random2;
}
function handleKeys(event) {
    let inputElm = document.querySelector("input");
    inputElm.value = inputElm.value.concat(event.target.innerText);
    console.log(inputElm.value)


}
function handleEnter(event) {

    let inputElm = document.querySelector("input");
    let message = document.querySelector("h2");
    if (event.keyCode == 13 && inputElm.value != 0) {
        if (Number(inputElm.value) === Number(correctValue)) {
            score++;
            total++;
            localStorage.setItem("score", score);
            localStorage.setItem("total", total);

            message.style.display = "block";
            message.innerText = `Your Answer: ${inputElm.value}    |    Correct answer: ${correctValue}`;
            message.classList.add("correct");
            message.classList.remove("wrong");
            setTimeout(() => {
                startGame(gameVariable);
            }, 2000);
        } else {
            message.style.display = "block";
            message.innerText = `Wrong Answer!    Correct Answer is : ${correctValue}`;
            message.classList.add("wrong");
            message.classList.remove("correct");
            total++;
            localStorage.setItem("total", total);
            setTimeout(() => {
                startGame(gameVariable);
            }, 2000);
        }

    }
    else {
        return;
    }

}