/* 'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import { getClassificationData, getTitleData, getExifData } from '@/lib/imageUpload';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const timestamp = new Date().toISOString();
    const requestId = Math.random().toString(36).substring(7);

    console.log(`\n[Webhook ${requestId}] ========== NEW REQUEST ${timestamp} ==========`);
    console.log(`[Webhook ${requestId}] Type: ${body.notification_type}`);
    console.log(`[Webhook ${requestId}] Public ID: ${body.public_id}`);
    
    if (body.notification_type === 'upload') {
      // Check if this is a fresh upload (no metadata) or an upload triggered by metadata update
      if (body.metadata && (
        body.metadata.classification ||
        body.metadata.title ||
        body.metadata.exif_data
      )) {
        console.log('[Webhook] Skipping - This is a metadata update upload');
        return NextResponse.json({ success: true });
      }

      console.log('[Webhook] Processing new upload');
      
      // Process metadata
      console.log('[Webhook] Starting metadata processing');
      const [classificationData, titleData, exifData] = await Promise.all([
        getClassificationData(body.secure_url),
        getTitleData(body.secure_url),
        getExifData(body.secure_url, body.public_id)
      ]);

      // Update Cloudinary with metadata
      const metadata = {
        ...(classificationData || {}),
        ...(titleData || {}),
        ...(exifData || {})
      };

      // Update the metadata on Cloudinary
      await cloudinary.v2.uploader.update_metadata(metadata, body.public_id);
      
      // Refresh the page content
      revalidateTag('images');
      revalidatePath('/');
      revalidatePath('/', 'layout');
      revalidatePath('/', 'page');
      
      console.log('[Webhook] Processing complete, page refreshed');
    }
    
    if (body.notification_type === 'resource_metadata_changed') {
      console.log("[Webhook] Metadata update complete");
      
      // Refresh the page content again after metadata is updated
      revalidateTag('images');
      revalidatePath('/');
      revalidatePath('/', 'layout');
      revalidatePath('/', 'page');
      
      console.log('[Webhook] Page refreshed after metadata update');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
} */