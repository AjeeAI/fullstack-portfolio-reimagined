import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProjectDetailPage({ params }) {
  // 1. Get the ID from the URL (Next.js provides this via 'params')
  const { id } = await params; 
  
  let project = null;

  try {
    // 2. Fetch only THIS specific project from Firebase using the ID
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      project = { id: docSnap.id, ...docSnap.data() };
    } else {
      // If the ID doesn't exist in Firebase, show the 404 page
      return notFound(); 
    }
  } catch (error) {
    console.error("Error fetching project details:", error);
  }

  return (
    <main className="min-h-screen bg-[#0E0B17] text-white p-6 lg:p-20 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        
        {/* Navigation back to Home */}
        <Link href="/#projects" className="text-purple-400 hover:text-purple-300 transition-colors mb-12 inline-block font-medium">
          ← Back to Portfolio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side: Thumbnail */}
          <div className="w-full h-[300px] lg:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src={project.thumbnail} 
              alt={project.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side: Information */}
          <div className="flex flex-col justify-start">
            <h1 className="text-4xl lg:text-6xl font-bold font-outfit mb-6 text-white">{project.name}</h1>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {project.stack?.map((tech, i) => (
                <span key={i} className="px-4 py-1.5 bg-purple-900/30 border border-purple-500/30 rounded-full text-sm font-semibold text-purple-200">
                  {tech}
                </span>
              ))}
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-100 uppercase tracking-widest">Project Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed italic">
                "{project.details}"
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 mt-10">
              {project.live_link && (
                <a 
                  href={project.live_link} 
                  target="_blank" 
                  className="px-8 py-4 bg-purple-600 rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-900/20"
                >
                  View Live Demo
                </a>
              )}
              {project.github_link && (
                <a 
                  href={project.github_link} 
                  target="_blank" 
                  className="px-8 py-4 border border-gray-600 rounded-2xl font-bold hover:bg-white hover:text-black hover:border-white transition-all"
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}