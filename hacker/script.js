var c =document.getElementsByTagName("td");
var a;
var result = generateRandom();
var clicks=0;
var score = 0;
var check=[];
var time;
var interval;
var retrievedData=JSON.parse(localStorage.getItem("best_scoresh"));
if (Array.isArray(retrievedData)){
    retrievedData.sort();
    retrievedData1=retrievedData.slice(0,5);
}else{
    retrievedData1=[];
}
var scores = retrievedData1;


for (let i = 0; i < c.length; i++) {
    c[i].innerText=result[i];                                //displaying random numbers.   
}

function start(){
    var startTime = Date.now();
    interval = setInterval(function(){
        var elapsedTime = Date.now() - startTime;
        time = (elapsedTime / 1000).toFixed(3);
        document.getElementById("timer").innerHTML = time + "s";
    }, 100);
}

function bestTime(){
    if (localStorage.getItem("best_scoresh")){
        var retrievedData=JSON.parse(localStorage.getItem("best_scoresh"));
        retrievedData.sort();
        retrievedData1=retrievedData.slice(0,5);
        var bt=document.getElementsByClassName('best_time');
        for(let i=0;i<5;i++){
            bt[i].innerText=" ";
        }
        retrievedData1.forEach((element,index) =>{
            bt[index].textContent=retrievedData1[index];
        })
    }
}

function generateRandom() {
    var result = [], randNumber,Count=25;
    while ( Count > 0) {
        randNumber = Math.round(1 + Math.random() * (24));
        if (result.indexOf(randNumber) == -1) {
            result.push(randNumber);
            Count--;
        }
    }
    return result;
}

function handleCellClick(clickedCellEvent){
    if(time!==undefined){
        var mySound = new Audio("1.mp3");
    mySound.play();
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    var pi = parseInt(c[clickedCellIndex-1].textContent);
    
    if (clicks==0) {
        if (pi!=1) {
            alert("Please start from 1");    // User must start from 1.
            restartGame();
        }
        else{
            c[clickedCellIndex-1].textContent = Number(c[clickedCellIndex-1].textContent)+25;
            score++;
            document.getElementById('counts').textContent=score;
        }
    }
    
    else{
        check.push(pi);
        check.sort((a,b) => a-b);
        if (checkClick()===1) {
            check.pop();
            score--;
            document.getElementById('counts').textContent=score;
        }
        else{
            if (c[clickedCellIndex-1].textContent>0 && c[clickedCellIndex-1].textContent<=15){
                c[clickedCellIndex-1].textContent = Number(c[clickedCellIndex-1].textContent)+25;
            }
    
            else if (c[clickedCellIndex-1].textContent>15 && c[clickedCellIndex-1].textContent!=40){
                c[clickedCellIndex-1].textContent=" ";
            }
            else if(c[clickedCellIndex-1].textContent==40){
                c[clickedCellIndex-1].textContent=" ";
                clearInterval(interval);
                var t=Number(time);
                console.log(scores);
                if(clicks==score){
                    alert("You Won!!");
                }
                else{
                    alert("Good try , but you clicked some wrong tiles");
                }
                scores.push(t);
                var str=JSON.stringify(scores);
                localStorage.setItem("best_scoresh",str);
                console.log(localStorage.getItem("best_scoresh"));
                bestTime();
                restartGame();
            }
            score++;
            document.getElementById('counts').textContent=score;
        }
    }
    clicks++;
    bgColor();
    }
}

function bgColor(){
    document.querySelectorAll('.cell').forEach((cell,index) => {
        var i= c[index].textContent;
        var j=i*6.4;
        c[index].style.backgroundColor = `rgb(${j},${j},${j})`;
    });
}

function checkClick(){
    var temp = 0;
    for (let i=0;i<check.length-1;i++){
        if (check[i+1]!=parseInt(check[i])+1) {
            temp=1;
            break
        }
    }
    return temp;
}

function restartGame(){
    window.location.reload(true);
}

bestTime();
bgColor();
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
