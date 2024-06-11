//Displaying Doctors
document.addEventListener("DOMContentLoaded", function () {
  fetchDoctors();
});

function fetchDoctors() {
  fetch("http://localhost:8080/fetchalldoctor", {
    method: "GET",
  })
    .then((Response) => {
      if (!Response.ok) {
        throw new Error("Doctors Not Found");
      } else {
        return Response.json();
      }
    })
    .then((doctors) => {
      displayDoctors(doctors);
    });
}

function displayDoctors(doctors) {
  var doctorDetailsContainer = document.getElementById("doctor_container");
  doctorDetailsContainer.style.marginTop = "20px";
  doctorDetailsContainer.innerHTML = " ";

  for (var i = 0; i < doctors.data.length; i++) {
    var doctor = doctors.data[i];

    let div1 = document.createElement("div");
    doctorDetailsContainer.appendChild(div1);
    div1.style.height = "200px";
    div1.style.borderBottom="3px solid"
    div1.style.borderRadius = "30px";
    div1.style.paddingTop = "10px";
    div1.style.marginTop = "20px";
    div1.style.paddingLeft = "30px";
    div1.style.display = "flex";
    div1.style.flexDirection = "column";
    div1.style.justifyContent = "space-between";
    div1.style.backgroundColor = "#3aafa9";

    let div2 = document.createElement("div");
    div1.appendChild(div2);
    div2.style.height = "35px";
    div2.style.paddingTop = "10px";
    div2.innerHTML = "DOCTOR NAME : " + doctor.firstName;

    let div3 = document.createElement("div");
    div1.appendChild(div3);
    div3.height = "35px";
    div3.paddingTop = "10px";
    div3.innerHTML = "DOCTOR SPECIALITY : " + doctor.speciality;

    let div4 = document.createElement("div");
    div1.appendChild(div4);
    div4.style.height = "35px";
    div4.style.paddingTop = "10px";
    div4.innerHTML = "DOCTOR AVAILABILITY : " + doctor.availability;

    let div5 = document.createElement("div");
    div1.appendChild(div5);
    div5.style.height = "35px";
    div5.paddingTop = "10px";
    div5.innerHTML = "DOCTOR EXPERIENCE : " + doctor.experience;

    let div6 = document.createElement("div");
    div1.appendChild(div6);
    div6.style.height = "35px";
    div6.paddingTop = "10px";
    div6.innerHTML = "DOCTOR FEE : " + doctor.fee;
    let div8 = document.createElement("div");
    div1.appendChild(div8);
    div8.style.height = "35px";
    div8.paddingTop = "10px";
    div8.innerHTML = "CITY  : " + doctor.address.city;

    let div7 = document.createElement("div");
    div1.appendChild(div7);
    div7.style.height = "35px";
    div7.style.textAlign = "right";
    div7.style.paddingBottom = "50px";
    let btn = document.createElement("button");
    div7.appendChild(btn);
    btn.innerHTML = "APPOINTMENT";
    btn.style.height = "35px";
    btn.style.backgroundColor = "darkblue";
    btn.style.cursor = "pointer";
    btn.style.padding = "0.9em 1.4em";
    btn.style.marginLeft = "500px";
    btn.style.fontWeight = "bolder";
    btn.style.border = "none";
    btn.style.color = "white";
    btn.style.borderRadius = "10px";
    btn.style.boxShadow =
      "0px 0px 20px rgba(71, 184, 255, 0.5), 0px 5px 5px -1px rgba(58, 125, 233, 0.25), inset 4px 4px 8px rgba(175, 230, 255, 0.5), inset -4px -4px 8px rgba(19, 95, 216, 0.35)";

    btn.value = JSON.stringify(doctor);

    btn.addEventListener("click", (e) => {
      localStorage.setItem("doctor", btn.value);
      window.location.href = "http://127.0.0.1:5500/html/appointment_date.html";
    });
  }
}

// Function to fetch data from API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch the data from ${url}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching the data : ", error);
    throw error;
  }
}

// Event listener for triggering the fetch operation
document.getElementById("search_btn").addEventListener("click", async (e) => {
  e.preventDefault();

  let search = document.getElementById("search_field").value.trim();
  if (!search) {
    console.log("Search field is Empty");
    return;
  }

  // Define your API endpoints
  const apiUrlBySpeciality = `http://localhost:8080/searchdoctorspeciality?speciality=${search}`;
  const apiUrlByExperience = `http://localhost:8080/searchbyexperience?experience=${search}`;
  const apiUrlByName = `http://localhost:8080/searchbyname?name=${search}`;
  const apiUrlByCity = `http://localhost:8080/searchbycity?city=${search}`;

  try {
    const results = await Promise.all([
      fetchData(apiUrlBySpeciality),
      fetchData(apiUrlByExperience),
      fetchData(apiUrlByName),
      fetchData(apiUrlByCity),
    ]);
    // Handle results
    const bySpecialityData = results[0];
    const byExperienceData = results[1];
    const byNameData = results[2];
    const byCityData = results[3];

    //Displaying
    if (bySpecialityData.data.length > 0) {
      displayDoctors(bySpecialityData);
    }
    if (byCityData.data.length > 0) {
      displayDoctors(byCityData);
    }
    if (byExperienceData.data.length > 0) {
      displayDoctors(byExperienceData);
    }
    if (byNameData.data.length > 0) {
      displayDoctors(byNameData);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Toggle Section
var tog = document.getElementById("toggle");
tog.addEventListener("mouseover", (e) => {
  e.preventDefault();
  var toggle = document.getElementById("toggle_section");
  toggle.style.display = toggle.style.display === "none" ? "block" : "none";
});

const userString = localStorage.getItem("data");
const userData = JSON.parse(userString);
// console.log(userData);
// console.log(userData.data);

// Delete Account
var deletebtn = document.getElementById("delete_btn");

deletebtn.addEventListener("click", (e) => {
  e.preventDefault();
  let id = userData.data.id;

  fetch(`http://localhost:8080/userdelete?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "Application/json",
    },
  })
    .then((Response) => {
      if (Response.ok) {
        return Response.json();
      } else {
        throw new Error("Account Not Deleted");
      }
    })
    .then((data) => {
      alert("Account Deleted Sucessfully");
      window.location.href = "http://127.0.0.1:5500/html/swastha_home.html";
    })
    .catch((error) => {
      alert("Account Not Deleted");
    });
});

// Logout Account
var logout_btn = document.getElementById("logout");
logout_btn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "http://127.0.0.1:5500/html/swastha_home.html";
  localStorage.clear();
});
