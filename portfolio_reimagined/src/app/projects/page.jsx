// src/app/projects/page.jsx
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore'; 
import ProjectsClient from '@/components/ProjectsClient';
import Link from 'next/link';

export const revalidate = 0;

export default async function AllProjectsPage() {
  let projects = [];
  
  try {
    const projectsRef = collection(db, "projects");
    const querySnapshot = await getDocs(projectsRef);
    
    projects = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Logic: Convert priority to number, default to 999 if missing
        priority: data.priority ? Number(data.priority) : 999,
        createdAt: data.createdAt?.toMillis?.() || 0 
      };
    });

    // CUSTOM ORDER LOGIC
    projects.sort((a, b) => {
      // Primary: Manual Priority (Ascending 1, 2, 3...)
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      // Secondary: Newest first fallback
      return b.createdAt - a.createdAt;
    });

  } catch (error) {
    console.error("Error fetching all projects:", error);
  }

  return (
    <main className="min-h-screen bg-[#030014] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-600/10 via-[#030014] to-black text-white pt-12 pb-32 relative overflow-hidden">
      {/* Background Polish */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Tightened Back Link */}
        <Link 
          href="/#projects" 
          className="group flex items-center gap-2 text-slate-500 hover:text-purple-400 transition-all mb-4 inline-flex font-medium"
        >
          <span className="group-hover:-translate-x-1 transition-transform text-lg">←</span> 
          <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Back to Home</span>
        </Link>

        {/* The Client Component handles the Header + Grid */}
        <ProjectsClient projects={projects} isHomePage={false} />
        
      </div>
    </main>
  );
}