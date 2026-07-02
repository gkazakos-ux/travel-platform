import Navbar from "@/components/navbar";
import Footer from "@/components/footer"; // <-- Εισαγωγή του νέου Footer
import { BackToTop } from "@/components/ui/back-to-top";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Το Navbar μπαίνει στην κορυφή */}
      <Navbar />
      
      {/* Οι σελίδες σου φορτώνουν εδώ στη μέση */}
      <main className="flex-1 flex flex-col">{children}</main>
      
      {/* Το Footer μπαίνει αυτόματα στο τέλος ΟΛΩΝ των σελίδων */}
      <Footer />
      
      {/* Το κουμπί BackToTop */}
      <BackToTop />
    </div>
  );
}