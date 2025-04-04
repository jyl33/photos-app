/* 'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ImageRefreshListener() {
    const router = useRouter();
  
    useEffect(() => {
      // Track current EventSource instance
      let currentEventSource: EventSource | null = null;
  
      const setupEventSource = () => {
        // Close any existing connection
        if (currentEventSource) {
          currentEventSource.close();
        }
        
        currentEventSource = new EventSource('/api/cloudinary-webhook');
        
        currentEventSource.onopen = () => {
          console.log('EventSource connection established');
        };
  
        currentEventSource.onerror = (error) => {
          console.error('EventSource failed:', error);
        };
        
        currentEventSource.onmessage = (event) => {
          if (event.data === 'refresh') {
            router.refresh();
          }
        };
      };
  
      setupEventSource();
  
      return () => {
        if (currentEventSource) {
          currentEventSource.close();
        }
      };
    }, [router]);
  
    return null;
  } */