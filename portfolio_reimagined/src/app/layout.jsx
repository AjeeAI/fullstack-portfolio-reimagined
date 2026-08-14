import '../index.css'; 
import ClientWrapper from '@/components/ClientWrapper';
import { ThemeProvider } from '@/components/ThemeProvider'; // Make sure you created this file!

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
        className="
          /* LIGHT MODE DEFAULTS */
          bg-slate-50 text-slate-900 
          /* DARK MODE OVERRIDES */
          dark:bg-[#030014] dark:text-white 
          font-inter overflow-x-hidden w-full relative min-h-screen transition-colors duration-300
        " 
        suppressHydrationWarning
      >
        <ThemeProvider>
          {/* --- BACKGROUND LAYER --- */}
          
          {/* LIGHT MODE BACKGROUND: Clean subtle blue glow at the top */}
          <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(219,234,254,0.6),rgba(248,250,252,0))] pointer-events-none dark:hidden"></div>
          
          {/* DARK MODE BACKGROUND: Your original purple gradient */}
          <div className="fixed inset-0 z-[-1] hidden dark:block bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-600/15 via-[#030014] to-black pointer-events-none"></div>
          
          {/* DARK MODE GRAIN: Your original noise overlay */}
          <div className="fixed inset-0 z-[-1] hidden dark:block opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          
          {/* --- APP CONTENT --- */}
          <ClientWrapper>
              {children}
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}