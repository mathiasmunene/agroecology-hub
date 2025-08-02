// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agroecology Hub',
  description: 'A hub for agroecology resources and articles',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <header className="bg-green-600 text-white p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold">Agroecology Hub</h1>
          </div>
        </header>
        {children}
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="max-w-4xl mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Agroecology Hub</p>
          </div>
        </footer>
      </body>
    </html>
  );
}