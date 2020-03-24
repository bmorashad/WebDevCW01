var quizs = false;
var seconds = 1000 * 40;
var tot = 0;
var startQ = false;
var resetIF = false;

//getting the value from every radio button
function check(){
    var radios = document.getElementsByClassName("answer");
    for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked) {
            return true;
        }
    }
    return false;
}

radioButtonR(true);

//checking if all radio buttons selected or not
function getVal(qName) {
    var radiosNum = document.getElementsByName(qName);
    for (var i = 0, length = radiosNum.length; i < length; i++) {
        if (radiosNum[i].checked) {
            var answerValue = Number(radiosNum[i].value);
        }
    }if (isNaN(answerValue)) {
        answerValue = 0;
    }
    return answerValue;
}
//checking the question with the answer
function submitQuiz() {
    if (startQ == false) {//checking the start button pressed or not
        window.alert("Quiz didnt Started")
    }else if (check() == false) {// checking radios selected or not
        window.alert("All question must be answered ");
    }else {
        clearTimeout(timer);
        if (getVal("q1") === 1) {
            document.getElementById("correctAn1").style.backgroundColor = "rgba(58,255,30,0.41)";
            tot += 2;
        } else {
            document.getElementById("correctAn1").style.backgroundColor = "rgba(255,51,62,0.56)";
            tot -= 1;
        }
        //answer2
        if (getVal("q2") === 1) {
            document.getElementById("correctAn2").style.backgroundColor = "rgba(58,255,30,0.41)";
            tot += 2;
        } else {
            document.getElementById("correctAn2").style.backgroundColor = "rgba(255,51,62,0.56)";
            tot -= 1;
        }
        //answer3
        if (getVal("q3") === 1) {
            document.getElementById("correctAn3").style.backgroundColor = "rgba(58,255,30,0.41)";
            tot += 2;
        } else {
            document.getElementById("correctAn3").style.backgroundColor = "rgba(255,51,62,0.56)";
            tot -= 1;
        }
        //answer4
        if (getVal("q4") === 1) {
            document.getElementById("correctAn4").style.backgroundColor = "rgba(58,255,30,0.41)";
            tot += 2;
        } else {
            document.getElementById("correctAn4").style.backgroundColor = "rgba(255,51,62,0.56)";
            tot -= 1;
        }
        //answer5
        if (getVal("q5") === 1) {
            document.getElementById("correctAn5").style.backgroundColor = "rgba(58,255,30,0.41)";
            tot += 2;
        } else {
            document.getElementById("correctAn5").style.backgroundColor = "rgba(255,51,62,0.56)";
            tot -= 1;
        }
        //answer6
        if (getVal("q6") === 1) {
            document.getElementById("correctAn6").style.backgroundColor = "rgba(58,255,30,0.41)";
            tot += 2;
        } else {
            document.getElementById("correctAn6").style.backgroundColor = "rgba(255,51,62,0.56)";
            tot -= 1;
        }
        //answer7
        if (getVal("q7") === 1) {
            document.getElementById("correctAn7").style.backgroundColor = "rgba(58,255,30,0.41)";
            tot += 2;
        } else {
            document.getElementById("correctAn7").style.backgroundColor = "rgba(255,51,62,0.56)";
            tot -= 1;
        }
        //answer8
        if (getVal("q8") === 1) {
            document.getElementById("correctAn8").style.backgroundColor = "rgba(58,255,30,0.41)";
            tot += 2;
        } else {
            document.getElementById("correctAn8").style.backgroundColor = "rgba(255,51,62,0.56)";
            tot -= 1;
        }
        //answer9
        if (getVal("q9") === 1) {
            document.getElementById("correctAn9").style.backgroundColor = "rgba(58,255,30,0.41)";
            tot += 2;
        } else {
            document.getElementById("correctAn9").style.backgroundColor = "rgba(255,51,62,0.56)";
            tot -= 1;
        }
        //answer10
        if (getVal("q10") === 1) {
            document.getElementById("correctAn10").style.backgroundColor = "rgba(58,255,30,0.41)";
            tot += 2;
        } else {
            document.getElementById("correctAn10").style.backgroundColor = "rgba(255,51,62,0.56)";
            tot -= 1;
        }
        resetIF = true;
        quizs = true;
        startQ = false;
        showScore = tot + "&nbsp; <strong>/20 Score!</strong>";
        document.getElementById("userScore").innerHTML = showScore;}
}
//to disable radio buttons
function radioButtonR(getBol) {
    var radios = document.getElementsByClassName("answer");
    for(var i=0; i < radios.length;i++){
        radios[i].disabled = getBol;
    }
}

// reset question
function resetQuiz() {
    radioButtonR();
    var labels= document.getElementsByClassName("white");
    for (var k = 0; k < labels.length; k++){
        labels[k].style["background-color"] =  "rgba(255,51,62,0)";
    }
    var radios = document.getElementsByClassName("answer");
    for(var i=0; i < radios.length;i++){
        radios[i].checked = false;
    }
    clearTimeout(timer);
    document.getElementById("userScore").innerHTML = "";
    document.getElementById("timeCounter").innerHTML= "";
    seconds = 1000 * 40;
    tot = 0;
    startQ = false;
    quizs = false;
    resetIF = false;
}

// sting timer for 40s
function setTimer() {
    if(seconds == 40000)
        timer = setInterval(setTimer, 1000)
        seconds -= 1000;
        document.getElementById("timeCounter").innerHTML = ":"+ seconds/1000+"s";
    if (seconds <= 0) {
        clearInterval(timer);
       window.alert("Times up");
        radioButtonR(true);
        submitQuiz();
    }
    document.getElementById("timeCounter").innerHTML=":"+  seconds/1000+"s";
}
//when start pressed
function startQuiz() {
    if (resetIF == true){//if reset is needed
        resetQuiz()
    }
    startQ = true;
    radioButtonR(false);
    setTimer()
}
