const hospitalString = localStorage.getItem("hospital");
const hospital_object = JSON.parse(hospitalString);


function displayProfile(hospital_object) {
  document.getElementById("userId").textContent = hospital_object.data.id;
  document.getElementById("firstName").textContent = hospital_object.data.name;
  document.getElementById("lastName").textContent = hospital_object.data.founder;
  document.getElementById("email").textContent = hospital_object.data.email;
  document.getElementById("password").textContent = hospital_object.data.password;
  document.getElementById("phone").textContent = hospital_object.data.phone;
  if (hospital_object.data.address) {
    document.getElementById("doorno").textContent = hospital_object.data.address.doorNo;
    document.getElementById("street").textContent = hospital_object.data.address.street;
    document.getElementById("area").textContent = hospital_object.data.address.area;
    document.getElementById("city").textContent = hospital_object.data.address.city;
    document.getElementById("state").textContent = hospital_object.data.address.state;
    document.getElementById("pincode").textContent = hospital_object.data.address.pinCode;

  }
}

if (hospital_object) {
  displayProfile(hospital_object);
}