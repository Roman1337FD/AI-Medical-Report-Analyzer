const browseBtn = document.getElementById("browseBtn");
const pdfFile = document.getElementById("pdfFile");
const fileName = document.getElementById("fileName");
const analyzeBtn = document.getElementById("analyzeBtn");

browseBtn.addEventListener("click", () => {
    pdfFile.click();
});

pdfFile.addEventListener("change", () => {

    if (pdfFile.files.length > 0) {
        fileName.textContent = pdfFile.files[0].name;
    }

});

analyzeBtn.addEventListener("click", async () => {

    if (pdfFile.files.length === 0) {

        alert("Please select a PDF.");

        return;

    }

    try {

        const file = pdfFile.files[0];

        const reportText = await extractPDFText(file);

        console.log(reportText);

        localStorage.setItem("reportText", reportText);

        window.location.href = "analysis.html";

    }

    catch (err) {

        console.error(err);

        alert("Unable to Read PDF");

    }

});