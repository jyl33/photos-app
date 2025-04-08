'use server'

import { getExifData } from '@/lib/getExifData'
import { Client, upload } from '@gradio/client'
import { revalidatePath, revalidateTag } from 'next/cache'
import cloudinary from 'cloudinary';


export async function getMetadada(uploadResponse: string) {
  const response = JSON.parse(uploadResponse);

  console.log("CLOUDINARY RESPONSE", response);

  const imageUrl = response.secure_url;
  const publicID = response.public_id;

  // Process metadata
  console.log('[Webhook] Starting metadata processing');
  const [classificationData, titleData, exifData] = await Promise.all([
    getClassificationData(imageUrl),
    getTitleData(imageUrl),
    getExifData(imageUrl, publicID)
  ]);

  // Update Cloudinary with metadata
  const metadata = {
    ...(classificationData || {}),
    ...(titleData || {}),
    ...(exifData || {})
  };

  // Update the metadata on Cloudinary
  await cloudinary.v2.uploader.update_metadata(metadata, publicID);
  
  // Refresh the page content
  revalidateTag('images');
  revalidatePath('/');
  revalidatePath('/', 'layout');
  revalidatePath('/', 'page');
  
  console.log('[Webhook] Processing complete, page refreshed');
  

}

// Helper functions to get data without Cloudinary updates
export async function getClassificationData(imageUrl: string) {
  try {

    console.log("getting classification data...")

    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    
    const client = await Client.connect("justinwiley/photoclassifier");

    const result = await client.predict("/predict", { 
      img: imageBlob,
    });

    console.log("Classification Data", result)

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

    console.log("getting title data");

    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    
    const client = await Client.connect("justinwiley/photoNamer");

    const result = await client.predict("/describe_image", { 
      image: imageBlob, 
    });

    console.log("title data", result);

    if (!result.data || !Array.isArray(result.data) || !result.data[0]) {
      throw new Error('Invalid response data');
    }

    const parsedData = JSON.parse(result.data[0]);
    let description = parsedData.description.toLowerCase()
      .replace('arafed ', '')
      .replace('arrafe ', '')
      .replace('arrafy ', '')
      .replace('arraf ', '')
      .replace('arraffe ', '')
      .replace('arraffy ', '');
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
