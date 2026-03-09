// src/components/Projects.jsx
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'; // Added limit
import ProjectsClient from './ProjectsClient';

export default async function Projects() {
  let projects = [];
  
  try {
    const projectsRef = collection(db, "projects");
    
    // 1. We limit the query to 12 items for the Home Page
    const orderedQuery = query(
      projectsRef, 
      orderBy("orderId", "asc"), 
      limit(12) 
    );
    
    const querySnapshot = await getDocs(orderedQuery);
    
    // 2. Map and serialize as usual
    projects = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toMillis?.() || null 
      };
    });
    
  } catch (error) {
    console.error("FIREBASE ERROR:", error); 
  }

  // 3. Pass 'isHomePage={true}' so the client component renders the "View All" button
  return <ProjectsClient projects={projects} isHomePage={true} />;
}