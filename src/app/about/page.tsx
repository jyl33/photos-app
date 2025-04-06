import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Instagram, ChevronLeft } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="container mx-auto px-4 py-8 md:w-4/5 text-[#697282]">
        <Link href="/" className="text-blue-500 hover:underline text-sm flex items-center gap-1">
            <ChevronLeft size={16} />
            <span>Back to Homepage</span>
        </Link>
        <h1 className="text-3xl font-bold mb-4 pt-3 text-black">About</h1>
        <p className="mb-4">
          👋 Hi! My name is Justin and I enjoy photography and technology. This is a project that I built to learn more about web development, design and AI. 
        </p>
        <p className="mb-4">
          Built with Next.js, TypeScript, Tailwind CSS, Better Auth, Supabase, Cloudinary for image hosting, and HuggingFace for AI model hosting. Deployed on Vercel. Much inspiration from <a className="text-blue-500 hover:underline" href="https://photos.sambecker.com">Sam Becker&apos;s Exif Photo Blog</a>.
        </p>
        <p className="mb-4">
          <a className="text-blue-500 hover:underline" href='https://huggingface.co/spaces/justinwiley/photoclassifier'>The image classification model</a> is built and trained by me - (poorly) classifying images between landscapes, architecture, portrait, wildlife, pets, sports and food. 
          &nbsp;
          <a className="text-blue-500 hover:underline" href="https://colab.research.google.com/drive/1w_HF4ToH9bzUJVc6OkL7FqO2F3T9SBFj?usp=sharing">Here&apos;s</a> a link to the jupyter notebook on colab.
        </p>
        <p className="mb-4">
          <a className="text-blue-500 hover:underline" href="https://huggingface.co/spaces/justinwiley/photoNamer">The image titles and descriptions generator</a> is built with a combination of existing BLIP and T5 models. It uses BLIP to generate a general description of the photo, and T5 to generate the short title. 
        </p>
      </div>
      
      <div className="w-full md:w-1/5 flex flex-col items-center justify-center p-4">
        <Image 
            src="/profile.jpg" 
            alt="Profile" 
            width={192}  // 48rem = 192px
            height={192} // Use a sensible default for aspect ratio
            className="rounded-full w-48 md:w-3/4 h-auto mb-6"
            priority
        />
        
        {/* Social Media Icons */}
        <div className="flex space-x-6 mt-2">
          <a 
            href="https://github.com/jyl33" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#697282] hover:text-black transition-colors duration-200"
          >
            <Github size={24} />
          </a>
          <a 
            href="https://linkedin.com/in/jus10lee" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#697282] hover:text-blue-600 transition-colors duration-200"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href="https://instagram.com/justinleezus" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#697282] hover:text-pink-600 transition-colors duration-200"
          >
            <Instagram size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;