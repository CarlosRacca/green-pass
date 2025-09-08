import HomeHowItWorks from "../components/HomeHowItWorks.jsx";
import FloatingWhatsApp from "../components/FloatingWhatsApp.jsx";
import FeaturedExperiences from "../components/FeaturedExperiences.jsx";
import HomeLoginCTA from "../components/HomeLoginCTA.jsx";
import HeroVideoSection from "../components/HeroVideoSection.jsx";
import AboutSection from "../components/AboutSection.jsx";

function Home() {
  return (
    <>
      <HeroVideoSection />
      <FeaturedExperiences />
      <AboutSection />
      <HomeHowItWorks />
      <HomeLoginCTA />
      <FloatingWhatsApp />
    </>
  );
}

export default Home;