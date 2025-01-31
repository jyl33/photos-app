'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import { getClassificationData, getTitleData, getExifData } from '@/lib/imageUpload';

// Keep track of connected clients
const clients = new Set<ReadableStreamDefaultController>();

function logClientStatus() {
  console.log('-------- Client Status --------');
  console.log(`Total clients: ${clients.size}`);
  let index = 1;
  for (const [controller, timestamp] of clients.entries()) {
    console.log(`Client ${index}:`);
    //console.log(`- Connected at: ${new Date(timestamp).toLocaleTimeString()}`);
    console.log(`- Status: ${controller.desiredSize === null ? 'Closed' : 'Active'}`);
    index++;
  }
  console.log('-----------------------------');
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const timestamp = new Date().toISOString();
    const requestId = Math.random().toString(36).substring(7);

    console.log(`\n[Webhook ${requestId}] ========== NEW REQUEST ${timestamp} ==========`);
    console.log(`[Webhook ${requestId}] Type: ${body.notification_type}`);
    console.log(`[Webhook ${requestId}] Public ID: ${body.public_id}`);
    console.log(`[Webhook ${requestId}] Created At: ${body.created_at}`);
    console.log(`[Webhook ${requestId}] Updated At: ${body.updated_at}`);
    console.log(`[Webhook ${requestId}] URL: ${body.secure_url}`);
    console.log(`[Webhook ${requestId}] Metadata:`, body.metadata);
    console.log(`[Webhook ${requestId}] Raw Event:`, JSON.stringify(body, null, 2));

    
    if (body.notification_type === 'upload') {

      // Check if this is a fresh upload (no metadata) or 
      // an upload triggered by our metadata update (has metadata)
      if (body.metadata && (
        body.metadata.classification ||
        body.metadata.title ||
        body.metadata.exif_data
      )) {
        console.log('[Webhook] Skipping - This is a metadata update upload');
        return NextResponse.json({ success: true });
      }

      console.log("image uploaded...clearing cache");
      console.log('[Webhook] Received upload notification');
      revalidateTag('images');
      revalidatePath('/');
      revalidatePath('/', 'layout');
      revalidatePath('/', 'page');

      console.log('[Webhook] Sending SSE message');
      // Create a function to send SSE messages to all clients
      const notifyClients = async () => {
        const promises = Array.from(clients).map(client => {
          return new Promise((resolve) => {
            try {
              console.log('[Webhook] Refreshing AFTER image upload');
              client.enqueue(`data: refresh\n\n`);
              resolve(true);
            } catch (error) {
              clients.delete(client);
              console.log('Removed closed client');
              logClientStatus();
              resolve(false);
            }
          });
        });
        
        await Promise.all(promises);
      };

      // Ensure SSE messages are sent before proceeding
      await notifyClients();
      
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

      cloudinary.v2.uploader.update_metadata(metadata, body.public_id).then(result=>console.log(result));

    }
    
    if (body.notification_type === 'resource_metadata_changed') {
      console.log("metadata update complete");      
      revalidateTag('images');
      revalidatePath('/');
      revalidatePath('/', 'layout');
      revalidatePath('/', 'page');
      
      // Notify clients and remove closed ones
      clients.forEach(client => {
        try {
          client.enqueue(`data: refresh\n\n`);
          console.log('-------------WORKFLOW SHOULD COMPLETE----------------')
        } catch (error) {
          clients.delete(client);
          console.log('Removed closed client');
          logClientStatus();
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      clients.add(controller);
      logClientStatus();
    },
    cancel(controller) {
      clients.delete(controller);
      console.log('Client disconnected');
      logClientStatus();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
