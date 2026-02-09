const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access API key from command line args or hardcode for test
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyDHR6Fvyn7GBAvRH4JC1wgt1VVaazeiSeI";

async function listModels() {
    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        // For listing models, we don't get a model instance first.
        // We create a model instance to access the generic client or try to generate content to fail with a better error?
        // Actually, the SDK doesn't expose listModels directly on the main class in older versions, 
        // but let's try to just use a known "safe" model to probe connection or checking specific model.

        console.log("Testing connection with API Key: " + apiKey.substring(0, 10) + "...");

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        console.log("Attempting to generate content with gemini-1.5-flash...");
        const result = await model.generateContent("Hello, are you there?");
        console.log("Success! Model gemini-1.5-flash works.");
        console.log("Response: ", result.response.text());

    } catch (error) {
        console.error("Error testing gemini-1.5-flash:");
        console.error(error.message);

        // Try gemini-pro fallback
        try {
            console.log("\nAttempting to generate content with gemini-pro...");
            const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
            const resultPro = await modelPro.generateContent("Hello?");
            console.log("Success! Model gemini-pro works.");
        } catch (errorPro) {
            console.error("Error testing gemini-pro:");
            console.error(errorPro.message);
        }
    }
}

listModels();
