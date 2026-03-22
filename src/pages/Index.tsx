import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tips from "@/components/Tips";
import Checklist from "@/components/Checklist";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="pt-16">
      <Hero />
      <Tips />
      <Checklist />
    </main>
    <Footer />
  </div>
);

export default Index;
