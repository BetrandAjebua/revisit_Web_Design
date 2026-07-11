import { quizQuestions } from "./data.js";

const startbtn = domPick("#start-btn");
const restartbtn=domPick("#restart-btn");
const startScreen = domPick("#start-screen");
const questionScreen = domPick("#question-screen");
const resultScreen = domPick("#result-screen");
const optionsContainer = domPick(".options");
const questionText = domPick("#question-text");
const score = domPick("#score");
const totalQuestion = domPick("#total-question");
const currentQuestion = domPick("#current-question");
const progress = domPick(".progress");
const remark = domPick(".remark");
const totalQuestionNum = quizQuestions.length;
let currentQuestionNum = 1;
let currentScore = 0;
let  selectStatus = true;
let currentQuestionObj = quizQuestions[currentQuestionNum-1];
totalQuestion.innerHTML = totalQuestionNum;


let pwidth = (currentQuestionNum / totalQuestionNum) * 100;
startbtn.addEventListener("click", startQuiz);
restartbtn.addEventListener("click", restart);
domPick(".options").addEventListener("click", selectAnswer);

function startQuiz(){
startScreen.classList.toggle("active");
  questionScreen.classList.toggle("active");
  loadQuestion();
}
function loadQuestion() {
  optionsContainer.innerHTML="";
  questionText.innerHTML = currentQuestionObj.question; //Load Question
  // Loading the Answers
  currentQuestionObj.answers.forEach((element, index)=>{
    optionsContainer.innerHTML+=`<button value=${index}   class="option">
          ${element.text}
          </button>`
  });
  progress.style.width = pwidth + "%";  //calculating the progress bar value
  currentQuestion.innerHTML = currentQuestionNum;
  score.innerHTML = currentScore;
}
function selectAnswer(e){
 
  if(selectStatus){
     selectStatus=!selectStatus;
    let b = e.target.value;
  if (e.target.classList.contains("option")) {
    if (currentQuestionObj.answers[b].correct) {
      e.target.classList.add("correct");
      currentScore++;
      score.innerHTML = currentScore;
     
    } else {
      e.target.classList.add("wrong");
      currentQuestionObj.answers.forEach((element, i)=>{
        if(element.correct){
          optionsContainer.children[i].classList.toggle("correct");
        }
      })
  
    }
  
   setTimeout(()=>{
  if (currentQuestionNum === totalQuestionNum) {
      questionScreen.classList.toggle("active");
      resultScreen.classList.toggle("active");
      let message = "";
      if(pwidth<50){
        message = "Try Harder! You can do better";
      }else if(pwidth<75){
        message = "You are getting there! Keep learning";
      }else{
        message = "Excellent! You are doing great";
      }
      remark.innerHTML = `<p class="">You  score <span>${currentScore}</span> out of <span>${totalQuestionNum}</span></p>
  <h2 class="comment">${message}</h2>`
      

    }else{
      currentQuestionNum++;
      currentQuestionObj = quizQuestions[currentQuestionNum-1];
      pwidth = (currentQuestionNum / totalQuestionNum) * 100;
      loadQuestion();

    }
    selectStatus=!selectStatus;

   }, 1000)
  }
  }

}
function restart(){
startScreen.classList.toggle("active");
  resultScreen.classList.toggle("active");
  currentScore=0; currentQuestionNum=1; pwidth=0;
  loadQuestion()
}
function domPick(a) {
  return document.querySelector(a);
}
