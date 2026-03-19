// src/components/Projects.jsx
import { db } from '@/lib/firebase';
import { collection, getDocs, query, limit, where } from 'firebase/firestore'; 
import ProjectsClient from './ProjectsClient';

export default async function Projects() {
  let projects = [];
  
  try {
    const projectsRef = collection(db, "projects");
    
    const orderedQuery = query(
      projectsRef, 
      where("featured", "==", true), 
      limit(12) 
    );
    
    const querySnapshot = await getDocs(orderedQuery);
    
    projects = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Map priority and default to 999
        priority: data.priority ? Number(data.priority) : 999,
        createdAt: data.createdAt?.toMillis?.() || 0 
      };
    });

    // CUSTOM ORDER LOGIC
    projects.sort((a, b) => {
      // Primary: Manual Priority (1, 2, 3...)
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      // Secondary: Newest first fallback
      return b.createdAt - a.createdAt;
    });
    
  } catch (error) {
    console.error("FIREBASE ERROR:", error); 
  }

  return <ProjectsClient projects={projects} isHomePage={true} />;
}