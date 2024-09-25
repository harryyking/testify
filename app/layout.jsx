import "@/styles/global.css"
import { Bricolage_Grotesque } from 'next/font/google';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";


const brand = Bricolage_Grotesque({subsets : ['latin'], weight : ["200", "300", "400", "500", "600", "700", "800"]});


export const metadata = {
  title: "Testify",
  description: "Join Thousands of Christians Around the World Sharing Their Life-Changing Stories. Sharing Life Experiences and Testimonies of God's Grace Over 10,000 lives",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme = "light" className={brand.className}  >
      <body className="main" >
     
            <main className=" mx-auto md:w-1/2 md:p-6 p-4">
            <NavBar/>
              {children}
              <div className="divider"></div>
            <Footer/>
            </main>
       
        
          </body>
    </html>
  );
}
