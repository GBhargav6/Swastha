let button2 = document.getElementsByClassName("button2");
let slot_time;

for (let i = 0; i < button2.length; i++) {
  button2[i].addEventListener("click", (e) => {
    // Remove green background from all buttons
    for (let j = 0; j < button2.length; j++) {
      button2[j].style.backgroundColor = ""; // Reset background color
    }

    // Set green background to the clicked button
    e.target.style.backgroundColor = "green";
    
    // Update slot_time with the clicked button's text content
    slot_time = e.target.textContent;
  });
}





let selectedOption = null;
let payment_options = document.getElementsByClassName("payment-option");

for (let i = 0; i < payment_options.length; i++) {
  payment_options[i].addEventListener("click", (e) => {
    // Remove selected class from all options
    for (let j = 0; j < payment_options.length; j++) {
      payment_options[j].classList.remove("selected");
    }

    // Add selected class to the clicked option
    payment_options[i].classList.add("selected");

    // Update the selectedOption variable
    selectedOption = payment_options[i].getAttribute("value");
  });
}

 


// Fetching user ID
let user_id = localStorage.getItem("id");

//Fetching doctor ID

let doctor_string = localStorage.getItem("doctor");
let doctor_obj = JSON.parse(doctor_string);
let doctor_id = doctor_obj.id;

//Setting Fee
let fee = document.getElementById("fee");
fee.value = doctor_obj.fee;

let btn = document.getElementsByClassName("Btn");
btn[0].addEventListener("click", () => {
  let date = document.getElementById("date");
  const currentDate = new Date();
  if (date.value < currentDate) {
    alert("Cannot take Appointment on past days");
    return;
  }
  if (!date.value) {
    alert("Select the Date");
    return;
  }
  if (!slot_time) {
    alert("Select Slot Time");
    return;
  }

  if (!fee) {
    alert("select fee");
    return;
  }

  let AppointmentDate = {
    appointmentDate: date.value,
    slots: [
      {
        slot: slot_time,
        payment: {
          fee: fee.value,
          mode: selectedOption,
        },
      },
    ],
  };

  window
    .fetch(
      `http://localhost:8080/bookslot?user_id=${user_id}&doctor_id=${doctor_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(AppointmentDate),
      }
    )
    .then((Response) => {
      if (Response.ok) {
        return Response.json();
      } else {
        throw new Error(" Appointment not sucessfull");
      }
    })
    .then(() => {
      window.location.href="http://127.0.0.1:5500/html/redirecing_page.html"
      
    })
    .catch((error) => {
      //alert("Slot Already Booked")
    });
});

async function avaialableSlots() {
  await fetch(`http://localhost:8080/getslots?doctor_id=${doctor_id}`, {
    method: "GET",
    headers: { "Content-Type": "Application/json" },
  })
    .then((Response) => {
      if (Response.ok) {
        return Response.json();
      }
    })
    .then((data) => {
      let x = data;
      console.log(data);
      for (let i = 0; i < x.data.length; i++) {
        var date = x.data[i];
        let AppointmentDate = date.appointmentDate;
        let actual_date = document.getElementById("date").value;
        if (actual_date == AppointmentDate) {
          let old_slots = date.slots;
          for (let j = 0; j < old_slots.length; j++) {
            let time = old_slots[j].slot;
            let button2 = document.getElementsByClassName("button2");
            for (let i = 0; i < button2.length; i++) {
              if(button2[i].textContent==time){
                button2[i].textContent="Booked"
                button2[i].style.backgroundColor="red"
                button2[i].disabled = true
              }
            }
          }
        }
      }
    });
}
