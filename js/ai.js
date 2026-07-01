async function analyzeMedicalReport(reportText) {

    const prompt = `
You are an experienced medical report analyzer.

Analyze the medical report carefully.

Return ONLY HTML.

Do NOT use markdown.

Follow this exact structure.

<div class="summary">
<h2>📋 Report Summary</h2>
<p>Maximum 50 words.</p>
</div>

<div class="abnormal">
<h2>⚠️ Abnormal Values</h2>
<ul>
<li>Parameter - Value - Reason</li>
</ul>
</div>

<div class="normal">
<h2>✅ Normal Values</h2>
<ul>
<li>Only important normal parameters.</li>
</ul>
</div>

<div class="suggestions">
<h2>💡 Health Suggestions</h2>
<ul>
<li>Maximum 5 suggestions.</li>
</ul>
</div>

<div class="risk">
<h2>📊 Overall Health Status</h2>

<p>
🟢 Normal
OR
🟡 Moderate Risk
OR
🔴 High Risk
</p>

</div>

Rules:

1. Maximum 250 words.
2. Never explain every normal value.
3. Keep summary short.
4. Use simple English.
5. Mention only medically important findings.
6. Don't mention doctor names, addresses, phone numbers or lab information.
7. Ignore report headers and footer.
8. Don't repeat values.
9. Don't write long paragraphs.

Medical Report:

${reportText}
`;

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

    console.log(data);

    return data.candidates[0].content.parts[0].text;

}