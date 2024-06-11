// Toggle Section
var tog = document.getElementById("toggle");
tog.addEventListener("mouseover", (e) => {
  e.preventDefault();
  var toggle = document.getElementById("toggle_section");
  toggle.style.display = toggle.style.display === "none" ? "block" : "none";
});

// Delete Account
var deletebtn = document.getElementById("delete");

deletebtn.addEventListener("click", (e) => {
  e.preventDefault();
  let id = userData.data.id;

  fetch(`http://localhost:8080/hospitaldelete?id=${id}`, {
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