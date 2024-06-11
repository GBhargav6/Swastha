let uppercase = /(?=.*[A-Z])/;
let lower = /(?=.*[a-z])/;
let digit = /(?=.*\d)/;
let spe_char = /(?=(.*\W))/;
let min = /[a-zA-Z0-9]{4}/;

var password = document.getElementById("password");
var conf_password = document.getElementById("conf_password");

var password_lable = document.getElementById("password_lable");
var conf_password_lable = document.getElementById("conf_password_lable");
console.log(password);

password.addEventListener("keyup", (e) => {
  if (uppercase.test(password.value) === false) {
    password_lable.innerHTML = "Should contain one Upper Case";
  }
  else if (lower.test(password.value) === false) {
    password_lable.innerHTML = "Should contain one lower case";
  }
  else if (digit.test(password.value) == false) {
    password_lable.innerHTML = "Should contain one digit";
  }
  else if (spe_char.test(password.value) === false) {
    password_lable.innerHTML = "Should contain one Special Chatecter";
  }
  else if (min.test(password.value) === false) {
    password_lable.innerHTML = "Shuold contain 8 charecters";
  } else {
    password_lable.innerHTML = "Password created";
  }
});

conf_password.addEventListener("keyup", e=>{
    if(conf_password.value!==password.value){
        conf_password_lable.innerHTML="Password Mismatch"
    }else{
        conf_password_lable.innerHTML="Password Matched"
    }
})

let submit= document.getElementsByClassName("submit");


submit[0].addEventListener("click", e=>{
  e.preventDefault()
  let hospital_name=document.getElementById("hospital_name").value.trim()
  let founder_name=document.getElementById("founder_name").value.trim()
  let email=document.getElementById("email").value.trim()
  let password=document.getElementById("password").value.trim()
  let conf_password= document.getElementById("conf_password").value.trim()
  let phone = document.getElementById("phone").value.trim()

  let errorMessage=""

  if(!hospital_name){
    errorMessage+="Enter Hospital Name.\n"

  }if(!founder_name){
    errorMessage+="Enter Founder Name.\n"
  }if(!email){
    errorMessage+="Enter Your Email.\n"
  }if(!password){
    errorMessage+=" ENter Password.\n"
  }if(!conf_password){
    errorMessage+="Enter Conf_password.\n"
  }if(!phone){
    errorMessage+="Enter Phone Number.\n"
  }
  if(errorMessage){
    alert(errorMessage)
    return;
  }

  let doctor_id=document.getElementById("doctor_id").value
  let hospital={
    name:hospital_name,
    founder:founder_name,
    email:email,
    password:password,
    phone:phone,
    address:{
      pincode:0
  }
  }

  fetch(`http://localhost:8080/savehospital?doctor_id=${doctor_id}`, {
    method:"POST",
    headers:{
      "Content-Type":"Application/json"
    },
    body:JSON.stringify(hospital)
  })
  .then(Response=>{
    if(Response.ok){
      return Response.json()
    }else{
      throw new Error("Registration not sucessfull")
    }
  })
  .then(data=>{
    alert("Hospital Registered Sucessfully")
    window.location.href="http://127.0.0.1:5500/html/hospital_login.html"
  })
  .catch(error=>{
    alert("Hospital Not Registered")
    console.log(error);
  })

})