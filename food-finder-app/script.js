const baseURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const searchList = [
  "rice",
  "plantain",
  "bread",
  "egg",
  "meat",
  "pork",
  "salad",
  "banana",
  "potatoes",
  "soup",
  "stew",
  "mango",
  "roast",
  "fry",
  "cake",
  "biscuit",
  "sweet",
  "chocolate",
];
const lookupURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
let searchKeyWord =
  JSON.parse(localStorage.getItem("kws")) || searchList[randomMeal()];
  let lookUpID = null;
const formDom = document
  .querySelector(".search-container")
  .querySelector("form");
let lookUpWord = "";
const formInput = document.querySelector("#word-search");
const searchHeader = document.querySelector(".search-header");
const searchItemsDOM = document.querySelector(".search-items");
const detailContainer = document.querySelector(".detail-container");
detailContainer.classList.add("hide-container")

const instructions = document.querySelector(".instruction-content");
const ingredients = document.querySelector(".ingredient");
const detailIMGDom = document.querySelector(".selected-img")
const instructionContent = document.querySelector(".instruction-content")
// LISTENERS


// [1] Form Submit
formDom.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!formInput.value) {
    return;
  }
  searchKeyWord = formInput.value.trim();
  localStorage.setItem("kws", JSON.stringify(searchKeyWord));

  fetchMeals()
    .then((res) => {
      foodData = res;
      formDom.reset();
      updatingMealList();

      return;
    })
    .catch((error) => {
      console.log("Fetch Error: " + error.message);
    });
});

let foodData = await fetchMeals();
// console.log(foodData)
updatingMealList();

// UPDATING UI
function updatingMealList() {
  document.querySelector(".word-search").textContent = searchKeyWord;

  if (!foodData) {
    formInput.value = searchKeyWord;
    return alert("Nothing Found for " + searchKeyWord);
  }

  searchItemsDOM.innerHTML = "";
  foodData.forEach((food) => {
    searchItemsDOM.innerHTML += `
          <div class="search-item" >
          <div class="item-head"  data-id="${food.idMeal}"  style="background-image: url(${food.strMealThumb});">
           
          </div>
          <div class="item-body">
            <h4>${food.strMeal} </h4>
            <button data-id ="${food.idMeal}" class="btn-item">Get Details</button>
          </div>

        </div>
  `;
  });


    document.querySelectorAll(".item-head").forEach(btn=>{
    btn.addEventListener("click", (event)=>{
fetchFoodDetails(event.target.dataset.id)
    })
  });

      document.querySelectorAll(".btn-item").forEach(btn=>{
    btn.addEventListener("click", (event)=>{
fetchFoodDetails(event.target.dataset.id)
    })
  });
}

// FUNCTIONS FOR FETCHING MEALS
async function fetchMeals() {
  const url = baseURL + searchKeyWord;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("HTTP error! Status: " + response.status);
    }

    const data = await response.json();

    return data.meals;
  } catch (err) {
    console.log("Error " + err.message);
  }
}

function randomMeal() {
  let randIndex = Math.floor(Math.random() * searchList.length);
  console.log(randIndex);
  return randIndex;
}



async function fetchFoodDetails(foodID) {
  const response = await fetch(lookupURL + foodID);
  try {
    if (!response.ok) {
      throw new Error("HTTP Error Status:" + response.status);
    }
    const itemDetail = await response.json();
    return updateDetailDom(itemDetail);
  } catch (error) {
    console.log(error);
  }
}

function passIDValue(idvalue){
  return fetchFoodDetails(idvalue)
}
// await fetchFoodDetails(52845);

function updateDetailDom(itemDetals) {
  const detailData = itemDetals.meals[0];
  console.log(detailData)

  detailIMGDom.style.backgroundImage=`url(${detailData.strMealThumb})`
  detailContainer.classList.remove("hide-container");
  detailIMGDom.parentElement.querySelector("h3").textContent = detailData.strMeal;

  detailIMGDom.parentElement.querySelector("p").textContent =  searchKeyWord;

  instructions.textContent = detailData.strInstructions;
  let ul = ingredients.querySelector("ul")
 
  for (let index = 1; index < 21; index++) {
let indexobj = 'strIngredient'+index
    //  console.log(indexobj )
  if(!detailData[indexobj] ){
break
  }
    ul.innerHTML+=` <li><i class="fas fa-check"></i>${detailData[indexobj] 
}+</li>`;


  
}
detailContainer.scrollIntoView({
  behavior:"smooth"
})
  
let iframeLink =convertYouTubeToIframe(detailData.strYoutube);
if(detailData.strYoutube){
  document.querySelector(".video-frame").innerHTML=iframeLink
// ingredients.querySelector("a").href=detailData.strYoutube
  

}



 
  
  
}


function convertYouTubeToIframe(url) {
  let videoId = null;

  // Match standard watch links: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([^&#]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }

  // Match shortened links: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?&#]+)/);
  if (shortMatch) {
    videoId = shortMatch[1];
  }

  // Match embed links directly: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/embed\/([^?&#]+)/);
  if (embedMatch) {
    videoId = embedMatch[1];
  }

  if (!videoId) {
    return "Invalid YouTube link";
  }

  // Build iframe embed code
  return `<iframe width="560" height="315" 
    src="https://www.youtube.com/embed/${videoId}" 
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
    encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    
    `;
}