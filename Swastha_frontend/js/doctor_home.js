//Toggle section
var tog =document.getElementById("toggle")

tog.addEventListener("mouseover", e =>{
    e.preventDefault()
    var toggle =document.getElementById("toggle_section")
    toggle.style.display=toggle.style.display === 'none'?'block':'none'
})

const doctor_string= localStorage.getItem("doctor")
const doctor_object=JSON.parse(doctor_string)
console.log(doctor_object);


// Deleting
var delete_btn = document.getElementById("delete-btn")
delete_btn.addEventListener("click",e =>{
    e.preventDefault()

    let id=doctor_object.data.id

    fetch(`http://localhost:8080/deletedoctor?id=${id}`, {
        method:"DELETE",
        headers:{
            'Content-Type':'Application/json'
        }
    })
    .then(Response=>{
        if(Response.ok){
            return Response.json()
        }else{
            throw new Error("Account Not Deleted")
        }
    })
    .then(data=>{
        localStorage.clear()
        alert("Account Deleted Sucessfully")
        window.location.href="http://127.0.0.1:5500/html/swastha_home.html"
    })
    .catch(error=>{
        alert("Account Not Deleted")
    })
})




//Logout
var logout=document.getElementsByClassName("logout")
logout[0].addEventListener("click", e=>{
    e.preventDefault()
    localStorage.clear()
    window.location.href="http://127.0.0.1:5500/html/swastha_home.html"
})


// Displaying Donors Defaultly

document.addEventListener("DOMContentLoaded",function(){
    fetchUser();
});

function fetchUser(){
    fetch("http://localhost:8080/userfetchall",{
        method:"GET"
    })
    .then(Response=>{
        if(!Response.ok){
            throw new Error("Users Not Found")
        }
        else{
            return Response.json()
        }
    })
    .then (donors=>{
        displayUsers(donors)
    })
}


function displayUsers(donors){
   
    let donorContainer = document.getElementById("donor_container")
    donorContainer.innerHTML=" "

    for(var i=0;i<donors.data.length;i++){
        
        var donor =donors.data[i];

        let div1=document.createElement("div")
        donorContainer.appendChild(div1)
        div1.style.height="270px"
        div1.style.borderRadius="30px"
        div1.style.border="5px solid rgb(34, 76, 152)"
        div1.style.paddingLeft="30px"
        div1.style.paddingTop="10px"
        div1.style.marginTop="10px"
        div1.style.backgroundColor="transprent"


        let div2=document.createElement("div")
        div1.appendChild(div2)
        div2.style.height="35px"
        div2.style.paddingTop="10px"
        div2.innerHTML="DONOR NAME : "+donor.firstName+" "+donor.lastName


        let div3=document.createElement("div")
        div1.appendChild(div3)
        div3.style.height="35px"
        div3.style.paddingTop="10px"
        div3.innerHTML="BLOOD GROUP : "+donor.bloodGroup


        let div4=document.createElement("div")
        div1.appendChild(div4)
        div4.style.height="35px"
        div4.paddingTop="35px"
        div4.innerHTML="AVAILABILITY : "+donor.availability

        let div5=document.createElement("div")
        div1.appendChild(div5)
        div5.style.height="35px"
        div5.style.paddingTop="10px"
        div5.innerHTML="GENDER : "+donor.gender

        let div8=document.createElement("div")
        div1.appendChild(div8)
        div8.style.height="35px"
        div8.paddingTop="10px"
        div8.innerHTML="CITY  : "+donor.address.city

        let div6=document.createElement('div')
        div1.appendChild(div6)
        div6.style.height="35px"
        div6.style.paddingTop="10px"
        div6.style.textAlign="center"
        let btn=document.createElement("button")
        div6.appendChild(btn)
        btn.innerHTML+="MESSAGE"
        btn.style.height="35px"
        btn.style.backgroundColor="darkblue"
        btn.style.cursor="pointer"
        btn.style.padding="0.9em 1.4em"
        btn.style.fontWeight="bolder"
        btn.style.border="none"
        btn.style.backgroundSize="280% auto"
        btn.style.color="white"
        btn.style.borderRadius="10px"
        btn.value=donor.email

        btn.addEventListener("click",()=>{
            var emailSubject=encodeURIComponent("Blood Donation Request")
            var emailBody= encodeURIComponent("Dear Donor")
            var donorEmail=encodeURIComponent(btn.value)
            var emailLink= `mailto:${donorEmail}?subject=${emailSubject}&body=${emailBody}`
            
            window.location.href=emailLink;
        })
       
    };
 
}


// Function to fetch data from API
async function fetchData(url) {
  
    try{
      const response = await fetch(url);
      if(!response.ok){
          throw new Error(`Failed to fetch the data from ${url}`)
      }
      return response.json()
    }catch(error){
      console.error("Error fetching the data : ", error);
      throw error;
    }
  
  
  }

// Event listner to trigger the fetch operation

document.getElementById("search_btn").addEventListener("click", async e=>{
    e.preventDefault()

    let search = document.getElementById("search_field").value.trim()
    if(!search){
        console.log("Search field is Empty");
        return;
    }

    //Define API end points
    const byBloodApi=  `http://localhost:8080/findblood?blood=${search}`
    const byCityApi=  `http://localhost:8080/finddonorbycity?city=${search}`


    try{
        const result= await Promise.all([
            fetchData(byBloodApi),
            fetchData(byCityApi)

        ]);

        // Handle Result 
        const byBloodData=result[0]
        const byCityData=result[1]

        if(byBloodData.data.length>0){
            displayUsers(byBloodData)
        }if(byCityData.data.length>0){
            displayUsers(byCityData)
        }

    }catch(error){
        console.error("Error While Fetching Data",error);
    }

});

