let btn =document.getElementsByClassName("submit")


btn[0].addEventListener("click", (e) =>{
    e.preventDefault()
    let email_value =document.getElementById("email").value
    let password_value=document.getElementById("password").value

    let errorMessage=""

    if(!email_value){
        errorMessage+="Please Enter Your Email"
    }
    if(!password_value){
        errorMessage+="Please Enter Password"
    }if(errorMessage){
        alert(errorMessage)
        return;
    }

    fetch(`http://localhost:8080/doctorlogin?email=${email_value}&password=${password_value}`, {
        method:"GET",
        headers:{
            "Content-Type":"Application/json"
        }
    })
    .then(response =>{
        if(response.ok){
            return response.json()
        }else{
            throw new Error("Worng password or Email")
        }
    })
    .then(data=>{
        alert("login Sucessfull")
        localStorage.setItem("doctor",JSON.stringify(data))
        window.location.href="http://127.0.0.1:5500/html/doctor_home.html"
        
    })
    .catch(error =>{
        alert("Wrong Email or Password")
        console.log(error);
    })


})