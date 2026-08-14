import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajijolaoluwa-adesoji.vercel.app';

export default async function sitemap() {
  // 1. Static Public Pages
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0, // Main portfolio landing page
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8, // Full project archive
    },
  ];

  // 2. Dynamic Project Detail Pages (/project/[id])
  let dynamicProjectRoutes = [];

  try {
    const projectsRef = collection(db, 'projects');
    const querySnapshot = await getDocs(projectsRef);

    dynamicProjectRoutes = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      // Convert Firestore Timestamp to JS Date if available
      let lastModifiedDate = new Date();
      if (data.createdAt?.toDate) {
        lastModifiedDate = data.createdAt.toDate();
      } else if (data.updatedAt?.toDate) {
        lastModifiedDate = data.updatedAt.toDate();
      }

      return {
        url: `${BASE_URL}/project/${doc.id}`,
        lastModified: lastModifiedDate,
        changeFrequency: 'monthly',
        priority: 0.7, // Individual project pages
      };
    });
  } catch (error) {
    console.error('Error generating dynamic sitemap routes from Firestore:', error);
    // If Firestore fails, the static routes will still be returned
  }

  // 3. Return combined array (Admin routes are intentionally excluded)
  return [...staticRoutes, ...dynamicProjectRoutes];
}