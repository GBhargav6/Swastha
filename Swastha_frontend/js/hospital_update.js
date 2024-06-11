const hospitalString = localStorage.getItem("hospital");
const hospital_object = JSON.parse(hospitalString);
console.log(hospital_object.data.id);


function displayDetails(hospital_object) {
  document.getElementById("name").value = hospital_object.data.name;
  document.getElementById("founder").value = hospital_object.data.founder;
  document.getElementById("email").value = hospital_object.data.email;
  document.getElementById("phone").value = hospital_object.data.phone;
  document.getElementById("website").value = hospital_object.data.website;

  if (hospital_object.data.address) {
    document.getElementById("doorno").value =
      hospital_object.data.address.doorNo;
    document.getElementById("street").value = hospital_object.data.address.street;
    document.getElementById("area").value =
      hospital_object.data.address.area;
    document.getElementById("city").value =
      hospital_object.data.address.city;
    document.getElementById("state").value =
      hospital_object.data.address.state;
    document.getElementById("pincode").value =
      hospital_object.data.address.pinCode;
  }
}
if (hospital_object) {
  displayDetails(hospital_object);
}


var btn = document.getElementsByClassName("submit");
console.log(btn);
btn[0].addEventListener("click", (e) => {
  e.preventDefault();
  let  user_id_value =document.getElementById("userid").value
  let firstname_value = document.getElementById("firstname").value;
  let lastname_value = document.getElementById("lastname").value;
  let password_value = document.getElementById("password").value;
  let bloodgroup_value = document.getElementById("bloodgroup").value;
  let availability_value = document.getElementById("availability").value;
  let phone_value = document.getElementById("phone").value;
  let gender_value = document.getElementById("gender").value;
  let add_id_value=document.getElementById("addid").value
  var doorno_value = document.getElementById("doorno").value;
  let street_value = document.getElementById("street").value;
  let area_value = document.getElementById("area").value;
  let city_value = document.getElementById("city").value;
  let state_value = document.getElementById("state").value;
  let pincode_value = document.getElementById("pincode").value;

    let user = {
    id:user_id_value,
    firstName: firstname_value,
    lastName: lastname_value,
    password: password_value,
    bloodGroup: bloodgroup_value,
    availability: availability_value,
    phone: phone_value,
    gender: gender_value,
    address: {
      id:add_id_value,
      doorNo: doorno_value,
      street: street_value,
      area: area_value,
      city: city_value,
      state: state_value,
      pinCode: pincode_value,
    },
  };

  fetch("http://localhost:8080/userupdate", {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(user),
  })
    .then((Response) => {
      if (Response.ok) {
        localStorage.removeItem("data");
        return Response.json();
      } else {
        throw new Error("Update Not Sucessfull");
      }
    })
    .then((data) => {
      localStorage.setItem("data", JSON.stringify(data));
      alert("Sucessfully Updated...");
      window.location.href = "http://127.0.0.1:5500/html/user_home.html";
    })
    .catch((error) => {
      alert("Update Not Sucessfull");
    });
});