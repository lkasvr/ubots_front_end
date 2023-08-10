import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-h-screen h-screen w-screen`}>
        <main className="min-h-screen h-full w-full flex flex-row flex-nowrap items-center justify-center px-12">
          <div className="w-full h-5/6 p-4 text-base rounded-2xl text-gray-900 bg-gray-100 overflow-auto">
            <Image
              src="/logo-ubots.png"
              width={600}
              height={200}
              alt="Ubots Logo"
            />
            <br />
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl text-center">
              Central de Relacionamento
            </h3>
            <br />
            <section className="flex flex-row flex-wrap justify-center items-center gap-8 overflow-auto text-white">
              {children}
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}
