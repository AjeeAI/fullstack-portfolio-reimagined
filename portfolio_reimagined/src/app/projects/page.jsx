// src/app/projects/page.jsx
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import ProjectsClient from '@/components/ProjectsClient';
import Link from 'next/link';

export default async function AllProjectsPage() {
  let projects = [];
  
  try {
    const projectsRef = collection(db, "projects");
    // Fetch EVERYTHING without a limit
    const orderedQuery = query(projectsRef, orderBy("orderId", "asc"));
    
    const querySnapshot = await getDocs(orderedQuery);
    projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toMillis?.() || null 
    }));
  } catch (error) {
    console.error("Error fetching all projects:", error);
  }

  return (
    <main className="min-h-screen bg-[#0E0B17] py-20">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/#projects" className="text-purple-400 hover:text-purple-300 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-white font-outfit mb-2">All Projects</h1>
        <p className="text-gray-400 mb-12">An exhaustive list of everything I've built.</p>

        {/* Reuse the client component, but tell it NOT to show the "View All" button */}
        <ProjectsClient projects={projects} isHomePage={false} />
      </div>
    </main>
  );
}