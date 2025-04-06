import cloudinary from "cloudinary";
import { CloudinaryImage } from "@/components/ui/cloudinary-image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type SearchResult = {
  public_id: string;
};

export default async function GalleryPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <div>
      <Navbar />
      <div className="p-2">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {results.resources.map((result) => (
            <div key={result.public_id} 
                data-image-id={result.public_id} 
                className="opacity-0 transition-opacity duration-1000 ease-in-out">
              <CloudinaryImage
                className="w-full h-full object-cover border border-black box-border"
                src={result.public_id}
                alt="an image of something"
                width={400}
                height={300}
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}