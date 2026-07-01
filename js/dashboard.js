const user = JSON.parse(localStorage.getItem("user"));

if(user){

document.getElementById("welcome").innerHTML =
`Welcome, ${user.name} 👋`;

}

const reports = JSON.parse(localStorage.getItem("reports")) || [];

document.getElementById("reports").innerHTML =
reports.length;