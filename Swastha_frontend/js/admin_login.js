let btn  =document.getElementsByClassName("submit-btn")
btn[0].addEventListener("click", e=>{
    e.preventDefault()

    var email_value=document.getElementById("email").value.trim()
    var password_value=document.getElementById("password").value.trim()

    let errorMessage=""
    if(!email_value){
        errorMessage+="Please Enter Your Email.\n"
    }if(!password_value){
        errorMessage+="Please Enter Your Password.\n"
    }if(errorMessage){
        alert(errorMessage)
        return;
    }

    fetch(`http://localhost:8080/adminlogin?email=${email_value}&password=${password_value}`,{
        method:"GET",
        headers:{
            "Content-Type":"Application/json"
        }
    })
    .then(Response=>{
        if(Response.ok){
            return Response.json()
        }else{
            throw new Error("Wrong Password or Email")
        }
    })
    .then(data=>{
        alert("Login Sucessfull")
        localStorage.setItem("admin",JSON.stringify(data))
        window.location.href="http://127.0.0.1:5500/html/admin_home.html"
    })
    .catch(error=>{
        alert("Wrong Email or Password")
    })


    
})