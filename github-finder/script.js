const baseURL = "https://api.github.com/users/";
const userName = document.querySelector("#user-name");
const userRepositoryURL="";
const profileImg = document.querySelector(".profile-img");
const container = document.querySelector(".container");
container.style.display ="none"
let userData = {}
let userRepositoryData = null;

const form = document.querySelector("form")
form.addEventListener("submit", (e)=>{
  e.preventDefault();
  if(!userName.value) return
  const searchURL = baseURL+userName.value.trim();
fetchGit(searchURL);
form.reset()
})

async function fetchGit(url) {
    document.querySelector(".rep-container").innerHTML = "<div>Loading Data...</div>"
container.style.display ="block"
  const response =  await fetch(url)
try{
  
  if(!response.ok){
    throw new Error("HTTPS Error, Starus: "+response.status)
  }
  const data = await  response.json()
  userData =data;
  getRepository(data.repos_url)
}catch(error){
  console.log("Error: "+error.message)
}

  
}

async function  getRepository(url) {
    const response =  await fetch(url+"?per_page=6") 
try{

  if(!response.ok){
    throw new Error("HTTPS Error, Starus: "+response.status)
  }
  const data = await  response.json()
  userRepositoryData=data;
  updateUI(userData, userRepositoryData)
  console.log(userData)
  console.log(userRepositoryData)
}catch(error){
  console.log("Error: "+error.message)
}
}

function updateUI(user, repos){
profileImg.style.backgroundImage = `url(${user.
avatar_url})`;
let d = new Date(user.created_at
)
let createdDate = d.toLocaleDateString('en-US', {
  month: 'short',
  day:'numeric',
  year: 'numeric'
});
document.querySelector(".profile-content").innerHTML= `
        <h3>${user.name}</h3>
        <p class="user-name">${user.blog}</p>
        <p class="occupation">${user.bio}</p>
        <p class="other-profile">
          <span class="location">
            <i class="fas fa-map-marker-alt"></i>
            ${user.location|| "Not specified"}
          </span>
          <span class="date">
            <i class="fas fa-calendar"></i>
            Joined ${createdDate}
          </span>
        </p>
        <a  target="_blank" href="${user.html_url
}">View Profile</a>
`;

document.querySelector(".followers").querySelector("span").innerHTML = `${user.followers} followers`

document.querySelector(".following").querySelector("span").innerHTML = `${user.following} following`

document.querySelector(".repositories").querySelector("span").innerHTML = `${repos.length} repositories`

document.querySelector(".home").querySelector("a").innerHTML = `${user.company} `|| "Not specified";

document.querySelector(".web").querySelector("a").innerHTML=  user.blog;
document.querySelector(".web").querySelector("a").href= user.blog.startsWith("http")? user.blog : "http://"+user.blog;

document.querySelector(".twitter").querySelector("a").innerHTML= user.twitter_username||"Not Specified";
document.querySelector(".twitter").querySelector("a").href= "https://twitter.com/"+user.twitter_username;

  document.querySelector(".rep-container").innerHTML=""

repos.forEach((element, index) => {

  console.log(element)

  document.querySelector(".rep-container").innerHTML+=`
  
   <div class="rep">
        <a target="_blank" href="${element.html_url}" class="rep-name"> 
          <i class="fa fa-code-branch"></i>
          <span>${element.name}</span>
        </a>
        <p class="description">
          ${element.description || "No description available"}
        </p>
        <p class="other-details">
          <span class="language"> <i class="fas fa-circle"></i><span>${element.language}</span></span>
          <span class="ratings"> <i class="fas fa-star"></i><span>${element.stargazers_count}</span></span>
          <span class="sup-rep"> <i class="fa fa-code-branch"></i><span>${element.forks_count}</span></span>
          <span class="last-update"> <i class="fa fa-calendar"></i><span>${element.updated_at}</span></span>
        </p>
      </div>
  
  `
});

}
