


let login=document.getElementById("button")
login.addEventListener("click",e=>{
    
    e.preventDefault()
    let email_value=document.getElementById("username").value
    let password_value=document.getElementById("password").value

    if(!email_value ||!password_value){
        alert("Please Enter Username and Password")
        return;
    }

    fetch(`http://localhost:8080/loginhospital?email=${email_value}&password=${password_value}`,{
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
        alert("Login Sucessfull")
        localStorage.setItem("hospital",JSON.stringify(data))
        window.location.href="http://127.0.0.1:5500/html/hospital_home.html"
    })
    .catch(error =>{
        alert("Account Not Found")
        console.log(error);
    })
})