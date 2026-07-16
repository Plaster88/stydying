import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';

// Initialize the client with your API key from the .env file
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

async function runLab() {
    try {
        // 1. Grounding: Read the local file containing external/private data
        const localData = fs.readFileSync('info.txt', 'utf8');

        console.log("Sending request to AI...");

        // 2. Build the request
        const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1024,
            // System Prompt: Define the persona and behavior rules
            system: "You are a strict corporate AI assistant. Answer briefly, without unnecessary greetings, and strictly use only the information provided by the user.",
            messages: [
                {
                    role: "user",
                    // Inject the read data into the user's prompt to ground the model
                    content: `Here is the information about our company:\n<info>\n${localData}\n</info>\n\nQuestion: What is the password for the guest Wi-Fi?`
                }
            ]
        });

        // 3. Output the response
        console.log("\nAI Response:");
        console.log(response.content[0].text);
        
    } catch (error) {
        console.error("An error occurred during the API request:", error);
    }
}

runLab();
