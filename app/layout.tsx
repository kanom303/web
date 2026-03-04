import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css"; 
import Link from "next/link";
import Image from "next/image"; // นำเข้า Image component

const roboto = Roboto({
  variable: "--font-Roboto",
  subsets: ["latin"],
  weight: "400"
})

export const metadata: Metadata = {
  title: "Hello world App",
  description: "This is my first hello app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
      
      {/* --- Header --- */}
      <header className="w-full bg-[#FDFBF0]">
        <div className="max-w-[1440px] w-[90%] mx-auto h-20 flex justify-between items-center">
          
          {/* Logo - เปลี่ยนเป็น Link และ Image */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Image 
              src="https://cdn-icons-png.flaticon.com/512/2948/2948025.png" 
              width={40} 
              height={40} 
              alt="icon home" 
              className="w-10 h-10"
            />
            <span className="text-black">CoC</span>
          </Link>

          {/* Desktop Menu - เปลี่ยนจาก <a> เป็น <Link /> */}
          <nav className="hidden md:flex gap-10 items-center">
            <Link 
              href="/" 
              className="font-extrabold text-black text-base hover:text-[#997A2E] transition-colors"
            >
              HOME
            </Link>
            <Link 
              href="/homework1" 
              className="font-extrabold text-black text-base hover:text-[#997A2E] transition-colors"
            >
              HW1
            </Link>
            <Link 
              href="/user" 
              className="font-extrabold text-black text-base hover:text-[#997A2E] transition-colors"
            >
              User
            </Link>
            <Link 
              href="/about" 
              className="font-extrabold text-black text-base hover:text-[#997A2E] transition-colors"
            >
              ABOUT
            </Link>
            <Link 
              href="/contact" 
              className="font-extrabold text-black text-base hover:text-[#997A2E] transition-colors"
            >
              CONTACT
            </Link>
          </nav>

          {/* Mobile Hamburger (Icon จำลอง) */}
          <div className="block md:hidden cursor-pointer space-y-1.5">
            <div className="w-8 h-1 bg-black rounded"></div>
            <div className="w-8 h-1 bg-black rounded"></div>
            <div className="w-8 h-1 bg-black rounded"></div>
          </div>
          
        </div>
      </header>

      <main className="m-8">
        {children}
      </main>

      </body>
    </html>
  );
}