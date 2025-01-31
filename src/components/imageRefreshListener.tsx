'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ImageRefreshListener() {
  const router = useRouter();

  useEffect(() => {
    console.log('Setting up EventSource connection...');
    const eventSource = new EventSource('/api/cloudinary-webhook');
    
    // Add beforeunload handler
    const handleBeforeUnload = () => {
      console.log('Closing EventSource connection...');
      eventSource.close();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    eventSource.onopen = () => {
      console.log('EventSource connection established');
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
    };
    
    eventSource.onmessage = (event) => {
      console.log('Received event:', event.data);
      if (event.data === 'refresh') {
        console.log("refresh event received...refreshing");
        router.refresh();
      }
    };

    return () => {
      eventSource.close();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);

  return null;
}