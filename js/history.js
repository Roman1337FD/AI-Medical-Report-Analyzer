const history = getHistory();

const container =
document.getElementById("historyContainer");

if(history.length===0){

container.innerHTML=
"<h2>No Reports Found</h2>";

}

else{

history.forEach(item=>{

container.innerHTML+=`

<div class="historyCard">

<h3>${item.date}</h3>

<p>

${item.report}...

</p>

<button onclick='showAnalysis(${item.id})'>

View Analysis

</button>

</div>

`;

});

}

function showAnalysis(id){

const history=getHistory();

const report=history.find(r=>r.id===id);

localStorage.setItem(
"selectedAnalysis",
report.analysis
);

window.location.href="analysis.html";

}