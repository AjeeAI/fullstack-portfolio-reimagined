const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajijolaoluwa-adesoji.vercel.app';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/dashboard/*'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}