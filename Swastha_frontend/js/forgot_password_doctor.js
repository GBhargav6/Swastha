var submit =document.getElementsByClassName("submit")
submit[0].addEventListener("click", e=>{
    e.preventDefault()
    var email=document.getElementById("email").value
    fetch(`http://localhost:8080/doctorotp?email=${email}`, {
        method:"GET",
        headers:{
            "Content-Type":"Application/json"
        }
    })
    .then(Response=>{
        if(Response.ok){
            return Response.json()
        }else{
            throw new Error("Account Not Found")
        }
    })
    .then(data=>{
        alert("OTP Sent Succesfully..")
        window.location.href="http://127.0.0.1:5500/html/otp_verification.html"
    })
    .catch(error=>{
        alert("Account Not Found")
    })

})