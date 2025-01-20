"use server"

import ExifReader from 'exifreader';
import { v2 as cloudinary } from 'cloudinary';

interface PhotoMetadata {
    dateTime: string;
    cameraMake: string;
    cameraModel: string;
    shutterSpeed: string;
    aperture: string;
    ISO: string;
    focalLength: string;
    lensMake: string;
    lensModel: string;
  }

export async function getExifData(imageURL: ArrayBuffer | SharedArrayBuffer | Buffer, publicID: string) {
    const tags = await ExifReader.load(imageURL);
    
    const photoMetadata: PhotoMetadata = {
        dateTime: tags['DateTimeOriginal']?.description ?? "",
        cameraMake: tags['Make']?.description ?? "",
        cameraModel: tags['Model']?.description ?? "",
        shutterSpeed: tags['ExposureTime']?.description ?? tags['ShutterSpeedValue']?.description ?? "",
        aperture: tags['FNumber']?.description ?? tags['ApertureValue']?.description ?? "",
        ISO: tags['ISOSpeedRatings']?.description ?? "",
        focalLength: tags['FocalLength']?.description ?? "",
        lensMake: tags['LensMake']?.description ?? "",
        lensModel: tags['LensModel']?.description ?? tags['Lens']?.description ?? ""
    };

    const updateResult = await cloudinary.uploader.explicit(publicID, {
        type: "upload",
        metadata: {
            exif_data: JSON.stringify(photoMetadata), // All Exif Data
        }
    });

    console.log("Updated image classification metadata", updateResult)
    
    if (!updateResult?.metadata?.exif_data) {
        console.error('Metadata update failed: No metadata in response');
        return false;
    }

    return true;

  }