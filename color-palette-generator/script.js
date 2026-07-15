document.querySelector(".palette-btn").addEventListener("click", generatePalet);

document.querySelectorAll(".color-box").forEach((element) => {
  element.addEventListener("click", (event) => {
    copyColor(event);
  });
});
function copyColor(event) {
  if (event.target.classList.contains("fa-copy")) {
    navigator.clipboard
      .writeText(event.currentTarget.textContent)
      .then(sucess(event.target))
      .catch((err) => {
        alert(err);
      });
  }else if (event.target.classList.contains("color")) {
     navigator.clipboard
      .writeText(event.currentTarget.textContent)
      .then(sucess(event.currentTarget.querySelector(".fa")))
      .catch((err) => {
        alert(err);
      });
}
  
}
  // function copyColor(){
  //   alert("Copy Init")
  // }
  function sucess(icon) {
    icon.classList.toggle("fa-copy");
    icon.classList.toggle("fa-check");
    setTimeout(() => {
      icon.classList.toggle("fa-copy");
      icon.classList.toggle("fa-check");
    }, 1500);
  }
  generatePalet();
  function generatePalet() {
    const colors = [];
    for (let i = 0; i < 6; i++) {
      colors.push(generateColor());
    }
    document.querySelectorAll(".color").forEach((element, index) => {
      element.style.backgroundColor = "#" + colors[index];
    });
    document.querySelectorAll(".color-code").forEach((element, index) => {
      element.textContent = "#" + colors[index];
    });
  }

  function generateColor() {
    const colorDigit = "1234567890abcdef";
    let color = "";
    for (i = 1; i < 7; i++) {
      color += colorDigit[Math.floor(Math.random() * 15)];
    }
    return color;
  }

