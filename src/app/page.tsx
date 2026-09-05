import Experience from "@/components/experience/Experience";
import TopNav from "@/components/experience/TopNav";
import TestimonialsSection from "@/components/experience/TestimonialsSection";
import FaqSection from "@/components/experience/FaqSection";
import ContactSection from "@/components/experience/ContactSection";
import ScrollCue from "@/components/experience/overlay/ScrollCue";
import Footer from "@/components/experience/Footer";
import Loader from "@/components/experience/Loader";
import NoScriptFallback from "@/components/experience/NoScriptFallback";
import CaseStudyModal from "@/components/experience/CaseStudyModal";
import ServiceModal from "@/components/experience/ServiceModal";

export default function Home() {
  return (
    <main>
      <NoScriptFallback />
      <Loader />
      <TopNav />
      <Experience />
      <ScrollCue />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
      <CaseStudyModal />
      <ServiceModal />
    </main>
  );
}
