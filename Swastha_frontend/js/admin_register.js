let uppercase = /(?=.*[A-Z])/
let lower = /(?=.*[a-z])/
let digit = /(?=.*\d)/
let spe_char  = /(?=(.*\W))/
let min = /[a-zA-Z0-9]{4}/


let password=document.getElementById("password")
let span = document.getElementById('span')
console.log(password);
password.addEventListener("keyup", e=>{
    if(uppercase.test(password.value)===false){
        span.innerHTML="Should contain one Uppercase"
    }
    else if(lower.test(password.value)===false){
        span.innerHTML="Should contgain one lowercase"
    }
    else if(digit.test(password.value)==false){
        span.innerHTML="Should contain one digit"
    }
    else if(spe_char.test(password.value)===false){
        span.innerHTML="Should contain one Special Charecter"
    }
    else if(min.test(password.value)===false){
        span.innerHTML="Should Contain 8 Charecters"
    }else{
        span.innerHTML="Password Created"
    }
})

let conf_password=document.getElementById("conf_password")
let conf_span=document.getElementById("conf_span")
conf_password.addEventListener("keyup", e=>{
    if(conf_password.value!==password.value){
        conf_span.innerHTML="Password Mismatch"
    }else{
        conf_span.innerHTML="Password Matched"
    }
})

var btns =document.getElementsByClassName("submit")
btns[0].addEventListener("click", e =>{
    e.preventDefault()
    var firstName_value=document.getElementById("firstName").value.trim()
    var lastName_value =document.getElementById("lastName").value.trim()
    var email_value = document.getElementById("email").value.trim()
    var password_value =document.getElementById("password").value.trim()
    var admin_value =document.getElementById("admin").value.trim()

    let errorMessage=""
    if(!firstName_value){
        errorMessage+="Please Enter First Name.\n"
    }if(!lastName_value){
        errorMessage+="Please Enter Last Name.\n"
    }if(!email_value){
        errorMessage+="Please Enter Email.\n"
    }if(!password_value){
        errorMessage+=" Please Enter Password.\n"
    }if(errorMessage){
        alert(errorMessage)
        return;
    }

    
    let conf_password=document.getElementById("conf_password").value
    let password=document.getElementById("password").value
    if(conf_password!==password){
        alert("Password Mismatch")
        return;
    }


    let admin={
        firstName:firstName_value,
        lastName:lastName_value,
        email:email_value,
        password:password_value,
        admin:admin_value,
        address:{
            pincode:0
        }
    }

    fetch("http://localhost:8080/savedoctor", {
        method:"POST",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify(admin)
    })
    .then(Response=>{
        if(Response.ok){
            return Response.json()
        }else{
            alert("Account Already Exist")
            throw new Error("Not Registerd")
            
        }
    })
    .then(data=>{
        alert("registration Succesfull")
        window.location.href="http://127.0.0.1:5500/html/admin_login.html"
        console.log(data);
    })
    .catch(error=>{
        alert("Form Not Submitted")
        console.log(error);
    })


})





















