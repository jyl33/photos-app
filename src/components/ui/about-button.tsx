'use client';

import { useRouter } from 'next/navigation';

export default function AboutButton() {
  const router = useRouter();

  return (
    <div className='flex items-center gap-2 text-gray-500 hover:text-gray-700 cursor-pointer'
        onClick={(_e) => { router.push('/about'); }}>
        <a className='text-sm '>
            about 
        </a>
    </div>
    
  );
}