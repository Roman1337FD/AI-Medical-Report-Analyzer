const chatBox = document.getElementById("chatBox");
const questionInput = document.getElementById("question");
const sendBtn = document.getElementById("sendBtn");
const backBtn = document.getElementById("backBtn");

const reportText = localStorage.getItem("reportText");

backBtn.onclick = () => {
    window.location.href = "analysis.html";
};

questionInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});

sendBtn.addEventListener("click", async () => {

    const question = questionInput.value.trim();

    if (question === "") return;

    if (!reportText) {
        alert("Medical report not found.");
        return;
    }

    chatBox.innerHTML += `
        <div class="user">
            <strong>🧑 You</strong><br><br>
            ${question}
        </div>
    `;

    questionInput.value = "";

    chatBox.innerHTML += `
        <div class="ai" id="loading">
            🤖 AI is thinking...
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    const prompt = `
You are an experienced AI Medical Assistant.

Use ONLY the uploaded medical report.

Medical Report:

${reportText}

User Question:

${question}

IMPORTANT INSTRUCTIONS:

1. Reply in the SAME language as the user's question.
2. If user asks in Hindi -> Reply in Hindi.
3. If user asks in English -> Reply in English.
4. If user asks in Hinglish -> Reply in Hinglish.
5. Explain medical terms in very simple language.
6. Never invent any medical information.
7. Use only the uploaded report.
8. If the answer is not available in the report, clearly say:
   "Ye information report me available nahi hai."
9. Keep answer short (80-120 words).
10. End every answer with:

"⚠️ Ye AI analysis hai. Final medical advice ke liye doctor se consult karein."

`;

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                contents: [

                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }

                ]

            })

        });

        const data = await response.json();

        document.getElementById("loading").remove();

        if (!response.ok) {

            chatBox.innerHTML += `
                <div class="ai">
                    ❌ ${data.error?.message || "AI Error"}
                </div>
            `;

            return;
        }

        const answer = data.candidates[0].content.parts[0].text;

        chatBox.innerHTML += `
            <div class="ai">
                <strong>🤖 AI Doctor</strong><br><br>
                ${answer}
            </div>
        `;

    }

    catch (err) {

        console.error(err);

        const loading = document.getElementById("loading");

        if (loading) loading.remove();

        chatBox.innerHTML += `
            <div class="ai">
                ❌ Internet connection ya API problem.
            </div>
        `;

    }

    chatBox.scrollTop = chatBox.scrollHeight;

});