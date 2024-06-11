
// Toggle Section
var tog =document.getElementById("toggle")

tog.addEventListener("mouseover", e =>{
    e.preventDefault()
    var toggle =document.getElementById("toggle_section")
    toggle.style.display=toggle.style.display === 'none'?'block':'none'
})

const admin_string=localStorage.getItem("admin")
const admin_object=JSON.parse(admin_string)


// Account Deletion
var delete_btn = document.getElementById("delete-btn")
delete_btn.addEventListener("click",e =>{
    e.preventDefault()

    let id=admin_object.data.id

    fetch(`http://localhost:8080/deletedoctor?id=${id}`, {
        method:"DELETE",
        headers:{
            'Content-Type':'Application/json'
        }
    })
    .then(Response=>{
        if(Response.ok){
            return Response.json()
        }else{
            throw new Error("Account Not Deleted")
        }
    })
    .then(data=>{
        localStorage.clear()
        alert("Account Deleted Sucessfully")
        window.location.href="http://127.0.0.1:5500/html/swastha_home.html"
    })
    .catch(error=>{
        alert("Account Not Deleted")
    })
})

//Logout
var logout=document.getElementsByClassName("logout")
logout[0].addEventListener("click", e=>{
    e.preventDefault()
    localStorage.clear()
    window.location.href="http://127.0.0.1:5500/html/swastha_home.html"
})








