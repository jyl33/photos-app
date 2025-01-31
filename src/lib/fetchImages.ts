import cloudinary from "cloudinary";

export type SearchResult = {
    public_id: string;
    metadata?: {
      classification?: string;
      confidence?: string;
      exif_data?: string;
      title?: string;
      description?: string;  
    };
  };

export const fetchImages = async () => {
    const results = await cloudinary.v2.search
      .expression("resource_type:image")
      .with_field("metadata")
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

    return {
      ...results,
      resources: results.resources.map((resource: any) => ({
        ...resource,
        metadata: resource.metadata || {}
      }))
    };
}

