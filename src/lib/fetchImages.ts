import cloudinary from "cloudinary";

type SearchResult = {
    public_id: string;
    metadata?: {
      classification?: string;
      confidence?: string;
      exif_data?: string;
    };
  };

export async function fetchImages() {
    try {
        // Fetch images with their metadata
        const results = (await cloudinary.v2.search
          .expression("resource_type:image")
          .with_field("metadata")  // Include metadata in the response
          .sort_by("created_at", "desc")
          .max_results(30)
          .execute()) as { resources: SearchResult[] };
    
        // Parse any JSON metadata if needed
        const enhancedResults = {
          resources: results.resources.map(resource => {
            try {
              // Parse exif_data if it exists
              if (resource.metadata?.exif_data) {
                resource.metadata.exif_data = JSON.parse(resource.metadata.exif_data);
              }
              return resource;
            } catch (error) {
              console.error(`Error parsing metadata for ${resource.public_id}:`, error);
              return resource;
            }
          })
        };
    
        console.log(enhancedResults);
        return enhancedResults;
      } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
      }
}