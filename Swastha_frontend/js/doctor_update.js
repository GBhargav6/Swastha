const doctor_string = localStorage.getItem("doctor");
const doctor_object = JSON.parse(doctor_string);


function displayDetails(doctor_object) {
  document.getElementById("id").value = doctor_object.data.id;
  document.getElementById("firstname").value = doctor_object.data.firstName;
  document.getElementById("lastname").value = doctor_object.data.lastName;
  document.getElementById("password").value = doctor_object.data.password;
  document.getElementById("speciality").value = doctor_object.data.speciality;
  document.getElementById("fee").value = doctor_object.data.fee;
  document.getElementById("experience").value = doctor_object.data.experience;
  document.getElementById("availability").value =
    doctor_object.data.availability;
  document.getElementById("phone").value = doctor_object.data.phone;
  document.getElementById("gender").value = doctor_object.data.gender;
  

  if (doctor_object.data.address) {
    document.getElementById("add_id").value = doctor_object.data.address.id;
    document.getElementById("doorno").value = doctor_object.data.address.doorNo;
    document.getElementById("street").value = doctor_object.data.address.street;
    document.getElementById("area").value = doctor_object.data.address.area;
    document.getElementById("city").value = doctor_object.data.address.city;
    document.getElementById("state").value = doctor_object.data.address.state;
    document.getElementById("pincode").value =
      doctor_object.data.address.pinCode;
  }
}
if (doctor_object) {
  displayDetails(doctor_object);
}
let add_id_value=doctor_object.data.address.id;
  

var btn = document.getElementsByClassName("submit");

btn[0].addEventListener("click", (e) => {
  e.preventDefault();
  let doctor_id_value = document.getElementById("id").value;
  let firstname_value = document.getElementById("firstname").value;
  let lastname_value = document.getElementById("lastname").value;
  let password_value = document.getElementById("password").value;
  let speciality_value = document.getElementById("speciality").value;
  let experience_value = document.getElementById("experience").value;
  let availability_value = document.getElementById("availability").value;
  let phone_value = document.getElementById("phone").value;
  let gender_value = document.getElementById("gender").value;
  let fee_value = document.getElementById("fee").value;
  

  var doorno_value = document.getElementById("doorno").value;
  let street_value = document.getElementById("street").value;
  let area_value = document.getElementById("area").value;
  let city_value = document.getElementById("city").value;
  let state_value = document.getElementById("state").value;
  let pincode_value = document.getElementById("pincode").value;
  

  let doctor = {
    id: doctor_id_value,
    firstName: firstname_value,
    lastName: lastname_value,
    fee:fee_value,
    password: password_value,
    speciality: speciality_value,
    experience: experience_value,
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
    }
  };
  

  fetch("http://localhost:8080/updatedoctor", {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(doctor),
  })
    .then((Response) => {
      if (Response.ok) {
        localStorage.removeItem("doctor");
        return Response.json();
      } else {
        throw new Error("Update Not Sucessfull");
      }
    })
    .then((data) => {
      localStorage.setItem("doctor", JSON.stringify(data));
      alert("Sucessfully Updated...");
      window.location.href = "http://127.0.0.1:5500/html/doctor_home.html";
    })
    .catch((error) => {
      alert("Update Not Sucessfull");
      console.log(error);
    });
});
