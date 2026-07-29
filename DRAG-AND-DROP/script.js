 const lists =  document.querySelectorAll(".list")
 const cards =  document.querySelectorAll(".card")
 let selected = null;

 cards.forEach((card, index)=>{
  card.addEventListener("dragstart", dragStart)
 });

 
  lists.forEach((list, index)=>{
  list.addEventListener("dragover", dragOver)
  list.addEventListener("drop", dragDrop)
 });


 function dragStart(e){
  selected = e.target
 }
 function dragOver(e){
e.preventDefault(); 

 }
 function dragDrop(e){
  e.target.appendChild(selected)
 } 