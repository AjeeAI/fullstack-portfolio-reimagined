import '../index.css'; 
import ClientWrapper from '@/components/ClientWrapper';

// Metadata stays here (Server Side)
export const metadata = {
  title: 'Ajee | Fullstack & AI Developer',
  description: 'Building scalable, AI-powered web applications and seamless digital experiences.',
  icons: {
    icon: '/logo.svg', 
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body 
        className="bg-[#030014] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-600/15 via-[#030014] to-black text-white font-inter overflow-x-hidden w-full relative min-h-screen" 
        suppressHydrationWarning
      >
        {/* The Grain Overlay */}
        <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        {/* Use the Wrapper to manage the Preloader state */}
        <ClientWrapper>
            {children}
        </ClientWrapper>
      </body>
    </html>
  );
}