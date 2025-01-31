"use server"

import ExifReader from 'exifreader';

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
    console.time('getExifData');
    try {
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

        // Instead of updating Cloudinary directly, return the data
        return {
            exif_data: JSON.stringify(photoMetadata)
        };

    } catch (error) {
        console.error('Error in getExifData:', error);
        return {
            exif_data: JSON.stringify({})
        };
    } finally {
        console.timeEnd('getExifData');
    }
}