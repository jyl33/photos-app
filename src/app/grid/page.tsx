import { CldImage } from "next-cloudinary";
import cloudinary from "cloudinary";
import { CloudinaryImage } from "./cloudinary-image";

type SearchResult = {
  public_id: string;
};

export default async function GalleryPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  console.log(results);

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-4 gap-4">
          {results.resources.map((result) => (
            <div>
              <CloudinaryImage
                key={result.public_id}
                src={result.public_id}
                alt="an image of something"
                width="400"
                height="300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
