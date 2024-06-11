const admin_string=localStorage.getItem("admin")
const admin_object=JSON.parse(admin_string)

function displayProfile(admin){

    document.getElementById("adminid").textContent=admin.data.id
    document.getElementById("admin").textContent=admin.data.admin
    document.getElementById("firstname").textContent=admin.data.firstName
    document.getElementById("lastname").textContent=admin.data.lastName
    document.getElementById("email").textContent=admin.data.email
    document.getElementById("password").textContent=admin.data.password
    document.getElementById("gender").textContent=admin.data.gender
    document.getElementById("phone").textContent=admin.data.phone
    if(admin.data.address){
        document.getElementById("doorno").textContent=admin.data.address.doorNO
    document.getElementById("street").textContent=admin.data.address.street
    document.getElementById("area").textContent=admin.data.address.area
    document.getElementById("city").textContent=admin.data.address.city
    document.getElementById("state").textContent=admin.data.address.state
    document.getElementById("pincode").textContent=admin.data.pinCode
    }

}
displayProfile(admin_object);