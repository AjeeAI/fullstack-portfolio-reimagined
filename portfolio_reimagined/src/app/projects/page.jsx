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
        priority: data.priority ? Number(data.priority) : 999,
        createdAt: data.createdAt?.toMillis?.() || 0 
      };
    });

    projects.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return b.createdAt - a.createdAt;
    });

  } catch (error) {
    console.error("Error fetching all projects:", error);
  }

  return (
    /* 1. REMOVED hardcoded colors. Now it lets layout.jsx handle the background */
    <main className="min-h-screen pt-12 pb-32 relative overflow-hidden transition-colors duration-300">
      
      {/* 2. BACKGROUND POLISH: Only show grain/auras in dark mode to keep light mode clean */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] hidden dark:block"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-purple-600/5 blur-[120px] rounded-full z-0 pointer-events-none transition-colors duration-500"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* 3. DUAL-THEME BACK LINK: Blue hover for light, Purple for dark */}
        <Link 
          href="/#projects" 
          className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:hover:text-purple-400 transition-all mb-4 inline-flex font-medium"
        >
          <span className="group-hover:-translate-x-1 transition-transform text-lg">←</span> 
          <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Back to Home</span>
        </Link>

        {/* 4. THE CONTENT: ProjectsClient already has our dual-theme logic! */}
        <ProjectsClient projects={projects} isHomePage={false} />
        
      </div>
    </main>
  );
}