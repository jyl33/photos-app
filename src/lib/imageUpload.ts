'use server'

import { getExifData } from '@/lib/getExifData'
import { v2 as cloudinary } from 'cloudinary';
import { Client } from '@gradio/client'
import { revalidatePath, revalidateTag } from 'next/cache'

// Helper functions to get data without Cloudinary updates
export async function getClassificationData(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    
    const client = await Client.connect("justinwiley/photoclassifier");

    const result = await client.predict("/predict", { 
      img: imageBlob,
    });

    const parsedData = JSON.parse(JSON.stringify(result.data));
    const mainLabel = parsedData[0].label;
    const topConfidence = (parsedData[0].confidences[0].confidence * 100).toFixed(2);

    return {
      classification: mainLabel,
      confidence: topConfidence
   };
  } catch (error) {
    console.error('Classification error:', error);
    return {
      classification: null,
      confidence: null,
      classified_at: null
    };
  }
}

export async function getTitleData(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    
    const client = await Client.connect("justinwiley/photoNamer");

    const result = await client.predict("/predict", { 
      image: imageBlob, 
    });

    if (!result.data || !Array.isArray(result.data) || !result.data[0]) {
      throw new Error('Invalid response data');
    }

    const parsedData = JSON.parse(result.data[0]);
    let description = parsedData.description.toLowerCase()
      .replace('arafed ', '')
      .replace('arrafe ', '')
      .replace('arrafy ', '')
      .replace('arraf ', '');
    description = description.charAt(0).toUpperCase() + description.slice(1);

    return {
      title: parsedData.title,
      description: description
    };
  } catch (error) {
    console.error('Title error:', error);
    return {
      title: null,
      description: null
    };
  }
}

export { getExifData };
