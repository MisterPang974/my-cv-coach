import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tips from "@/components/Tips";
import Footer from "@/components/Footer";
import UnpublishGuide from "@/components/UnpublishGuide";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="pt-16">
      <Hero />
      <Tips />
      <UnpublishGuide />
    </main>
    <Footer />
  </div>
);

export default Index;
