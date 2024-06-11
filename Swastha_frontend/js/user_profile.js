const userString = localStorage.getItem("data");
const user_object = JSON.parse(userString);


function displayProfile(user_object) {
  document.getElementById("userId").textContent = user_object.data.id;
  document.getElementById("firstName").textContent = user_object.data.firstName;
  document.getElementById("lastName").textContent = user_object.data.lastName;
  document.getElementById("email").textContent = user_object.data.email;
  document.getElementById("password").textContent = user_object.data.password;
  document.getElementById("blood").textContent = user_object.data.bloodGroup;
  document.getElementById("availability").textContent =
    user_object.data.availability;
  document.getElementById("gender").textContent = user_object.data.gender;
  document.getElementById("phone").textContent = user_object.data.phone;
  if (user_object.data.address) {
    document.getElementById("doorno").textContent = user_object.data.address.doorNo;
    document.getElementById("street").textContent = user_object.data.address.street;
    document.getElementById("area").textContent = user_object.data.address.area;
    document.getElementById("city").textContent = user_object.data.address.city;
    document.getElementById("state").textContent = user_object.data.address.state;
    document.getElementById("pincode").textContent = user_object.data.address.pinCode;

  }
}

if (user_object) {
  displayProfile(user_object);
}
