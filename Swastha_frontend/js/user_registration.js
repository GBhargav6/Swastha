// console.log("Hellooo");

let uppercase = /(?=.*[A-Z])/
let lower = /(?=.*[a-z])/
let digit = /(?=.*\d)/
let spe_char  = /(?=(.*\W))/
let min = /[a-zA-Z0-9]{4}/

let span = document.getElementById("span");

let password = document.getElementById("password")
console.log(password);

password.addEventListener("keyup", ()=>{
    if(uppercase.test(password.value)===false){
        span.innerHTML ="Should contain One Uppercase"
    }else if(lower.test(password.value)===false){
        span.innerHTML="Should contain one lowercase"
    }else if(digit.test(password.value)=== false){
        span.innerHTML="Should contain one digit"
    }else if(spe_char.test(password.value)=== false){
        span.innerHTML="Should contain onr special charecter"
    }else if(min.test(password.value)===false){
        span.innerHTML="Should contain 8 charecters"
    }else{
        span.innerHTML="Password Created"
    }

})

let conf_span=document.getElementById("conf_span")

let conf_password=document.getElementById("conf_password")

conf_password.addEventListener("keyup", () => {
    if(conf_password.value===password.value){
        conf_span.innerHTML="Password matched"
    }else{
        conf_span.innerHTML="Password Mismatch"
        
    }
})

let submit = document.getElementsByClassName("submit")
console.log(submit[0]);

submit[0].addEventListener("click" , (e) => {
    console.log(e.target);
    e.preventDefault()

    let conf_password=document.getElementById("conf_password").value.trim()
    let password = document.getElementById("password").value.trim()
    if(conf_password!==password){
        alert("Password Mismatch")
        return;
    }

      var firstName_input =document.getElementById("firstName").value
      var lastName_input=document.getElementById("lastName").value
      var email_input=document.getElementById("email").value
      var password_input=document.getElementById("password").value

      let errorMessage=""
       
      if(!firstName_input){
        errorMessage+="Please Enter first Name.\n"
      }if(!lastName_input){
        errorMessage+="Please enter Last Name.\n"
      }if(!email_input){
        errorMessage+="Please enter email.\n"
      }if(!password_input){
        errorMessage+="please enter Password.\n"
      }if(errorMessage){
        alert(errorMessage)
        return;
      }

  
      let user ={
          firstName:firstName_input,
          lastName:lastName_input,
          email:email_input,
          password:password_input,
          address:{
            pincode:0
        }
      }
  
      fetch("http://localhost:8080/usersave", {
          method:"POST",
          headers: {
              'Content-Type':'Application/json'
          },
           body:JSON.stringify(user)
           
      } )
      .then(Response => {
        if(Response.ok){
            return Response.json()
        }else{
            throw new Error("Registartion Not Sucessfull")
        }
      })
      .then(() => {
          window.location.href ='http://127.0.0.1:5500/html/user_login.html';
          
      })
      .catch(error => {
          console.error("Error",error);
          alert("An error occured while Submitting");
      });
  
      //document.getElementById('form').reset();
      
})

   