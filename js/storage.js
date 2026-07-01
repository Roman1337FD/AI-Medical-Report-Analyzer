function saveReport(reportText, analysis) {

    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.unshift({

        id: Date.now(),

        date: new Date().toLocaleString(),

        report: reportText.substring(0,150),

        analysis: analysis

    });

    localStorage.setItem("history", JSON.stringify(history));

}



function getHistory(){

    return JSON.parse(localStorage.getItem("history")) || [];

}