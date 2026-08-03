const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;


document.querySelector('form').addEventListener('submit', ()=> {
      event.preventDefault()
    let userName = document.getElementById('username');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let isInputFormatted = true;
  let confirmPassword = document.getElementById('confirm-password'); 
  let testData = [
    {"name":"Username", "value":userName}, {"name":"Email", "value":email},
    {"name":"Password", "value": password} ,
    {"name":"Confirm Password", "value":confirmPassword}]

  checkInputs(testData);



  
});

function  checkInputs(arr){
let password = arr.find(index=>index.name=="Password");
let confirmPassword = arr.find(index=>index.name=="Confirm Password");
      for(input in arr){
          arr[input].value.parentElement.querySelector("small").innerHTML = ""
        // alert(arr[input].name)
      if(arr[input].value.value==""){
        setError(arr[input].value, `${arr[input].name} must be filled`)
       
      return 
      }else if(arr[input].name=="Username" && arr[input].value.value.length<4 || arr[input].name=="Password"&& arr[input].value.value.length<4){
        setError(arr[input].value, `${arr[input].name} must have 4 letters Max` )
        return

      }else if(arr[input].name=="Username"&& !isNaN(arr[input].value.value.charAt(0))){
         setError(arr[input].value, `${arr[input].name} cannot start with a number` )
        return
      }else if( arr[input].name!="Password" && !isNaN(arr[input].value.value.charAt(0)) && arr[input].name!="Confirm Password"){
  setError(arr[input].value, `${arr[input].name} cannot start with a number` )
        return
      }else if(arr[input].name=="Email" && !emailRegex.test(arr[input].value.value)){
        alert()
  setError(arr[input].value, `${arr[input].name} is not valid ` )
        return
      }else if(password.value.value!==confirmPassword.value.value){
setError(password.value, `${password.name} Doesnot match` )
setError(confirmPassword.value, `${password.name} Doesnot match` )
return
}
      else{
           arr[input].value.parentElement.querySelector("input").style.borderColor= "#2ecc71"
      }

    
      }



}

function setError(inputField, message){
inputField.parentElement.querySelector("small").innerHTML = message
      inputField.parentElement.querySelector("input").style.borderColor= "#e74c3c";
}

function setError(inputField, message){
inputField.parentElement.querySelector("small").innerHTML = message
      inputField.parentElement.querySelector("input").style.borderColor= "#e74c3c";
}