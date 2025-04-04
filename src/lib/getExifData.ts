"use server"

import ExifReader from 'exifreader';
import exifr from 'exifr' 
import { PhoneOff } from 'lucide-react';

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

export async function getExifData(imageURL: string, publicID: string) {
    try {

        console.log("Getting EXIF data");

        console.log(imageURL);

        let output = await exifr.parse(imageURL);
        console.log('output', output);

        //console.log("tags", tags);
        
       const photoMetadata: PhotoMetadata = {
            dateTime: output.DateTimeOriginal ?? "",
            cameraMake: output.Make ?? "",
            cameraModel: output.Model ?? "",
            shutterSpeed: output.ExposureTime ?? output.ShutterSpeedValue ?? "",
            aperture: output.FNumber ?? output.ApertureValue ?? "",
            ISO: output.ISO ?? "",
            focalLength: output.FocalLength ?? "",
            lensMake: output.LensMake ?? "",
            lensModel: output.LensModel ?? ""
        };

        console.log("Exif data", photoMetadata);

        // Instead of updating Cloudinary directly, return the data
        return {
            exif_data: JSON.stringify(photoMetadata)
        };

    } catch (error) {
        console.error('Error in getExifData:', error);
        return {
            exif_data: JSON.stringify({})
        };
    } 
}