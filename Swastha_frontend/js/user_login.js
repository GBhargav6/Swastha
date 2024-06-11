let submit = document.getElementById("submit")

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let email_input = document.getElementById("email").value.trim();
  let password_input = document.getElementById("password").value.trim();

  let errorMessage=""

  if(!email_input){
    errorMessage+="Please Enter Email.\n"
  }if(!password_input){
    errorMessage+="Please enter password.\n"
  }
  if(errorMessage){
    alert(errorMessage)
    return;
  }

  fetch(
    `http://localhost:8080/userlogin?email=${email_input}&password=${password_input}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Invalid User name or Password");
      }
    })
    .then((data) => {
      alert("login succesfullll....");
      localStorage.setItem("data",JSON.stringify(data))
      localStorage.setItem("id",data.data.id)
      window.location.href = "http://127.0.0.1:5500/Swastha/html/user_home.html";
      console.log(data);
    })
    .catch((error) => {
      alert("invalid user name or password....");
    });
});

