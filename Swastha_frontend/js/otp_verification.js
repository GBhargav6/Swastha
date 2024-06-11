let actualotp = localStorage.getItem("otp");
console.log(actualotp);


let btn = document.getElementsByClassName("btn");
console.log(btn);
btn[0].addEventListener("click", () => {
  var otpInput1 = document.getElementById("otp-input1").value;
  var otpInput2 = document.getElementById("otp-input2").value;
  var otpInput3 = document.getElementById("otp-input3").value;
  var otpInput4 = document.getElementById("otp-input4").value;

  // Combine the OTP digits into a single OTP code
  var otpCode = otpInput1 + otpInput2 + otpInput3 + otpInput4;
  if (otpCode === actualotp) {
    alert("verification Sucessful");
    console.log("redirecting");
    
      window.open("http://127.0.0.1:5500/html/update_password_user.html");
    
  } else {
    alert("Wrong Otp");
    document.getElementById("otp-input1").value = "";
    document.getElementById("otp-input2").value = "";
    document.getElementById("otp-input3").value = "";
    document.getElementById("otp-input4").value = "";
  }
});

let email = localStorage.getItem("email")
let btn2 = document.getElementsByClassName("resendBtn");
btn2.value=email;
console.log(btn2);
btn2[0].addEventListener("click", e=>{
  e.preventDefault()
  var email=btn2.value
  fetch(`http://localhost:8080/userforgot?email=${email}`, {
      method:"GET",
      headers:{
          "Content-Type":"Application/json"
      }
  })
  .then(Response=>{
      if(Response.ok){
          return Response.json()
      }else{
          throw new Error("Account Not Found")
      }
  })
  .then(data=>{
       otp=data.data
       localStorage.setItem("otp",otp)
       localStorage.setItem("email",email)
      alert("OTP Sent Succesfully..")
     window.location.href="http://127.0.0.1:5500/html/otp_verification.html"
  })
  .catch(error=>{
      alert("Account Not Found")
  })

})
