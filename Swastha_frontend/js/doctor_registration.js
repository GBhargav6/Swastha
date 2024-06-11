// Create a new Date object
var today = new Date();

// Get the current year, month, and day
var currentYear = today.getFullYear();
var currentMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
var currentDate = today.getDate().toString().padStart(2, '0'); // Add leading zero if needed

// Combine the year, month, and day to get today's date in "YYYY-MM-DD" format
var formattedDate = currentYear + '-' + currentMonth + '-' + currentDate;



let uppercase = /(?=.*[A-Z])/
let lower = /(?=.*[a-z])/
let digit = /(?=.*\d)/
let spe_char  = /(?=(.*\W))/
let min = /[a-zA-Z0-9]{4}/


let span = document.getElementById("span")

let con_span = document.getElementById("conf_span")

let password = document.getElementById("password")

let conf_password =document.getElementById("conf_password")

password.addEventListener("keyup" ,() => {
    if(uppercase.test(password.value) === false){
       span.innerHTML = "it should conation one uppercase"
    }else if(lower.test(password.value) === false){
        span.innerHTML = "it should contain one lowercase"
    }else if(digit.test(password.value) === false){
        span.innerHTML = "it should contain one digit"
    }else if(spe_char.test(password.value) === false){
        span.innerHTML = "it should contain one special charather"
    }else if(min.test(password.value)===false){
        span.innerHTML = "it should contain minimum 8 digit"
    }else{
        span.innerHTML = "password is created"
    }  
})

conf_password.addEventListener("keyup", () => {
    if(conf_password.value==password.value){
        con_span.innerHTML= "Password Matched"
    }else{
        con_span.innerHTML="Password Mismatch"
    }
})


let submit = document.getElementsByClassName("submit")
console.log(submit);

submit[0].addEventListener("click", e =>{
    e.preventDefault()

    let password = document.getElementById("password").value
    let conf_password =document.getElementById("conf_password").value

    if(password!==conf_password){
        alert("Password Mismatch")
        return;
    }

    var firstName_value=document.getElementById("firstName").value
    var lastName_value=document.getElementById("lastName").value
    var email_value=document.getElementById("email").value
    var password_value = document.getElementById("password").value
    var admin_value=document.getElementById("admin").value

    let errorMessage=""

    if(!firstName_value){
        errorMessage+="Please Enter FirstName.\n"
    } if(!lastName_value){
        errorMessage+="Please Enter LastName.\n"
    }if(!email_value){
        errorMessage+="Please Enter Email.\n"
    }if(!password_value){
        errorMessage+="Please Enter Password.\n"
    }
    if(errorMessage.valueOf===""){
        errorMessage+="Dont use Spaces"
    }
    
    if(errorMessage){
        
        alert(errorMessage)
        return;
    }
    console.log(errorMessage);


    let doctor ={
        firstName:firstName_value,
        lastName:lastName_value,
        email: email_value,
        password:password_value,   
        admin:admin_value,
        address:{
            pincode:0
        },
        date:[{
            appointmentDate:formattedDate,
            slots:[{
                slot:"12:00:00"
            }]
        }]
    }
    fetch("http://localhost:8080/savedoctor", {
        method:"POST",
        headers:{
            'Content-Type':'Application/json'
        },
        body:JSON.stringify(doctor)
    })
    .then(response=>{
        if(response.ok){
            return response.json()
        }else{
            throw new Error("Regisration Not Successfull")
        }
    })

    .then(data => {
        window.location.href="http://127.0.0.1:5500/html/doctor_login.html"
    })
    .catch(error =>{
        alert("Account Already Exist")
    })
})