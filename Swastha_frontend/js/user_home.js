const userString = localStorage.getItem("data");
const userData = JSON.parse(userString);
document.addEventListener("DOMContentLoaded", function () {
  fetchUser();
});

// Fetching Users and displaying

function fetchUser() {
  fetch("http://localhost:8080/userfetchall", {
    method: "GET",
  })
    .then((Response) => {
      if (!Response.ok) {
        throw new Error("Users Not Found");
      } else {
        return Response.json();
      }
    })
    .then((users) => {
      displayUsers(users);
    });
}

function displayUsers(users) {
  var userContainer = document.getElementById("userContainer");
  userContainer.innerHTML = " ";
  userContainer.style.marginTop = "20px";

  for (var i = 0; i < users.data.length; i++) {
    var user = users.data[i];
    if (user.id != userData.data.id) {
      let div1 = document.createElement("div");
      userContainer.appendChild(div1);
      div1.style.height = "200px";
      div1.style.fontFamily="josefin Sans"
      div1.style.borderRadius = "30px";
      div1.style.paddingTop = "10px";
      div1.style.marginTop = "20px";
      div1.style.paddingLeft = "30px";
      div1.style.display = "flex";
      div1.style.flexDirection = "column";
      div1.style.justifyContent = "space-between";
      div1.style.backgroundColor = "transprent";

      let div2 = document.createElement("div");
      div1.appendChild(div2);
      div2.style.height = "35px";
      div2.style.fontFamily="josefin Sans"
      div2.style.paddingTop = "10px";
      div2.innerHTML = "DONOR NAME: " + user.firstName;

      let div3 = document.createElement("div");
      div1.appendChild(div3);
      div3.style.height = "35px";
      div3.style.paddingTop = "10px";
      div3.innerHTML = "DONOR MOBILE: " + user.phone;

      let div4 = document.createElement("div");
      div1.appendChild(div4);
      div4.style.height = "35px";
      div4.style.paddingTop = "10px";
      div4.innerHTML = "BLOOD GROUP: " + user.bloodGroup;

      let div5 = document.createElement("div");
      div1.appendChild(div5);
      div5.style.height = "35px";
      div5.style.paddingTop = "10px";
      div5.innerHTML = "GENDER: " + user.gender;

      let div6 = document.createElement("div");
      div1.appendChild(div6);
      div6.style.height = "35px";
      div6.style.paddingTop = "10px";
      div6.innerHTML = "AVAILABILITY: " + user.availability;

      let div8 = document.createElement("div");
      div1.appendChild(div8);
      div8.style.height = "35px";
      div8.style.paddingTop = "10px";
      div8.innerHTML = "CITY: " + user.address.city;

      let div7 = document.createElement("div");
      div1.appendChild(div7);
      div7.style.height = "35px";
      div7.style.textAlign = "right";
      div7.style.paddingBottom = "50px";
      let btn = document.createElement("button");
      div7.appendChild(btn);
      btn.innerHTML = "MESSAGE";
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

      btn.value = user.email;
      btn.addEventListener("click", () => {
        let mail = btn.value;
        var emailSubject = encodeURIComponent("Blood Donation Request");
        var emailBody = encodeURIComponent("Dear Donor");
        var donorEmail = encodeURIComponent(mail);
        var emailLink = `mailto:${donorEmail}?subject=${emailSubject}&body=${emailBody}`;

        window.location.href = emailLink;
      });
    }
  }
}

// Toggle Section
var tog = document.getElementById("toggle");
tog.addEventListener("mouseover", (e) => {
  e.preventDefault();
  var toggle = document.getElementById("toggle_section");
  toggle.style.display = toggle.style.display === "none" ? "block" : "none";
});

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

//Function to fetch the data from API

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from url ${url} `);
    }
    return response.json();
  } catch (error) {
    console.error("Error while fetching the data ", error);
    throw error;
  }
}

// Event listner to trigger the fetch operation

document.getElementById("search_btn").addEventListener("click", async (e) => {
  e.preventDefault();

  let search = document.getElementById("search_field").value.trim();
  if (!search) {
    console.log("Search field is Empty");
    return;
  }

  //Define API end points
  const byBloodApi = `http://localhost:8080/findblood?blood=${search}`;
  const byCityApi = `http://localhost:8080/finddonorbycity?city=${search}`;

  try {
    const result = await Promise.all([
      fetchData(byBloodApi),
      fetchData(byCityApi),
    ]);

    // Handle Result
    const byBloodData = result[0];
    const byCityData = result[1];

    if (byBloodData.data.length > 0) {
      displayUsers(byBloodData);
    }
    if (byCityData.data.length > 0) {
      displayUsers(byCityData);
    }
  } catch (error) {
    console.error("Error While Fetching Data", error);
  }
});
