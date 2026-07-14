document.querySelector('.palette-btn').addEventListener("click", generatePalet);

document.querySelectorAll('.color-box').forEach((element)=>{
  element.addEventListener("click", copyColor)
})
function copyColor(){
  console.log(event.target.style.backgroundColor)
}
// function copyColor(){
//   alert("Copy Init")
// }
generatePalet()
function generatePalet(){
  const colors= []
  for(let i=0 ; i<6 ; i++){
    colors.push(generateColor())
  }
document.querySelectorAll(".color").forEach((element, index)=>{

  element.style.backgroundColor = "#"+colors[index]

})
  document.querySelectorAll(".color-code").forEach((element, index)=>{

  element.textContent = "#"+colors[index]

})
}

function generateColor(){
  const colorDigit = '1234567890abcdef';
  let color="";
  for(i = 1; i<7 ; i++){
    color+=colorDigit[Math.floor(Math.random()*15)];
    
  }
return (color)
}