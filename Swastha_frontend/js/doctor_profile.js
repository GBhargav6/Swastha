const doctor_string = localStorage.getItem("doctor")
const doctor_object=JSON.parse(doctor_string)


function displayProfile(doctor_object){
    document.getElementById("doctorid").textContent=doctor_object.data.id
    document.getElementById("firstname").textContent=doctor_object.data.firstName
    document.getElementById("lastname").textContent = doctor_object.data.lastName;
  document.getElementById("email").textContent = doctor_object.data.email;
  document.getElementById("password").textContent = doctor_object.data.password;
  document.getElementById("speciality").textContent = doctor_object.data.speciality;
  document.getElementById("experience").textContent = doctor_object.data.experience;
  document.getElementById("availability").textContent =
    doctor_object.data.availability;
  document.getElementById("gender").textContent = doctor_object.data.gender;
  document.getElementById("phone").textContent = doctor_object.data.phone;
  if (doctor_object.data.address) {
    document.getElementById("doorno").textContent = doctor_object.data.address.doorNo;
    document.getElementById("street").textContent = doctor_object.data.address.street;
    document.getElementById("area").textContent = doctor_object.data.address.area;
    document.getElementById("city").textContent = doctor_object.data.address.city;
    document.getElementById("state").textContent = doctor_object.data.address.state;
    document.getElementById("pincode").textContent = doctor_object.data.address.pinCode;
  }

}

if(doctor_object){
    displayProfile(doctor_object)
}