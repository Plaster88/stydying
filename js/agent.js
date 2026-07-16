import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import readline from 'readline';

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// Setup the terminal interface for the conversational loop
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 1. Define our local function (The Tool)
// In a real application, this would call a real external API. 
// Here, it's a mock function returning static data.
function getLocalWeather(location) {
    console.log(`\n[System Log: Executing local function 'getLocalWeather' for ${location}...]`);
    if (location.toLowerCase().includes('tokyo')) {
        return "15°C, rainy";
    } else if (location.toLowerCase().includes('london')) {
        return "10°C, cloudy";
    }
    return "22°C, sunny"; 
}

// 2. Describe the tool to the LLM (Tool Schema)
const weatherTool = {
    name: "get_weather",
    description: "Get the current weather for a specific location.",
    input_schema: {
        type: "object",
        properties: {
            location: {
                type: "string",
                description: "The city and state, e.g., San Francisco, CA"
            }
        },
        required: ["location"]
    }
};

// Array to maintain conversation history
let conversationHistory = [];

// Main conversational loop
async function askQuestion() {
    rl.question('\nYou: ', async (userInput) => {
        if (userInput.toLowerCase() === 'exit' || userInput.toLowerCase() === 'quit') {
            console.log("Ending conversation. Goodbye!");
            rl.close();
            return;
        }

        // Add the user's input to the history
        conversationHistory.push({ role: 'user', content: userInput });

        try {
            await processAgentTurn();
        } catch (error) {
            console.error("An error occurred:", error);
        }

        // Loop back and ask for the next input
        askQuestion();
    });
}

// Function to handle the interaction with Claude
async function processAgentTurn() {
    // Send the entire history and the available tools to Claude
    const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        tools: [weatherTool],
        messages: conversationHistory
    });

    // We must push Claude's entire response block to the history 
    // so it remembers its own thoughts and actions.
    conversationHistory.push({ role: 'assistant', content: response.content });

    // Check if Claude decided to use a tool
    if (response.stop_reason === 'tool_use') {
        // Find the specific tool block inside Claude's response
        const toolUseBlock = response.content.find(block => block.type === 'tool_use');
        
        if (toolUseBlock.name === 'get_weather') {
            // Extract the argument Claude decided to pass
            const locationArg = toolUseBlock.input.location;
            
            // 3. Execute the local function
            const toolResult = getLocalWeather(locationArg);
            
            // 4. Send the result back to Claude
            conversationHistory.push({
                role: 'user',
                content: [
                    {
                        type: 'tool_result',
                        tool_use_id: toolUseBlock.id,
                        content: toolResult
                    }
                ]
            });

            // Call Claude again so it can read the tool result and form a final answer
            await processAgentTurn(); 
        }
    } else {
        // If no tool was used, Claude just responded with normal text
        const textBlock = response.content.find(block => block.type === 'text');
        console.log(`\nAgent: ${textBlock.text}`);
    }
}

// Start the application
console.log("Agent started! Type 'exit' to quit.");
console.log("Try saying: 'Hi!', then ask 'What is the weather in Tokyo?'");
askQuestion();
