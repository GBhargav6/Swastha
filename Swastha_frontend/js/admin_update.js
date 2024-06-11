const admin_string = localStorage.getItem("admin");
const admin = JSON.parse(admin_string);
console.log(admin.data.address);


function updateProfile(admin) {
  document.getElementById("adminid").value = admin.data.id;
  document.getElementById("firstname").value = admin.data.firstName;
  document.getElementById("lastname").value = admin.data.lastName;
  document.getElementById("phone").value = admin.data.phone;
  document.getElementById("password").value = admin.data.password;
  document.getElementById("gender").value = admin.data.gender;
  if (admin.data.address) {
    document.getElementById("addressid").value = admin.data.address.id;
    document.getElementById("doorno").value = admin.data.address.doorNo;
    document.getElementById("street").value = admin.data.address.street;
    document.getElementById("area").value = admin.data.address.area;
    document.getElementById("city").value = admin.data.address.city;
    document.getElementById("state").value = admin.data.address.state;
    document.getElementById("pincode").value = admin.data.address.pinCode;
    
  }
}
if(admin){
  updateProfile(admin)
}


let submit = document.getElementsByClassName("submit");
submit[0].addEventListener("click", (e) => {
  let adminid_value = document.getElementById("adminid").value;
  let firstname_value = document.getElementById("firstname").value;
  let lastname_value = document.getElementById("lastname").value;
  let password_value = document.getElementById("password").value;
  let phone_value = document.getElementById("phone").value;
  let gender_value = document.getElementById("gender").value;
  let doorno_value = document.getElementById("doorno").value;
  let street_value = document.getElementById("street").value;
  let area_value = document.getElementById("area").value;
  let city_value = document.getElementById("city").value;
  let state_value = document.getElementById("state").value;
  let pincode_value = document.getElementById("pincode").value;
  let addressid_value = document.getElementById("addressid").value;

  let admin={
    id:adminid_value,
    firstName:firstname_value,
    lastName:lastname_value,
    password:password_value,
    phone:phone_value,
    gender:gender_value,
    address:{
        id:addressid_value,
        doorNo:doorno_value,
        street:street_value,
        area:area_value,
        city:city_value,
        state:state_value,
        pinCode:pincode_value
    }
  }
  fetch("http://localhost:8080/updatedoctor", {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(admin),
  })
    .then((Response) => {
      if (Response.ok) {
        localStorage.removeItem("admin");
        return Response.json();
      } else {
        throw new Error("Update Not Sucessfull");
      }
    })
    .then((data) => {
      localStorage.setItem("admin", JSON.stringify(data));
      alert("Sucessfully Updated...");
      window.location.href = "http://127.0.0.1:5500/html/admin_home.html";
    })
    .catch((error) => {
      alert("Update Not Sucessfull");
      console.log(error);
    });


});
