const doctor_string = localStorage.getItem("doctor");
const doctor_object = JSON.parse(doctor_string);

const dates = doctor_object.data.date;
console.log(dates);


document.addEventListener("DOMContentLoaded",function(){
    displayUsers(dates);
});



function displayUsers(dates) {
  let donorContainer = document.getElementById("date_container");
  donorContainer.innerHTML = " ";
    
  for (var i = 0; i < dates.length; i++) {
     var date =dates[i]
     slot = date.slots[0].slot;

    let div1 = document.createElement("div");
    donorContainer.appendChild(div1);
    div1.style.height = "100px";
    div1.style.width="400px"
    div1.style.borderRadius = "30px";
    div1.style.border = "5px solid white";
    div1.style.paddingLeft = "30px";
    div1.style.paddingTop = "10px";
    div1.style.marginTop = "10px";
    div1.style.marginLeft="35%"
    div1.style.backgroundColor = "rgb(17, 175, 160)";

    let div2 = document.createElement("div");
    div1.appendChild(div2);
    div2.style.height = "35px";
    div2.style.paddingTop = "10px";
    div2.innerHTML = "APPOINTMENT DATE : "+date.appointmentDate;

    let div3 = document.createElement("div");
    div1.appendChild(div3);
    div3.style.height = "35px";
    div3.style.paddingTop = "10px";
    div3.innerHTML = "SLOT TIMIE : "+slot;

   
  }
}
