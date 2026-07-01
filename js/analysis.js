const report = localStorage.getItem("reportText");
const result = document.getElementById("result");

// -------------------------
// Load AI Analysis
// -------------------------

async function loadAnalysis() {

    if (!report) {

        result.innerHTML = `
            <div class="abnormal">
                <h2>❌ No Report Found</h2>
                <p>Please upload a medical report first.</p>
            </div>
        `;

        return;
    }

    result.innerHTML = `
        <div style="text-align:center;padding:40px;">
            <h2>🤖 AI is analyzing your report...</h2>
            <p>Please wait a few seconds...</p>
        </div>
    `;

    try {

        const aiResponse = await analyzeMedicalReport(report);

        result.innerHTML = aiResponse;

        if (typeof saveReport === "function") {
            saveReport(report, aiResponse);
        }

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <div class="abnormal">
                <h2>❌ AI Analysis Failed</h2>
                <p>${error.message}</p>
                <p>Please check your API key or internet connection.</p>
            </div>
        `;
    }

}

loadAnalysis();


// -------------------------
// Professional PDF Download
// -------------------------

document.getElementById("downloadBtn").addEventListener("click", async () => {

    try {

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF("p", "mm", "a4");

        const element = document.querySelector(".card");

        const canvas = await html2canvas(element, {

            scale: 2,

            useCORS: true,

            backgroundColor: "#ffffff"

        });

        const imgData = canvas.toDataURL("image/png");

        const pdfWidth = pdf.internal.pageSize.getWidth();

        const pdfHeight =
            (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = pdfHeight;

        let position = 0;

        pdf.addImage(
            imgData,
            "PNG",
            0,
            position,
            pdfWidth,
            pdfHeight
        );

        heightLeft -= pdf.internal.pageSize.getHeight();

        while (heightLeft > 0) {

            position = heightLeft - pdfHeight;

            pdf.addPage();

            pdf.addImage(
                imgData,
                "PNG",
                0,
                position,
                pdfWidth,
                pdfHeight
            );

            heightLeft -= pdf.internal.pageSize.getHeight();

        }

        pdf.save("Medical_Report_Analysis.pdf");

    } catch (err) {

        console.error(err);

        alert("Unable to download PDF.");

    }

});


// -------------------------
// History
// -------------------------

document.getElementById("historyBtn").addEventListener("click", () => {

    window.location.href = "history.html";

});


// -------------------------
// Chat
// -------------------------

document.getElementById("chatBtn").addEventListener("click", () => {

    window.location.href = "chat.html";

});


// -------------------------
// Upload New Report
// -------------------------

document.getElementById("newReportBtn").addEventListener("click", () => {

    window.location.href = "upload.html";

});