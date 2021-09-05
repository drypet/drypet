//1. start the game
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restart = document.getElementById('restart-btn');
const qBox = document.getElementById('questionBox');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer-btns');
const markBoard = document.getElementById('total');
const right = document.getElementById('correctSign');
const wrong = document.getElementById('wrongSign');
const result = document.getElementsByClassName("result");
const marks=document.getElementById('disMarks');
let shuffledQuestions,shuffledOptions,currentQuestionIndex;
var count=0;
    startButton.addEventListener('click', startGame);
    restart.addEventListener('click',startGame);
    nextButton.addEventListener('click', ()=> {
    currentQuestionIndex++;
    setNextQ();
 })
function startGame(){
    startButton.classList.add('hide');
    result[0].classList.add('hide');
    shuffledQuestions= questionList.sort(()=> Math.random()-.5);
    currentQuestionIndex=0;
    count=0;
    markBoard.innerText=count+"/"+shuffledQuestions.length;
    qBox.classList.remove('hide');
    setNextQ()
}
//2. setting new question
function setNextQ() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(obj){
    questionElement.innerText= "Q"+(currentQuestionIndex+1)+". "+obj.question;
    shuffledOptions= obj.answers.sort(()=> Math.random()-.5);
    obj.answers.forEach(ans =>{
    const button= document.createElement('button');
    button.innerText= ans.text;
    button.classList.add('btn');
    if(ans.correct){
        button.dataset.correct = ans.correct;
   }
   button.addEventListener('click',selectAnswer);
   answerElement.appendChild(button);
 })
}

function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild);
    }
    right.classList.add('hide');
    wrong.classList.add('hide');
}
//3.action after selecting the question (correct/wrong)
function selectAnswer(e) {
    const selectedButton = e.target;
    selectedButton.style.border="2px solid black";
    const correct = selectedButton.dataset.correct;
    countMarks(correct);
    setStatusClass(document.body, correct);
    Array.from(answerElement.children).forEach(btn=> {
        setStatusClass(btn, btn.dataset.correct);
    })
    block();
 if(shuffledQuestions.length > currentQuestionIndex+1){
     nextButton.classList.remove('hide');
 }
 else {
   marks.innerText=count+"/"+shuffledQuestions.length;
   qBox.classList.add('hide');
   right.classList.add('hide');
   wrong.classList.add('hide');
   result[0].classList.remove("hide");
   clearStatusClass(document.body);
   count=0;
 }
}
function setStatusClass(ele, correct)
{
 clearStatusClass(ele);
 if(correct){
   ele.classList.add('correct');
 }
 else {
   ele.classList.add('wrong');
 }
}
function clearStatusClass(ele)
{
 ele.classList.remove('correct');
 ele.classList.remove('wrong');
}
//counting score
function block(){
 Array.from(answerElement.children).forEach(btn => {
   btn.disabled=true;
 })
}
function countMarks(ele){
 if(ele){
   count++;
   right.classList.remove("hide");
 }
 else{
   wrong.classList.remove("hide");
 }
 markBoard.innerText=count+"/"+shuffledQuestions.length;
}
//Question list
const questionList= [
 {
   question:"Harry Potter’s birthday is on ___",
   answers: [
     {text:'July 31', correct:true},
     {text:'Sept 1', correct:false },
     {text:'Oct 31', correct:false },
     {text:'Aug 1', correct:false }
   ]
 },
 {
   question:"At the moment of Mad Eye’s death, who was flying with him?",
   answers: [
     {text:'Lupin', correct:false},
     {text:'Mundungus Fletcher', correct:true },
     {text:'Arthur Wisley', correct:false},
     {text:'Serious Black', correct:false}
   ]
 },
{
   question:"Who is the security guard at the entrance of Gryffindor’s Common room?",
   answers: [
     {text:'Sir Nicklous', correct:false },
     {text:'The Fat Lady', correct:true},
     {text:'Bloody Baren', correct:false },
     {text:'Peeves', correct:false }
   ]
 },
 {
   question:"What is the occupation of Hermione’s parents?",
   answers: [
     {text:'Teacher', correct:false },
     {text:'Auror', correct:false},
     {text:'Dentists', correct:true },
     {text:'Farmers', correct:false }
   ]
 },
 {
   question:"There is a magical beast, a bright green snake which is hidden in the chamber of Secrets. What is its name?",
   answers: [
     {text:'Slytherin', correct:false },
     {text:'Nagini', correct:false},
     {text:'Basilisk', correct:true },
     {text:'Snake', correct:false }
   ]
 },
 {
   question:"The name of the prison where Gellert Grindelwald was imprisoned?",
   answers: [
     {text:'Azkaban', correct:false },
     {text:'Riddle House', correct:false },
     {text:'Dungeon', correct:false},
     {text:'Nurmengard', correct:true }
   ]
 },
 {
   question:"In which player position Harry belongs to the Gryffindor Quidditch Team?",
   answers: [
     {text:'Keeper', correct:false },
     {text:'Chaser', correct:false },
     {text:'Seeker', correct:true },
     {text:'beater', correct:false}
   ]
 },
 {
   question:"Which is the middle name of Tom Riddle who is also called Lord Voldemort?",
   answers: [
     {text:'Gaunt', correct:false },
     {text:'Tom', correct:false },
     {text:'Marvolo', correct:true },
     {text:'Riddle', correct:false}
   ]
 },
 {
   question:"Name the Godfather of Harry Potter",
   answers: [
     {text:'James Potter', correct:false },
     {text:'Serious Black', correct:true },
     {text:'Severous Snape', correct:false },
     {text:'Remus Lupin', correct:false}
   ]
 },
 {
   question:"Name the person who usually referred to as Wormtail or Scabbers?",
   answers: [
     {text:'Serious Black', correct:false },
     {text:'Severous Snape', correct:false },
     {text:'Mundungus Fletcher', correct:false},
     {text:'Peter Pettigrew', correct:true }
   ]
 }
]