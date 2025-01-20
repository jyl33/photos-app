"use server"

import { Client } from "@gradio/client";
import { v2 as cloudinary } from 'cloudinary';

interface Confidence {
        label: string;
        confidence: number;
    }
    
    interface ClassificationResult {
        label: string;
        confidences: Confidence[];
    }

export async function classifyImage(imageURL: string | URL | Request, publicID: string) {
    try {

        console.log("Parameters", imageURL, publicID);

        const response_0 = await fetch(imageURL);
        const exampleImage = await response_0.blob();
                        
        // Use huggingface space to attempt to classify image
        const client = await Client.connect("justinwiley/photoclassifier");
        const result = await client.predict("/predict", { 
                img: exampleImage, 
        });

        // Parse the result data
        const parsedData = JSON.parse(JSON.stringify(result.data)) as ClassificationResult[];

        // Now you can access it
        const mainLabel = parsedData[0].label;
        const topConfidence = (parsedData[0].confidences[0].confidence * 100).toFixed(2);

        // Add prediction and confidence score to image Metadata
        const updateResult = await cloudinary.uploader.explicit(publicID, {
                type: "upload",
                metadata: {
                    classification: mainLabel, // First prediction
                    confidence: topConfidence,     // Confidence score as a percentage
                    classified_at: new Date().toISOString()
                }
        });

        console.log("Updated image classification metadata", updateResult)
        if (!updateResult?.metadata?.classification) {
                console.error('Metadata update failed: No metadata in response');
                return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error in classifyImage:', error);
        throw error; 
    }
    
}
  