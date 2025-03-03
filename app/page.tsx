import Hero from "./components/Hero"
import MoveWithConfidence from "./components/MoveWithConfidence"
import FeatureCarousel from "./components/FeatureCarousel"
import PortfolioGrid from "./components/PortfolioGrid"
import Timeline from "./components/Timeline"
import Marquee from "./components/Marquee"
import ContactForm from "./components/ContactForm"

export default function Home() {
  return (
    <>
      <Hero />
      <MoveWithConfidence />
      <FeatureCarousel />
      <Timeline />
      <Marquee />
      <ContactForm />
    </>
  )
}

