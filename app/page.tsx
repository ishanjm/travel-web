import LanguageProvider from "./components/LanguageContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Destinations from "./components/Destinations";
import Services from "./components/Services";
import Concierge from "./components/Concierge";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
        {/* Header Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          {/* Hero Section & Search Widget */}
          <Hero />

          {/* Curated Destinations */}
          <Destinations />

          {/* Core Services Facilities */}
          <Services />

          {/* Planner Concierge Signup */}
          <Concierge />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
