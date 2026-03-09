import '../index.css'; // This imports your global CSS and Tailwind


// src/app/layout.jsx

export const metadata = {
  title: 'Ajee | Fullstack Developer',
  description: 'Building seamless web experiences',
  // ADD THIS SECTION:
  icons: {
    icon: '/logo.svg', 
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* The warning persists because an extension is modifying the BODY.
          Apply the suppression here to ignore injected attributes like 'cz-shortcut-listen'
      */}
      <body 
        className="bg-gray-900 text-white font-inter" 
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}