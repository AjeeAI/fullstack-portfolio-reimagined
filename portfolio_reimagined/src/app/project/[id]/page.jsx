import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectVideoBtn from '@/components/ProjectVideoBtn';

export default async function ProjectDetailPage({ params }) {
  const { id } = await params; 
  
  let project = null;

  try {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      project = { id: docSnap.id, ...docSnap.data() };
    } else {
      return notFound(); 
    }
  } catch (error) {
    console.error("Error fetching project details:", error);
  }

  return (
    // THE CYBER-PURPLE BACKGROUND: Matching layout.jsx
    <main className="min-h-screen bg-[#030014] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-600/10 via-[#030014] to-black text-white p-6 lg:p-20 flex flex-col items-center relative overflow-hidden">
      
      {/* Background Noise/Glow */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full z-0 animate-pulse"></div>

      <div className="max-w-6xl w-full z-10">
        
        {/* Back Button: Glass Pill Style */}
        <Link href="/#projects" className="group flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-all mb-12 inline-block font-medium">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> 
          <span className="uppercase tracking-widest text-xs font-bold">Back to Portfolio</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Image Section: Glass Frame with Glow */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative w-full aspect-video lg:aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-3xl">
              <img 
                src={project.thumbnail} 
                alt={project.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center">
            <span className="text-purple-500 font-bold text-xs uppercase tracking-[0.4em] mb-4 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
              Featured Project
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold font-outfit mb-8 text-white tracking-tight italic">
              {project.name}
            </h1>
            
            {/* Tech Stack: Neon Pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {project.stack?.map((tech, i) => (
                <span key={i} className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs font-bold uppercase tracking-wider text-purple-300">
                  {tech}
                </span>
              ))}
            </div>

            {/* Overview: Glass Container */}
            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 mb-10 shadow-xl">
              <h2 className="text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">
                Project Overview
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed font-light">
                {project.details}
              </p>
            </div>

            {/* BUTTON CONTAINER: Cyber Style */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              
              {/* LIVE DEMO: Primary Neon Gradient */}
              {project.live_link ? (
                <a 
                  href={project.live_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl font-bold shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:-translate-y-1 transition-all text-center border border-white/10 tracking-widest uppercase text-xs"
                >
                  Live Deployment
                </a>
              ) : (
                <div className="px-10 py-4 bg-gray-800/50 text-gray-500 border border-gray-700 rounded-2xl font-bold cursor-not-allowed text-center uppercase text-xs tracking-widest">
                  Deployment Private
                </div>
              )}

              {/* GITHUB: Secondary Glass Style */}
              {project.github_link ? (
                <a 
                  href={project.github_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl font-bold hover:bg-white/10 hover:-translate-y-1 transition-all text-center tracking-widest uppercase text-xs"
                >
                  Source Code
                </a>
              ) : (
                <div className="px-10 py-4 border border-white/5 text-gray-600 rounded-2xl font-bold cursor-not-allowed text-center uppercase text-xs tracking-widest">
                  Source Restricted
                </div>
              )}
              
              {/* VIDEO BUTTON: Integrated Client Component */}
              <div className="sm:w-auto w-full">
                 <ProjectVideoBtn videoLink={project.video_link} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}