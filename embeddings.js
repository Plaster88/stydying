import { pipeline, env } from '@xenova/transformers';

// Optional: Tells the library not to cache the model in a global directory, 
// but locally in your project folder under ./models
env.localModelPath = './models';
env.allowRemoteModels = true;

async function runLocalEmbeddingsLab() {
    try {
        console.log("Loading local embedding model (this may take a few seconds on the first run)...");
        
        // Load the feature-extraction pipeline with a popular, lightweight embedding model
        const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

        const sentences = [
            "The quick brown fox jumps over the lazy dog.",
            "A fast dark-colored fox leaps over a sleepy hound."
        ];

        console.log("\nConverting text to vectors...");

        // Generate embeddings. 'mean' pooling and 'normalize' give us a single, clean vector per sentence.
        const output = await extractor(sentences, { pooling: 'mean', normalize: true });

        // Convert the tensor output to a standard JavaScript array
        const vectors = output.tolist();

        // Print the math
        vectors.forEach((vector, index) => {
            console.log(`\n--- Sentence ${index + 1} ---`);
            console.log(`Text: "${sentences[index]}"`);
            
            // This local model uses 384 dimensions (smaller and faster than OpenAI's 1536)
            console.log(`Total dimensions: ${vector.length}`);
            console.log(`First 5 numbers of the vector:`, vector.slice(0, 5));
        });

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

runLocalEmbeddingsLab();
