import { fetchImages } from "@/lib/fetchImages";
import { CloudinaryImage } from "../components/ui/cloudinary-image";
import type { SearchResult } from "@/lib/fetchImages";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function capitalizeFirstLetter(str?: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function calculateShutterSpeed(exposureTime: string) {
  return Math.round(1/Number(exposureTime));
}

function formatDate(dateStr: string) {
  if (!dateStr) {
    return "";
  }

  try {
    // For ISO strings, we can directly use the Date constructor
    const date = new Date(dateStr);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'N/A';
    }
    
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);

    return formattedDate;
  } catch (error) {
    console.error('Error formatting date:', error, 'for date string:', dateStr);
    return 'N/A';
  }
}

const HomePage = async () => {
  const images = await fetchImages();
  console.log('Page rendered');

  const session = await auth.api.getSession({
    headers: await headers()
  })

  const user = session?.user

  console.log("Current session:", session);
  console.log("Current user:", user);


  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-4 p-2 md:p-2">
        {images.resources.map((result: SearchResult) => {
          const exifData = typeof result.metadata?.exif_data === 'string' 
            ? JSON.parse(result.metadata.exif_data)
            : result.metadata?.exif_data;
  
          return (
            <div 
              key={result.public_id} 
              data-image-id={result.public_id} 
              className="flex flex-col md:flex-row items-start border border-black box-border opacity-0 transition-opacity duration-1000 ease-in-out"
            >
              {/* Image container - shrinks with viewport but metadata size is preserved */}
              <div className="w-full md:flex-1 md:border-r md:border-black box-border">
                <CloudinaryImage
                  src={result.public_id}
                  alt="an image of something"
                  width={1024}
                  height={576}
                  loading="eager"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Metadata container - fixed width on desktop */}
              <div className="flex flex-col space-y-2 w-full md:w-56 flex-shrink-0 px-4 py-4 md:px-4 md:pt-2 md:pb-0">
                <p className="font-bold text-md" style={{ fontFamily: 'OfficeCodePro-Bold' }}>
                  {result.metadata?.title ? result.metadata?.title : "Loading Metadata..."}
                </p>
                <div className="text-xs space-y-1 text-[#697282]">
                  <p>{formatDate(exifData?.dateTime?.toString())}</p>
                  <p>{exifData?.cameraMake} {exifData?.cameraModel}</p>
                  <p>
                    {exifData?.shutterSpeed ? `1/${calculateShutterSpeed(exifData?.shutterSpeed)}` : null} <br /> 
                    {exifData?.aperture ? `f/${exifData?.aperture}`: null} <br /> 
                    {exifData?.ISO ? `ISO ${exifData?.ISO}` : null}
                  </p>
                  <p>{exifData?.lensMake} {exifData?.lensModel}</p>
                  <p className="mt-2">
                    <br />
                    {result.metadata?.classification ? `${capitalizeFirstLetter(result.metadata?.classification)} ${result.metadata?.confidence}% Confident` : null}
                    <br/><br/>
                    {result.metadata?.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;