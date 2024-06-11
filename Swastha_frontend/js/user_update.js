const userString = localStorage.getItem("data");
const user_object = JSON.parse(userString);
console.log(user_object.data.address);



function displayDetails(user_object) {
    document.getElementById("userid").value = user_object.data.id;
  document.getElementById("firstname").value = user_object.data.firstName;
  document.getElementById("lastname").value = user_object.data.lastName;
  document.getElementById("password").value = user_object.data.password;
  document.getElementById("bloodgroup").value = user_object.data.bloodGroup;
  document.getElementById("availability").value = user_object.data.availability;
  document.getElementById("phone").value = user_object.data.phone;
  document.getElementById("gender").value = user_object.data.gender;

  if (user_object.data.address) {
    document.getElementById("addid").value =
      user_object.data.address.id;
    document.getElementById("doorno").value =
      user_object.data.address.doorNo;
    document.getElementById("street").value = user_object.data.address.street;
    document.getElementById("area").value =
      user_object.data.address.area;
    document.getElementById("city").value =
      user_object.data.address.city;
    document.getElementById("state").value =
      user_object.data.address.state;
    document.getElementById("pincode").value =
      user_object.data.address.pinCode;
  }
}
if (user_object) {
  displayDetails(user_object);
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
